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
        FOREIGN KEY (exName, exDate) REFERENCES Exercise (exerciseName, exerciseDate) ON UPDATE CASCADE ON DELETE CASCADE
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

    /* console.log(await db.getAllAsync(`SELECT date from UserInfo ORDER BY date;`)) */
    /* console.log(await db.getAllAsync(`SELECT * from UserInfo where date = ?`, dateForToday)) */
    /* console.log(await db.getAllAsync(`SELECT exName from UserInfo`)) */
    /* console.log(await db.getAllAsync(`SELECT * from Exercise where exerciseDate = ?`, dateForToday)) */
    /* console.log(await db.getAllAsync(`SELECT * from Exercise`)) */
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
      return (await db.getAllAsync<{journalEntry: string}> ('SELECT journalEntry FROM UserInfo WHERE date = ? AND journalEntry IS NOT NULL;', [date]))[0].journalEntry
    }
    catch (error) {  }
  }
  return ""
}



/* Adds/Updates the journal entry */
export const updateJournalEntry = async (date: string, journalEntry: string): Promise<void> => {
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



/* Gets all unique activity names that the user has entered */
export const getUniqueActivities = async (): Promise<{exerciseName: string}[]> => {
  return await db.getAllAsync<{exerciseName: string}> (`SELECT distinct exerciseName FROM Exercise`)
}

/* updated to not include date since the unit remains the same for all of the selected activity and we're already only gathering the first instance of a successful find; with the date, if you did not create the activity on the same day, the units will not display */
/* Gets the unit type of a specific activity */
export const getUnitType = async (
  exerciseName: string
): Promise<{ exerciseUnit: string } | null> => {
  try {
    return await db.getFirstAsync<{ exerciseUnit: string }>(
      `SELECT exerciseUnit FROM Exercise 
       WHERE exerciseName = ?`,
      [exerciseName]
    );
  } catch (error) {
    console.error('Error fetching unit type:', error);
    return null;
  }
};

/* Gets the amount of the requested activity type for the current day */
export const getActivityTypeAmnt = async (
  exerciseName: string,
  exerciseDate: string
): Promise<number> => {
  try {
    const result = await db.getFirstAsync<{ exerciseAmnt: number }>(
      `SELECT exerciseAmnt FROM Exercise 
       WHERE exerciseName = ? AND exerciseDate = ?`,
      [exerciseName, exerciseDate]
    );
    return result?.exerciseAmnt ?? 0;
  } catch (error) {
    console.error('Error fetching activity amount:', error);
    return 0;
  }
};

/* Adds a new custom activity to the Exercise table */
// export const addActivity = async (exerciseDate: string, exerciseName: string, exerciseUnit: string): Promise<void> => {
//   // Check if current activity name exists (and creates a new row of a default version of that activity if it does not)
//   if((await db.getAllAsync(`SELECT exerciseName from Exercise WHERE exerciseDate = ?`, exerciseDate)).length === 0) {
//     try {
//       await db.runAsync(`INSERT INTO Exercise (exerciseDate, exerciseName, exerciseAmnt, exerciseUnit) VALUES (?, ?, ?, ?);`, [exerciseDate, exerciseName, 0, exerciseUnit])
//       console.log("Added new activity of:" + exerciseName)
//     }
//     catch (error) { console.log(error) }
//   }
//   else {
//     console.log("That activity already exists")
//   }
// }

export const addActivity = async (exerciseDate: string, exerciseName: string, exerciseUnit: string): Promise<void> => {
  try {
    // Use UPSERT to handle existing entries
    await db.runAsync(
      `INSERT INTO Exercise (exerciseDate, exerciseName, exerciseAmnt, exerciseUnit)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(exerciseDate, exerciseName) 
       DO UPDATE SET exerciseUnit = excluded.exerciseUnit;`,
      [exerciseDate, exerciseName, 0, exerciseUnit]
    );
    
    // Add reference to UserInfo
    await db.runAsync(
      `INSERT OR IGNORE INTO UserInfo (date, exName, exDate)
       VALUES (?, ?, ?);`,
      [exerciseDate, exerciseName, exerciseDate]
    );
    
    console.log('Activity added:', exerciseName);
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
};

 export const updateActivity = async (exerciseDate: string, exerciseName: string, exerciseAmnt: number): Promise<void> => {
  try {
    // Determines whether or not the activity already exists for the current date (and creates a new row in the tables for that activity/date if it does not)
    if((await db.getAllAsync(`SELECT exerciseName from Exercise WHERE exerciseDate = ?`, exerciseDate)).length === 0) {
      // Adds the activity and all of its attributes to the current date in the Exercise table
      var unitName = (await getUnitType(exerciseName))
      if(unitName !== null) { // If the unit type returns a string value, it is used as parameters for the activity
        addActivity(exerciseDate, exerciseName, unitName.exerciseUnit)
      }
      else { // If the unit type does not return a string value, an empty string is used in place of the unit type
        addActivity(exerciseDate, exerciseName, "")
      }
    }
    else { // The activity for the current day already exists
      await db.runAsync(`UPDATE Exercise SET exerciseAmnt = ? WHERE exerciseDate = ? AND exerciseName = ? IS NULL;`, [exerciseAmnt, exerciseDate, exerciseName])
    }

    // Adds the activity name/date as foreign keys to a new row in the UserInfo table
    if((await db.getAllAsync(`SELECT date from UserInfo WHERE exDate = ? AND exName = ?`, [exerciseDate, exerciseName])).length === 0) {
      try { await db.runAsync(`INSERT INTO UserInfo (date, exName, exDate) VALUES (?, ?, ?);`, [exerciseDate, exerciseName, exerciseDate]) } catch (error) { console.log(error) }
    }

    // Updates activity in Exercise table to include the exerciseAmnt that the user indicated
    await db.runAsync(`UPDATE Exercise SET exerciseAmnt = ? WHERE exerciseDate = ? AND exerciseName = ?;`, [exerciseAmnt, exerciseDate, exerciseName])

    /* console.log(JSON.stringify(await db.getAllAsync(`SELECT * from UserInfo WHERE date = ?`, dateForToday))) */
    /* console.log(JSON.stringify(await db.getAllAsync(`SELECT * from Exercise WHERE exerciseDate = ? AND exerciseName = ?`, [dateForToday, exerciseName]))) */
  } catch(error) {
    console.error('Error updating activity: ', error);
    throw error;
  }
}

/* 
--> Commented out since this version did not end up storing any activity values into the database

export const updateActivity = async (exerciseDate: string, exerciseName: string, exerciseAmnt: number): Promise<void> => {
  try {
    const unit = await db.getFirstAsync<{exerciseUnit: string}>(`SELECT exerciseUnit FROM Exercise WHERE exerciseName = ?`, [exerciseName]);

    // Use null coalescing operator to handle undefined
    await db.runAsync(
      `UPDATE Exercise SET 
       exerciseAmnt = ?,
       exerciseUnit = COALESCE(?, exerciseUnit)
       WHERE exerciseDate = ? AND exerciseName = ?;`,
      [
        exerciseAmnt,
        unit?.exerciseUnit ?? null,  // Convert undefined to null // --> shouldn't ever end up being undefined, only ever "" or "[characters]" 
        exerciseDate,
        exerciseName
      ]
    );

    console.log('Activity updated:', exerciseName);
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
}; */

export default () => db;
