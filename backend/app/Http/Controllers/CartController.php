<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request) {
        $data = $request->only([
            'product_id',
            'total',
        ]);

        $result = Cart::store($data);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to store cart',
            ], 500);
        }

        return response()->json([
            'message' => 'Cart stored successfully',
            'cart' => $result,
        ], 200);
    }

    public function index() {
        $result = Cart::getCartData();

        if(!$result) {
            return response()->json([
                'message' => 'Failed to get cart data',
            ], 500);
        }

        return response()->json([
            'message' => 'Cart data retrieved successfully',
            'cart' => $result,
        ], 200);
    }

    public function changeQuantity(Request $request) {
        $data = $request->only("id", "quantity");
        $result = Cart::changeQuantity($data);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to increase quantity',
            ], 500);
        }

        return response()->json([
            'message' => 'Quantity increased successfully',
            "cart" => $result
        ], 200);
    }

    public function changeSide(Request $request) {
        $data = $request->only("id", "side", "value");

        $result = Cart::changeSide($data);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to change side',
            ], 500);
        }

        return response()->json([
            'message' => 'Side changed successfully',
            "cart" => $result
        ], 200);
    }

    public function toggleBuildPrice(Request $request) {
        $data = $request->only("id", "has_build");

        $result = Cart::toggleBuildPrice($data);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to toggle build price',
            ], 500);
        }

        return response()->json([
            'message' => 'Build price toggled successfully',
            "cart" => $result
        ], 200);
    }

    public function toggleAllBuildPrices(Request $request) {
        $result = Cart::toggleAllBuildPrices($request->should_add_build_price);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to toggle all build prices',
            ], 500);
        }

        return response()->json([
            'message' => 'All build prices toggled successfully',
            "cart" => $result
        ], 200);
    }

    public function remove(int $id) {
        $result = Cart::remove($id);

        if(!$result) {
            return response()->json([
                'message' => 'Failed to remove cart',
            ], 500);
        }

        return response()->json([
            'message' => 'Cart removed successfully',
        ], 200);
    }
}
