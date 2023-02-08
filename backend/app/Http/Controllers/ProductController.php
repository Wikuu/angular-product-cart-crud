<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = Product::getProducts();

        if(!$products) {
            return response()->json(["message" => "Failed to get products",], 500);
        }

        return response()->json(["message" => "Products retrieved successfully", "products" => $products,], 200);
    }

    public function store(Request $request)
    {
        $data = $request->only(["name", "description", "code", "price", "build_price"]);

        $result = Product::store($data);

        if(!$result) {
            return response()->json(["message" => "Failed to create product",], 500);
        }

        return response()->json(["message" => "Product created successfully", "product" => $result,], 201);
    }

    public function update(Request $request) {
        $data = $request->only(["id", "name", "description", "code", "price", "build_price"]);

        $result = Product::updateProduct($data);

        if(!$result) {
            return response()->json(["message" => "Failed to update product",], 500);
        }

        return response()->json(["message" => "Product updated successfully", "product" => $result], 200);
    }

    public function remove(int $id) {
        $result = Product::removeProduct($id);

        if(!$result) {
            return response()->json(["message" => "Failed to remove product",], 500);
        }

        return response()->json(["message" => "Product removed successfully",], 200);
    }
}
