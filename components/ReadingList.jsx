import { useState } from "react";
import "../src/styles/readingList.css"

export const ReadingList = () => {
  const [selectBooks, setSelectBooks] = useState([
    /* {
      id: 0,
      title: "El Señor de los Anillos",
      pages: 1200,
      genre: "Fantasía",
      cover:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
      synopsis:
        "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
      year: 1954,
      ISBN: "978-0618640157",
      author: {
        name: "J.R.R. Tolkien",
        otherBooks: ["El Hobbit", "El Silmarillion"],
      },
    }, */
  ]);

  return (
    <section id="readingBooksSection">
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
                <img className="booksImage" src={book.cover} alt={book.title} />
              </li>
            ))
          )}
        </ul>
        {console.log("Esto es selectBooks:",selectBooks)}
      </article>
    </section>
  );
};
