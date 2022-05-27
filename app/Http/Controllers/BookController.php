<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class BookController extends Controller

{
   public function list()
   {
       $data = Book::all();
       return $data;   
   }

   public function del_books()
   {
       Book::truncate();  
   }
   
   public function get_book_by_title($title)
   {
    $data = DB::select("select * from books where name={$title}");
    if ($data == null)
    {
        $data = Book::all();
    }
    return $data;
   }

   public function add_book(Request $request)
   {
        $book = new Book;
        $book->name= $request->name;
        $book->save();
   }

   public function remove($id)
   {
       Book::find($id)->delete();
   }

   public function update_book($id, Request $request)
   {
       $book = Book::find($id);
       $book->name= $request->name;
       $book->save();
   }
}
