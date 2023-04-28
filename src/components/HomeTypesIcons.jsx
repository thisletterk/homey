import React, { useEffect, useState } from "react";
import { categories } from "../utils/data";
import { useStateValue } from "../context/StateProvider";
import PropertyContainer from "./PropertyContainer";
import Loader from "./Loader";

const HomeTypesIcons = ({ filter, setFilter }) => {
	const [{ propertyItems }, dispatch] = useStateValue();

	// <HomeTypesIcons data={propertyItems?.filter((n) => n.category === filter)} />;

	return (
		<>
			<div className=' flex flex-row justify-center gap-10 overflow-x-auto min-w-full border-y-2 -mt-1 border-grey-500 h-24 py-6'>
				{categories &&
					categories.map(({ icons, name, id, urlParamName }) => {
						return (
							<div
								className={`text-gray-500 ${
									filter === urlParamName ? "text-emerald-900" : "text-black"
								} cursor-pointer hover:animate-bounce`}
								key={id}
								onClick={() => {
									urlParamName === "allproperties"
										? setFilter(propertyItems)
										: setFilter(urlParamName);
								}}
							>
								<div className='flex justify-center'>
									<img src={icons} className='w-7 h-7 ' />
								</div>
								<div className='font-bold font-Titillium text-md w-24 h-auto flex justify-center'>
									{name}
								</div>
							</div>
						);
					})}
				{/* <div
					className={`text-gray-500 text-emerald-900 cursor-pointer bg-red-500`}
					onClick={() => setFilter(propertyItems)}
					>
					<div className='flex justify-center'>
						<img src={icons} className='w-7 h-7 fill-blue-500' />
					</div>
					<div className='font-bold font-Titillium text-md w-24 h-auto flex justify-center'>
						All
					</div>
				</div> */}
			</div>
			<>
				{/* {!propertyItems ? (
					<div className='flex justify-center items-center mt-24'>
						<Loader />
					</div>
				) : (
					<section className='w-full mx-14 md:mx-20 relative mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 sm:pr-16'>
						<PropertyContainer
							data={propertyItems?.filter((n) => n.category === filter)}
						/>
					</section>
				)} */}
			</>
		</>
	);
};

export default HomeTypesIcons;
