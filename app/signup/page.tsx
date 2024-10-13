"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import InputField from "../(componnents)/InputField";
import FlashMessage from "../(componnents)/FlashMessage";

const SignUpPage = () => {
    const router = useRouter();
    const [flashMessage, setFlashMessage] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async () => {
        const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
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
        <div className="center-top">
            {flashMessage && <FlashMessage message={flashMessage} type='error' />}
            <h1 className='text-5xl font-bold'>SignUp Page</h1>
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
            <InputField
                className="mt-5"
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button 
                className=
                {   password !== confirmPassword || password === "" ?
                    "mt-5 bg-neutral-500 text-white py-2 px-4 rounded w-full hover:bg-neutral-600 transition" : 
                    "mt-5 bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
                } 
                type='submit'
                disabled={password !== confirmPassword || password === ""}
                onClick={() => handleSubmit()}>
                    Sign Up
            </button>
        </div>
    );
}

export default SignUpPage;