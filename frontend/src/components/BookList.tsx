import React, { useState, useEffect, ChangeEvent } from "react";
import BookDataService from "../services/BookService";
import { Link } from "react-router-dom";
import IBook from "../types/Book";
const BooksList: React.FC = () => {

  const initialBookState = {
    id: null,
    name: "",
    description: ""
  }

  const [books, setBooks] = useState<Array<IBook>>([]);
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [showEditBook, setshowEditBook] = useState<IBook | null>(null);
  const [editBook, setEditBook] = useState<IBook>(initialBookState);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditBook({ ...editBook, [name]: value });
  };

  const setBookForEdit = (book: IBook) => {
    setEditBook(book);
    setshowEditBook(book)
  }

  const updateBook = () => {
    var data = {
      name: editBook.name,
      description: editBook.description
    };

    BookDataService.update(editBook.id, data)
      .then((response: any) => {
        setshowEditBook(null)
        setSubmitted(true);
        window.location.reload();
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveBooks();
  }, []);
  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const retrieveBooks = () => {
    BookDataService.getAll()
      .then((response: any) => {
        setBooks(response.data);
        console.log("data: ", response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  };
  const setActiveBook = (book: IBook, index: number) => {
    setCurrentBook(book);
    setCurrentIndex(index);
    setshowEditBook(null);
  };
  const removeAllTutorials = () => {
    BookDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const removeBook = (id: any) => {
    BookDataService.remove(id)
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BookDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setBooks(response.data);
        setCurrentBook(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Books List</h4>
        <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBook(book, index)}
                key={index}
              >
                {book.name}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBook ? (
          <div>
            <h4>Book</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBook.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentBook.description}
            </div>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={() => removeBook(currentBook.id)}
            >
              Remove
            </button>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={() => setBookForEdit(currentBook)}
            >
              Edit
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
      <div className="col-md-6">
      {showEditBook ? (
          <div>
            <div className="form-group">
            <input
              type="hidden"
              className="form-control"
              id="id"
              value={editBook.id}
              name="id"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={editBook.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={editBook.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={updateBook} className="btn btn-success">
            Update
          </button>
        </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BooksList;