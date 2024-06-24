import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from '@book-co/shared-models';

// Create Book Action
export const createBook = createAction(
  '[Books Page] Create Book',
  props<{ book: BookRequiredProps }>()
);

// Update Book Action
export const updateBook = createAction(
  '[Books Page] Update Book',
  props<{ id: string; changes: Partial<BookRequiredProps> }>()
);

// Enter Book Action
export const enterBook = createAction('[Books Page] Enter');

// Select Book Action
export const selectBook = createAction(
  '[Books Page] Select Book',
  props<{ bookId: string }>()
);

// Cancel Book Action
export const clearSelectedBook = createAction(
  '[Books Page] Clear Selected Book'
);

export const deleteBook = createAction(
  '[Books Page] Delete Book',
  props<{ bookId: string }>()
);
