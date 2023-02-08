<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = array(
            array(
              "name" => "Product 1",
              "code" => "HQ",
              "description" => "A high-quality product",
              "price" => 100,
              "build_price" => 80
            ),
            array(
              "name" => "Product 2",
              "code" => "AF",
              "description" => "An affordable product",
              "price" => 50,
              "build_price" => 40
            ),
            array(
              "name" => "Product 3",
              "code" => "PM",
              "description" => "A premium product",
              "price" => 200,
              "build_price" => 150
            )
        );

        foreach($products as $product) {
            Product::create($product);
        }
    }
}
