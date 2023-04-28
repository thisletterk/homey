import React from "react";
import homey from "../assets/homey_.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/firebase";
import { useStateValue } from "../context/StateProvider";

const Header = ({ isCurrentUser, isName, isImage, isUid }) => {
	const [{ showBookmark }, dispatch] = useStateValue();

	const navigate = useNavigate();

	const logout = () => {
		if (isCurrentUser) {
			logoutUser();
			navigate("/");
		}
	};

	const showBookmarked = () => {
		if (isCurrentUser) {
			navigate(`/profile/${isUid}/bookmark`);
		} else {
			navigate('*')
		}
	}

	// Greet users based on time on day
	var myDate = new Date();
	var hrs = myDate.getHours();
	var greet;

	if (hrs < 12) greet = "Good Morning";
	else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
	else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

	return (
		<header className='flex justify-evenly fixed w-screen z-50 bg-emerald-700 top-0 left-0 right-0 text-white'>
			{/* left */}
			<div className='left-0 absolute'>
				<Link to='/'>
					<img src={homey} alt='homey_logo' width={120} height={120} />
				</Link>
			</div>
			{/* center */}
			<div className='border-gray-300 border-2 gap-2 rounded-full hidden md:hidden lg:flex justify-center mb-3.5 lg:w-96 md:w-72 lg:py-4 md:py-2 px-4 mt-4 font-Titillium text-base'>
				<div className='div'>Anywhere</div>
				<div className='border-l border-gray-500'></div>
				<div className='div'>Any week</div>
				<div className='border-l border-gray-500'></div>
				<div className='div'>Add guests</div>
				{/* Add search icon */}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='w-6 h-6 ml-4 cursor-pointer'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
					/>
				</svg>
			</div>
			{/* right */}
			<div className='right-0 absolute flex items-center justify-center my-7 mr-6'>
				{/* <!-- Right elements --> */}
				<>
					{isCurrentUser ? (
						<p className='mx-6 hidden md:flex text-[16px] xl:text-[16px] lg:text-[14px] md:text-[14px]'>
							{greet}, {isName}
						</p>
					) : (
						<></>
					)}

					{/* <!-- bookmark Icon --> */}
					<a
						className='mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
						href='#'
						title='bookmarked Items'
						onClick={showBookmarked}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6 text-white'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
							/>
						</svg>
					</a>
					<div className='relative' data-te-dropdown-ref>
						<a
							className='hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
							href='#'
							id='dropdownMenuButton1'
							role='button'
							data-te-dropdown-toggle-ref
							aria-expanded='false'
							title="notification"
						>
							<span className='[&>svg]:w-6'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='white'
									className='h-6 w-6 text-black'
								>
									<path
										fillRule='evenodd'
										d='M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z'
										clipRule='evenodd'
									/>
								</svg>
							</span>
							<span className='absolute -mt-2.5 ml-2 rounded-full bg-red-700 py-0 px-1.5 text-xs text-white'>
								1
							</span>
						</a>
					</div>
					<div className='relative' data-te-dropdown-ref>
						<button
							className='hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none'
							href='#'
							role='button'
							id='dropdownMenuButton2'
							data-te-dropdown-toggle-ref
							aria-expanded='false'
							title="profile pic"
						>
							<img
								src={
									isCurrentUser
										? isImage
										: "https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
								}
								className='rounded-full'
								style={{ height: "35px", width: "35px" }}
								alt='profile picture'
								loading='lazy'
							/>
						</button>
						{/* drop down menu */}
						<ul
							className='absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block'
							aria-labelledby='dropdownMenuButton1'
							data-te-dropdown-menu-ref
						>
							<li>
								{isCurrentUser ? (
									<>
										<Link
											to={`/profile/${isUid}`}
											className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-Montserrat text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600'
											href='#'
											data-te-dropdown-item-ref
										>
											Profile
										</Link>
									</>
								) : (
									<>
										<Link
											to='/login'
											className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-Montserrat text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600'
											href='#'
											data-te-dropdown-item-ref
										>
											Login
										</Link>
									</>
								)}
							</li>
							<li>
								{isCurrentUser ? (
									<>
										<Link
											to={`/profile/${isUid}/upload`}
											className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-Montserrat text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600'
											data-te-dropdown-item-ref
										>
											Upload
										</Link>
									</>
								) : (
									<></>
								)}
							</li>
							<li>
								<Link
									to='/faq'
									className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-Montserrat text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600'
									href='#'
									data-te-dropdown-item-ref
								>
									Faq
								</Link>
							</li>
							<li>
								{isCurrentUser ? (
									<>
										<Link
											className='block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-Montserrat text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600'
											href='#'
											data-te-dropdown-item-ref
											onClick={logout}
										>
											Sign Out
										</Link>
									</>
								) : (
									<></>
								)}
							</li>
						</ul>
					</div>
				</>
				{/* <!-- Right elements --> */}
			</div>
		</header>
	);
};

export default Header;

{
	/* <div className='flex justify-evenly'>
			<div className='bg-red-300 left-0 absolute'>1</div>
			<div className=''>2</div>
			<div className='bg-red-300 right-0 absolute'>3</div>
		</div> */
}
