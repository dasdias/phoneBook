'use strict';

const getStorage = (key) => {
  const dataStorage = JSON.parse(localStorage.getItem(key)) ?
      JSON.parse(localStorage.getItem(key)) : [];
  return dataStorage;
};

const setStorage = (key, obj) => {
  let storageData = [];
  if (getStorage(key).length !== 0) {
    storageData = [...getStorage(key), obj];
    localStorage.setItem(key, JSON.stringify(storageData));
  } else {
    storageData.push(obj);
    localStorage.setItem(key, JSON.stringify(storageData));
  }
};

const removeStorage = (phoneNum) => {
  const store = getStorage('userData');
  if (store.length !== 0) {
    const newMass = store.filter((item) => item.phone !== phoneNum);
    localStorage.removeItem('userData');
    localStorage.setItem('userData', JSON.stringify(newMass));
  }
  return;
};

module.exports = {
  getStorage,
  setStorage,
  removeStorage,
};
