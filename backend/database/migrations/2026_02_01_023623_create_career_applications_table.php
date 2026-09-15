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
        Schema::create('career_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('location')->nullable();
            $table->string('role')->nullable();
            $table->string('experience')->nullable();
            $table->string('work_type')->nullable();
            $table->string('notice_period')->nullable();
            $table->string('portfolio_url')->nullable();
            $table->text('about')->nullable();
            $table->string('resume_path')->nullable();
            $table->boolean('agreed')->default(false);
            $table->string('status')->default('new');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_applications');
    }
};
