'use client'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react';
import { logout } from '../lib/authFunctions';
import { Button } from './ui/button';
const Navbar = () => {

    const { data: session} = useSession()


   
  return (

    
    <div>
        <div className='flex flex-row h-12 items-center justify-between'>
            <div className='flex font-bold  text-2xl mx-8'>
                <Link href="/">WriteIt</Link>
            </div>
            { session ? (<div className='flex flex-row w-1/4 justify-between'>
                <div className='flex text-lg flex-row justify-evenly '>
                    
                    <div><Link href="/notes">Notes</Link></div>
                    
                
                </div>
                <div className='mx-8 text-lg'><Button variant="default"><div onClick={logout}>Log Out</div></Button></div>

            </div>) : (<div className='mx-8 text-lg'><Link href="/signin"><Button variant="default">Sign In</Button></Link></div>)}

            
        </div>
    </div>
  )
}

export default Navbar