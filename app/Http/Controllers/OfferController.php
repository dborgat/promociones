<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use App\Models\PromotionalCode;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class OfferController extends Controller
{
    /**
     * Display a listing of the offers.
     */
    public function getOffers(Request $request)
    {
        $offers = Offer::all();
        return response()->json($offers);
    }

    /**
     * Generate a unique promotional code for an offer.
     */
    public function generateCode($offerId)
    {
        $user = Auth::user();
        $offer = Offer::findOrFail($offerId);

        $code = Str::uuid()->toString();

        $promotionalCode = PromotionalCode::create([
            'code' => $code,
            'offer_id' => $offer->id,
            'user_id' => $user->id,
            'redeemed' => false,
        ]);

        return response()->json($promotionalCode);
    }

    /**
     * Display a listing of the user's promotional codes.
     */
    public function userCodes()
    {
        $user = Auth::user();
        $codes = $user->promotionalCodes;

        return response()->json($codes);
    }

    /**
     * Redeem a promotional code.
     */
    public function redeemCode($codeId)
    {
        $code = PromotionalCode::findOrFail($codeId);
        $code->update(['redeemed' => true]);

        return response()->json(['message' => 'Code redeemed successfully']);
    }
}
