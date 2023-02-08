<?php

use Illuminate\Support\Facades\Route;

// ** Controller Imports
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;


Route::prefix("product")->group(function() {
    Route::get("/", [ProductController::class, "index"]);

    Route::post("/", [ProductController::class, "store"]);
    Route::put("/{id}", [ProductController::class, "update"])->whereNumber("id");

    Route::delete("/{id}", [ProductController::class, "remove"])->whereNumber("id");
});

Route::prefix("cart")->group(function() {
    Route::get("/", [CartController::class, "index"]);

    Route::post("/", [CartController::class, "store"]);

    Route::put("/change-quantity", [CartController::class, "changeQuantity"]);
    Route::put("/change-side", [CartController::class, "changeSide"]);
    Route::put("/toggle-build-price", [CartController::class, "toggleBuildPrice"]);
    Route::put("/toggle-all-build-price", [CartController::class, "toggleAllBuildPrices"]);

    Route::delete("/{id}", [CartController::class, "remove"])->whereNumber("id");
});
