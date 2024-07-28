import { useContext, useEffect } from "react";
import "../src/styles/availableBooksList.css";
import DataContext from "./context/DataContext";

export const AvailableBooksList = () => {
  //Variables que se toman del contexto
  const {
    books,
    handleBooks,
    availableBooksCounter,
    handleSetAvailableBooksCounter,
    readingListCounter,
    handleSetReadingListCounter,
    availableBooksForGenreCounter,
    handleSetAvailableBooksForGenreCounter,
    genre,
    handleSetGenre,
  } = useContext(DataContext);

  //useEffect utilizado para poder tener el contador de libros disponibles teniendo en cuenta el género
  useEffect(() => {
    let helpCounter = 0;
    //Si no hay género definido se le asigna el contador de libros disponibles
    if (!genre) {
      handleSetAvailableBooksForGenreCounter(availableBooksCounter);
    } else {
      //En caso contrario se recorre el arreglo de libros y en caso de coincidir el género actual y a la vez estar disponible, se aumenta en uno el contador.
      books.forEach((book) => {
        if (!book.added && book.genre === genre) {
          helpCounter++;
        }
      });
      //Al terminar el conteo, se le asigna a la variable que será mostrada el contador con el que se ha estado trabajando
      handleSetAvailableBooksForGenreCounter(helpCounter);
    }
    //Se tiene como dependencias del useEffect al género y al valor 'added' de cada libro
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
          //Al hacer click en un libro se disminuye el contador de libros disponibles
          handleSetAvailableBooksCounter(availableBooksCounter - 1);
          //Al hacer click en un libro se aumenta el contador de libros en la lista de lectura
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
      handleBooks(newBooks);
    }
  };

  return (
    <section id="enableBooksSection">
      <article>
        <header className="headerContainer">
          <h1 className="headerContainerItems" id="giantText">
            {availableBooksCounter} libros disponibles
          </h1>
          <p className="headerContainerItems">
            {readingListCounter} en la lista de lectura
          </p>
          <p className="headerContainerItems">
            {availableBooksForGenreCounter} libros disponibles del género
          </p>
          <div className="headerContainerItems" id="inputGenre">
            <datalist id="genre">
              <option value="Fantasía"></option>
              <option value="Ciencia ficción"></option>
              <option value="Zombies"></option>
              <option value="Terror"></option>
            </datalist>
            <label htmlFor="genre">Género: </label>
            <input
              type="text"
              name="genre"
              list="genre"
              value={genre}
              onChange={handleSetGenre}
            />
          </div>
          {/* <h2>Lista de Libros Disponibles</h2> */}
        </header>
        <ul id="enableBooksList">
          {/* Renderizado de los libros según el género seleccionado. */}
          {books.map((book) => {
            if (!genre) {
              return (
                <li key={book.id} className="availableListElement">
                  <img
                    className={
                      book.added
                        ? "availableBooksImageAdded"
                        : "availableBooksImageUnAdded"
                    }
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
                      className={
                        book.added
                          ? "availableBooksImageAdded"
                          : "availableBooksImageUnAdded"
                      }
                      src={book.cover}
                      alt={book.title}
                      onClick={() => handleBookClick(book.id)}
                    />
                  </li>
                );
              }
            }
          })}
        </ul>
      </article>
    </section>
  );
};
