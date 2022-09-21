import Quill from 'quill'
import QuillCursors from 'quill-cursors'

import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'

import { WebrtcProvider } from 'y-webrtc'


Quill.register('modules/cursors', QuillCursors);

const quill = new Quill(document.querySelector('#editor')!, {
  modules: {
    cursors: true,
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true
    }
  },
  placeholder: 'Start collaborating...',
  theme: 'snow' // 'bubble' is also great
})


// A Yjs document holds the shared data
const ydoc = new Y.Doc()

// Define a shared text type on the document
const ytext = ydoc.getText('quill')


const provider = new WebrtcProvider('quill-demo-room', ydoc);

// Create an editor-binding which
// "binds" the quill editor to a Y.Text type.
const binding = new QuillBinding(ytext, quill, provider.awareness)

// Remove the selection when the iframe is blurred
window.addEventListener('blur', () => { quill.blur() })

const awareness = provider.awareness

// You can observe when a user updates their awareness information
awareness.on('change', () => {
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(Array.from(awareness.getStates().values()))
})

// You can think of your own awareness information as a key-value store.
// We update our "user" field to propagate relevant user information.
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: 'Emmanuelle Charpentier',
  user: 'Emmanuelle Charpentier',
  // Define a color that should be associated to the user:
  color: '#ffb61e' // should be a hex color
})
