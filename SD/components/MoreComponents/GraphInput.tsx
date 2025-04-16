import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from "react-native"
import { modalStyles } from '../../styles/MoreStyles'
import { getAllMorningMoodsInRange, getAllMiddayMoodsInRange, getAllNighttimeMoodsInRange,
         getAllWaterTotalsInRange,
         getAllBreakfastMealsTotalsInRange, getAllLunchMealsTotalsInRange, getAllDinnerMealsTotalsInRange, getAllSnackMealsTotalsInRange,
         getAllSleepTotalsInRange
       } from '../../database/database'
import { getMonthName } from '../../additionalFiles/getMonthName'
import { DataForLineGraph, DataForLineGraphMeals, DataForLineGraphSleep, DataForLineGraphWater } from './LineGraph'
import { Ionicons } from '@expo/vector-icons'


export const GraphInput = () => {
    const today = new Date()
    const [curDate, setCurDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6))
    const [selectedButton, setSelectedButton] = useState(2) /* A numerical value representing which of the three graph-range buttons have been pressed */

    const [morningMoods, setMorningMoods] = useState<{morningMood: number}[]>([])
    const [middayMoods, setMiddayMoods] = useState<{middayMood: number}[]>([])
    const [nightMoods, setNightMoods] = useState<{nighttimeMood: number}[]>([])
    const [waterTotals, setWaterTotals] = useState<{waterTotal: number}[]>([])
    const [breakfastsEaten, setBreakfastsEaten] = useState<{breakfastMeal: number}[]>([])
    const [lunchesEaten, setLunchesEaten] = useState<{lunchMeal: number}[]>([])
    const [dinnersEaten, setDinnersEaten] = useState<{dinnerMeal: number}[]>([])
    const [snacksEaten, setSnacksEaten] = useState<{snackMeal: number}[]>([])
    const [sleepTotals, setSleepTotals] = useState<{sleepTotal: number}[]>([])

    const [dropdownMessage, setDropdownMessage] = useState("Comparison Options")
    const [openGraph, setOpenGraph] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [dropdownItemSelected, setDropdownItemSelected] = useState("None")

    /* Gets all of the dates/corresponding values for each mood type */
    const moodsToDisplay = async () => {
        setMorningMoods(await getAllMorningMoodsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
        setMiddayMoods (await getAllMiddayMoodsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
        setNightMoods  (await getAllNighttimeMoodsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
    }

    /* Gets all of the water values for each waterTotal */
    const getWaterTotals = async () => { setWaterTotals(await getAllWaterTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0])) }

    const getMealsEaten = async () => {
        setBreakfastsEaten(await getAllBreakfastMealsTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
        setLunchesEaten   (await getAllLunchMealsTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
        setDinnersEaten   (await getAllDinnerMealsTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
        setSnacksEaten    (await getAllSnackMealsTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0]))
    }

    const getSleepTotals = async () => { setSleepTotals(await getAllSleepTotalsInRange(curDate.toISOString().split("T")[0], today.toISOString().split("T")[0])) }

    return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
            {/* Range Selection Box */}
            <View style={{ backgroundColor: 'lightblue', margin: 20, paddingTop: 10, paddingBottom: 10, borderWidth: 1, borderRadius: 20 }}>
                <Text style={{fontSize: 20, marginLeft: 20}}>Select a Range to View:</Text>
                {/* Range Selection Options (1 Year, 1 Month, 1 Week) */}
                <View style={modalStyles.graphInputBox}>
                    {/* 1 Year */}
                    <TouchableOpacity style={{backgroundColor: selectedButton === 0? '#18576D' : 'lightblue', borderColor: '#43B0D8', borderWidth: 0.5, borderRadius: 10, width: 75}} onPress={() => {
                        setSelectedButton(0)
                        setCurDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
                    }}>
                        <Text style={{color: selectedButton === 0 ? 'white' : 'black', textAlign: 'center', padding: 8}}>1 Year</Text>
                    </TouchableOpacity>
                    
                    {/* 1 Month */}
                    <TouchableOpacity style={{backgroundColor: selectedButton === 1? '#18576D' : 'lightblue', borderColor: '#43B0D8', borderWidth: 0.5, borderRadius: 10, width: 75}} onPress={() => {
                        setSelectedButton(1)
                        setCurDate(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()))
                    }}>
                        <Text style={{color: selectedButton === 1 ? 'white' : 'black', textAlign: 'center', padding: 8}}>1 Month</Text>
                    </TouchableOpacity>

                    {/* 1 Week */}
                    <TouchableOpacity style={{backgroundColor: selectedButton === 2? '#18576D' : 'lightblue', borderColor: '#43B0D8', borderWidth: 0.5, borderRadius: 10, width: 75}} onPress={() => {
                        setSelectedButton(2)
                        setCurDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6))
                    }}>
                        <Text style={{color: selectedButton === 2 ? 'white' : 'black', textAlign: 'center', padding: 8}}>1 Week</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {/* Range */}
                    <Text style={{color: '#18576D', fontWeight: 600, marginTop: 10, marginLeft: 20, alignSelf: 'center'}}>Range: {getMonthName(curDate.getMonth()).substring(0, 3)} {curDate.getDate()}, {curDate.getFullYear()}&ndash;{getMonthName(today.getMonth()).substring(0, 3)} {today.getDate()}, {today.getFullYear()}</Text>

                    {/* Dropdown Menu and Enter Button at Bottom */}
                    <View style={{paddingTop: 8, justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row'}}>
                        {/* Dropdown Menu */}
                        <View>
                            {/* Menu Button */}
                            <TouchableOpacity 
                                style={[modalStyles.graphDropdownButton, 
                                    {backgroundColor: openDropdown ? '#18576D' :'white',
                                     borderBottomLeftRadius: openDropdown ? 0 : 4,
                                     borderBottomRightRadius: openDropdown ? 0 : 4}]} 
                                onPress={() => {
                                    setOpenDropdown(!openDropdown)
                                    /* setOpenGraph(openDropdown) */
                                }
                            }>
                                <Text style={{color: openDropdown === false ? '#18576D' : 'white', textAlign: 'center', flex: 9}}>{dropdownMessage}</Text>
                                <Ionicons style={{paddingLeft: 4, flex: 1}} name='caret-down-outline' color={openDropdown === false ? '#18576D' : 'white'} />
                            </TouchableOpacity>

                            {/* Menu When Pressed */}
                            {
                                openDropdown
                                ?
                                <View style={modalStyles.graphDropdownMenu}>
                                    {/* None Option */}
                                    <TouchableOpacity style={[modalStyles.graphDropdownMenuButton, {backgroundColor: dropdownItemSelected === "None" ? 'lightblue' : 'white'}]} onPress={() => {
                                        setDropdownItemSelected("None")
                                        setDropdownMessage("None")
                                        setOpenDropdown(false)
                                        setOpenGraph(false)
                                    }}>
                                        <Text>None</Text>
                                    </TouchableOpacity>

                                    {/* Water Option */}
                                    <TouchableOpacity style={[modalStyles.graphDropdownMenuButton, {backgroundColor: dropdownItemSelected === "Water" ? 'lightblue' : 'white', borderTopWidth: 0.5, top: 35}]} onPress={() => {
                                        setDropdownItemSelected("Water")
                                        setDropdownMessage("Water")
                                        setOpenDropdown(false)
                                        setOpenGraph(false)
                                    }}>
                                        <Text>Water</Text>
                                    </TouchableOpacity>

                                    {/* Meals Option */}
                                    <TouchableOpacity style={[modalStyles.graphDropdownMenuButton, {backgroundColor: dropdownItemSelected === "Meals" ? 'lightblue' : 'white', borderTopWidth: 0.5, top: 70}]} onPress={() => {
                                        setDropdownItemSelected("Meals")
                                        setDropdownMessage("Meals")
                                        setOpenDropdown(false)
                                        setOpenGraph(false)
                                    }}>
                                        <Text>Meals</Text>
                                    </TouchableOpacity>

                                    {/* Sleep Option */}
                                    <TouchableOpacity style={[modalStyles.graphDropdownMenuButton,{backgroundColor: dropdownItemSelected === "Sleep" ? 'lightblue' : 'white', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, top: 105}]} onPress={() => {
                                        setDropdownItemSelected("Sleep")
                                        setDropdownMessage("Sleep")
                                        setOpenDropdown(false)
                                        setOpenGraph(false)
                                    }}>
                                        <Text>Sleep</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View></View>
                            }
                        </View>

                        {/* Enter Button */}
                        <TouchableOpacity style={modalStyles.graphInputEnterButton} onPress={() => {
                            moodsToDisplay()
                            setOpenDropdown(false)
                            setOpenGraph(dropdownItemSelected !== "None" ? true : false)

                            if(dropdownItemSelected === "Water") { getWaterTotals() }
                            else if(dropdownItemSelected === "Meals") { getMealsEaten() }
                            else /* if(dropdownItemSelected === "Sleep") */ { getSleepTotals() }
                        }}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Enter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Line Graph */}
            <View>
                <View style={modalStyles.graphBox}>
                    {/* Graph of Selected Range */}
                    {DataForLineGraph(morningMoods, middayMoods, nightMoods)}

                    {/* Key for Graph */}
                    <View style={{justifyContent: 'space-around', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>Morning: </Text>
                            <View style={{backgroundColor: '#FFE7B7', borderRadius: 4, width: 20, height: 20}}></View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Midday: </Text>
                            <View style={{backgroundColor: '#A2ECFD', borderRadius: 4, width: 20, height: 20}}></View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text>Night: </Text>
                            <View style={{backgroundColor: '#B9B8EC', borderRadius: 4, width: 20, height: 20}}></View>
                        </View>
                    </View>
                </View>
            </View>
            { 
                openGraph
                ?
                        dropdownItemSelected === "Water"
                        ?
                            <View style={[modalStyles.graphBox, {marginTop: 15, paddingTop: 20}]}>
                                {/* Graph of Selected Range */}
                                {DataForLineGraphWater(waterTotals)}

                                {/* Key for Graph */}
                                <View style={{paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text>Water: </Text>
                                        <View style={{backgroundColor: '#9fd0f7', borderRadius: 4, width: 20, height: 20}}></View>
                                    </View>
                                </View>
                            </View>
                        :
                        dropdownItemSelected === "Meals"
                        ?
                            <View style={[modalStyles.graphBox, {marginTop: 15, paddingTop: 20}]}>
                                {/* Graph of Selected Range */}
                                {DataForLineGraphMeals(breakfastsEaten, lunchesEaten, dinnersEaten, snacksEaten)}

                                {/* Key for Graph */}
                                <View style={{justifyContent: 'space-around', paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text>Breakfast: </Text>
                                        <View style={{backgroundColor: '#fff8ac', borderRadius: 4, width: 20, height: 20}}></View>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Text>Lunch: </Text>
                                        <View style={{backgroundColor: '#b5ffac', borderRadius: 4, width: 20, height: 20}}></View>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Text>Dinner: </Text>
                                        <View style={{backgroundColor: '#7158a0', borderRadius: 4, width: 20, height: 20}}></View>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Text>Snack: </Text>
                                        <View style={{backgroundColor: '#ffaf9b', borderRadius: 4, width: 20, height: 20}}></View>
                                    </View>
                                </View>
                            </View>
                        :
                        /* dropdownItemSelected === "Sleep" */
                        <View style={[modalStyles.graphBox, {marginTop: 15, paddingTop: 20}]}>
                            {/* Graph of Selected Range */}
                            {DataForLineGraphSleep(sleepTotals)}

                            {/* Key for Graph */}
                            <View style={{paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10, alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>Sleep: </Text>
                                    <View style={{backgroundColor: '#2a2d9f', borderRadius: 4, width: 20, height: 20}}></View>
                                </View>
                            </View>
                        </View>
                :
                <View></View>
            }
        </ScrollView>
    )
}
