import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import library from "../../public/books.json";

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

//Utilizando BroadcastChannel para la comunicación entre las dos pestañas iguales requeridas
const channel = new BroadcastChannel("booksChannel");

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
  //Escuchando mensajes de otra página y asignando los valores recibidos
  channel.onmessage = (event) => {
    const data = event.data;
    console.log(event.data);
    console.log("Escuche un evento");

    switch (data.variable) {
      case "books":
        setBooks(data.valor);
        break;

      case "availableBooksCounter":
        setAvailableBooksCounter(data.valor);
        break;

      case "readingListCounter":
        setReadingListCounter(data.valor);
        break;

      case "availableBooksForGenreCounter":
        setAvailableBooksForGenreCounter(data.valor);
        break;

      default:
        console.log("Tipo de dato desconocido", data.variable);
        break;
    }
  };

  // Varios useEffect creados para guardar en el localStorage la información que necesite persistencia en el monento que varíen. Y enviarla hacia una posible segunda ventana para tenerla actualizada.
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    channel.postMessage({ variable: "books", valor: books });
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "availableBooksCounter",
      JSON.stringify(availableBooksCounter)
    );
    channel.postMessage({
      variable: "availableBooksCounter",
      valor: availableBooksCounter,
    });
  }, [availableBooksCounter]);

  useEffect(() => {
    localStorage.setItem(
      "readingListCounter",
      JSON.stringify(readingListCounter)
    );
    channel.postMessage({
      variable: "readingListCounter",
      valor: readingListCounter,
    });
  }, [readingListCounter]);

  useEffect(() => {
    localStorage.setItem(
      "availableBooksForGenreCounter",
      JSON.stringify(availableBooksForGenreCounter)
    );
    channel.postMessage({
      variable: "availableBooksForGenreCounter",
      valor: availableBooksForGenreCounter,
    });
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
