import React from "react";
import { MdStarRate } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { notfound } from "../assets";


const PropertyContainer = ({ data }) => {
	return (
		<>
			{data && data.length > 0 ? (
				data.map((item) => (
					
						<div
							className='h-auto w-72 rounded-t-[24px] drop-shadow-md  cursor-pointer'
							key={item.id}
							>
							{/* display pics */}
							<div className='grid w-72 h-64 relative rounded-t-[24px] group/item '>
								<img
									src={item?.imageURL}
									alt='home'
									className='object-fit h-64 w-72 rounded-t-[24px] hover:opacity-50 '
								/>
								<div className='w-8 justify-self-end absolute my-3 mr-3 group/edit invisible group-hover/item:visible'>
									<AiOutlineHeart
										className='w-8 h-7 text-emerald-600'
										title='Add to favorite'
									/>
								</div>
							</div>
							<div className='flex justify-between'>
								<div className=' w-9/12 h-28 '>
									<p className='top-0 font-Titillium font-semibold text-lg capitalize'>
										{item?.title}
									</p>
									<p className='text-xs font-Montserrat font-medium leading-2 capitalize'>
										{item?.description.slice(0, 30)}
									</p>
									<p className='text-sm font-Montserrat font-medium leading-2 py-3 capitalize'>
										{item?.address}
									</p>
									<p className=' font-Montserrat font-bold text-sm uppercase bg-emerald-700 text-white'>
										{item?.category}
									</p>
								</div>
								<div className=' w-3/12 h-28 grid justify-items-end pr-0'>
									<div className=''>
										<div className='flex'>
											<MdStarRate className='h-6' />
											<span className='font-Titillium font-medium'>3.56</span>
										</div>
									</div>
									<div className='flex place-items-end'>
										<span className=' text-emerald-600 px-1 font-semibold'>
											$
										</span>
										<p className=' font-Titillium font-bold'>{item?.price}</p>
									</div>
								</div>
							</div>
						</div>
					
				))
			) : (
				<div className='flex flex-col justify-center items-center'>
					<img src={notfound} className='w-56' />
					<p className='text-xl font-Titillium'>No property found</p>
				</div>
			)}
		</>
	);
};

export default PropertyContainer;
