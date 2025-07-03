
'use client'
import React from 'react'
import { FormEvent } from 'react'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet"
import Image from 'next/image'
import newNote from '@/public/pencil.svg'

const CreateNoteButton = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      content: " ",
      tag: formData.get('tag'),
    };


    try {
      console.log(data)
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      window.location.href = '/notes';

    } catch (err){
      console.log("Error sending form to backend.")
    }
  }


  return (
     <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className=' absolute m-4 right-0 bottom-0 overflow-auto p-0 rounded-full w-16 h-16' variant="default"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler w-6 h-6 block icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new note</SheetTitle>
          <SheetDescription>
            Create a new note with a specific tag. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="title-label">Title of Note</Label>
            <Input name="title" required defaultValue="Chemistry 101 Notes" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="tag-label">Note Tag</Label>
            <Input name="tag" required defaultValue="Science" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Add Note</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateNoteButton;