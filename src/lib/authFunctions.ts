

// import {signIn, signOut } from './auth'
import { signIn, signOut } from "next-auth/react";
export const login = async () => {
    signIn('google', { callbackUrl: '/' });
};

export const logout = async () => {
    signOut({ callbackUrl: '/signin' });
};