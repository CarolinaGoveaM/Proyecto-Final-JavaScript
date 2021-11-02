// FUNCION PARA LOCAL STORAGE

const saveToLocalStorage = (key, { itemTitle, itemPrice, itemImage, itemAmount }) => {
    let items = { itemTitle, itemPrice, itemImage, itemAmount };
    let dataToSaveInLocal = getLocalStorage(key);
    dataToSaveInLocal.push(items);
    localStorage.setItem(key, JSON.stringify(dataToSaveInLocal));
}

const getLocalStorage = (key) => {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : [];
}