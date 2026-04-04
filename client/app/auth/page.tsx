'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { toast } from 'sonner';
import { apiClient } from '../lib/api-client';
import { HOST, LOGIN_ROUTE, SIGNUP_ROUTE } from '../lib/utils/constants';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';

const Auth = () => {
    const router = useRouter();
    const { setUserInfo } = useAppStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateSignUp = () => {
        if (!email.length) {
            toast.error('Email is Required');
            return false;
        }
        if (!password.length) {
            toast.error('Password is Required');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password should be same');
            return false;
        }
        return true;
    }
    const validateLogin = () => {
        if (!email.length) {
            toast.error('Email is Required');
            return false;
        }
        if (!password.length) {
            toast.error('Password is Required');
            return false;
        }
        return true;
    }
    const handleLogin = async () => {   
        if (validateLogin()) {
            const response = await apiClient.post(LOGIN_ROUTE, { email, password });
            console.log(HOST)
            if (response.data.user._id) {
                console.log(response.data);
                
                setUserInfo(response.data.user);
                if (response.data.user.profileSetup) {
                    router.push('/chat');
                }
                else {
                    router.push('/profile');
                }
            }
        }
    }
    const handleSignUp = async () => {
        if (validateSignUp()) {
            const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
            if (response.status === 201) {
                setUserInfo(response.data.user);
                router.push('/profile');;
            }

        }
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className="h-[80vh] w-[80vw] bg-white border-2 border-white shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className='flex items-center justify-center flex-col'>
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                        </div>
                        <p className='font-medium text-center'>Fill in the details to get started with the best Chat App</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className='w-3/4' defaultValue='login'>
                            <TabsList className='bg-transparent rotate-none w-full'>
                                <TabsTrigger className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300' value='login'>Login</TabsTrigger>
                                <TabsTrigger className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300' value='signup'>Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent className='flex flex-col gap-5' value='login'>
                                <Input placeholder='Email' type='email' className='rounded-full p-6' value={email} onChange={e => setEmail(e.target.value)}></Input>
                                <Input placeholder='Password' type='password' className='rounded-full p-6' value={password} onChange={e => setPassword(e.target.value)}></Input>
                                <Button className='rounded-full p-6' onClick={handleLogin}>Login</Button>
                            </TabsContent>
                            <TabsContent className='flex flex-col gap-5' value='signup'>
                                <Input placeholder='Email' type='email' className='rounded-full p-6' value={email} onChange={e => setEmail(e.target.value)}></Input>
                                <Input placeholder='Password' type='password' className='rounded-full p-6' value={password} onChange={e => setPassword(e.target.value)}></Input>
                                <Input placeholder='Confirm Password' type='password' className='rounded-full p-6' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Input>
                                <Button className='rounded-full p-6' onClick={handleSignUp}>Sign Up</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth