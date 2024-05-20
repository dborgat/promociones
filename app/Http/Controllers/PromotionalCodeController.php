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
    public function generate(Request $request)
    {
        $postData = $request->all();
        $params = $postData['data'];

        if (!isset($params['offer_id'])) {
            return response()->json(['message' => 'Invalid data'], 400);
        } else {
            $randomCode = \Illuminate\Support\Str::random(10); // generates a random string of 10 characters
            error_log('Random code: ' . json_encode($randomCode));
            error_log('params: ' . json_encode($params));

            PromotionalCode::create([
                'user_id' => Auth::id(),
                'offer_id' => $params['offer_id'],
                'code' => $randomCode,
                'discount' => $params['discount'],
            ]);

            return response()->json(['message' => 'Code added successfully'], 201);
        }
    }

    /**
     * Display a listing of the user's promotional codes.
     */
    public function promotionalCodeList()
    {
        $promotionalCodes = PromotionalCode::where('user_id', Auth::id())
            ->leftJoin('offers', 'promotional_codes.offer_id', '=', 'offers.id')
            ->get();

        return response()->json($promotionalCodes);
    }

    /**
     * Redeem a promotional code.
     */
    public function redeem($codeId)
    {
        $promotionalCode = PromotionalCode::where('code', $codeId)->first();

        if (!$promotionalCode) {
            return response()->json(['message' => 'Promo code not found'], 404);
        }

        if ($promotionalCode->user_id != Auth::id()) {
            return response()->json(['message' => 'This promo code does not belong to the authenticated user'], 403);
        }

        $promotionalCode->redeemed = true;
        $promotionalCode->save();

        return response()->json(['message' => 'Promo code redeemed successfully'], 200);
    }

    /**
     * Get the count of promotional codes for the authenticated user.
     */
    public function countPromotionalCodes()
    {
        $count = PromotionalCode::where('user_id', Auth::id())->count();
        return response()->json(['count' => $count]);
    }
}
