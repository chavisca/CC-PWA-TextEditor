import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const addTextDb = await openDB('jate', 1);
  const jateTX = addTextDb.transaction('jate', 'readwrite');
  const store = jateTX.objectStore('jate');
  const request = store.add({ id: id, text: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id, content) => {
  console.log('GET all from the database');
  const allTextDb = await openDB('jate', 1);
  const jateTX = allTextDb.transaction('jate', 'readonly');
  const store = jateTX.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};
initdb();
