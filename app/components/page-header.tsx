import { ChangeEvent, useEffect, useState } from 'react'
import CreateNoteModal, { ICategory } from './create-note-modal'

export default function PageHeader({selectedCategories, setSelectedCategories}:{selectedCategories: string[], setSelectedCategories: (categories: string[])=> void}) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const URL_API = process.env.NEXT_PUBLIC_URL_API!

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL_API + "categories")
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }

        fetchData()
    }, [])

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value.toString();
        setSelectedCategory(value);
        setSelectedCategories(Array.from(value))
    }

    const handleCategoriesChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value.toString();
        const updatedCategories = new Set(selectedCategories);
        updatedCategories.add(value);
        setSelectedCategories(Array.from(updatedCategories));
    }

    return (
        <div className="flex w-full flex-col items-center justify-between gap-2 rounded-xl border-2 p-4 lg:flex-row">
            <div className="w-full lg:w-fit">
            <select
                id="category"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">
                    Select category
                </option>
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
            <div className="flex w-full lg:ml-4 lg:w-fit">
                <CreateNoteModal/>
            </div>
        </div>
    )
}
