import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import BookShelf from "../components/BookShelf";

// Context
import shelfContext from "../contexts/shelfContext";

// API
import * as BooksAPI from "../api/BooksAPI";

// Styles
import "./main.scss";

export default function Main(props) {
  const shelves = useContext(shelfContext);
  const [booksOnShelf, setBooksOnShelf] = useState([]);
  const [error, setError] = useState("");

  const getBooks = () => {
    console.log("main.js: getBooks called");
    BooksAPI.getAll()
      .then((books) => {
        setBooksOnShelf(books);
      })
      .catch((error) => {
        setError(`ERROR: ${error.message}`);
      });
  };

  useEffect(getBooks, []);

  return (
    // List Books
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf, i) => (
            <BookShelf
              key={i}
              title={shelf.title}
              books={booksOnShelf.filter((book) => book.shelf === shelf.param)}
              onUpdate={getBooks}
            />
          ))}
          {error}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}
