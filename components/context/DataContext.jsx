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

  const data = { books, handleBooks, selectBooks, handleSelectBooks };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataContext;
