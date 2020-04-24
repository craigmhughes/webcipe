<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Webcipe\Recipe;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipes = [
            [
                "title"  =>  "Garlic Grilled Tomatoes",
                "description" => null,
                "author_id" => 1,
                "ingredients" => [
                    [
                        "name" => "Tomatoes",
                        "quantity" => "10",
                        "measurement" => null
                    ],
                    [
                        "name" => "Garlic Cloves",
                        "quantity" => "10",
                        "measurement" => null
                    ],
                    [
                        "name" => "Olive Oil",
                        "quantity" => null,
                        "measurement" => null
                    ],
                    [
                        "name" => "Thyme",
                        "quantity" => null,
                        "measurement" => null
                    ],
                    [
                        "name" => "Sage",
                        "quantity" => null,
                        "measurement" => null
                    ],
                    [
                        "name" => "Oregano",
                        "quantity" => null,
                        "measurement" => null
                    ]
                ],
                "steps" => [
                    [
                        "order" => 0,
                        "content" => "Finely chop Garlic and leafs (Thyme, Sage, Oregano)."
                    ],
                    [
                        "order" => 1,
                        "content" => "In a Bowl, mix all the ingredients except of the tomatoes. Whisk well."
                    ],
                    [
                        "order" => 2,
                        "content" => "Cut the tomatoes in half and pour the mix over it."
                    ],
                    [
                        "order" => 3,
                        "content" => "Grill to taste on a frying pan on a high heat."
                    ],
                ]
            ],

            [
                "title"  =>  "Fudgy Chocoloate Brownie Cookies",
                "description" => null,
                "author_id" => 2,
                "ingredients" => [
                    [
                        "name" => "Unsweetened cocoa powder",
                        "quantity" => "1/2",
                        "measurement" => "cup"
                    ],
                    [
                        "name" => "White granulated sugar",
                        "quantity" => "1",
                        "measurement" => "cup"
                    ],
                    [
                        "name" => "Melted butter",
                        "quantity" => "1/2",
                        "measurement" => "cup"
                    ],
                    [
                        "name" => "Vegetable oil",
                        "quantity" => "2",
                        "measurement" => "teaspoons"
                    ],
                    [
                        "name" => "Egg",
                        "quantity" => "1",
                        "measurement" => null
                    ],
                    [
                        "name" => "Pure vanilla extract",
                        "quantity" => "2",
                        "measurement" => "teaspoons"
                    ],
                    [
                        "name" => "Plain flour",
                        "quantity" => "1 1/3",
                        "measurement" => "cups"
                    ],
                    [
                        "name" => "Baking Powder",
                        "quantity" => "1/2",
                        "measurement" => "teaspoon"
                    ],
                    [
                        "name" => "Salt",
                        "quantity" => "1/2",
                        "measurement" => "teaspoons"
                    ],
                    [
                        "name" => "Semi-sweet Chocolate chips",
                        "quantity" => "1/3",
                        "measurement" => "cup"
                    ],
                    
                ],
                "steps" => [
                    [
                        "order" => 0,
                        "content" => "Preheat oven to 350°F (175°C). Line 2 cookie sheets or baking trays with parchment paper (baking paper)."
                    ],
                    [
                        "order" => 1,
                        "content" => "In a medium-sized bowl, mix together the cocoa powder, white sugar, butter and vegetable oil. Beat in egg and vanilla until fully incorporated"
                    ],
                    [
                        "order" => 2,
                        "content" => "Add the flour, baking powder, and salt; stir the dry ingredients first before mixing them through the wet ingredients until a dough forms (do not over beat). Fold in the chocolate chips."
                    ],
                    [
                        "order" => 3,
                        "content" => "Scoop out 1-2 tablespoonful of dough with a cookie scoop (or small ice cream scoop), and place onto prepared baking sheets. Press them down as thick or thin as you want your cookies to come out. "
                    ],
                    [
                        "order" => 4,
                        "content" => "Bake in hot preheated oven for 12 minutes. The cookies will come out soft from the oven but will harden up as they cool."
                    ],
                    [
                        "order" => 5,
                        "content" => "Allow to cool on the cookie sheet for 10 minutes before transferring to wire racks to cool."
                    ],
                ]
            ],
        ];
        
        // Loop through recipes.
        foreach($recipes as $key => $recipe){

            // Create recipe
            DB::table('recipes')->insert([
                'title' => $recipe['title'],
                'author_id' => $recipe['author_id'],
                'description' => $recipe['description'],
            ]);
            
            // Get newest entry of recipe (which will have just been created) and pluck id.
            $newrecipe_id = DB::table('recipes')->latest('id', 'desc')->get()[0]->id;
                
            // For every ingredient found, create new entry.
            foreach($recipe["ingredients"] as $idx => $ingredient){
                DB::table('ingredients')->insert([
                    'recipe_id' => $newrecipe_id,
                    'name' => $ingredient['name'],
                    'quantity' => $ingredient['quantity'],
                    'measurement' => $ingredient['measurement'],
                ]);
            }

            // For every step found, create new entry.
            foreach($recipe["steps"] as $idx => $ingredient){
                DB::table('steps')->insert([
                    'recipe_id' => $newrecipe_id,
                    'order' => $ingredient['order'],
                    'content' => $ingredient['content']
                ]);
            }
        }
    }
}
