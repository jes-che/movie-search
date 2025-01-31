'use strict';

const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
    },
    onOptionSelect(movie) {
        document.querySelector('.movie-icon').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#summary'));
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
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
    }
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('.autocomplete')
});

const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '324c8bee',
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);
    console.log(response.data);
};

const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
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
