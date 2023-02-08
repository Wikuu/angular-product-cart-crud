<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->increments("id");

            $table->integer("product_id")->unsigned();
            $table->index("product_id");
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');

            $table->integer('quantity')->default(1);
            $table->enum("hinge_side", ["L", "R", "-"])->default("-");
            $table->enum("exposed_side", ["L", "R", "B", "-"])->default("-");
            $table->boolean('has_build')->default(false);
            $table->float('total', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts', function(Blueprint $table) {
            $table->dropForeign('product_id');
            $table->dropIndex('product_id');
        });
    }
};
