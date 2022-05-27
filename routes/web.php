<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/list', [BookController::class, 'list']);
Route::get('/del_books', [BookController::class, 'del_books']);
Route::get('/books/{title}', [BookController::class, 'get_book_by_title']);
Route::post('/add_book', [BookController::class, 'add_book']);
Route::get('/book/{id}', [BookController::class, 'remove']);
Route::put('/update_book/{id}', [BookController::class, 'update_book']);