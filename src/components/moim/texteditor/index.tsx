'use client';
import { useEffect, useRef } from 'react';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Toolbar from '@components/moim/texteditor/toolbar';

type TextEditorProps = {
  value?: string;
  onChange: (html: string) => void;
  onImageUpload: (file: File) => void;
  initialImageUrl?: string;
};

const TextEditor = ({
  value,
  onChange,
  onImageUpload,
  initialImageUrl,
}: TextEditorProps) => {
  const hasSetInitialImage = useRef(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      Image,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  useEffect(() => {
    if (
      editor &&
      initialImageUrl &&
      !hasSetInitialImage.current &&
      !editor.getHTML().includes(initialImageUrl)
    ) {
      editor.chain().focus().setImage({ src: initialImageUrl }).run();
      hasSetInitialImage.current = true;
    }
  }, [editor, initialImageUrl]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-md border border-main-default">
      <Toolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent
        editor={editor}
        onClick={() => editor?.chain().focus().run()}
        className="scrollbar-hide flex-1 overflow-y-scroll bg-white px-4 py-2"
      />
    </div>
  );
};

export default TextEditor;
