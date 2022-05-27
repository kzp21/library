import React, { useState, ChangeEvent } from "react";
import BookDataService from "../services/BookService";
import IBook from "../types/Book";
const AddBook: React.FC = () => {
  const initialBookState = {
    id: null,
    name: "",
    description: ""
  };
  const [books, setBooks] = useState<IBook>(initialBookState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBooks({ ...books, [name]: value });
  };
  const saveBook = () => {
    var data = {
      name: books.name,
      description: books.description
    };
    BookDataService.create(data)
      .then((response: any) => {
        setBooks({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description
        });
        setSubmitted(true);
        window.location.reload();
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBooks(initialBookState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={books.name}
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
              value={books.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveBook} className="btn btn-success">
            Add
          </button>
        </div>
      )}
    </div>
  );
};
export default AddBook;