import { ReadingList } from "../ReadingList";
import DataContext from "../context/DataContext";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";

const renderWithContext = (component) => {
  const dataContextValue = {
    books: [
      {
        id: 0,
        added: true,
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
      },
      {
        id: 1,
        added: false,
        title: "Juego de Tronos",
        pages: 694,
        genre: "Fantasía",
        cover:
          "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1273763400i/8189620.jpg",
        synopsis:
          "En un reino donde las estaciones duran años, una batalla épica por el trono se desarrolla.",
        year: 1996,
        ISBN: "978-0553103540",
        author: {
          name: "George R. R. Martin",
          otherBooks: [
            "Choque de Reyes",
            "Tormenta de Espadas",
            "Festín de Cuervos",
          ],
        },
      },
    ],
    handleBooks: vitest.fn(),
    availableBooksCounter: 11,
    handleSetAvailableBooksCounter: vitest.fn(),
    readingListCounter: 2,
    handleSetReadingListCounter: vitest.fn(),
  };
  return render(
    <DataContext.Provider value={dataContextValue}>
      {component}
    </DataContext.Provider>
  );
};

describe("ReadingList", () => {
  it("Debería renderizar un libro", () => {
    renderWithContext(<ReadingList />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
