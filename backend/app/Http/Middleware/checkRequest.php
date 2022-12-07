<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class checkRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        $header = $request->header('Authorization');
        if($header === 'trustRequest2022'){
            return $next($request);
        }
        return  response('Invalid Request need token');
    }
}
