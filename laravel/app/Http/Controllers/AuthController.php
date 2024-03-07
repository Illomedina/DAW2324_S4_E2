<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {

  
    public function login(LoginRequest $request) {
        // Handles user login request
        // Validates request data with LoginRequest class
        $data = $request->validated();

        // Search for user in DB by username
        $user = User::where('user', $data['user'])->first();

        // Checks if user exists and password is correct
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'username or password is incorrect!'
            ], 401);
        }

        // Generates token with given name and assigns it to user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Creates cookie with token that expires in 1 day
        // $cookie = cookie('token', $token, 60 * 24);

        // Returns user data and generated token to client
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }


  
    /**
     * Logs out the user by deleting the current access token and forgetting the cookie
     * @param  Request $request The request object
     */
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }


   
    /**
     * Returns the user data of the currently authenticated user
     * @param  Request $request The request object
     * @return UserResource      The user data of the authenticated user
     */
    public function user(Request $request) {
        return new UserResource($request->user());
    }

}