<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'hinge_side',
        'exposed_side',
        'has_build',
        'total',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'total' => 'float',
        'has_build' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public static function store(array $data)
    {
        $result = static::create($data)->load("product");
        if (!$result) {
            return false;
        }
        // This line needed to return default values as well
        $result->refresh();
        return $result;
    }

    public static function getCartData()
    {
        $result = static::with("product")->get();

        if (!$result) {
            return false;
        }

        return $result;
    }

    public static function changeQuantity(array $data)
    {

        $cart = static::where("id", $data["id"])->first()->load("product");

        $result = tap($cart)->update(["quantity" => $data["quantity"], "total" => ($cart->quantity > $data["quantity"] ? $cart->total - $cart->product->price : $cart->product->price + $cart->total)]);

        if (!$result) {
            return false;
        }

        return $result;
    }

    public static function changeSide(array $data)
    {
        $result = tap(static::where("id", $data["id"]))->update([$data["side"] => $data["value"]])->first()->load("product");
        if (!$result) {
            return false;
        }

        return $result;
    }

    public static function toggleBuildPrice(array $data)
    {
        $cart = static::where("id", $data["id"])->first()->load("product");

        if (!$cart) {
            return false;
        }

        $result = tap($cart)->update(["has_build" => !$cart->has_build, "total" => $cart->product->price * $cart->quantity + ($cart->has_build ? 0 : $cart->product->build_price)]);

        if (!$result) {
            return false;
        }

        return $result;
    }

    public static function toggleAllBuildPrices(bool $val)
    {
        $carts = static::all()->load("product");

        if (!$carts) {
            return false;
        }

        $result = $carts->map(function ($cart) use ($val) {
            return tap($cart)->update(["has_build" => $val, "total" => $cart->product->price * $cart->quantity + ($val ? $cart->product->build_price : 0)]);
        });

        if (!$result) {
            return false;
        }

        return $result;
    }

    public static function remove(int $id) {
        $result = static::where("id", $id)->delete();

        if (!$result) {
            return false;
        }

        return $result;
    }
}
