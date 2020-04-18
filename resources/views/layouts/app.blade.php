<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="{{ asset('manifest.json') }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Webcipe') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('images/webcipe.svg') }}">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- <link href="https://fonts.googleapis.com/css?family=Poppins:300,500,700&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css?family=Questrial&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root">
        
    </div>

    <!-- React -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
