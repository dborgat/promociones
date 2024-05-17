<?php

namespace Tests\Unit;

use App\Models\Offer;
use App\Models\PromotionalCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PromoCodeTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_authenticated_users_can_create_promo_codes()
    {
        $user = User::factory()->create();
        $offer = Offer::factory()->create();

        $this->actingAs($user)
            ->postJson("/api/offers/{$offer->id}/generate-code", [
                'code' => 'PROMO123',
                'discount' => 20
            ])
            ->assertStatus(201)
            ->assertJsonStructure([
                'id', 'code', 'discount', 'created_at', 'updated_at'
            ]);
    }

    public function test_promo_codes_can_be_listed()
    {
        $user = User::factory()->create();
        $offer = Offer::factory()->create();

        $promoCode = PromotionalCode::create([
            'user_id' => $user->id,
            'offer_id' => $offer->id,
            'code' => 'PROMO123',
            'discount' => 20,
        ]);

        $this->actingAs($user)
            ->getJson('/api/promotional-codes')
            ->assertStatus(200)
            ->assertJsonStructure([[
                'id', 'code', 'discount', 'created_at', 'updated_at'
            ]]);
    }

     public function test_promo_code_can_be_redeemed()
    {
        $user = User::factory()->create();
        $offer = Offer::factory()->create();

        $promoCode = PromotionalCode::create([
            'user_id' => $user->id,
            'offer_id' => $offer->id,
            'code' => 'PROMO123',
            'discount' => 20,
        ]);

        $this->actingAs($user)
            ->postJson("/api/promotional-codes/{$promoCode->code}/redeem")
            ->assertStatus(200);

        $this->assertDatabaseHas('promotional_codes', [
            'code' => $promoCode->code,
            'redeemed' => true,
        ]);
    }
}
