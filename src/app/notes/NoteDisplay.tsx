'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
/*
model Note {
  id String @id @default(cuid())
  title String?
  tag String?
  createdAt DateTime @default(now())
  content String? @db.Text
  createdBy User @relation("CreatedNotes", fields: [createdById], references: [id])
  createdById String
}
*/
type Note = {
    id: number,
    title: string,
    tag: string,
    content: string,
    createdAt: string,
}
const NoteDisplay = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = (id: number) => {
  router.push(`/notes/${id}`);
};



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data: Note[] = await response.json();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl w-fit font-bold mx-auto text-gray-800 my-8">All <span className='bg-red-300'> Notes </span></h1>
        {notes.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            No notes available. Check back later or add some new notes!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleClick(note.id)}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                <p className="text-sm bg-red-500 rounded-4xl w-fit px-2 text-white mb-2"> # {note.tag}</p>
                <p className="text-sm  text-gray-600 mb-2"> {note.content.slice(0, 100).replace(/<\/?[^>]+(>|$)/g, "")}...</p>
                <p className="text-sm text-gray-700 mb-1">{note.createdAt.slice(0,10)}</p>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDisplay;