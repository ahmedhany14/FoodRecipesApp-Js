import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import { Bookmark } from '../model.js';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark!';
    _successMessage = '';
    _generateMarkup() {

        console.log(this._data);

        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(recipe) {
        return `
            <li class="preview">
                <a class="preview__link" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src="${recipe.img_url}" alt="${recipe.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title} Cream ...</h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    }
}

export default new BookmarkView();