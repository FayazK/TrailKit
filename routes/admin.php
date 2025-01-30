<?php

use Illuminate\Support\Facades\Route;

Route::get( '/', function() {
    return inertia( 'Admin/Dashboard/Dashboard' );
} );
