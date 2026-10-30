'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Sun,
  Moon,
  Code2,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write article content here...',
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [rawHtml, setRawHtml] = useState(content || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark'>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync canvas theme with admin theme or user preference
  useEffect(() => {
    const syncTheme = () => {
      const savedCanvas = localStorage.getItem('amplipath_canvas_theme');
      if (savedCanvas === 'light' || savedCanvas === 'dark') {
        setCanvasTheme(savedCanvas);
      } else {
        const adminTheme = localStorage.getItem('amplipath_admin_theme');
        setCanvasTheme(adminTheme === 'dark' ? 'dark' : 'light');
      }
    };
    syncTheme();
    window.addEventListener('amplipath_theme_changed', syncTheme);
    return () => window.removeEventListener('amplipath_theme_changed', syncTheme);
  }, []);

  const toggleCanvasTheme = () => {
    const next = canvasTheme === 'light' ? 'dark' : 'light';
    setCanvasTheme(next);
    localStorage.setItem('amplipath_canvas_theme', next);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-md max-w-full my-4 border border-slate-300 dark:border-slate-800 shadow-md',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-500 font-medium',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'tiptap-content max-w-none min-h-[420px] p-6 sm:p-8 focus:outline-none text-sm leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setRawHtml(html);
      onChange(html);
    },
  });

  // Sync content if changed externally (e.g. form reset or initial load)
  useEffect(() => {
    if (editor && content !== editor.getHTML() && mode === 'visual') {
      editor.commands.setContent(content || '', { emitUpdate: false });
    }
    setRawHtml(content || '');
  }, [content, editor, mode]);

  // Switch to Visual Mode
  const handleSwitchToVisual = () => {
    if (editor && rawHtml !== editor.getHTML()) {
      editor.commands.setContent(rawHtml || '', { emitUpdate: false });
    }
    setMode('visual');
  };

  // Switch to HTML Mode
  const handleSwitchToHtml = () => {
    if (editor) {
      setRawHtml(editor.getHTML());
    }
    setMode('html');
  };

  // Raw HTML edit handler
  const handleRawHtmlChange = (newHtml: string) => {
    setRawHtml(newHtml);
    onChange(newHtml);
    if (editor) {
      editor.commands.setContent(newHtml, { emitUpdate: false });
    }
  };

  // Direct 1-Click Image Upload (like WordPress Media Uploader)
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');

      if (data.files && data.files.length > 0) {
        const imageUrl = data.files[0].url;

        if (mode === 'visual' && editor) {
          editor.chain().focus().setImage({ src: imageUrl, alt: file.name }).run();
        } else {
          const imgTag = `\n<img src="${imageUrl}" alt="${file.name}" class="rounded-md max-w-full my-4" />\n`;
          handleRawHtmlChange(rawHtml + imgTag);
        }
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Image by URL prompt
  const handleInsertImageUrl = () => {
    const url = prompt('Enter Image URL (or /uploads/... from Media Library):');
    if (!url) return;
    if (mode === 'visual' && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      handleRawHtmlChange(rawHtml + `\n<img src="${url}" alt="Article image" class="rounded-md max-w-full my-4" />\n`);
    }
  };

  // Link Prompt
  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = prompt('Enter Link Destination URL:', previousUrl || 'https://');

    if (url === null) return; // cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Determine current active block tag for WordPress-style dropdown
  const getActiveBlock = () => {
    if (!editor) return 'p';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    if (editor.isActive('blockquote')) return 'blockquote';
    if (editor.isActive('codeBlock')) return 'codeBlock';
    return 'p';
  };

  const handleBlockChange = (tag: string) => {
    if (!editor) return;
    editor.chain().focus();

    switch (tag) {
      case 'p':
        editor.chain().focus().setParagraph().run();
        break;
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'h4':
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case 'blockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'codeBlock':
        editor.chain().focus().toggleCodeBlock().run();
        break;
    }
  };

  const isLight = canvasTheme === 'light';

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-lg transition-colors ${
        isLight
          ? 'border-slate-300 bg-white'
          : 'border-slate-800 bg-slate-950'
      }`}
    >
      {/* WordPress-Grade Toolbar */}
      <div
        className={`border-b p-2.5 flex flex-wrap items-center justify-between gap-2 sticky top-0 z-20 transition-colors ${
          isLight
            ? 'bg-slate-100 border-slate-200 text-slate-800'
            : 'bg-slate-900 border-slate-800 text-slate-200'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {/* 1. Block Selector Dropdown (Paragraph, H1, H2, H3, H4, Quote) */}
          <div className="relative">
            <select
              value={getActiveBlock()}
              disabled={mode !== 'visual'}
              onChange={(e) => handleBlockChange(e.target.value)}
              className={`px-3 py-1.5 border rounded-md text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 transition-colors ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                  : 'bg-slate-950 border-slate-700 text-white hover:border-slate-600'
              }`}
              title="Change Block Format (Paragraph or Heading)"
            >
              <option value="p">Paragraph (Normal Text)</option>
              <option value="h1">Heading 1 (Main Title)</option>
              <option value="h2">Heading 2 (Section Title)</option>
              <option value="h3">Heading 3 (Subsection)</option>
              <option value="h4">Heading 4 (Minor Heading)</option>
              <option value="blockquote">Blockquote (Quote)</option>
              <option value="codeBlock">Code Block</option>
            </select>
          </div>

          <div className={`h-5 w-px mx-1 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          {/* 2. Inline Text Formatting (Bold, Italic, Strikethrough) */}
          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`w-7 h-7 rounded text-xs transition flex items-center justify-center ${
              editor?.isActive('bold')
                ? 'bg-blue-600 text-white shadow-sm'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`w-7 h-7 rounded text-xs transition flex items-center justify-center ${
              editor?.isActive('italic')
                ? 'bg-blue-600 text-white shadow-sm'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`w-7 h-7 rounded text-xs transition flex items-center justify-center ${
              editor?.isActive('strike')
                ? 'bg-blue-600 text-white shadow-sm'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <div className={`h-5 w-px mx-1 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          {/* 3. Lists (Bullet & Ordered) */}
          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`px-2.5 h-7 rounded text-xs font-medium transition flex items-center gap-1.5 ${
              editor?.isActive('bulletList')
                ? 'bg-blue-600 text-white shadow-sm'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bullet</span>
          </button>

          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`px-2.5 h-7 rounded text-xs font-medium transition flex items-center gap-1.5 ${
              editor?.isActive('orderedList')
                ? 'bg-blue-600 text-white shadow-sm'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Numbered</span>
          </button>

          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
            className={`w-7 h-7 rounded text-xs transition flex items-center justify-center disabled:opacity-40 ${
              isLight
                ? 'text-slate-700 hover:bg-slate-200'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className={`h-5 w-px mx-1 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          {/* 4. Link */}
          <button
            type="button"
            disabled={mode !== 'visual'}
            onClick={handleSetLink}
            className={`px-2.5 h-7 rounded text-xs font-medium transition flex items-center gap-1.5 ${
              editor?.isActive('link')
                ? 'bg-blue-600 text-white'
                : isLight
                ? 'text-slate-700 hover:bg-slate-200'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40'
            }`}
            title="Insert / Edit Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Link</span>
          </button>

          <div className={`h-5 w-px mx-1 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          {/* 5. DIRECT IMAGE UPLOADER (WordPress Style) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e.target.files)}
          />

          <button
            type="button"
            disabled={uploadingImage}
            onClick={() => fileInputRef.current?.click()}
            className="px-3 h-7 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20 disabled:opacity-50"
            title="Click to choose image from your computer"
          >
            {uploadingImage ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Upload Image</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleInsertImageUrl}
            className={`px-2 h-7 rounded-md text-[11px] font-medium transition ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Insert by Image URL"
          >
            By URL
          </button>

          <div className={`h-5 w-px mx-1 hidden sm:block ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`} />

          {/* 6. Undo / Redo */}
          <button
            type="button"
            disabled={mode !== 'visual' || !editor?.can().undo()}
            onClick={() => editor?.chain().focus().undo().run()}
            className={`w-7 h-7 rounded text-xs disabled:opacity-30 transition flex items-center justify-center hidden sm:flex ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={mode !== 'visual' || !editor?.can().redo()}
            onClick={() => editor?.chain().focus().redo().run()}
            className={`w-7 h-7 rounded text-xs disabled:opacity-30 transition flex items-center justify-center hidden sm:flex ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right side controls: Canvas Theme (Paper vs Dark) & Mode (Visual vs HTML) */}
        <div className="flex items-center gap-2">
          {/* Canvas Theme Toggle (Paper vs Dark Canvas) */}
          <button
            type="button"
            onClick={toggleCanvasTheme}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition border ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-xs'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white'
            }`}
            title="Toggle between White Paper Canvas and Dark Mode Canvas"
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>{isLight ? 'White Paper' : 'Dark Canvas'}</span>
          </button>

          {/* Mode Switcher: Visual (WYSIWYG) vs Raw HTML */}
          <div
            className={`flex items-center gap-1 p-1 rounded-md border ${
              isLight
                ? 'bg-slate-200/80 border-slate-300'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <button
              type="button"
              onClick={handleSwitchToVisual}
              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                mode === 'visual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual (WYSIWYG)
            </button>
            <button
              type="button"
              onClick={handleSwitchToHtml}
              className={`px-3 py-1 rounded text-xs font-semibold transition ${
                mode === 'html'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Raw HTML
            </button>
          </div>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="relative">
        {mode === 'visual' ? (
          <div
            className={`min-h-[420px] transition-colors ${
              isLight
                ? 'bg-white tiptap-light'
                : 'bg-slate-950 tiptap-dark'
            }`}
          >
            <EditorContent editor={editor} />
          </div>
        ) : (
          <div
            className={`p-4 transition-colors ${
              isLight ? 'bg-slate-50' : 'bg-slate-950'
            }`}
          >
            <div
              className={`text-[11px] font-mono mb-2 flex items-center justify-between ${
                isLight ? 'text-slate-600' : 'text-emerald-400'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Direct HTML Editor — edit tags, embed codes, and raw markup.</span>
              </span>
              <span>HTML Code Mode</span>
            </div>
            <textarea
              rows={20}
              value={rawHtml}
              onChange={(e) => handleRawHtmlChange(e.target.value)}
              placeholder="<h2>Heading</h2><p>Content...</p>"
              className={`w-full p-4 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed border ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-emerald-400'
              }`}
            />
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div
        className={`p-2.5 px-4 border-t text-[11px] flex items-center justify-between transition-colors ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-600'
            : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>
              {mode === 'visual'
                ? `Visual ${isLight ? 'Light Paper' : 'Dark Canvas'} Active`
                : 'Raw HTML Source Active'}
            </span>
          </span>
          <span>•</span>
          <span>Images upload directly to local media storage</span>
        </div>
        <span className="font-mono text-slate-500">
          {(rawHtml || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} words
        </span>
      </div>
    </div>
  );
}
