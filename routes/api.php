<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post("login", "AuthController@Login");
    Route::post("register", "AuthController@Register");
    Route::post("logout", "AuthController@Logout");
    Route::get("user", "AuthController@User");
});

Route::get("recipes", "RecipeController@Index");

Route::group(['middleware' => 'auth'], function (){
    Route::post("recipes", "RecipeController@Store");
    Route::get("recipes/user", "RecipeController@UserIndex");
});
