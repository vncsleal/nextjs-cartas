import Moment from "react-moment";
import Nav from "../../components/nav";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Seo from "../../components/seo";
import Footer from "../../components/footer";

const Article = ({ article }) => {
	
	const seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.image,
		article: true,
	  };

	var str = "" + article.id;
	var pad = "#000";
	var num = pad.substring(0, pad.length - str.length) + str;
	return (
		<>
		<Seo seo={seo} />
			<div className='overflow-x-hidden overflow-y-hidden font-mono text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100'>
				<div >
					<Nav />
					<div className='grid px-4 grid-col gap-4'>
						<div id='article' className='grid '>
							<div className='py-2 text-xs '>
								<div className='flex justify-between py-2'>
									<p>{num}</p>
									<Link
										href={`/category/${article.attributes.category.data.attributes.slug}`}
									>
										<a>
											<p>{article.attributes.category.data.attributes.name}</p>
										</a>
									</Link>
									<p>
										<Moment format='MMMM Do, YYYY'>
											{article.attributes.publishedAt}
										</Moment>
									</p>
								</div>
								<hr className='border-gray-900 dark:border-gray-100' />
							</div>

							<div className='p-2 md:p-6'>
								<p className='flex justify-center text-2xl md:text-5xl font-["Helvetica"] font-bold'>
									{article.attributes.title}
								</p>
							</div>

							<div>
								<img
									className='object-cover w-screen h-[80vw] md:h-auto'
									src={getStrapiMedia(article.attributes.image)}
								/>
							</div>

							<div className='flex flex-col md:flex-row py-2 md:py-4 justify-start '>
								<div className='flex flex-col'>
								<Link href={`/author/${article.attributes.author.data.attributes.slug}`}>
											<a>
									<hr className='w-36 border-gray-900 dark:border-gray-100'></hr>
									<div className='flex items-center space-x-2 py-2'>
										<img
											className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full '
											src={getStrapiMedia(
												article.attributes.author.data.attributes.picture
											  )}										/>
										<div className='flex flex-col items-start '>
											<p className='text-[10px] md:text-xs'>escrito por</p>
											<p className='font-bold text-[10px] md:text-xs text-gray-500 dark:text-gray-300'>
											{article.attributes.author.data.attributes.name}
											</p>
										</div>
									</div>
									</a>
									</Link>
								</div>
								<div className='flex flex-col  py-4 md:py-0 md:px-40 justify-center leading-relaxed'>
									<ReactMarkdown
										className='text-sm md:text-base indent-6 md:indent-8 text-justify'
										
									>{article.attributes.content}
										</ReactMarkdown>
								</div>
							</div>
							<div className='flex justify-center tracking-widest text-sm'>
								* * *
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
};

export async function getStaticPaths() {
	const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

	return {
		paths: articlesRes.data.map((article) => ({
			params: {
				slug: article.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const articlesRes = await fetchAPI("/articles", {
		filters: {
			slug: params.slug,
		},
		populate: ["image", "category", "author.picture"],
	});

	return {
		props: { article: articlesRes.data[0] },
		revalidate: 1,
	};
}

export default Article;
