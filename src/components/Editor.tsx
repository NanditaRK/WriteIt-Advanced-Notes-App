'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import React from 'react';
import '../styles/editor.css';

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export const Editor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-4 border border-gray-300 rounded-lg">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          H3
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('bold') ? 'bg-red-400 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <span className='font-serif font-bold'>B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('italic') ? 'bg-red-400 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <span className='font-serif italic'>I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('strike') ? 'bg-red-400 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <span className='font-serif line-through'>S</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive('highlight') ? 'bg-red-400 text-white' : 'bg-white text-gray-800'
          }`}
        >
          Highlight
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: 'left' })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: 'center' })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: 'right' })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: 'justify' })
              ? 'bg-red-400 text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          Justify
        </button>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] border border-gray-300 rounded p-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  );
};
