import http from "../http-common";
import axios from "axios";
import IBook from "../types/Book";
const getAll = () => {
  return http.get<Array<IBook>>("/list");
};

const create = (data: IBook) => {
  return http.post<IBook>("/add_book", data);
};
const update = (id: any, data: IBook) => {
  return http.put<any>(`/update_book/${id}`, data);
};

const remove = (id: any) => {
  return http.get<any>(`/book/${id}`);
};
const removeAll = () => {
  return http.get<any>(`/del_books`);
};
const findByTitle = (title: string) => {
  return http.get<Array<IBook>>(`/books/"${title}"`);
};
const BookService = {
  getAll,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default BookService;