import Link from "next/link";
import Moment from "react-moment";
import Nav from "../../components/nav";
import Seo from "../../components/seo";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Category = ({ category, categories }) => {
    //console.log(category.attributes.articles.data)
    const seo = {
        metaTitle: category.attributes.name,
        metaDescription: `All ${category.attributes.name} articles`,
      };
	return (
		<>
        <Seo seo={seo} />
			<div className='overflow-x-hidden overflow-y-hidden font-mono text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100'>
				<div className=''>
					<Nav />
					<div className='grid px-4 grid-col gap-4'>
						<div className='p-2 md:p-6'>
							<p className='flex justify-center text-2xl md:text-5xl font-["Helvetica"] font-bold'>
								{category.attributes.name}
							</p>
						</div>
                        <div className='grid grid-col grid-cols-3 gap-4'>
                        {category.attributes.articles.data.map((article) => {
						return (
							<div className='grid col-span-3 md:col-span-1 content-between'>
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
                                        <Link href={`/author/${article.attributes.author.data.attributes.slug}`}>
											<a>
                                                <div className="flex items-center gap-2">
											<img
												className='object-cover w-6 h-6 md:w-8 md:h-8 rounded-full'
                                                src={getStrapiMedia(
                                                    article.attributes.author.data.attributes.picture
                                                  )}												/>
											<p className='text-gray-700 dark:text-gray-200'>por</p>
											<p className='font-bold text-gray-600 dark:text-gray-300'>
											{article.attributes.author.data.attributes.name}
											</p>
                                            </div>
                                            </a>
                                            </Link>
											<p className='text-gray-400 dark:text-gray-500'>• em</p>
											<Link href={`/category/${article.attributes.category.data.attributes.name}`}>
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
export async function getStaticPaths() {
	const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

	return {
		paths: categoriesRes.data.map((category) => ({
			params: {
				slug: category.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const matchingCategories = await fetchAPI("/categories", {
		filters: { slug: params.slug },
		populate: {
			articles: {
				populate: ["image","category", "author.picture"],
			},
		},
	});
	const allCategories = await fetchAPI("/categories");

	return {
		props: {
			category: matchingCategories.data[0],
			categories: allCategories,
		},
		revalidate: 1,
	};
}

export default Category;
