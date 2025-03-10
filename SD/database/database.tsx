import * as SQLite from 'expo-sqlite';

let db : SQLite.SQLiteDatabase

var dateForToday = new Date().toISOString().split("T")[0]

export const setupDatabase = async () => {
    db = await SQLite.openDatabaseAsync('mental_health.db');

    await db.execAsync('PRAGMA foreign_keys = ON')
    
    // User Info Table
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS UserInfo (
        date TEXT PRIMARY KEY NOT NULL,
        sleepTotal NUMBER,
        breakfastMeal TEXT,
        lunchMeal TEXT,
        dinnerMeal TEXT,
        snackMeal TEXT,
        waterTotal NUMBER,
        exName TEXT,
        exDate TEXT,
        morningMood INTEGER,
        middayMood INTEGER,
        nighttimeMood INTEGER,
        journalEntry TEXT,
        FOREIGN KEY (exName, exDate) REFERENCES Exercise (exerciseDate, exerciseName)
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

    // Determines whether or not the database contains the current date that the user is viewing the app (and adds it to the database if so)
    if((await db.getAllAsync(`SELECT date from UserInfo WHERE date = ?`, dateForToday)).length === 0) { addDate(dateForToday) }

    console.log('Database setup complete');
};



/* Returns all journal entries between two dates */
export const filterByDate = async (startDate: string, endDate: string, keyword: string): Promise<{date: string, journalEntry: string}[]> => {
  return await db.getAllAsync<{date: string, journalEntry: string}> (`SELECT date, journalEntry FROM UserInfo WHERE Date(date) BETWEEN ? AND ? AND journalEntry IS NOT NULL AND  journalEntry LIKE ? ORDER BY date;`, [startDate, endDate, `%${keyword}%`])
}



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

/* Gets the entry for the current date */
export const getEntry = async (date: string): Promise<string> => {
  const count = await db.getAllAsync<{count: number}> ('SELECT COUNT(journalEntry) FROM UserInfo WHERE date = ?;', [date])

  if(count[0] !== undefined) {
    try {
      return (await db.getAllAsync<{journalEntry: string}> ('SELECT journalEntry FROM UserInfo WHERE date = ?;', [date]))[0].journalEntry
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
  try { await db.runAsync(`UPDATE UserInfo SET journalEntry = ? WHERE date = ?;`, [journalEntry, date]) } 
  catch (error) { console.log(error) }
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, date)))
}



/* Adds/Updates the breakfast meal  */
export const updateBreakfast = async (breakfastValue: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET breakfastMeal = ? WHERE date = ?;`, [breakfastValue, date])
  console.log("Breakfasts in Database (from function): "+ (await db.getAllAsync(`SELECT breakfastMeal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}

/* Adds/Updates the lunch meal  */
export const updateLunch = async (lunchValue: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET lunchMeal = ? WHERE date = ?;`, [lunchValue, date])
  console.log("Lunch in Database (from function): "+ (await db.getAllAsync(`SELECT lunchMeal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}

/* Adds/Updates the dinner meal  */
export const updateDinner = async (dinnerValue: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET dinnerMeal = ? WHERE date = ?;`, [dinnerValue, date])
  console.log("Dinner in Database (from function): "+ (await db.getAllAsync(`SELECT dinnerMeal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}

/* Adds/Updates the snack meal  */
export const updateSnacks = async (snackValue: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET snackMeal = ? WHERE date = ?;`, [snackValue, date])
  console.log("Snack in Database (from function): "+ (await db.getAllAsync(`SELECT snackMeal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}

/* Adds/Updates the water total  */
export const updateWater = async (waterVal: string, date: string): Promise<void> => {
  await db.runAsync(`UPDATE UserInfo SET waterTotal = ? WHERE date = ?;`, [waterVal, date])
  console.log("Water in Database (from function): "+ (await db.getAllAsync(`SELECT waterTotal from UserInfo`)).length)
  console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday)))
}



/* Gets the breakfast value from a given date */
export const getBreakfast = async (date: string): Promise<{breakfastMeal: string}[]> => {
  return await db.getAllAsync<{breakfastMeal: string}> ('SELECT breakfastMeal FROM UserInfo WHERE date = ?;', [date])
}

/* Gets the lunch value from a given date */
export const getLunch = async (date: string): Promise<{lunchMeal: string}[]> => {
  return await db.getAllAsync<{lunchMeal: string}> ('SELECT lunchMeal FROM UserInfo WHERE date = ?;', [date])
}

/* Gets the dinner value from a given date */
export const getDinner = async (date: string): Promise<{dinnerMeal: string}[]> => {
  return await db.getAllAsync<{dinnerMeal: string}> ('SELECT dinnerMeal FROM UserInfo WHERE date = ?;', [date])
}

/* Gets the snack value from a given date */
export const getSnacks = async (date: string): Promise<{snackMeal: string}[]> => {
  return await db.getAllAsync<{snackMeal: string}> ('SELECT snackMeal FROM UserInfo WHERE date = ?;', [date])
}

/* Gets the water total from a given date */
export const getWater = async (date: string): Promise<{waterTotal: number}[]> => {
  return await db.getAllAsync<{waterTotal: number}> ('SELECT waterTotal FROM UserInfo WHERE date = ?;', [date])
}


export default () => db;
