import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromBooks from './books.reducer';

export const FEATURE_KEY = 'shared-books';

/**
 * State Shape
 **/
export interface State {
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateBooksModule {}

/**
 * Feature Selector
 **/
export const selectSharedBooksState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Books Selectors
 */
export const selectBooksState = createSelector(
  selectSharedBooksState,
  (shareBooksFeatureState) => shareBooksFeatureState.books
);

export const selectAllBooks = createSelector(selectBooksState, fromBooks.selectAll);
export const selectActiveBook = createSelector(selectBooksState, fromBooks.selectActiveBook);
export const selectActiveBookId = createSelector(selectBooksState, fromBooks.selectActiveBookId);
export const selectBooksEarningsTotal = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);
