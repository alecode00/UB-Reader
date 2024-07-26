import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReadingList } from "../ReadingList";
import DataContext from "../context/DataContext";
import "@testing-library/jest-dom/extend-expect";
import jest from "jest";
import library from "../../public/books.json";

const initialBooks = JSON.parse(localStorage.getItem("books")) || library;
const initialAvailableBooksCounter =
  JSON.parse(localStorage.getItem("availableBooksCounter")) || 13;
const initialReadingListCounter =
  JSON.parse(localStorage.getItem("readingListCounter")) || 0;

const renderWithContext = (component) => {
  const dataContextValue = {
    books: initialBooks,
    handleBooks: jest.fn(),
    availableBooksCounter: initialAvailableBooksCounter,
    handleSetAvailableBooksCounter: jest.fn(),
    readingListCounter: initialReadingListCounter,
    handleSetReadingListCounter: jest.fn(),
  };
  return render(
    <DataContext.Provider value={dataContextValue}>
      {component}
    </DataContext.Provider>
  );
};

jest.describe("ReadingList", () => {
  jest.it("Debería renderizar la lista de libros", () => {
    renderWithContext(<ReadingList />);
    const readingList = screen.getByRole("list", { name: /Lista de Lectura/i });
    jest.expect(readingList).toBeInTheDocument();
    jest.expect(screen.getByText("Libro 1")).toBeInTheDocument();
    jest.expect(screen.getByText("Libro 2")).not.toBeInTheDocument();
  });
});
