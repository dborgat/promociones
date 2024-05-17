<?php

namespace Database\Factories;

use App\Models\PromotionalCode;
use App\Models\User;
use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

class PromotionalCodeFactory extends Factory
{
    protected $model = PromotionalCode::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'offer_id' => Offer::factory(),
            'code' => $this->faker->unique()->word,
            'discount' => $this->faker->numberBetween(10, 50),
            'redeemed' => false
        ];
    }
}
