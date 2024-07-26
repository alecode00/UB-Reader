import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import library from "../../public/library.json";

const DataContext = createContext();

const initialBooks = JSON.parse(localStorage.getItem("books")) || library;
const initialAvailableBooksCounter = JSON.parse(localStorage.getItem("availableBooksCounter")) || 13;
const initialReadingListCounter = JSON.parse(localStorage.getItem("readingListCounter")) || 0;
const initialAvailableBooksForGenreCounter = JSON.parse(localStorage.getItem("availableBooksForGenreCounter")) || 0;

export const DataProvider = ({ children }) => {
  DataProvider.propTypes = {
    children: PropTypes.element,
  };
  //Contexto para el contador de libros disponibles
  const [availableBooksCounter, setAvailableBooksCounter] = useState(initialAvailableBooksCounter);
  //Función manejadora del setAvailableBooksCounter
  const handleSetAvailableBooksCounter = (newAvailableBooksCounter) => {
    setAvailableBooksCounter(newAvailableBooksCounter);
  };

  //Contexto para el contador de libros en la lista de lectura
  const [readingListCounter, setReadingListCounter] = useState(initialReadingListCounter);
  //Función manejadora del setReadingListCounter
  const handleSetReadingListCounter = (newReadingListCounter) => {
    setReadingListCounter(newReadingListCounter);
  };

  //Contexto para el contador de libros disponibles
  const [availableBooksForGenreCounter, setAvailableBooksForGenreCounter] =
    useState(initialAvailableBooksForGenreCounter);
  //Función manejadora del setAvailableBooksCounter
  const handleSetAvailableBooksForGenreCounter = (
    newAvailableBooksForGenreCounter
  ) => {
    setAvailableBooksForGenreCounter(newAvailableBooksForGenreCounter);
  };
  //Contexto de los libros disponibles
  const [books, setBooks] = useState(initialBooks);
  const handleBooks = (newBooks) => {
    setBooks(newBooks);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

   useEffect(() => {
    localStorage.setItem(
      "availableBooksCounter",
      JSON.stringify(availableBooksCounter)
    );
  }, [availableBooksCounter]);

  useEffect(() => {
    localStorage.setItem(
      "readingListCounter",
      JSON.stringify(readingListCounter)
    );
  }, [readingListCounter]);

  useEffect(() => {
    localStorage.setItem(
      "availableBooksForGenreCounter",
      JSON.stringify(availableBooksForGenreCounter)
    );
  }, [availableBooksForGenreCounter]); 

  

  const data = {
    books,
    handleBooks,
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
