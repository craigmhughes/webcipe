<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function Login(Request $request){

        $credentials = $request->only(["email","password"]);

        if(!$token = auth()->attempt($credentials)){
            return response()->json(["error" => "Invalid Credentials", 401]);
        }

        return response()->json(["token" => $token], 200);
    }
}
