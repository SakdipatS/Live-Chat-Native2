// Database.js
import * as SQLite from "expo-sqlite"; // Assuming you're using Expo SQLite, adjust if necessary
import { setUserData } from "./store/action";
import { addRegister, selectUser } from "./store/Reducer";
import { useSelector } from "react-redux";

const db = SQLite.openDatabase("your_database_name.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, phoneNumber TEXT, subject TEXT);",
      [],
      (_, result) => {
        console.log("Database initialized:", result);
      },
      (_, error) => {
        console.log("Error initializing database:", error);
      }
    );
  });
};

export const insertUser = (formData) => {
  const { username, phoneNumber, subject } = formData;

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username, phoneNumber, subject) VALUES (?, ?, ?);",
        [username, phoneNumber, subject],
        (_, { rowsAffected, insertId }) => {
          console.log("User inserted successfully: ", rowsAffected);
          console.log("Inserted user data:", {
            id: insertId,
            username,
            phoneNumber,
            subject,
          });
          resolve({ id: insertId, username, phoneNumber, subject });
        },
        (_, error) => {
          console.log("SQLite.executeSql: ", error);
          reject(error);
        }
      );
    });
  });
};


export const fetchUserDataFromDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT username, phoneNumber, subject FROM users ORDER BY id DESC LIMIT 1",
        [],
        (_, { rows: { _array } }) => {
          if (_array.length > 0) {
            resolve({
              username: _array[0].username,
              phoneNumber: _array[0].phoneNumber,
              subject: _array[0].subject,
            });
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};


export const clearAllData = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM users",
      [],
      (_, { rowsAffected }) => {
        console.log(`Cleared ${rowsAffected} rows from the users table.`);
      },
      (_, error) => {
        console.error("Error clearing data from the users table:", error);
      }
    );
  });
};
