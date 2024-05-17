<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use Illuminate\Support\Facades\DB;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Offer::factory()->count(10)->create();

        DB::table('offers')->insert([
            [
                'title' => 'Discount on electronics',
                'description' => 'Get a 20% discount on all electronic items.',
                'discount' => 20,
                'expires_at' => now()->addDays(30),
            ],
            [
                'title' => 'Buy one get one free',
                'description' => 'Buy one get one free on selected items.',
                'discount' => 50,
                'expires_at' => now()->addDays(15),
            ],
            [
                'title' => 'discont on orders over $50',
                'description' => 'Enjoy free shipping on orders over $50.',
                'discount' => 60,
                'expires_at' => now()->addDays(60),
            ],
        ]);
    }
}
