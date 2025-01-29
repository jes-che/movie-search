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

createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
    },
    onOptionSelect(movie) {
        onMovieSelect(movie);
    },
    inputValue(movie) {
        return movie.Title;
    }
});

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
