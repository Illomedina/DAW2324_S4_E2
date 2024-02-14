<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetails;

class OrderDetailsController extends Controller
{
    public function index()
    {
        $orders = OrderDetails::all();

        return response()->json($orders);
    }
}
