<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('author_id')->unsigned();
            $table->string('title', 100);
            $table->string('image')->nullable();
            $table->integer('estimated_time');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::table('recipes', function (Blueprint $table) {
            $table->foreign('author_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
