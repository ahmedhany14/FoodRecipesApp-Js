import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View.js';

class addRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHandlerUpload();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        console.log(this._btnOpen);
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }


    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerUpload(subscriber = () => { }) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            subscriber(data);
        });
    }
    _generateMarkup() {
        const markup =
            `

            `;

        return this._data.map(this._generateMarkupPreview).join('');
    }

}

export default new addRecipeView();

