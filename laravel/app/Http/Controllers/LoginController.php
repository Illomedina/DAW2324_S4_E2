<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
   
    public function register(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
        
        Auth::login($user);
        // return redirect()->route('');
    }
    
    public function login(Request $request){
        $credentias =[
            "user"=> $request->username,
            "password"=> $request->password
        ];
        

        if(Auth::attempt($credentias)){
            return response()->json(['message' => 'Login successful'], 200);
        }else{
            return response()->json(['message'=>'Login failed'], 401);
        }
    }


    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message'=>'Logged out'], 201);

    }
}
