'use client';

import { cn } from '@/lib/className';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import html2canvas from 'html2canvas';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>✨ Find flow...</p>',
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

  const contentRef = useRef(null);

  const playShutterSound = async () => {
    const audioContext = new window.AudioContext();
    const response = await fetch('/static/camera.mp3');
    const audioData = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(audioData);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  const handleDownload = async () => {
    if (contentRef.current) {
      setTakeScreenshot(true);
      // sleep for 500ms to allow the flash to show

      await new Promise((r) => setTimeout(r, 200));

      playShutterSound();
      html2canvas(contentRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'viewport-image.png';
        link.click();
      });
    }
  };

  const [takeScreenshot, setTakeScreenshot] = useState(false);

  useEffect(() => {
    if (takeScreenshot) {
      const timer = setTimeout(() => {
        setTakeScreenshot(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [takeScreenshot]);

  return (
    <>
      {takeScreenshot && <div className="flash"></div>}

      <div
        className={cn(
          'flex flex-col gap-16 bg-white dark:bg-gray-900',
          takeScreenshot ? 'max-w-3xl p-24' : 'mx-auto w-full max-w-2xl',
        )}
        ref={contentRef}
      >
        <div className="text-quaternary space-y-4">
          <p>~{date}</p>
          <div className="text-quaternary border-t border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-600"></div>
        </div>
        <EditorContent editor={editor} />
      </div>
      <div className="mx-auto mt-8 max-w-2xl">
        <button onClick={handleDownload} className="text-quaternary  text-xs">
          Take Screenshot
        </button>
      </div>
    </>
  );
}
