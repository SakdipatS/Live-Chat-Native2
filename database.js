// SQLite Database Setup (Database.js)
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'mydatabase.db', location: 'default' },
  () => {},
  (error) => {
    console.error('Error opening database', error);
  }
);

export const initDatabase = () => {
  console.log("Initializing Database...");
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, phoneNumber TEXT, subject TEXT)',
      [],
      () => {},
      (error) => {
        console.error('Error creating users table', error);
      }
    );
  });
};

export const addUserToDatabase = (userData) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO users (username, phoneNumber, subject) VALUES (?, ?, ?)',
      [userData.username, userData.phoneNumber, userData.subject],
      () => {},
      (error) => {
        console.error('Error adding user to database', error);
      }
    );
  });
};

export const fetchUserDataFromDatabase = (dispatch) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM users',
      [],
      (_, { rows: { _array } }) => {
        dispatch(setUserData(_array));
      },
      (error) => {
        console.error('Error fetching user data from database', error);
      }
    );
  });
};
