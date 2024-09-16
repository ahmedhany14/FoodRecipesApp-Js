import icons from 'url:../../img/icons.svg';

import View from './View.js';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const numberOfPages = Math.ceil(this._data.result.length / this._data.resultPerPage);
        const currentPage = this._data.page;

        // There are 4 cases for the pagination
        /*
        1) there are only one page
            so we don't need to show the pagination

        2) there are more than one page and we are on the first page
            so we need to show the next button
            and we don't need to show the previous button
        3) there are more than one page and we are on the last page
            so we need to show the previous button
            and we don't need to show the next button
        4) there are more than one page and we are on the middle page
            so we need to show the next button
            and we need to show the previous button
        */


        // Case 1
        if (numberOfPages === 1) return '';
        if (numberOfPages > 1 && currentPage === 1) {
            const nextButton = `
              <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>
          `;
            return nextButton;
        }
        if (numberOfPages > 1 && currentPage === numberOfPages) {
            const previousButton = `
              <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
              </button>
            `;
            return previousButton;
        }
        if (numberOfPages > 1 && currentPage > 1 && currentPage < numberOfPages) {
            const nextButton = `
                <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
            const previousButton = `
                    <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${this._data.page - 1}</span>
                    </button>
                    `;
            const nextPreviousButton = nextButton + previousButton;
            return nextPreviousButton;
        }
    }

    addHandlerClick(subscriber) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const page = Number(btn.dataset.goto);
            console.log(typeof page);
            subscriber(page);
        });
    }
}

export default new paginationView();