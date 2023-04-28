import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { MdStarRate } from 'react-icons/md';
import a from "../assets/a.jpeg"

const BookmarkContainer = () => {
  return (
		<div className=' mx-14 mt-28 md:mx-20 relative mt-8 sm:pr-16'>
			<h2 className='py-4 font-Titillium font-semibold text-lg'>
				BOOKMARKED PROPERTIES
			</h2>
			<div className=' grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 '>
				<div className='h-auto w-72 rounded-t-[24px] drop-shadow-md  cursor-pointer'>
					{/* display pics */}
					<div className='grid w-72 h-64 relative rounded-t-[24px] group/item '>
						<img
							src={a}
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
								title
							</p>
							<p className='text-xs font-Montserrat font-medium leading-2 capitalize'>
								description
							</p>
							<p className='text-sm font-Montserrat font-medium leading-2 py-3 capitalize'>
								address
							</p>
							<p className=' font-Montserrat font-bold text-sm uppercase bg-emerald-700 text-white'>
								category
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
								<span className=' text-emerald-600 px-1 font-semibold'>$</span>
								<p className=' font-Titillium font-bold'>price</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='border-b-2 border-emerald-700 py-4 '></div>
		</div>
	);
}

export default BookmarkContainer