import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth";
export async function POST (request: NextRequest){
    const session = await auth()


    if(!session?.user || !session?.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {

        const data = await request.json();

        const notes = await prisma.note.create({
            data: {
                ...data,
                createdById: session.user.id,
            },
        });

        return NextResponse.json(notes)


    }
    catch (err){
        console.log(err)
        return new NextResponse("Internal Server Error!", {status: 500});
    }

}
export async function GET (request: NextRequest){
    
const session = await auth()

    if(!session?.user || !session?.user.id){
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
        const notes = await prisma.note.findMany({
        where: {
            createdById: session.user.id,
        },
    });

    return NextResponse.json(notes);
    
    

    
 } catch (err){
        console.log(err)
        return new NextResponse("Internal Server Error!", {status: 500});
    }

}


export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const data = await request.json();
    const { id, title, content, tag } = data;

    if (!id) {
      return new NextResponse("Missing note ID", { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: id,
        createdById: session.user.id, // ensure the user owns the note
      },
      data: {
        title,
        content,
        tag,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
}