"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';import { checkId } from "@/utils/account";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const idSuccsess = await checkId(id ? id : "");
    if (idSuccsess) {
        return Response.json({
            "exist": true
        })
    } else {
        return Response.json({
            "exist": false
        })
    }
}

import InputField from '../../(componnents)/InputField';
import FlashMessage from '../../(componnents)/FlashMessage';

const SigninPage = ({ params }: { params: { id: string }}) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [flashMessage, setFlashMessage] = useState<string>("");
    const [flashMessageType, setFlashMessageType] = useState<string>("error");

    useEffect(() => {
        const checkIdFunc = async () => {
            const response = await fetch(`/api/checkId?id=${params.id}`);
            const data = await response.json();
            if (data.exist) {
                setFlashMessageType("success");
                setFlashMessage("Accout created successfuly!");
            }
        }
        checkIdFunc();
    }, []);

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
            setFlashMessageType("error");
            setFlashMessage(data.message);
        }
    };

    return (
        <div className='center-top'>
          {flashMessage && <FlashMessage message={flashMessage} type={flashMessageType} />}
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
            <p className="mt-5 text-center">
                Don't have an account? <Link href="/signup" className='text-cyan-500 hover:text-cyan-700 transition'>Sign Up</Link> </p>
        </div>
    );
}

export default SigninPage;