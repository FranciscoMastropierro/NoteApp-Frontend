import { useState } from "react"

const URL_API = process.env.NEXT_PUBLIC_URL_API!

export default function DeleteNoteModal({ note_id }: { note_id: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleDeleteNote = async (note_id: number) => {
        try {
            const response = await fetch(URL_API + "notes/" + note_id, {
                method: "DELETE",
            })
            if (response.ok) {
                window.location.reload()
            } else {
                console.error("Failed to delete note:", response.statusText)
            }
        } catch (error) {
            console.error("Error deleting note:", error)
        }
    }

    return (
        <div>
            {/* Botón para abrir/cerrar el modal */}
            <button
                type="button"
                onClick={handleToggleModal}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Delete
            </button>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md p-4">
                        {/* Contenido del modal */}
                        <div className="relative rounded-lg bg-white shadow">
                            <button
                                className="absolute end-2.5 top-3 ml-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                                onClick={handleToggleModal}
                                type="button"
                                data-modal-hide="popup-modal"
                            >
                                <svg
                                    className="size-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 text-center md:p-5">
                                <svg
                                    className="mx-auto mb-4 size-12 text-gray-400 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this note?
                                </h3>
                                <button
                                    className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                                    type="button"
                                    onClick={() => handleDeleteNote(note_id)}
                                    data-modal-hide="popup-modal"
                                >
                                    Yes, I&apos;m sure
                                </button>
                                <button
                                    className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                    type="button"
                                    onClick={handleToggleModal}
                                    data-modal-hide="popup-modal"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
