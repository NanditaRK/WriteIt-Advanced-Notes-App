'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user?.name;

  return (
    <main className="min-h-screen bg-no-repeat bg-cover bg-[url(@/public/hero.svg)] text-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl text-center space-y-6"
      >
        <motion.h1
          className="text-4xl leading-18 md:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {session ? (<div>Welcome back, <span className="bg-red-300">{user}!</span></div>) : 'Welcome to WriteIt'}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {session ? (
            <>
              Create a new note or view your existing ones{' '}
              <Link href="/notes" className="underline hover:text-red-500 transition">
                here
              </Link>.
            </>
          ) : (
            <>
              <Link href="/signin" className="underline hover:text-red-500 transition">
                Sign in
              </Link>{' '}
              or{' '}
              <Link href="/signup" className="underline hover:text-red-500 transition">
                create an account
              </Link>{' '}
              to start writing effortlessly.
            </>
          )}
        </motion.p>

        {!session && (
          <motion.div
            className="flex justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/signin">
              <button className="px-6 py-2 border text-red-500 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-transparent hover:text-red-500 border border-red-500 transition">
                Sign Up
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
