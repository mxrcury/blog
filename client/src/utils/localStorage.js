export const getFromStorage = (key) => {
    if(!window || !window.localStorage){
        return {message:`Something went wrong, no local storage was found.`}
    }
    const dataFromStorage = localStorage.getItem(key)

    return JSON.parse(dataFromStorage)
}

export const saveToStorage = (key,data) => {
    if(!window || !window.localStorage){
        return {message:`Something went wrong, no local storage was found.`}
    }
    localStorage.setItem(key,JSON.stringify(data))
    return;
}

export const removeFromStorage = (key) => {
    if(!window || !window.localStorage){
        return {message:`Something went wrong, no local storage was found.`}
    }
    localStorage.removeItem(key)
    return;
} 