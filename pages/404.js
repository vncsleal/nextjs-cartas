import Link from "next/link";
import React from "react";
import Astronaut from "../components/404png";
import Nav from "../components/nav";

const NotFound = () => {
	return (
		<>
			<div className='h-screen grid content-between bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
				<Nav />
				<div className="grid justify-items-center gap-y-6">
					<div className='h-60 w-60 text-gray-900 dark:text-gray-100'>
						<Astronaut/>
					</div>
					<div className="grid justify-items-center m-10">
					<div className='font-mono text-base md:text-xl font-bold text-gray-900 dark:text-gray-100'>
						error 404 - not found.
					</div>
					<div className='font-mono text-sm text-center text-gray-700 dark:text-gray-300'>
						"ground control to Major Tom, your circuit's dead, there's something
						wrong."
					</div>
					<Link href='/'>
						<a className='font-mono text-base font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'>
							voltar
						</a>
					</Link>
					</div>
					
				</div>
				<footer>
					<div className='flex justify-center p-8 text-xs text-gray-400 dark:text-gray-600'>
						<p>feito com ❤️ por vinicius leal.</p>
					</div>
				</footer>
			</div>
		</>
	);
};
export default NotFound;
