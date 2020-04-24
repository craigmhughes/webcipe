<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->users = [
            [
                "name"  =>  "Richard Hendricks",
                "email" =>  "hendricks@mail.com",
            ],
            [
                "name"  =>  "Bertram Guilfoyle",
                "email" =>  "guilfoyle@mail.com",
            ],
            [
                "name"  =>  "Laurie Bream",
                "email" =>  "bream@mail.com",
            ],
        ];

        foreach($this->users as $key => $value){
            DB::table('users')->insert([
                'name' => $value["name"],
                'email' => $value["email"],
                'password' => Hash::make('password'),
            ]);
        }
    }
}
