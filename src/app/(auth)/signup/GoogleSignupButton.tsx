'use client'
import { Button } from '@/src/components/ui/button'
import { login } from '@/src/lib/authFunctions'
import React from 'react'

const GoogleSignupButton = () => {
  return (
    <Button onClick={login} variant="outline" className="w-full">
          Sign Up with Google
        </Button>
  )
}

export default GoogleSignupButton;