<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;

use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $response = $this->get('/api/users');

        $response->assertStatus(200)
            ->assertJson(User::all()->toArray());
    }

    public function testStore()
    {
        $userData = [
            'name' => 'John',
            'surname' => 'Doe',
            'user' => 'john_doe',
            'email' => 'john@example.com',
            'password' => 'Password12345678',
        ];

        $response = $this->post('/api/createUser', $userData);

        $response->assertStatus(201)
            ->assertJson($userData);

        $this->assertTrue(
            User::where('email', 'john@example.com')
                ->where('password', 'Password12345678')
                ->exists(),
            'The user was not found in the database'
        );
    }



    public function testUpdate()
    {
        $user = User::factory()->create();

        $userData = [
            'name' => 'Updated Name',
            'surname' => 'Updated Surname',
            'user' => 'updated_user',
            'email' => 'updated@example.com',
        ];

        $response = $this->put('/api/users/' . $user->id, $userData);

        $response->assertStatus(200)
            ->assertJson($userData);

        $this->assertDatabaseHas('users', $userData);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();

        $response = $this->delete('/api/users/' . $user->id);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
