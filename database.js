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
  console.log('Initializing Database...');
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, phoneNumber TEXT, subject TEXT)',
          [],
          () => {
            console.log('Table created');
            resolve();
          },
          (error) => {
            console.error('Error creating users table', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error('Transaction error', error);
        reject(error);
      },
      () => {
        console.log('Transaction successful');
      }
    );
  });
};

export const addUserToDatabase = (userData) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO users (username, phoneNumber, subject) VALUES (?, ?, ?)',
          [userData.username, userData.phoneNumber, userData.subject],
          (_, results) => {
            console.log('User added successfully', results);
            resolve(results);
          },
          (error) => {
            console.error('Error adding user to database', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error('Transaction error', error);
        reject(error);
      },
      () => {
        console.log('Transaction successful');
      }
    );
  });
};

export const fetchUserDataFromDatabase = (dispatch) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, { rows: { _array } }) => {
            dispatch(setUserData(_array));
            resolve(_array);
          },
          (error) => {
            console.error('Error fetching user data from database', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error('Transaction error', error);
        reject(error);
      },
      () => {
        console.log('Transaction successful');
      }
    );
  });
};
