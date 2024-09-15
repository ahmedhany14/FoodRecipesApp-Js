import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';

class searchResult extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _successMessage = '';
    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        console.log(result);
        return `
            <li class="preview">
                <a class="preview__link" href="#${result.id}">
                    <figure class="preview__fig">
                        <img src="${result.img_url}" alt="${result.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${result.title} Cream ...</h4>
                        <p class="preview__publisher">${result.publisher}</p>
                    </div>
                </a>
            </li>`;
    }
}

export default new searchResult();