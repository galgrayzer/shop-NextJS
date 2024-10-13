"use client";

import { useState } from 'react';

import InputField from '../(componnents)/InputField';

const SigninPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        console.log(username, password);
    };

    return (
        <div className='center-top'>
          <h1 className='text-5xl font-bold'>SignIn Page</h1>
          <form onSubmit={() => handleSubmit()}>
            <InputField
              className="mt-10"
              label='Username'
              name='username'
              type='text'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <InputField
              className="mt-5"
              label='Password'
              name='password'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition" type='submit'>Sign In</button>
          </form>
        </div>
    );
}

export default SigninPage;