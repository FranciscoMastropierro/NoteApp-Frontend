import { useState, useEffect, ChangeEvent } from "react"
import { INote } from "./note-list"
import { ICategory } from "./create-note-modal"


export default function EditNoteModal({note}: {note: INote}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [noteDescription, setNoteDescription] = useState(note.content)
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]) 
    const [errorMessage, setErrorMessage] = useState("")

    const URL_API = process.env.NEXT_PUBLIC_URL_API!

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL_API + "categories")
                const data = await response.json()
                setCategories(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching categories:", error)
                setLoading(false)
            }
        }

        fetchData()
    }, [loading])

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleDescriptionChange = (e: any) => {
        setNoteDescription(e.target.value)
    }

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value.toString();
        const updatedCategories = new Set(selectedCategory);
    
        if (updatedCategories.has(value)) {
            updatedCategories.delete(value);
        } else {
            updatedCategories.add(value);
        }
    
        setSelectedCategory(Array.from(updatedCategories));
    }
    

    const handleEditNote = async (e: any) => {
        e.preventDefault()

        if (!selectedCategory || !noteDescription){
            if(!selectedCategory && !noteDescription) return setErrorMessage('Category and Note Description are required')
            if(!selectedCategory) return setErrorMessage('Category are required')
            return setErrorMessage('Note Description are required')
        }
        
        let URL =  `${URL_API}notes/${note.id}`
        
        try {
            const response = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: noteDescription,
                    categories: selectedCategory,
                }),
            });
            if (response.ok) {
                console.log("Note added successfully")
                window.location.reload()
            } else {
                console.error("Failed to add note:", response.statusText)
            }
        } catch (error) {
            console.error("Error adding note:", error)
        }
    }

    return (
        <div className="flex w-full justify-center">
            <button
                type="button"
                onClick={handleToggleModal}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                Edit
            </button>
            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-x-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black/50"
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="relative max-h-full w-full max-w-md p-4">
                        {/* Contenido del modal */}
                        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                            {/* Cabecera del modal */}
                            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Note
                                </h3>
                                <button
                                    className="ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="crud-modal"
                                    onClick={handleToggleModal}
                                    type="button"
                                    disabled={loading}
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
                            </div>
                            {/* Cuerpo del modal */}
                            <form
                                className="p-4 md:p-5"
                                onSubmit={(e)=>handleEditNote(e)}
                            >
                                <div className="mb-4  grid grid-cols-1 gap-4">
                                    <div className="w-full">
                                        <label
                                            htmlFor="category"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                                            value={selectedCategory}
                                            multiple={true}
                                            onChange={handleCategoryChange}
                                            disabled={loading}
                                        >
                                            {categories.map(
                                                (category: ICategory) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="description"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Note Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={4}
                                            placeholder="Write note description here"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            value={noteDescription}
                                            onChange={handleDescriptionChange}
                                            disabled={loading}
                                        ></textarea>
                                    </div>
                                </div>
                                {errorMessage && (
                                    <div
                                        className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                                        role="alert"
                                    >
                                        <span className="font-medium">
                                            Error
                                        </span>{" "}
                                            {errorMessage}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="-ms-1 me-1 size-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    {loading?'Creanting note...': 'Confirm'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
