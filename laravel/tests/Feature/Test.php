<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class Test extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_sum(): void
    {
       $a = 2;
       $b = 3;
       $result = $a +$b;

       $this->assertEquals(5, $result);
    }
}
