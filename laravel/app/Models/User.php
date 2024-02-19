<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

//La clase User hereda el Modelo del usuario desde porque 
//la clase Authenticable hereda del modelo del user

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'idRole',
        'name',
        'username',
        'user',
        'password',
        'email',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relación con la tabla 'roles'
    public function role()
    {
        return $this->belongsTo(Role::class, 'id');
    }

    public function isAdmin(): bool
    {
          // Recuperar el rol del usuario
        $role = $this->role()->first();
        // Verificar si el usuario tiene el rol de administrador
        return $this->role->roleName === 'admin';
    }
}
