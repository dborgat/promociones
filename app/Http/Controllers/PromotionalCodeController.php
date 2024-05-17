<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use App\Models\PromotionalCode;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class PromotionalCodeController extends Controller
{
    /**
     * Generate a unique promotional code for an offer.
     */
    public function generate(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:promotional_codes',
            'discount' => 'required|integer',
        ]);

        $promotionalCode = PromotionalCode::create([
            'user_id' => Auth::id(),
            'offer_id' => $offer->id,
            'code' => $validated['code'],
            'discount' => $validated['discount'],
        ]);

        return response()->json($promotionalCode, 201);
    }


    /**
     * Display a listing of the user's promotional codes.
     */
    public function index()
    {
        $promotionalCodes = PromotionalCode::where('user_id', Auth::id())->get();
        return response()->json($promotionalCodes);
    }

    /**
     * Redeem a promotional code.
     */
    public function redeem($code)
    {
        $promotionalCode = PromotionalCode::where('code', $code)->where('user_id', Auth::id())->firstOrFail();
        $promotionalCode->update(['redeemed' => true]);

        return response()->json(['message' => 'Promo code redeemed successfully'], 200);
    }
}
