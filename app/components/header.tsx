import Link from 'next/link'
import { Fragment, useState } from 'react'

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function Header() {

    return (
        <header className="border-b-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex w-full">
            <p className="text-lg font-semibold">Note App</p>
            </div>
            <nav className="w-full">
                <ul className="flex w-full justify-center gap-4">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/archived"}>Archived</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log out <span aria-hidden="true">&rarr;</span>
            </a>
            </div>
        </nav>
        </header>
    )
}
