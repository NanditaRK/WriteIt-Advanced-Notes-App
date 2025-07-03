'use client'
import { useEffect, useState } from 'react';
import { Editor } from '@/src/components/Editor';
import { useParams } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}
interface Props {
    params: {
        id: string;
    }
}
export default function NotePage() {
  const params = useParams()
  const  id  = params.id;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      setNote(data);
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note) return;

    toast("Note has been saved")

    await fetch(`/api/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
  };

  if (loading || !note) return <p>Loading...</p>;

  return (
    <div>
      <h1 className='text-3xl text-center font-bold my-4'>{note.title}</h1>
      <Editor content={note.content} onChange={(content) => setNote({ ...note, content })} />
      <div className='my-8 flex w-full justify-center'>
        <Button className='w-24' onClick={handleSave}>Save</Button>
      </div>
      
    </div>
  );
}
