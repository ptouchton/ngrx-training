import { createAction, props } from '@ngrx/store';
import { BookModel } from '@book-co/shared-models';

export const loadBooksSuccess = createAction(
    '[Books API] Load Books Success',
    props<{ books: BookModel[] }>()
);

export const loadBooksFailure = createAction(
    '[Books API] Load Books Failure',
    props<{ error: string }>()
);

export const updateBookSuccess = createAction(
    '[Books API] Update Book Success',
    props<{ book: BookModel }>()
);

export const updateBookFailure = createAction(
    '[Books API] Update Book Failure',
    props<{ error: string }>()
);

export const createBookSuccess = createAction(
    '[Books API] Create Book Success',
    props<{ book: BookModel }>()
);

export const createBookFailure = createAction(
    '[Books API] Create Book Failure',
    props<{ error: string }>()
);

export const deleteBookSuccess = createAction(
    '[Books API] Delete Book Success',
    props<{ bookId: string }>()
);

export const deleteBookFailure = createAction(
    '[Books API] Delete Book Failure',
    props<{ error: string }>()
);



