import { Fragment } from 'react'
import DeleteNoteModal from './delete-note-modal'
import { INote } from './note-list'
import EditNoteModal from './edit-note-modal'

const URL_API = process.env.NEXT_PUBLIC_URL_API!

export default function NoteItem({note} : {note : INote}) {

  const handleArchiveNote = async (note: INote) => {
    let URL =  `${URL_API}notes/${note.id}/${note.archived ? "false" : "true"}`
    try {
        const response = await fetch(URL, {
            method: "PUT",
        })
        console.log(response)
        if (response.ok) {
            window.location.reload()
        } else {
            console.error("Failed to archive note:", response.statusText)
        }
    } catch (error) {
        console.error("Error archiving note:", error)
    }
}

  return (
    <div className="w-full p-4 lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h5 className="text-xs font-bold leading-7 text-gray-900 sm:truncate sm:text-base sm:tracking-tight">
          {note.content}
        </h5>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="ml-3 sm:block">
          <EditNoteModal note = {note} />
        </span>

        <span className="ml-3 sm:block">
          <button
            type="button"
            onClick={()=>handleArchiveNote(note)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {note.archived ? "Unarchive" : "Archive"}
          </button>
        </span>

        <span className="ml-3 sm:ml-3">
          <DeleteNoteModal note_id ={note.id} />
        </span>
      </div>
    </div>
  )
}
