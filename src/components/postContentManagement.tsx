'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useCallback } from 'react'
import StarterKit from '@tiptap/starter-kit'
import { AiOutlineItalic } from '@react-icons/all-files/ai/AiOutlineItalic'
import { AiOutlineBold } from '@react-icons/all-files/ai/AiOutlineBold'
import { AiOutlineUnderline } from '@react-icons/all-files/ai/AiOutlineUnderline'
import { AiOutlineStrikethrough } from '@react-icons/all-files/ai/AiOutlineStrikethrough'
import { AiOutlineLink } from '@react-icons/all-files/ai/AiOutlineLink'
import { AiOutlineAlignLeft } from '@react-icons/all-files/ai/AiOutlineAlignLeft'
import { AiOutlineAlignCenter } from '@react-icons/all-files/ai/AiOutlineAlignCenter'
import { AiOutlineAlignRight } from '@react-icons/all-files/ai/AiOutlineAlignRight'
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList'
import { AiOutlineOrderedList } from '@react-icons/all-files/ai/AiOutlineOrderedList'
import { BsCode } from '@react-icons/all-files/bs/BsCode'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight, Options } from 'lowlight'


interface IProps {
    placeholder?: string,
    className?: string
}

const PostContentManagement = ({ placeholder, className }: IProps) => {
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
            ListItem.extend({
                addKeyboardShortcuts() {
                    return {
                        'Tab': () => {
                            this.editor?.chain()
                                .sinkListItem('listItem')
                                .command(({ tr }) => {
                                    tr.insertText('     ')
                                    return true
                                })
                                .run()

                            return true
                        }
                    }
                }
            }),
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
                class: 'focus:outline-none p-5 h-full',
            },

        },
        content: '',

    })

    const setLink = useCallback(
        () => {
            const previousUrl = editor?.getAttributes('link').href
            const url = window.prompt('URL', previousUrl)

            if (url === null) {
                return
            }

            if (url === '') {
                editor?.chain().focus().extendMarkRange('link').unsetLink()
                    .run()
                return
            }

            editor?.commands.toggleLink({ href: url })
        },
        [editor]
    )

    return (
        <div className='bg-white border-2 border-gray border-opacity-20 rounded-md mt-2.5'>
            <div className='bg-gray bg-opacity-20 w-full flex flex-wrap text-2xl items-center gap-5 p-1 text-gray' >
                <div className='flex gap-1'>
                    <button
                        className={`${editor?.isActive('italic') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleItalic()}><AiOutlineItalic /></button>
                    <button
                        className={`${editor?.isActive('bold') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleBold()}><AiOutlineBold /></button>
                    <button
                        className={`${editor?.isActive('underline') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleUnderline()}><AiOutlineUnderline /></button>
                    <button
                        className={`${editor?.isActive('strike') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleStrike()}><AiOutlineStrikethrough /></button>
                    <button
                        onClick={setLink}><AiOutlineLink /></button>
                </div>
                <span>|</span>
                <div className='flex gap-1'>
                    <button
                        className={`${editor?.isActive({ textAlign: 'left' }) && 'text-black'} p-2`}
                        onClick={() => editor?.commands.setTextAlign('left')}><AiOutlineAlignLeft /></button>
                    <button
                        className={`${editor?.isActive({ textAlign: 'center' }) && 'text-black'} p-2`}
                        onClick={() => editor?.commands.setTextAlign('center')}><AiOutlineAlignCenter /></button>
                    <button
                        className={`${editor?.isActive({ textAlign: 'right' }) && 'text-black'} p-2`}
                        onClick={() => editor?.commands.setTextAlign('right')}><AiOutlineAlignRight /></button>
                    <button
                        className={`${editor?.isActive('bulletList') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleBulletList()}><AiOutlineUnorderedList /></button>
                    <button
                        className={`${editor?.isActive('orderedList') && 'text-black'} p-2`}
                        onClick={() => editor?.commands.toggleOrderedList()}><AiOutlineOrderedList /></button>
                </div>
                <span>|</span>
                <div className='flex gap-3'>
                    <button onClick={() => editor?.commands.toggleCodeBlock()}><BsCode /></button>
                </div>
            </div>
            <EditorContent
                className='h-[232px] overflow-auto'
                editor={editor} />
        </div>
    )
}

export default PostContentManagement