<?php

namespace Webcipe\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Webcipe\Recipe as Recipe;
use Webcipe\Ingredient as Ingredient;
use Webcipe\Step as Step;
use Webcipe\User as User;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function __construct(Recipe $recipe){
        $this->recipes = $recipe->with('ingredients','steps')->get();
    }

    /**
     * Retrieve all records of Recipe.
     */
    public function Index(Request $request){

        $recipes = $this->recipes;

        // Replace Author ID with an Author name for each recipe.
        $recipes = $recipes->map(function($recipe){
            $recipe['author_id'] = User::find($recipe['author_id'])['name'];
            return $recipe;
        });

        return response()->json(['recipes' => $recipes], 200);
    }

    /**
     * Retrieve all records of Recipe associated with user.
     */
    public function UserIndex(Request $request){

        $recipes = Recipe::where('author_id', auth()->user()['id'])->with('ingredients','steps')->get();

        return response()->json(['recipes' => $recipes], 200);
    }

    /**
     * Create new Recipe.
     */
    public function Store(Request $request){
        // Use only the fields needed.
        $data = $request->only(["image","title","description","ingredients","steps"]);

        // Create validation rules.
        $validator = Validator::make($data, [
            'title' => ['required'],
            'description' => ['nullable'],
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg'],
            'ingredients' => ['required'],
            'steps' => ['required']
        ]);   
        
        //  Run validation and return on error.
        if($validator->fails()){
            return response()->json(['error' => $validator->messages()]);
        }   

        // Get lists from Request and pair with it's validation rules.
        $data_lists = [ 
            [
                json_decode($request["ingredients"], true),
                [
                    'name' => ['required'],
                    'quantity' => ['nullable'],
                    'measurement' => ['nullable'] 
                ]
            ], 
            [
                json_decode($request["steps"], true),
                [
                    'order' => ['required'],
                    'content' => ['required']
                ]
            ]
        ];

        // Loop over data_lists to get objects with validation.
        foreach($data_lists as $data_item){
            // Overwrite $data to target Ingredient list.
            $data = $data_item[0];

            // Loop through each item and validate
            foreach($data as $data_obj){
                // Recreate validation rules.
                $validator = Validator::make($data_obj, $data_item[1]);
                //  Run validation and return on error.
                if($validator->fails()){
                    return response()->json(['error' => $validator->messages()]);
                }
            }
        }

        // Init null var for image filename.
        $nameToSave = null;

        // After this point, data has been validated and can be stored.
        // Start with saving the image and then the url can be passed to the recipe entry.
        if($request->hasFile('image')){
            $file = request()->file('image')->getClientOriginalName();
            $ext = request()->file('image')->getClientOriginalExtension();

            // Provide filename.
            $nameToSave = 'recipe_cover_'.time().'.'.$ext;
            
            Storage::disk('local')->put($nameToSave, file_get_contents(request()->file('image')));
        }
        
        $recipe = Recipe::create([
            'title' => $request['title'],
            'image' => $nameToSave,
            'author_id' => auth()->user()['id'],
            'description' => $request['description']
        ]);

        foreach(json_decode($request['ingredients'], true) as $ingredient){
            Ingredient::create([
                'name' => $ingredient['name'],
                'recipe_id' => $recipe['id'],
                'quantity' => $ingredient['quantity'],
                'measurement' => $ingredient['measurement']
            ]);
        }

        foreach(json_decode($request['steps'], true) as $step){
            Step::create([
                'recipe_id' => $recipe['id'],
                'order' => $step['order'],
                'content' => $step['content']
            ]);
        }

        $recipe['ingredients'] = $recipe->ingredients;
        $recipe['steps'] = $recipe->steps;

        // Return Recipe.
        return response()->json($recipe, 201);

    }

    /**
     * Update existing Recipe.
     */
    public function Update(Request $request){

        // Use only the fields needed.
        $data = $request->only(["id","title","description","ingredients","steps"]);

        // Create validation rules.
        $validator = Validator::make($data, [
            'title' => ['required'],
            'description' => ['nullable'],
            'ingredients' => ['required'],
            'steps' => ['required']
        ]);
        
        //  Run validation and return on error.
        if($validator->fails()){
            return response()->json(['error' => $validator->messages()]);
        }

        $recipe = Recipe::find($data["id"]);
        $recipe->title = $data["title"];
        $recipe->description = $data["description"];

        // Get lists from Request and pair with it's validation rules.
        $data_lists = [ 
            [
                $request["ingredients"],
                [
                    'name' => ['required'],
                    'quantity' => ['required'],
                    'measurement' => ['nullable'] 
                ]
            ], 
            [
                $request["steps"],
                [
                    'order' => ['required'],
                    'content' => ['required']
                ]
            ]
        ];

        // Loop over data_lists to get objects with validation.
        foreach($data_lists as $data_item){
            // Overwrite $data to target Ingredient list.
            $data = $data_item[0];

            // Loop through each item and validate
            foreach($data as $data_obj){
                // Recreate validation rules.
                $validator = Validator::make($data_obj, $data_item[1]);

                //  Run validation and return on error.
                if($validator->fails()){
                    return response()->json(['error' => $validator->messages()]);
                }
            }
        }

        $recipe->ingredients()->delete();
        $recipe->steps()->delete();
        
        foreach($request['ingredients'] as $ingredient){
            Ingredient::create([
                'name' => $ingredient['name'],
                'recipe_id' => $recipe['id'],
                'quantity' => $ingredient['quantity'],
                'measurement' => $ingredient['measurement']
            ]);
        }

        foreach($request['steps'] as $step){
            Step::create([
                'recipe_id' => $recipe['id'],
                'order' => $step['order'],
                'content' => $step['content']
            ]);
        }

        $recipe->save();

        return response()->json(null, 201);
    }

    /**
     * Delete existing Recipe.
     */
    public function Delete(Request $request, $id){
        $recipe = Recipe::find($request['id']);

        $recipe->ingredients()->delete();
        $recipe->steps()->delete();
        $recipe->delete();

        return response()->json(null, 200);
    }
}
