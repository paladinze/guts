// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { BaseEditor, Descendant, createEditor } from 'slate'
import React, { useState } from 'react'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'


type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}


const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

export function AppSlate() {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <>
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
    </>
  );
}

export default AppSlate;
