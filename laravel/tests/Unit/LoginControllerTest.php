<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testRegister()
    {
        $controller = new LoginController();

        // Simular una solicitud de registro con datos válidos
        $request = new Request([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'user' => 'john_doe',
            'password' => 'password123'
        ]);

        // Ejecutar el método register del controlador
        $response = $controller->register($request);

        // Verificar que el usuario se haya creado correctamente
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertTrue(User::where('email', 'john@example.com')->exists());
    }

    public function testLogin()
    {
        // Crear un usuario en la base de datos
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'user' => 'john_doe', // Proporciona un valor para el campo 'user'
            'password' => Hash::make('password123')
        ]);
        // Crear una instancia del controlador
        $controller = new LoginController();

        // Crear una solicitud de inicio de sesión con los datos del usuario
        $request = new Request([
            'email' => 'john@example.com',
            'password' => 'password123'
        ]);

        // Ejecutar el método de inicio de sesión del controlador
        $response = $controller->login($request);

        // Verificar que la respuesta sea exitosa (código 200)
        $this->assertEquals(200, $response->getStatusCode());

        // Verificar que el usuario esté autenticado
        $this->assertTrue(Auth::check());

        // Verificar que el usuario autenticado sea el usuario creado
        $this->assertEquals($user->id, Auth::id());
    }
}
