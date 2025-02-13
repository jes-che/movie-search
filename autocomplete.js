const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    root.innerHTML = `
        <input class="input has-text-black has-background-light is-size-2" type="text" size="30" placeholder="Type to search...">
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
        const items = await fetchData(event.target.value);

        if (!items.length) {
            // dropdown.classList.remove('is-active');
            dropdown.classList.add('is-active');
            resultsWrapper.classList.add('has-text-black', 'has-background-light', 'is-size-4');
            resultsWrapper.innerHTML = 'No results';
            return;
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item', 'has-text-black', 'has-background-light', 'is-size-4');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            })

            resultsWrapper.appendChild(option);
        }
    };

    input.addEventListener('input', debounce(onInput, 500));
            
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    })
};