import React, { useEffect, useState } from "react";
import {
	BookmarkContainer,
	HomeTypesIcons,
	Loader,
	PropertyContainer,
} from "../components";
import { useStateValue } from "../context/StateProvider";
import { categories } from "../utils/data";

const Homepage = () => {
	const [{ propertyItems, showBookmark }, dispatch] = useStateValue();
	const [filter, setFilter] = useState("beachfront");

	useEffect(() => {}, [showBookmark]);

	return (
		<>
			<HomeTypesIcons setFilter={setFilter} filter={filter} />

			{showBookmark && <BookmarkContainer />}

			{!propertyItems ? (
				<div className='flex justify-center items-center mt-24'>
					<Loader />
				</div>
			) : (
				<section className='w-full mx-14 mt-28 md:mx-20 relative mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:pr-16'>
					<PropertyContainer
						data={propertyItems?.filter((n) => n.category === filter)}
					/>
				</section>
			)}
		</>
	);
};

export default Homepage;
