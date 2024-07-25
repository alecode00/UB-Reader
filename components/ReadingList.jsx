import { useContext } from "react";
import "../src/styles/readingList.css"
import DataContext from "./context/DataContext";

export const ReadingList = () => {
  const {selectBooks} = useContext(DataContext)
  

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
