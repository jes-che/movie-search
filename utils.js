const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => { // return (...args)?
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.call(null, ...args); // func.apply(null, args)?
        }, delay);
    };
};