import library from "../public/library.json";
import { useEffect, useState } from "react";
import "../src/styles/availableBooksList.css";

export const AvailableBooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const completeBooks = () => {
      console.log("Este es el library del useEffect:", library);
      const newBooks = library.map((book) => {
        return {
          ...book,
          added: false,
        };
      });
      console.log("Este es el newBooks del useEffect:", newBooks);
      setBooks(newBooks);
    };
    completeBooks();
  }, []);

  const handleBookClick = (id) => {
    if (books[id].added) {
      return;
    } else {
      const newBooks = selectBooks.map((book) => {//Me quede aqui meditando si hacer contexto---------------------------------------------
        if (book.id === id) {
          return {
            ...book,
            added: true,
          };
        } else {
          return {
            ...book,
          };
        }
      });
      console.log("Este es el newBooks del useEffect:", newBooks);
      setSelectBooks(newBooks);
    }
  };

  return (
    <section id="enableBooksSection">
      <article>
        <header>
          <h2>Lista de Libros Disponibles</h2>
        </header>
        <ul id="enableBooksList">
          {books.map((book, item) => (
            <li key={book.id}>
              <img
                className="booksImage"
                src={book.cover}
                alt={book.title}
                onClick={() => handleBookClick(item)}
              />
            </li>
          ))}
        </ul>
        {console.log("Esto es books:", books)}
      </article>
    </section>
  );
};
