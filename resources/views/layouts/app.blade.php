<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'E-Learning Academy') }}</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap">
    
    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    <!-- Inertia Head -->
    @inertiaHead
</head>
<body class="font-sans antialiased">
    <div id="app" data-page="{{ json_encode($page) }}">
        @inertia
    </div>
</body>
</html>
