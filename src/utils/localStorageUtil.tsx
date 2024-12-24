export const setLocalStorage = (key, value, days) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    const item = {
        value: value,
        expires: expires.getTime()
    };

    localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expires) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

export const removeLocalStorage = (key) => {

    localStorage.removeItem(key);

};

