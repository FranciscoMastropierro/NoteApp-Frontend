"use client"

import NoteList from "./components/note-list"

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center gap-2 p-10 lg:p-20">
            <NoteList />
        </main>
    )
}
