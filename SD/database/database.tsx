import * as SQLite from 'expo-sqlite';

let db : SQLite.SQLiteDatabase

var dateForToday = new Date().toISOString().split("T")[0]

export const setupDatabase = async () => {
    db = await SQLite.openDatabaseAsync('mental_health.db');

    await db.execAsync('PRAGMA foreign_keys = ON')
    
    // User Info Table
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS UserInfo (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        sleepTotal NUMBER,
        breakfastMeal INTEGER,
        lunchMeal INTEGER,
        dinnerMeal INTEGER,
        snackMeal INTEGER,
        waterTotal NUMBER,
        exName TEXT,
        exDate TEXT,
        morningMood INTEGER,
        middayMood INTEGER,
        nighttimeMood INTEGER,
        journalEntry TEXT,
        FOREIGN KEY (exName, exDate) REFERENCES Exercise (exerciseDate, exerciseName) ON UPDATE CASCADE ON DELETE CASCADE
      );`
    )
    
    // Exercise Table (max of one exercise insert per day and the info in them, like the amount, have to be modified)
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS Exercise (
        exerciseDate TEXT NOT NULL,
        exerciseName TEXT NOT NULL,
        exerciseAmnt NUMBER NOT NULL,
        exerciseUnit TEXT NOT NULL,
        PRIMARY KEY (exerciseDate, exerciseName)
      );`
    )

    /* try {await db.execAsync(`DROP TABLE UserInfo;`)} catch (error) {console.log(error)} */

    // Determines whether or not the database contains the current date that the user is viewing the app (and adds it to the database if so)
    if((await db.getAllAsync(`SELECT date from UserInfo WHERE date = ?`, dateForToday)).length === 0) { addDate(dateForToday) }

    console.log('Database setup complete');
    /* console.log(await db.getAllAsync(`SELECT date from UserInfo`)) */
    console.log(await db.getAllAsync(`SELECT * from UserInfo where date = ?`, dateForToday))
};



/* Adds a given date to the database if it doesn't already exist in the table */
export const addDate = async (date: string): Promise<void> => {
  if((await db.getAllAsync(`SELECT date from UserInfo WHERE date = ?`, date)).length === 0) {
    try {
      await db.runAsync(`INSERT INTO UserInfo (date) VALUES (?);`, [date])
      console.log("Added new date for " + date)
    }
    catch (error) { console.log(error) }
  }
  else { console.log("Date already exists in the database (no new date added)") }
}



/* Returns all journal entries between two dates */
export const filterByDate = async (startDate: string, endDate: string, keyword: string): Promise<{date: string, journalEntry: string}[]> => {
  return await db.getAllAsync<{date: string, journalEntry: string}> (`SELECT date, journalEntry FROM UserInfo WHERE Date(date) BETWEEN ? AND ? AND journalEntry IS NOT NULL AND journalEntry LIKE ? ORDER BY date;`, [startDate, endDate, `%${keyword}%`])
}



/* Gets the entry for the current date */
export const getEntry = async (date: string): Promise<string> => {
  const count = await db.getAllAsync<{count: number}> ('SELECT COUNT(journalEntry) FROM UserInfo WHERE date = ? AND journalEntry IS NOT NULL;', [date])

  if(count[0] !== undefined) {
    try {
      console.log(await db.getAllAsync<{journalEntry: string}> ('SELECT journalEntry FROM UserInfo WHERE date = ? AND journalEntry IS NOT NULL;', [date]))
      return (await db.getAllAsync<{journalEntry: string}> ('SELECT journalEntry FROM UserInfo WHERE date = ? AND journalEntry IS NOT NULL;', [date]))[0].journalEntry
    }
    catch (error) {  }
  }
  return ""
}



/* Adds/Updates the journal entry */
export const updateJournalEntry = async (date: string, journalEntry: string): Promise<void> => {
  console.log("DB JE DATE: " + date)
  console.log("DB JE JE: " + journalEntry)
  await addDate(date)
  try { await db.runAsync(`UPDATE UserInfo SET journalEntry = ? WHERE date = ? AND exDate IS NULL;`, [journalEntry, date]) } 
  catch (error) { console.log(error) }
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, date)))
}



/* Adds/Updates a meal for a given date */
export const updateFood = async (textValue: string, date: string, mealType: string): Promise<void> => {
  /* Adds/Updates the breakfast meal  */
  if(mealType == "Breakfast") {
    await db.runAsync(`UPDATE UserInfo SET breakfastMeal = ? WHERE date = ? AND exDate IS NULL;`, [textValue, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
  /* Adds/Updates the lunch meal  */
  else if(mealType == "Lunch") {
    await db.runAsync(`UPDATE UserInfo SET lunchMeal = ? WHERE date = ? AND exDate IS NULL;`, [textValue, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
  /* Adds/Updates the dinner meal  */
  else if(mealType == "Dinner") {
    await db.runAsync(`UPDATE UserInfo SET dinnerMeal = ? WHERE date = ? AND exDate IS NULL;`, [textValue, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
  /* Adds/Updates the snack meal  */
  else {
    await db.runAsync(`UPDATE UserInfo SET snackMeal = ? WHERE date = ? AND exDate IS NULL;`, [textValue, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
}

/* Adds/Updates the water total  */
export const updateWater = async (waterVal: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET waterTotal = ? WHERE date = ? AND exDate IS NULL;`, [waterVal, date])
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}

/* Adds/Updates a given mood */
export const updateMood = async (moodVal: string, date: string, moodTimeOfDay: string): Promise<void> => {
  if(moodTimeOfDay == "Morning Mood") {
    await db.runAsync(`UPDATE UserInfo SET morningMood = ? WHERE date = ? AND exDate IS NULL`, [moodVal, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
  else if(moodTimeOfDay == "Midday Mood") {
    await db.runAsync(`UPDATE UserInfo SET middayMood = ? WHERE date = ? AND exDate IS NULL`, [moodVal, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
  else {
    await db.runAsync(`UPDATE UserInfo SET nighttimeMood = ? WHERE date = ? AND exDate IS NULL`, [moodVal, date])
    console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
  }
}

/* Adds/Updates the sleep total */
export const updateSleepTotal = async (sleepVal: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET sleepTotal = ? WHERE date = ? AND exDate IS NULL;`, [sleepVal, date])
  console.log("Sleep in Database (from function): "+ (await db.getAllAsync(`SELECT sleepTotal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}



/* Gets the breakfast value from a given date */
export const getBreakfast = async (date: string): Promise<{breakfastMeal: string}[]> => {
  return await db.getAllAsync<{breakfastMeal: string}> ('SELECT breakfastMeal FROM UserInfo WHERE date = ? AND exDate IS NULL;', [date])
}

/* Gets the lunch value from a given date */
export const getLunch = async (date: string): Promise<{lunchMeal: string}[]> => {
  return await db.getAllAsync<{lunchMeal: string}> ('SELECT lunchMeal FROM UserInfo WHERE date = ? AND exDate IS NULL;', [date])
}

/* Gets the dinner value from a given date */
export const getDinner = async (date: string): Promise<{dinnerMeal: string}[]> => {
  return await db.getAllAsync<{dinnerMeal: string}> ('SELECT dinnerMeal FROM UserInfo WHERE date = ? AND exDate IS NULL;', [date])
}

/* Gets the snack value from a given date */
export const getSnacks = async (date: string): Promise<{snackMeal: string}[]> => {
  return await db.getAllAsync<{snackMeal: string}> ('SELECT snackMeal FROM UserInfo WHERE date = ? AND exDate IS NULL;', [date])
}

/* Gets the water total from a given date */
export const getWater = async (date: string): Promise<{waterTotal: number}[]> => {
  return await db.getAllAsync<{waterTotal: number}> ('SELECT waterTotal FROM UserInfo WHERE date = ? AND exDate IS NULL;', [date])
}

/* Gets the morning mood rating for a given date */
export const getMorningMood = async (date: string): Promise<{morningMood: number}[]> => {
  return await db.getAllAsync<{morningMood: number}> (`SELECT morningMood FROM UserInfo WHERE date = ? AND exDate IS NULL`, [date])
}

/* Gets the midday mood rating for a given date */
export const getMiddayMood = async (date: string): Promise<{middayMood: number}[]> => {
  return await db.getAllAsync<{middayMood: number}> (`SELECT middayMood FROM UserInfo WHERE date = ? AND exDate IS NULL`, [date])
}

/* Gets the nighttime mood rating for a given date */
export const getNighttimeMood = async (date: string): Promise<{nighttimeMood: number}[]> => {
  return await db.getAllAsync<{nighttimeMood: number}> (`SELECT nighttimeMood FROM UserInfo WHERE date = ? AND exDate IS NULL`, [date])
}

/* Gets the sleep total for a given date */
export const getSleepTotal = async (date: string): Promise<{sleepTotal: number}[]> => {
  return await db.getAllAsync<{sleepTotal: number}> (`SELECT sleepTotal FROM UserInfo WHERE date = ? AND exDate IS NULL`, [date])
}


export default () => db;
