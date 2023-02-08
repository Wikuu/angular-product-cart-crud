<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'code',
        'price',
        'build_price',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'price' => 'float',
        'build_price' => 'float',
    ];

    public static function getProducts() {
        $products = static::all();
        if(!$products) {
            return false;
        }

        return $products;
    }

    public static function store(array $data) {
        $create = static::create($data);

        if(!$create) {
            return false;
        }

        return $create;
    }

    public static function updateProduct(array $data) {
        $product = static::where("id", $data["id"])->update($data)->first();

        if(!$product) {
            return false;
        }

        return $product;
    }

    public static function removeProduct(int $id) {
        $delete = static::where("id", $id)->delete();
        if(!$delete) {
            return false;
        }

        return true;
    }
}
