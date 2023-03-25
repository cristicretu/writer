'use client';

import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Find flow...</p>',
    editorProps: {
      attributes: {
        class:
          'prose-quoteless prose-sm prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-neutral dark:prose-invert focus:outline-none gap-0',
      },
    },
  });

  // memoize the date
  const date = useMemo(
    () =>
      new Date().toLocaleString('locale', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="text-quaternary space-y-4">
        <p>~{date}</p>
        <div className="text-quaternary border-t border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-600"></div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
