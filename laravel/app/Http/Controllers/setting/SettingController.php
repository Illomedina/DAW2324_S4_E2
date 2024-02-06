<?php

namespace App\Http\Controllers\setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;


class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        return $settings;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $setting = new Setting();
        $setting->config=$request->config;
        $setting->value=$request->value;
        $setting->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $setting = Setting::find($id);
       return $setting;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $setting = Setting::findOrFail($request->id);
        $setting->config=$request->config;
        $setting->value=$request->value;
        $setting->save();
        return $setting;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $setting = Setting::destroy($id);
        return $setting;
    }
}
