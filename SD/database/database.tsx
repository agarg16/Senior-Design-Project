import * as SQLite from 'expo-sqlite';

let db : SQLite.SQLiteDatabase 

export const setupDatabase = async () => {
    db = await SQLite.openDatabaseAsync('mental_health.db');

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS journal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        entry TEXT NOT NULL
      );`
    );
    
    
    // Mood Table
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS mood (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        mood INTEGER NOT NULL
      );`
    );

    // Activity Table
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        activity TEXT NOT NULL
      );`
    );

    console.log('Database setup complete');
};

// Insert journal entry
export const insertJournalEntry = async (date: string, entry: string): Promise<void> => {
    await db.runAsync('INSERT INTO journal (date, entry) VALUES (?, ?);', [date, entry]);
};

// Fetch all journal entries
export const getJournalEntries = async (): Promise<{ id: number; date: string; entry: string }[]> => {
    return await db.getAllAsync<{ id: number; date: string; entry: string }>('SELECT * FROM journal ORDER BY date DESC;');
};


export const setJournalEntry = async (date: string, entry: string): Promise<void> => {
    const existingEntry = await db.getAllAsync<{ id: number }>('SELECT id FROM journal WHERE date = ?;', [date]);

    if (existingEntry) {
        // Update existing entry
        await db.runAsync('UPDATE journal SET entry = ? WHERE date = ?;', [entry, date]);
    } else {
        // Insert new entry
        await insertJournalEntry(date, entry);
    }
};

// Insert mood
export const insertMood = async (date: string, mood: number): Promise<void> => {
    if (mood < 1 || mood > 7) throw new Error('Mood must be between 1 and 7');
    await db.runAsync('INSERT INTO mood (date, mood) VALUES (?, ?);', [date, mood]);
};

export default () => db;
