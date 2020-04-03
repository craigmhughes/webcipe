<?php

namespace Webcipe\Http\Controllers;

use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function Index(Request $request){

        $response = "bruh";

        try {
            $user = auth()->userOrFail();
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e){
            return response()->json(["error" => $e->getMessage()], 404);
        }

        return response()->json(auth()->user(), 200);
    }
}
