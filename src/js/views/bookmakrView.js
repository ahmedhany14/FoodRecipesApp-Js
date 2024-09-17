import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';
import { Bookmark } from '../model.js';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark!';
    _successMessage = '';
    _generateMarkup() {
        const Bookmark = [];
        this._data.Bookmarks.forEach(bookmark => {
            Bookmark.push(bookmark);
        });
        console.log(Bookmark);
        console.log(this._data);
        const result = Bookmark.map((i, id) => {
            return this._generateMarkupPreview();
        });
        return result.join('');
    }

    _generateMarkupPreview() {
        return `
            <li class="preview">
                <a class="preview__link" href="#${this._data.recipe.id}">
                    <figure class="preview__fig">
                        <img src="${this._data.recipe.img_url}" alt="${this._data.recipe.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${this._data.recipe.title} Cream ...</h4>
                        <p class="preview__publisher">${this._data.recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    }
}

export default new BookmarkView();