'use strict';

const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '324c8bee',
            s: searchTerm
        }
    });

    console.log(response.data);
};

const input = document.querySelector('input');

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

const onInput = event => {
    fetchData(event.target.value);
};

input.addEventListener('click', debounce(onInput, 1000));
        
fetchData();
