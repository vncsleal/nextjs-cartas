import Head from "next/head";
import Image from "next/image";
import handler from "./api/hello";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Link from "next/link";
import Nav from "../components/nav";
import Moment from "react-moment";
import Seo from "../components/seo";
import Footer from "../components/footer";

const Home = ({ articles, homepage }) => {
	console.log(articles);
	//console.log(categories);
	const heroArticle = articles.data.at(-1);
	const leftArticle = articles.data.at(-2);
	const rightArticle = articles.data.at(-3);
	const otherArticles = articles.data.slice(0, articles.data.length - 3);
	var str = "" + heroArticle.id;
	var pad = "#000";
	var num = pad.substring(0, pad.length - str.length) + str;

	return (
		<>
			<Seo seo={homepage.data.attributes.seo} />
			<div className='overflow-x-hidden overflow-y-hidden font-mono text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100'>
				<div className=''>
					<Nav />
					<div className='grid px-4 grid-col gap-4'>
						<div id='hero' className='grid '>
							<div className='py-2 text-xs '>
								<div className='flex justify-between py-2'>
									<p>{num}</p>
									<Link
										href={`/category/${heroArticle.attributes.category.data.attributes.name}`}
									>
										<a>
											<p>
												{" "}
												{heroArticle.attributes.category.data.attributes.name}
											</p>
										</a>
									</Link>
									<p>
										<Moment format='MMMM Do, YYYY'>
											{heroArticle.attributes.publishedAt}
										</Moment>
									</p>
								</div>
								<hr className='border-gray-900 dark:border-gray-100' />
							</div>
							<Link href={`/article/${heroArticle.attributes.slug}`}>
								<a>
									<div className='p-2 md:p-6'>
										<p className='flex justify-center text-2xl md:text-5xl font-["Helvetica"] font-bold'>
											{heroArticle.attributes.title}
										</p>
									</div>
									<div>
										<img
											src={getStrapiMedia(heroArticle.attributes.image)}
											className='object-cover w-screen h-[80vw] md:h-auto'
										/>
									</div>
								</a>
							</Link>
							<div className='flex py-2 md:py-4 justify-between items-center'>
								<p className='text-sm md:text-base'>
									{heroArticle.attributes.description}
								</p>
								<Link
									href={`/author/${heroArticle.attributes.author.data.attributes.slug}`}
								>
									<a>
										<div className='flex flex-col items-end'>
											<hr className='w-36 border-gray-900 dark:border-gray-100'></hr>
											<div className='flex items-center space-x-2 py-2'>
												<img
													className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full '
													src={getStrapiMedia(
														heroArticle.attributes.author.data.attributes
															.picture
													)}
												/>
												<div className='flex items-center '>
													<p className='text-[10px] md:text-xs'>por&nbsp;</p>
													<p className='font-bold text-[10px] md:text-xs text-gray-500 dark:text-gray-300'>
														{heroArticle.attributes.author.data.attributes.name}
													</p>
												</div>
											</div>
										</div>
									</a>
								</Link>
							</div>
						</div>
						<div id='subhero' className='grid grid-cols-3 gap-4'>
							<div className='grid col-span-3 md:col-span-2 content-between'>
								<Link href={`/article/${leftArticle.attributes.slug}`}>
									<a>
										<div className='space-y-2'>
											<img
												className='object-cover w-full h-[50vw] md:h-96'
												src={getStrapiMedia(leftArticle.attributes.image)}
											/>
											<div>
												<p className='font-bold text-base md:text-lg'>
													{leftArticle.attributes.title}
												</p>
												<p className='text-xs md:text-sm'>
													{leftArticle.attributes.description}
												</p>
											</div>
										</div>
									</a>
								</Link>
								<div className='space-y-2 py-2'>
									<hr className='w-64 border-gray-900 dark:border-gray-100' />
									<div className='flex justify-between items-center'>
										<div className='flex items-center gap-2 text-[10px] md:text-xs'>
											<Link
												href={`/author/${leftArticle.attributes.author.data.attributes.slug}`}
											>
												<a>
													<div className='flex items-center gap-2'>
														<img
															className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full'
															src={getStrapiMedia(
																leftArticle.attributes.author.data.attributes
																	.picture
															)}
														/>
														<p className='text-gray-700 dark:text-gray-200'>
															por
														</p>
														<p className='font-bold text-gray-600 dark:text-gray-300'>
															{
																leftArticle.attributes.author.data.attributes
																	.name
															}
														</p>
													</div>
												</a>
											</Link>
											<p className='text-gray-400 dark:text-gray-500'>• em</p>
											<Link
												href={`/category/${leftArticle.attributes.category.data.attributes.name}`}
											>
												<a>
													<p className='text-gray-400 font-bold dark:text-gray-500'>
														{
															leftArticle.attributes.category.data.attributes
																.name
														}
													</p>
												</a>
											</Link>
										</div>
										<div className='flex'>
											<p className='text-[10px] md:text-xs text-gray-400 dark:text-gray-500'>
												<Moment format='MMMM Do, YYYY'>
													{leftArticle.attributes.publishedAt}
												</Moment>
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className='grid col-span-3 md:col-span-1 content-between'>
								<Link href={`/article/${rightArticle.attributes.slug}`}>
									<a>
										<div className='space-y-2'>
											<img
												className='object-cover w-full h-[30vw] md:h-96'
												src={getStrapiMedia(rightArticle.attributes.image)}
											/>
											<div>
												<p className='font-bold text-base md:text-lg'>
													{rightArticle.attributes.title}
												</p>
												<p className='text-xs md:text-sm'>
													{rightArticle.attributes.description}
												</p>
											</div>
										</div>
									</a>
								</Link>
								<div className='space-y-2 py-2'>
									<hr className='w-64 border-gray-900 dark:border-gray-100' />
									<div className='flex justify-between items-center'>
										<div className='flex items-center gap-2 text-[10px] md:text-xs'>
											<Link
												href={`/author/${rightArticle.attributes.author.data.attributes.slug}`}
											>
												<a>
													<div className='flex items-center gap-2'>
														<img
															className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full'
															src={getStrapiMedia(
																rightArticle.attributes.author.data.attributes
																	.picture
															)}
														/>
														<p className='text-gray-700 dark:text-gray-200'>
															por
														</p>
														<p className='font-bold text-gray-600 dark:text-gray-300'>
															{
																rightArticle.attributes.author.data.attributes
																	.name
															}
														</p>
													</div>
												</a>
											</Link>
											<p className='text-gray-400 dark:text-gray-500'>• em</p>
											<Link
												href={`/category/${rightArticle.attributes.category.data.attributes.name}`}
											>
												<a>
													<p className='text-gray-400 font-bold dark:text-gray-500'>
														{
															rightArticle.attributes.category.data.attributes
																.name
														}
													</p>
												</a>
											</Link>
										</div>
										<div className='flex'>
											<p className='text-[10px] md:text-xs text-gray-400 dark:text-gray-500'>
												<Moment format='MMMM Do, YYYY'>
													{rightArticle.attributes.publishedAt}
												</Moment>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id='outros' className='p-4 md:py-8 md:text-2xl'>
						<p className='font-bold'>Outros</p>
						<hr className='w-16 border-gray-900 dark:border-gray-100'></hr>
					</div>

					<div className='grid grid-col grid-cols-3 gap-4 px-4'>
						{otherArticles.map((article) => {
							return (
								<div className='grid col-span-3 md:col-span-1 content-between' key={article.id}>
									<Link href={`/article/${article.attributes.slug}`}>
										<a>
											<div className='space-y-2'>
												<img
													className='object-cover w-full md:w-fit h-[80vw] md:h-96'
													src={getStrapiMedia(article.attributes.image)}
												/>
												<div>
													<p className='font-bold text-base md:text-lg'>
														{article.attributes.title}
													</p>
													<p className='text-xs md:text-sm'>
														{article.attributes.description}
													</p>
												</div>
											</div>
										</a>
									</Link>
									<div className='space-y-2 py-2'>
										<hr className='w-64 border-gray-900 dark:border-gray-100' />
										<div className='flex justify-between items-center'>
											<div className='flex items-center gap-2 text-[10px] md:text-xs'>
												<Link
													href={`/author/${article.attributes.author.data.attributes.slug}`}
												>
													<a>
														<div className='flex items-center gap-2 text-[10px] md:text-xs'>
															<img
																className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full'
																src={getStrapiMedia(
																	article.attributes.author.data.attributes
																		.picture
																)}
															/>
															<p className='text-gray-700 dark:text-gray-200'>
																por
															</p>
															<p className='font-bold text-gray-600 dark:text-gray-300'>
																{article.attributes.author.data.attributes.name}
															</p>
														</div>
													</a>
												</Link>
												<p className='text-gray-400 dark:text-gray-500'>• em</p>
												<Link
													href={`/category/${article.attributes.category.data.attributes.name}`}
												>
													<a>
														<p className='text-gray-400 font-bold dark:text-gray-500'>
															{article.attributes.category.data.attributes.name}
														</p>
													</a>
												</Link>
											</div>

											<div className='flex'>
												<p className='text-[10px] md:text-xs text-gray-400 dark:text-gray-500'>
													<Moment format='MMMM Do, YYYY'>
														{article.attributes.publishedAt}
													</Moment>
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export async function getStaticProps() {
	// Run API calls in parallel
	const [articles, categories, homepage] = await Promise.all([
		fetchAPI("/articles", {
			populate: ["image", "category", "author.picture"],
		}),
		fetchAPI("/categories", { populate: "*" }),
		fetchAPI("/homepage", {
			populate: {
				hero: "*",
				seo: { populate: "*" },
			},
		}),
	]);

	return {
		props: { articles, categories, homepage },
		revalidate: 1,
	};
}

export default Home;
