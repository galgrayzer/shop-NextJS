"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import InputField from '../(componnents)/InputField';
import FlashMessage from '../(componnents)/FlashMessage';

const SigninPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [flashMessage, setFlashMessage] = useState<string>("");

    const handleSubmit = async () => {
        const response = await fetch("/api/signin", {
            method: "POST", 
            body: JSON.stringify(
            {
                "username": username,
                "password": password
            }),
            mode: "no-cors",
        });
        const data = await response.json();
        if (data.status === 300) {
            router.push(data.redirect);
        } else {
            console.log(data.message);
            setFlashMessage(data.message);
        }
    };

    return (
        <div className='center-top'>
          {flashMessage && <FlashMessage message={flashMessage} type='error' />}
          <h1 className='text-5xl font-bold'>SignIn Page</h1>
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
            <button 
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition" 
            type='submit'
            onClick={() => handleSubmit()}>
                Sign In
            </button>
        </div>
    );
}

export default SigninPage;