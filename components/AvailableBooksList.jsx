import library from "../public/library.json";
import { useContext, useEffect, useState } from "react";
import "../src/styles/availableBooksList.css";
import DataContext from "./context/DataContext";

export const AvailableBooksList = () => {
  const {
    books,
    handleBooks,
    availableBooksCounter,
    handleSetAvailableBooksCounter,
    readingListCounter,
    handleSetReadingListCounter,
    availableBooksForGenreCounter,
    handleSetAvailableBooksForGenreCounter,
  } = useContext(DataContext);

  //Género seleccionado por el usuario para filtrar
  const [genre, setGenre] = useState("");
  //Función manejadora para setear el género
  const handleSetGenre = (e) => {
    setGenre(e.target.value);
  };

  /* //Añadir el campo added a los objetos que vienen del archivo .json
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
      handleBooks(newBooks);
    };
    completeBooks();
  }, []); */

  useEffect(() => {
    console.log("Entre al useEffect del problema");
    let helpCounter = 0;
    console.log("Este es el genre", genre);
    if (!genre) {
      handleSetAvailableBooksForGenreCounter(availableBooksCounter);
      console.log("Entre al if de si esta vacio el genre");
    } else {
      console.log("Entre al else que me dice q si hay genre");
      books.forEach((book) => {
        if (!book.added && book.genre === genre) {
          console.log("book: added = ", book.added);
          console.log("genre = ", genre, "book.genre = ", book.genre);

          console.log("Este libro no esta a;adido y el genre coincide");
          helpCounter++;
          console.log("Valor de counter", helpCounter);
        }
      });
      handleSetAvailableBooksForGenreCounter(helpCounter);
    }
  }, [
    books.map((book) => {
      return book.added;
    }),
    genre,
  ]);

  //Al hacer click en uno de los libros se le coloca en true la clave added a ese libro
  const handleBookClick = (id) => {
    if (books[id].added) {
      return;
    } else {
      const newBooks = books.map((book) => {
        if (book.id === id) {
          handleSetAvailableBooksCounter(availableBooksCounter - 1);
          handleSetReadingListCounter(readingListCounter + 1);
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
      console.log(
        "Este es el newBooks del handleBookClick de la availableList:",
        newBooks
      );
      handleBooks(newBooks);
    }
  };

  return (
    <section id="enableBooksSection">
      <article>
        <header>
          <h2>Lista de Libros Disponibles</h2>
          <p>{availableBooksCounter} libros disponibles</p>
          <p>{readingListCounter} libros en la lista de lectura</p>
          <p>
            {availableBooksForGenreCounter} libros disponibles con el género
            seleccionado
          </p>
          <div>
            <datalist id="genre">
              <option value="Fantasía"></option>
              <option value="Ciencia ficción"></option>
              <option value="Zombies"></option>
              <option value="Terror"></option>
            </datalist>
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              name="genre"
              list="genre"
              onChange={handleSetGenre}
            />
          </div>
        </header>
        <ul id="enableBooksList">
          {books.map((book) => {
            if (!genre) {
              return (
                <li key={book.id} className="availableListElement">
                  <img
                    className="availableBooksImage"
                    src={book.cover}
                    alt={book.title}
                    onClick={() => handleBookClick(book.id)}
                  />
                </li>
              );
            } else {
              if (genre === book.genre) {
                return (
                  <li key={book.id} className="availableListElement">
                    <img
                      className="availableBooksImage"
                      src={book.cover}
                      alt={book.title}
                      onClick={() => handleBookClick(book.id)}
                    />
                  </li>
                );
              } else {
                console.log("Libro no mostrado");
              }
            }
          })}
        </ul>
        {console.log("Esto es books:", books)}
        {console.log("Esto es genre:", genre)}
      </article>
    </section>
  );
};
