<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @section('content')
        <div class="container mx-auto mt-8">
            <form action="{{ route('users.update', $user->id) }}" method="POST" class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                @csrf
                @method('PUT')

                <div class="mb-4">
                    <label for="name" class="block text-gray-600 text-sm font-semibold mb-2">Nombre:</label>
                    <input type="text" name="name" id="name" value="{{ old('name', $user->name) }}" class="w-full p-2 border border-gray-300 rounded-md">
                </div>

                <div class="mb-4">
                    <label for="surname" class="block text-gray-600 text-sm font-semibold mb-2">Apellido:</label>
                    <input type="text" name="surname" id="surname" value="{{ old('surname', $user->surname) }}" class="w-full p-2 border border-gray-300 rounded-md">
                </div>

                <div class="mb-4">
                    <label for="user" class="block text-gray-600 text-sm font-semibold mb-2">Usuario:</label>
                    <input type="text" name="user" id="user" value="{{ old('user', $user->user) }}" class="w-full p-2 border border-gray-300 rounded-md">
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-600 text-sm font-semibold mb-2">Contraseña:</label>
                    <input type="password" name="password" id="password" class="w-full p-2 border border-gray-300 rounded-md">
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-600 text-sm font-semibold mb-2">Correo Electrónico:</label>
                    <input type="email" name="email" id="email" value="{{ old('email', $user->email) }}" class="w-full p-2 border border-gray-300 rounded-md">
                </div>

                <div class="flex items-center justify-end">
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Actualizar</button>
                </div>
            </form>
        </div>
    @endsection
</body>
</html>