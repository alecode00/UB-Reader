import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import library from "../../public/library.json";

//Creando el contexto
const DataContext = createContext();

//Inicializando las varibles en depencia de si es el comienzo de la aplicación o si lo toma del locaStorage para la persistencia
const initialBooks = JSON.parse(localStorage.getItem("books")) || library;
const initialAvailableBooksCounter =
  JSON.parse(localStorage.getItem("availableBooksCounter")) || 13;
const initialReadingListCounter =
  JSON.parse(localStorage.getItem("readingListCounter")) || 0;
const initialAvailableBooksForGenreCounter =
  JSON.parse(localStorage.getItem("availableBooksForGenreCounter")) || 0;

  /* //Utilizando BroadcastChannel para la comunicación entre las dos pestañas iguales requeridas
  const channel = new BroadcastChanel('booksChannel'); */

export const DataProvider = ({ children }) => {
  DataProvider.propTypes = {
    children: PropTypes.element,
  };

  //Contexto para el contador de libros disponibles
  const [availableBooksCounter, setAvailableBooksCounter] = useState(
    initialAvailableBooksCounter
  );
  //Función manejadora del setAvailableBooksCounter
  const handleSetAvailableBooksCounter = (newAvailableBooksCounter) => {
    setAvailableBooksCounter(newAvailableBooksCounter);
  };

  //Contexto para el contador de libros en la lista de lectura
  const [readingListCounter, setReadingListCounter] = useState(
    initialReadingListCounter
  );
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
  //Función manejadora de la lista de libros
  const handleBooks = (newBooks) => {
    setBooks(newBooks);
  };

  // Varios useEffect creados para guardar en el localStorage la información que necesite persistencia en el monento que varíen
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

  //Los datos que se compartirán con el resto de los componentes
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
  //Define que se compartirá data con los hijos
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContext;
