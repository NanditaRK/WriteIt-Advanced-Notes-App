'use client'
import { Button } from '@/src/components/ui/button'
import { login } from '@/src/lib/authFunctions'
import React from 'react'

const GoogleLoginButton = () => {
  return (
    <Button onClick={login} variant="outline" className="w-full">
          Login with Google
        </Button>
  )
}

export default GoogleLoginButton;