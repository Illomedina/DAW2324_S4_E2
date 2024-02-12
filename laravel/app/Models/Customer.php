<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customers'; // Nombre de la tabla en la base de datos

    protected $primaryKey = 'idCustomer'; // Clave primaria personalizada

    protected $fillable = [
        'name',
        'surname',
        'username',
        'password',
        'mail',
        'phone',
        'address',
        'postcode',
        'idCountry',
        'is_validated',
        'membershipDate',
        'customerStatus'
    ];

    protected $hidden = [
        'password',
    ];
    

    protected $casts = [
        'is_validated' => 'boolean',
        'membershipDate' => 'datetime',
    ];
}
