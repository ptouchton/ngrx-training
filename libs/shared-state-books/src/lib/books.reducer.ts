import { createReducer, on, Action, createSelector, select } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    BooksPageActions.enterBook,
    BooksPageActions.clearSelectedBook,
    (state) => ({ ...state, activeBookId: null })
  ),
  on(BooksPageActions.selectBook, (state, { bookId }) => ({
    ...state,
    activeBookId: bookId,
  })),
  on(BooksPageActions.clearSelectedBook, (state) => ({
    ...state,
    activeBookId: null,
  })),
  on(BooksApiActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    collection: books,
  })),
  on(BooksApiActions.createBookSuccess, (state, { book }) => ({
    ...state,
    collection: createBook(state.collection, book),
  })),
  on(BooksApiActions.updateBookSuccess, (state, { book }) => ({
    ...state,
    collection: updateBook(state.collection, book),
  })),
  on(BooksApiActions.deleteBookSuccess, (state, { bookId }) => ({
    ...state,
    collection: deleteBook(state.collection, bookId),
  }))
);

export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => books.find((book) => book.id === activeBookId)
);
export const selectEarningsTotals = createSelector(selectAll, calculateBooksGrossEarnings);
