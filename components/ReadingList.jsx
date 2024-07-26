import { useContext } from "react";
import "../src/styles/readingList.css";
import DataContext from "./context/DataContext";

export const ReadingList = () => {
  const {
    books,
    handleBooks,
    availableBooksCounter,
    handleSetAvailableBooksCounter,
    readingListCounter,
    handleSetReadingListCounter,
  } = useContext(DataContext);

  const handleUncheckBook = (id) => {
    if (books[id].added) {
      const newBooks = books.map((book) => {
        if (book.id === id) {
          handleSetAvailableBooksCounter(availableBooksCounter + 1);
          handleSetReadingListCounter(readingListCounter - 1);
          return {
            ...book,
            added: false,
          };
        } else {
          return {
            ...book,
          };
        }
      });
      handleBooks(newBooks);
    } else {
      return;
    }
  };

  return (
    <section id="readingBooksSection">
      <article>
        <header>
          <h2>Lista de Lectura</h2>
        </header>
        <ul id="readingBooksList">
          {books.map(
            (book) =>
              book.added && (
                <li key={book.id} className="readingListElement">
                  <img
                    className="readingBooksImage"
                    src={book.cover}
                    alt={book.title}
                    onClick={() => handleUncheckBook(book.id)}
                  />
                </li>
              )
          )}
        </ul>
      </article>
    </section>
  );
};
