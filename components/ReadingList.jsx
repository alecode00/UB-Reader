import { useContext } from "react";
import "../src/styles/readingList.css";
import DataContext from "./context/DataContext";

export const ReadingList = () => {
  const { books, handleBooks } = useContext(DataContext);

  const handleUncheckBook = (id) => {
    if (books[id].added) {
      const newBooks = books.map((book) => {
        if (book.id === id) {
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
      console.log(
        "Este es el newBooks del handleUncheckBook de la availableList:",
        newBooks
      );
      handleBooks(newBooks);
    } else {
      return;
    }
  };

  return (
    <>
      {/* <section id="readingBooksSection">
        <article>
          <header>
            <h2>Lista de Lectura</h2>
          </header>
          <ul id="readingBooksList">
            {selectBooks.length === 0 ? (
              <h3>No se ha seleccionado ningún libro aún</h3>
            ) : (
              selectBooks.map((book) => (
                <li key={book.id}>
                  <img
                    className="booksImage"
                    src={book.cover}
                    alt={book.title}
                  />
                </li>
              ))
            )}
          </ul>
          {console.log("Esto es selectBooks:", selectBooks)}
        </article>
      </section> */}

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
    </>
  );
};
