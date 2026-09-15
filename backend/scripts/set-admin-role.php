<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::where('email', 'admin@example.com')->first();
$role = App\Models\Role::firstOrCreate(['name' => 'admin'], ['label' => 'Administrator']);
if ($user) {
    $user->roles()->syncWithoutDetaching([$role->id]);
    echo "ok\n";
} else {
    echo "no-user\n";
}
