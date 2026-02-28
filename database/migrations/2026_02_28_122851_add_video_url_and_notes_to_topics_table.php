<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            if (!Schema::hasColumn('topics', 'notes')) {
                $table->text('notes')->nullable();
            }
            if (Schema::hasColumn('topics', 'duration_minutes')) {
                $table->renameColumn('duration_minutes', 'duration');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            if (Schema::hasColumn('topics', 'notes')) {
                $table->dropColumn('notes');
            }
            if (Schema::hasColumn('topics', 'duration')) {
                $table->renameColumn('duration', 'duration_minutes');
            }
        });
    }
};
