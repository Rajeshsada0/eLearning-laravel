<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->datetime('enrolled_at');
            $table->datetime('completed_at')->nullable();
            $table->decimal('progress_percentage', 5, 2)->default(0);
            $table->string('status')->default('active'); // active, completed, cancelled
            $table->string('payment_status')->default('pending'); // pending, completed, failed, refunded
            $table->decimal('amount_paid', 8, 2)->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'course_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
