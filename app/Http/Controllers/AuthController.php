<?php

namespace Webcipe\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Webcipe\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Attempt login with user credentials. If successful, provide user with a JWT.
     */
    public function Login(Request $request){

        // Use only the fields needed.
        $credentials = $request->only(["email","password"]);

        // Send error message on failure.
        if(!$token = auth()->attempt($credentials)){
            return response()->json(["error" => "Invalid Credentials"], 401);
        }

        // Send Token
        return response()->json(["token" => $token], 200);
    }

    /**
     * Register user, on success return w/ a JWT through Login()
     */
    public function Register(Request $request){

        // Use only the fields needed.
        $credentials = $request->only(["name","email","password","password_confirmation"]);

        // Check provided creds against rules.
        $validator = Validator::make($credentials, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'=> ['min:6','required_with:password_confirmation','same:password_confirmation'],
            'password_confirmation' => ['min:6'],
        ]);

        // Send error message on failure.
        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()]);
        }

        // Create new User w/ password hashing.
        $user = User::create([
            'name' => $credentials["name"],
            'email' => $credentials["email"],
            'password' => Hash::make($credentials["password"])
        ]);

        // Run Login() to return access token.
        return $this->login($request);
    }

    /**
     * Logout user, make JWT unusable.
     */
    public function Logout(Request $request){
        
        auth()->logout();

        return response()->json(["logged_out" => true], 200);
    }

    /**
     * ID user.
     */
    public function User(Request $request){
        
        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e){
            return response()->json(["error" => $e->getMessage()], 404);
        }

        return response()->json(auth()->user(), 200);
    }
}
