import NoteItem from '@/app/components/note-item';
import { INote } from '@/app/components/note-list';
import PageHeader from '@/app/components/page-header';
import React, { useEffect, useState } from 'react'

export default function NoteArchivedList() {
    const URL_API = process.env.NEXT_PUBLIC_URL_API!
    const [notes, setNotes] = useState <INote[] | []> ([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])    
    
    useEffect(() => {
        const string = selectedCategories.length !== 0 ? "&categories=" + selectedCategories.join('-') : "";
        fetch(URL_API+'notes-categories?archived=true' + string)
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
