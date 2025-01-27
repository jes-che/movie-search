'use strict';

const fetchData = async searchTerm => {
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

const onInput = async event => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.classList.add('dropdown-item', 'has-text-black', 'has-background-light', 'is-size-4');
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })

        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('click', debounce(onInput, 3000));
        
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
})

const onMovieSelect = async movie => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '324c8bee',
            i: movie.imdbID
        }
    });
    document.querySelector('.movie-icon').classList.add('hidden');
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
    console.log(response.data);
};

const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image mr-5">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content is-size-3">
                <div class="content">
                    <h1>${movieDetail.Title} (${movieDetail.Year})</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <h5>⭐️ ${movieDetail.Metascore} / 100</h5>
                    <p>${movieDetail.Plot}</p>
                    <p><span class="has-text-weight-bold has-text-grey-lighter">Director:</span> ${movieDetail.Director}</p>
                    <p><span class="has-text-weight-bold has-text-grey-lighter">Writer:</span> ${movieDetail.Writer}</p>
                    <p><span class="has-text-weight-bold has-text-grey-lighter">Cast:</span> ${movieDetail.Actors}</p>
                </div>
            </div>
        </article>
    `;
};
