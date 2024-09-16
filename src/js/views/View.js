import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';


export default class View {
    _data;
    render(data) {
        // Check if the data is empty
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;

        // Generate the recipe markup
        const markup = this._generateMarkup();

        // Clear the recipe container and insert the recipe markup
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderSpinner() {
        const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(subscriber) {
        ['hashchange', 'load'].forEach(event =>
            window.addEventListener(event, subscriber)
        );
    }

    addHandlerUpdateServings(subscriber) {

        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn) return;

            const updateTo = +btn.dataset.updateTo;
            subscriber(Math.max(2, updateTo));
        });
    }

    rendersuccessMessage(message = this._successMessage) {
        const markup = `
        <div class="message">
        <div>
            <svg>
            <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }
    _clear() {
        this._parentElement.innerHTML = '';
    }
}