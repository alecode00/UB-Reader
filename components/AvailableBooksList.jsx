import library from "../public/library.json";
import { useContext, useEffect } from "react";
import "../src/styles/availableBooksList.css";
import DataContext from "./context/DataContext";

export const AvailableBooksList = () => {
  const { books, handleBooks} = useContext(DataContext);
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
  }, []);

  const handleBookClick = (id) => {
    if (books[id].added) {
      return;
    } else {
      const newBooks = books.map((book) => {
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
      console.log(
        "Este es el newBooks del handleBookClick de la availableList:",
        newBooks
      );
      handleBooks(newBooks);
    }
  };

  /* useEffect(() => {
    const newSelectBooks = books.map(book=>{
      if(book.added){
        return book;
      }else{
        return
      }
    })
    handleSelectBooks(newSelectBooks)
  
    
  }, [books.map(book=>{return book.added})]) */

  return (
    <section id="enableBooksSection">
      <article>
        <header>
          <h2>Lista de Libros Disponibles</h2>
        </header>
        <ul id="enableBooksList">
          {books.map((book) => (
            <li key={book.id} className="availableListElement">
              <img
                className="booksImage"
                src={book.cover}
                alt={book.title}
                onClick={() => handleBookClick(book.id)}
              />
            </li>
          ))}
        </ul>
        {console.log("Esto es books:", books)}
      </article>
    </section>
  );
};
