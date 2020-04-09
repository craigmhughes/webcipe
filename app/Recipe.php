<?php

namespace Webcipe;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description','author_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    public function ingredients(){
        return $this->hasMany('Webcipe\Ingredient');
    }

    public function steps(){
        return $this->hasMany('Webcipe\Step');
    }
}
