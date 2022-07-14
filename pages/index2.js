import Head from "next/head";
import Image from "next/image";
import handler from "./api/hello";
import { fetchAPI } from "../lib/api";
import Link from "next/link";
import Nav from "../components/nav";

const Blog = ({ data, globals}) => {
	return (
		<>
			<div className='h-screen grid w-screen bg-white dark:bg-gray-900'>
				<Nav />

				<div className='font-mono bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
					<div className='flex justify-center'>
						<p>Hello,&nbsp; </p>
						<p className='text-cyan-600 dark:text-cyan-400'> {data.name}</p>
						<p>.</p>
					</div>
					<Link href='/blog'>
						<a>
							<div className='font-bold flex justify-center'>
								{globals.data.attributes.siteName}
							</div>
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export async function getStaticProps() {
	const [data, globals] = await Promise.all([handler(), fetchAPI("/global")]);
	
	return {
		props: { data, globals},
				revalidate: 1,
	};
}

export default Blog;
