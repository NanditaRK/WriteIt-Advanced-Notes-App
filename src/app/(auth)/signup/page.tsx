import React from 'react'
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import Link from 'next/link'
import GoogleSignupButton from './GoogleSignupButton'
const SignUpPage = () => {
  return (
    <div className='flex min-h-screen bg-no-repeat bg-cover bg-[url(@/public/hero.svg)] flex-col justify-center items-center'>
      <h1 className='text-4xl my-12 font-bold'>You are just <span className='text-4xl bg-red-300'> a couple clicks </span>away!</h1>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your email below to sign up for an account
        </CardDescription>
        <CardAction>
          <Link href="/signin"><Button variant="link">Sign In</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <GoogleSignupButton />
      </CardFooter>
    </Card>

</div>
  )
}

export default SignUpPage;