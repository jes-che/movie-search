'use strict';

const fetchData = async (searchTerm) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '324c8bee',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <input class="input has-text-black has-background-light is-size-2" type="text" size="30" placeholder="Search for movies...">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results has-text-black has-background-light"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');

        option.classList.add('dropdown-item', 'has-text-black', 'has-background-light', 'is-size-3');
        option.innerHTML = `
            <img src="${movie.Poster}" />
            ${movie.Title} (${movie.Year})
        `;

        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('click', debounce(onInput, 2000));
        
fetchData();
