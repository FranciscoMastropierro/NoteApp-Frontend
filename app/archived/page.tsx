"use client"
import NoteArchivedList from "./components/note-archived-list"

export default function Archived() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center gap-2 p-10 lg:p-20">
            <NoteArchivedList />
        </main>
    )
}
