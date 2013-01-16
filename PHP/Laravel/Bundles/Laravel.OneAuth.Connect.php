<?php

class Connect_Controller extends OneAuth\Auth\Controller {
    protected function action_error($provider=null, $e='')
    {
        return View::make('auth.errors', compact('provider', 'e'));
    }

    public function action_register()
    {
        if (!is_null($user_data = OneAuth\Auth\Core::session())) {
            $client = OneAuth\Auth\Client::where('provider', '=', $user_data['provider'])
                                ->where('uid', '=', $user_data['info']['uid'])
                                ->first();
                                
                          
            if (! empty($client->user_id)) {
               return Redirect::to('connect/login');
            } else {
                if ($current_user = User::where_email($user_data['info']['email'])->first()) {
                    $client->user_id = $current_user->id;
                    $client->save();
                    
                    Auth::login($current_user->id);
                    return Redirect::to('/home'); 
                } else {
                    $user_name = explode(' ', $user_data['info']['name']);
                    $user = new User();
                    $user->first_name = $user_name[0];
                    $user->last_name = $user_name[1];
                    $user->email = $user_data['info']['email'];
                    $user->password = Hash::make(Str::random(32));
                    
                    if ($user->save()) {
                        $client->user_id = $user->id;
                        $client->save();
                        
                        Auth::login($user->id);
                        return Redirect::to('/home'); 
                    }
                }
    
                return OneAuth\Auth\Core::redirect('registered');
            }
        }
    }

    public function action_login()
    {
        $user_data = Session::get('oneauth');
        
        $user = User::where_email($user_data['info']['email'])->first();
        
        Session::forget('user_data');
        
        if (!is_null($user)) {
            Auth::login($user->id, true);
        } else {
            return Redirect::to('login')->with('notice', 'Login is not valid');
        }
    }
}

?>