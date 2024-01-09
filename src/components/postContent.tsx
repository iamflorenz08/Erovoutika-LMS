'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

interface IProps {
    content: string,
    className?: string,
}

const PostContent = ({ content, className }: IProps) => {
    const lowlight = createLowlight(common)
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                orderedList: false,
                listItem: false,
                bulletList: false,
            }),
            Underline,
            ListItem,
            Link.configure({
                HTMLAttributes: {
                    class: 'text-blue-500 underline'
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc px-10'
                }
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal px-10'
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'bg-black text-white p-2 rounded-md my-3'
                }
            })
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none p-5 h-full z-0',
            },
        },
        content: content
    })

    editor?.setEditable(false)
    
    return (
        <EditorContent
            className={`overflow-auto ${className}`}
            editor={editor} />
    )
}

export default PostContent