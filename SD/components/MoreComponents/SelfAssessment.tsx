import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { modalStyles } from '../../styles/MoreStyles';
import { 
  getAllMorningMoodsInRange,
  getAllMiddayMoodsInRange,
  getAllNighttimeMoodsInRange,
  getAllSleepTotalsInRange,
  getAllWaterTotalsInRange,
  getAllBreakfastMealsTotalsInRange,
  getAllLunchMealsTotalsInRange,
  getAllDinnerMealsTotalsInRange,
  getAllSnackMealsTotalsInRange,
  filterByDate
} from '../../database/database';

type Insight = {
  title: string;
  value: string;
  emoji: string;
};

export const SelfAssessment = () => {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month'>('week');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDateRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    
    if (selectedRange === 'week') {
      startDate.setDate(today.getDate() - 7);
    } else {
      startDate.setMonth(today.getMonth() - 1);
    }
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0]
    };
  };

    const calculateAverages = async () => {
        setIsLoading(true);
        const { start, end } = getDateRange();

      const calculateMealCompletion = (
          entries: { [key: string]: any }[],
          mealField: string,
          totalDays: number
      ) => {
          const loggedDays = entries.filter(entry =>
              entry[mealField] !== null &&
              entry[mealField] !== undefined &&
              entry[mealField] !== -1
          ).length;
          return totalDays > 0 ? (loggedDays / totalDays) * 100 : 0;
      };
    

    try {
      // Fetch all relevant data
      const [
        morning, midday, nighttime, sleep, water, 
        breakfast, lunch, dinner, snacks
      ] = await Promise.all([
        getAllMorningMoodsInRange(start, end),
        getAllMiddayMoodsInRange(start, end),
        getAllNighttimeMoodsInRange(start, end),
        getAllSleepTotalsInRange(start, end),
        getAllWaterTotalsInRange(start, end),
        getAllBreakfastMealsTotalsInRange(start, end),
        getAllLunchMealsTotalsInRange(start, end),
        getAllDinnerMealsTotalsInRange(start, end),
        getAllSnackMealsTotalsInRange(start, end)
      ]);

      // Calculate averages
      const avgMornMood = morning.reduce((sum, m) => sum + m.morningMood, 0) / morning.length;
      const avgMidMood = midday.reduce((sum, m) => sum + m.middayMood, 0) / midday.length;
      const avgNightMood = nighttime.reduce((sum, m) => sum + m.nighttimeMood, 0) / nighttime.length;
      const avgSleep = sleep.reduce((sum, s) => sum + s.sleepTotal, 0) / sleep.length;
      const avgWater = water.reduce((sum, w) => sum + w.waterTotal, 0) / water.length;

      const avgMood = (avgMornMood + avgMidMood + avgNightMood) / 3;
      
      const startDate = new Date(start);
    const endDate = new Date(end);
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1; // Include both start and end dates

    // Meal completion calculations
    const mealCompletion = {
      breakfast: calculateMealCompletion(breakfast, 'breakfastMeal', totalDays),
      lunch: calculateMealCompletion(lunch, 'lunchMeal', totalDays),
      dinner: calculateMealCompletion(dinner, 'dinnerMeal', totalDays),
      snacks: calculateMealCompletion(snacks, 'snackMeal', totalDays)
    };

        const sleepHours = sleep.map(s => s.sleepTotal);
        const minSleep = Math.min(...sleepHours);
        const maxSleep = Math.max(...sleepHours);
        const sleepConsistency = (maxSleep - minSleep <= 2) ? 'consistent' : 'varied';

        const optimalSleepDays = sleep.filter(s => s.sleepTotal >= 7 && s.sleepTotal <= 9).length;
        const sleepPercentage = (optimalSleepDays / sleep.length) * 100;

        const newInsights: Insight[] = [];

        if (mealCompletion.lunch < 60) {
            newInsights.push({
                title: 'Lunch Habits',
                value: `You missed lunch ${Math.round(100 - mealCompletion.lunch)}% of days`,
                emoji: '🥗'
            });
        } else if (mealCompletion.lunch > 90) {
            newInsights.push({
                title: 'Lunch Consistency!',
                value: `You ate lunch ${Math.round(mealCompletion.lunch)}% of days - great routine!`,
                emoji: '👍'
            });
        }

        if (mealCompletion.dinner < 50) {
            newInsights.push({
                title: 'Evening Fuel',
                value: `You skipped dinner ${Math.round(100 - mealCompletion.dinner)}% of nights`,
                emoji: '🍽️'
            });
        } else if (avgSleep < 7 && mealCompletion.dinner > 80) {
            newInsights.push({
                title: 'Late Dinners?',
                value: `You eat dinner regularly but sleep ${avgSleep.toFixed(1)}hrs - try earlier meals`,
                emoji: '⏰'
            });
        }

        if (sleepConsistency === 'varied') {
            newInsights.push({
                title: 'Sleep Variability',
                value: `Your sleep ranged ${minSleep}-${maxSleep}hrs. Aim for consistent duration`,
                emoji: '🛌'
            });
        }

        if (avgSleep > 9) {
            newInsights.push({
                title: 'Oversleeping',
                value: `Average ${avgSleep.toFixed(1)}hrs sleep. Ideal is 7-9hrs`,
                emoji: '😴'
            });
        }

        if (avgSleep < 6 && avgMood < 3) {
            newInsights.push({
                title: 'Sleep & Mood',
                value: `Low sleep (${avgSleep.toFixed(1)}hrs) correlates with lower mood (${avgMood.toFixed(1)}/5)`,
                emoji: '📉'
            });
        }

        if (mealCompletion.breakfast > 80 && mealCompletion.lunch > 80 && mealCompletion.dinner > 80) {
            newInsights.push({
                title: 'Meal Mastery!',
                value: `You're eating all 3 meals regularly - keep it up!`,
                emoji: '🌟'
            });
        }

        if (avgWater < 6 && mealCompletion.lunch > 80) {
            newInsights.push({
                title: 'Hydration Gap',
                value: `You eat lunch regularly but only drink ${avgWater.toFixed(1)} cups/day`,
                emoji: '🚰'
            });
        }

        if (sleepPercentage < 50) {
            newInsights.push({
                title: 'Sleep Optimization',
                value: `Only ${Math.round(sleepPercentage)}% of days in ideal sleep range (7-9hrs)`,
                emoji: '🎯'
            });
        }

      setInsights(newInsights);
    } catch (error) {
      console.error('Assessment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateAverages();
  }, [selectedRange]);

  return (
    <View style={modalStyles.assessmentContainer}>
      <View style={modalStyles.rangeSelector}>
        <TouchableOpacity
          style={[
            modalStyles.rangeButton,
            selectedRange === 'week' && modalStyles.selectedRange
          ]}
          onPress={() => setSelectedRange('week')}
        >
          <Text style={modalStyles.rangeButtonText}>Last Week</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            modalStyles.rangeButton,
            selectedRange === 'month' && modalStyles.selectedRange
          ]}
          onPress={() => setSelectedRange('month')}
        >
          <Text style={modalStyles.rangeButtonText}>Last Month</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#18576D" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={modalStyles.insightsContainer}>
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <View key={index} style={modalStyles.insightCard}>
                <Text style={modalStyles.insightEmoji}>{insight.emoji}</Text>
                <View style={modalStyles.insightTextContainer}>
                  <Text style={modalStyles.insightTitle}>{insight.title}</Text>
                  <Text style={modalStyles.insightValue}>{insight.value}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={modalStyles.noDataText}>
              No enough data to generate insights for this period
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};