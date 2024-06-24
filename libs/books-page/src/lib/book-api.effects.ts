import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, concatMap, exhaustMap, } from 'rxjs/operators';
import { BooksService } from '@book-co/shared-services';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

@Injectable()
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.enterBook),
      exhaustMap(() =>
        this.booksService.all().pipe(
          map((books) => BooksApiActions.loadBooksSuccess({ books }))
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap((action) =>
        this.booksService.update(action.id, action.changes).pipe(
          map((updatedBook) => BooksApiActions.updateBookSuccess({ book: updatedBook }))
        )
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap(({ book }) =>
        this.booksService.create(book).pipe(
          map((createdBook) => BooksApiActions.createBookSuccess({ book: createdBook }))
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap(({bookId}) =>
        this.booksService.delete(bookId).pipe(
          map(() => BooksApiActions.deleteBookSuccess({ bookId }))
        )
      )
    )
  );
}
