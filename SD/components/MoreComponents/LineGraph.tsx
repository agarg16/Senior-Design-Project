import React, { useState, useEffect } from 'react'
import { modalStyles } from '../../styles/MoreStyles'
import { Text, View, Image } from "react-native"
import { CurveType, LineChart } from "react-native-gifted-charts"

const widthUsed = 240

export const DataForLineGraph = (morningMoods: {morningMood: number}[], middayMoods: {middayMood: number}[], nightMoods: {nighttimeMood: number}[]) => {
    var morning: {value: number}[] = []
    morningMoods.map((mood) => {morning.push({value: mood.morningMood - 4})})
    
    var midday: {value: number}[] = []
    middayMoods.map(mood => {midday.push({value: mood.middayMood - 4})})
    
    var night: {value: number}[] = []
    nightMoods.map(mood => {night.push({value: mood.nighttimeMood - 4})})
    
    const spacingAmnt = widthUsed / Math.max(morning.length, midday.length, night.length)

    /* List of Mood Images */
    const images = [
        require('../../assets/images/1.png'),
        require('../../assets/images/2.png'),
        require('../../assets/images/3.png'),
        require('../../assets/images/4.png'),
        require('../../assets/images/5.png'),
        require('../../assets/images/6.png'),
        require('../../assets/images/7.png')
    ]

    return (
        <View style={{alignContent: 'center', justifyContent: 'center', flexDirection: 'row', flex: 1}}>
            {/* Displays the 7 Moods */}
            <View style={{paddingTop: 20, flex: 1}}>
                <Image source={images[0]} style={modalStyles.yAxisImages} />
                <Image source={images[1]} style={modalStyles.yAxisImages} />
                <Image source={images[2]} style={modalStyles.yAxisImages} />
                <Image source={images[3]} style={modalStyles.yAxisImages} />
                <Image source={images[4]} style={modalStyles.yAxisImages} />
                <Image source={images[5]} style={modalStyles.yAxisImages} />
                <Image source={images[6]} style={modalStyles.yAxisImages} />
            </View>
            <View style={{flex: 9}}>
                <LineChart
                    initialSpacing={10}
                    hideDataPoints={false}
                    data ={morning} data2={midday} data3={night}
                    spacing1={spacingAmnt} spacing2={spacingAmnt} spacing3={spacingAmnt}
                    color1={'#FFE7B7'} color2={'#A2ECFD'} color3={'#B9B8EC'}
                    dataPointsColor1={'#899bbf'} dataPointsColor2={'#be867a'} dataPointsColor3={'#b0b18a'}
                    width={widthUsed}
                    height={widthUsed / 2}
                    thickness={4}
                    noOfSections={3} noOfSectionsBelowXAxis={3}
                    maxValue={4}
                    hideYAxisText={true}
                    hideRules={true}
                    curved={true}
                    curveType={CurveType.QUADRATIC}
                    showDataPointsForMissingValues={true}
                    interpolateMissingValues={true}
                />
            </View>
        </View>
    )
}

export const DataForLineGraphWater = (waterTotals: {waterTotal: number}[]) => {
    var water: {value: number}[] = []
    waterTotals.map((waterVal) => {water.push({value: waterVal.waterTotal})})

    return (
        <View style={{width: 300, height: 260, alignSelf: 'center'}}>
            <LineChart
                    initialSpacing={10}
                    hideDataPoints={false}
                    data ={water}
                    spacing1={widthUsed / water.length}
                    yAxisLabelWidth={28}
                    color1={'#9fd0f7'}
                    dataPointsColor1={'#f7c69f'}
                    width={widthUsed}
                    height={widthUsed}
                    thickness={4}
                    hideRules={true}
                    curved={true}
                    curveType={CurveType.QUADRATIC}
                    showDataPointsForMissingValues={true}
                    interpolateMissingValues={true}
                    isAnimated={false}
            />
        </View>
    )
}

export const DataForLineGraphMeals = (breakfastEaten: {breakfastMeal: number}[], lunchEaten: {lunchMeal: number}[], dinnerEaten: {dinnerMeal: number}[], snackEaten: {snackMeal: number}[]) => {
    var breakfast: {value: number}[] = []
    breakfastEaten.map((isEaten) => {breakfast.push({value: isEaten.breakfastMeal})})
    
    var lunch: {value: number}[] = []
    lunchEaten.map((isEaten) => {lunch.push({value: isEaten.lunchMeal})})
    
    var dinner: {value: number}[] = []
    dinnerEaten.map((isEaten) => {dinner.push({value: isEaten.dinnerMeal})})
    
    var snack: {value: number}[] = []
    snackEaten.map((isEaten) => {snack.push({value: isEaten.snackMeal})})

    const spacingAmnt = widthUsed / Math.max(breakfast.length, lunch.length, dinner.length, snack.length)

    return (
        <View style={{width: 300, height: 260, alignSelf: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
            <View style={{width: 25, justifyContent: 'space-between'}}>
                <Text style={{fontSize: 12, paddingTop: 24}}>Ate</Text>
                <Text style={{fontSize: 12}}>Did Not{"\n"}Eat</Text>
            </View>

            <View>
                <LineChart
                        initialSpacing={10}
                        hideDataPoints={false}
                        data ={breakfast} data2={lunch} data3={dinner} data4={snack}
                        spacing1={spacingAmnt} spacing2={spacingAmnt} spacing3={spacingAmnt} spacing4={spacingAmnt}
                        yAxisLabelWidth={0}
                        color1={'#fff8ac'} color2={"#b5ffac"} color3={"#7158a0"} color4={"#ffaf9b"}
                        dataPointsColor1={'#acb3ff'} dataPointsColor2={'#f6acff'} dataPointsColor3={'#87a058'} dataPointsColor4={'#9bebff'}
                        width={widthUsed}
                        height={widthUsed}
                        thickness={4}
                        hideRules={true}
                        curved={true}
                        curveType={CurveType.QUADRATIC}
                        showDataPointsForMissingValues={true}
                        interpolateMissingValues={true}
                        isAnimated={false}
                        noOfSections={1}
                        yAxisTextNumberOfLines={2}
                        hideYAxisText={true}
                />
            </View>
        </View>
    )
}

export const DataForLineGraphSleep = (sleepTotals: {sleepTotal: number}[]) => {
    var sleep: {value: number}[] = []
    sleepTotals.map((sleepVal) => {sleep.push({value: sleepVal.sleepTotal})})

    return (
        <View style={{width: 300, height: 260, alignSelf: 'center'}}>
            <LineChart
                    initialSpacing={10}
                    hideDataPoints={false}
                    data ={sleep}
                    spacing1={widthUsed / sleep.length}
                    yAxisLabelWidth={28}
                    color1={'#2a2d9f'}
                    dataPointsColor1={'#9f9c2a'}
                    width={widthUsed}
                    height={widthUsed}
                    thickness={4}
                    hideRules={true}
                    curved={true}
                    curveType={CurveType.QUADRATIC}
                    showDataPointsForMissingValues={true}
                    interpolateMissingValues={true}
                    isAnimated={false}
            />
        </View>
    )
}
