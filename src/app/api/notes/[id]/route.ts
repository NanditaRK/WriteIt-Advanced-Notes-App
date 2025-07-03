import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const {id} = await params;

  if(!id){
    return new NextResponse("Missing note ID", { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    const note = await prisma.note.findFirst({
      where: {
        id,
        createdById: session.user.id,
      },
    });

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    return NextResponse.json(note);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
