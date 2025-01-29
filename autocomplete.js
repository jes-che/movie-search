const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue}) => {
    root.innerHTML = `
        <input class="input has-text-black has-background-light is-size-2" type="text" size="30" placeholder="Search for movies...">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results has-text-black has-background-light"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

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

            option.classList.add('dropdown-item', 'has-text-black', 'has-background-light', 'is-size-4');
            option.innerHTML = renderOption(movie);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(movie);
                onOptionSelect(movie);
            })

            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('click', debounce(onInput, 2000));
            
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    })
};