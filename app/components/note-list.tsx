import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from './page-header'
import NoteItem from './note-item'
import { ICategory } from './create-note-modal'

export interface INote {
    id : number,
    content : string,
    archived : boolean,
    user_id : number,
    categories : string[]
}

export default function NoteList() {
    const URL_API = process.env.NEXT_PUBLIC_URL_API!
    const [notes, setNotes] = useState <INote[] | []> ([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])    
    
    useEffect(() => {
        const string = selectedCategories.length !== 0 ? "&categories=" + selectedCategories.join('-') : "";
        fetch(URL_API+'notes-categories?archived=false' + string)
        .then(response => response.json())
        .then(data => setNotes(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [selectedCategories]);

    return (
        <>
            <PageHeader selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
            <div className="flex w-full flex-col gap-2 rounded-xl border-2">
            {notes?.map(note => (
            <div key={note.id}>
                <NoteItem note={note} />
                <hr/>
            </div>
            ))}
            </div>
        </>
    )
}
