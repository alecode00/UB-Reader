import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  DataProvider.propTypes = {
    children: PropTypes.element,
  };
  //Contexto de los libros disponibles
  const [books, setBooks] = useState([]);
  const handleBooks = (newBooks) => {
    setBooks(newBooks);
  };

  //Contexto de los libros para lectura
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
  const handleSelectBooks = (newSelectBooks) => {
    setSelectBooks(newSelectBooks);
  };

  //Contexto para el contador de libros disponibles
  const [availableBooksCounter, setAvailableBooksCounter] = useState(13);
  //Función manejadora del setAvailableBooksCounter
  const handleSetAvailableBooksCounter = (newAvailableBooksCounter) => {
    setAvailableBooksCounter(newAvailableBooksCounter);
  };

  //Contexto para el contador de libros en la lista de lectura
  const [readingListCounter, setReadingListCounter] = useState(0);
  //Función manejadora del setReadingListCounter
  const handleSetReadingListCounter = (newReadingListCounter) => {
    setReadingListCounter(newReadingListCounter);
  };

  //Contexto para el contador de libros disponibles
  const [availableBooksForGenreCounter, setAvailableBooksForGenreCounter] =
    useState(0);
  //Función manejadora del setAvailableBooksCounter
  const handleSetAvailableBooksForGenreCounter = (
    newAvailableBooksForGenreCounter
  ) => {
    setAvailableBooksForGenreCounter(newAvailableBooksForGenreCounter);
  };

  const data = {
    books,
    handleBooks,
    selectBooks,
    handleSelectBooks,
    availableBooksCounter,
    handleSetAvailableBooksCounter,
    readingListCounter,
    handleSetReadingListCounter,
    availableBooksForGenreCounter,
    handleSetAvailableBooksForGenreCounter,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContext;
