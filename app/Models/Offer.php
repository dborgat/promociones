<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'discount',
    ];

    public function promotionalCodes()
    {
        return $this->hasMany(PromotionalCode::class);
    }
}
