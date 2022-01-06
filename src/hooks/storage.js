


export function setStorage(key, item) {
    return localStorage.setItem(key, JSON.stringify(item))
}

export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

