<?php

namespace Webcipe;

use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order','content','recipe_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id','recipe_id','created_at', 'updated_at'
    ];
}
