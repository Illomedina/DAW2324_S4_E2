<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware {
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    //funcion que se encarga de redireccionar al usuario, en este caso solo devolvemos mensaje porque react se encarga de redireccionar al usuario
     protected function redirectTo($request)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        } else {
            return abort(401);
        }
    }

    //funcion que verifica si el token existe en la cookie y la añade como autorizacion a la cabecera 
    public function handle($request, Closure $next, ...$guards) {

        if ($token = $request->cookie('token')) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        $this->authenticate($request, $guards);

        return $next($request);
    }
    

}