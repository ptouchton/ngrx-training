import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';
import {
  BookModel,
  BookRequiredProps,
  calculateBooksGrossEarnings,
} from '@book-co/shared-models';
import {
  selectActiveBook,
  selectAllBooks,
  selectBooksEarningsTotal,
} from '@book-co/shared-state-books';
import { BooksService } from '@book-co/shared-services';

@Component({
  selector: 'bco-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {
  books$!: Observable<BookModel[]>;
  currentBook$!: Observable<BookModel | null | undefined>;
  total$ = new Observable<number>();

  constructor(private booksService: BooksService, private store: Store) {
    this.books$ = this.store.select(selectAllBooks);
    this.currentBook$ = this.store.select(selectActiveBook);
    this.total$ = this.store.select(selectBooksEarningsTotal);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enterBook());
    this.removeSelectedBook();
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ('id' in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
    this.removeSelectedBook();
  }

  updateBook(book: BookModel) {
    this.store.dispatch(
      BooksPageActions.updateBook({ id: book.id, changes: book })
    );
    this.removeSelectedBook();
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
    this.removeSelectedBook();
  }
}
