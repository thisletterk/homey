import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { signInWithGoogle } from "../firebase/firebase";

const Login = () => {
	const { isUid, setIsUid } = useAuthContext("");
	const { isCurrentUser } = useAuthContext("");
	const [redirect, setRedirect] = useState(false);

	const handleLogin = () => {
		if (!isCurrentUser) {
			signInWithGoogle();
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to={`/`} />;
	}

	return (
		<section className=''>
			<div className='h-full px-6 text-neutral-800 dark:text-neutral-200'>
				<div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
					<div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
						<img
							src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
							className='w-full'
							alt='Sample image'
						/>
					</div>
					<div className='mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12'>
						<form>
							<div className='flex flex-row items-center justify-center lg:justify-start'>
								<p className='mb-0 mr-4 text-lg text-black font-Montserrat'>
									Sign in with
								</p>
								<button
									type='button'
									data-te-ripple-init
									data-te-ripple-color='light'
									className='inlne-block mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
								>
									{/* <!-- Facebook --> */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='mx-auto h-5 w-4.5'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
									</svg>
								</button>
								<button
									type='button'
									data-te-ripple-init
									data-te-ripple-color='light'
									className='inlne-block mx-1 h-9 w-9 rounded-full bg-red-700 uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
								>
									{/* <!-- Gmail --> */}
									<svg
										style={{ color: "white" }}
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className=' mx-auto h-10 w-6 mx-2.5 ml-2.5 mt-0.5'
										viewBox='0 0 24 24'
										onClick={handleLogin}
									>
										{" "}
										<path
											d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
											fill='white'
										></path>{" "}
									</svg>
								</button>
							</div>

							<div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
								<p className='mx-4 mb-0 text-center font-semibold dark:text-black'>
									Or
								</p>
							</div>

							{/* <!-- Email input --> */}
							<div className='relative mb-6' data-te-input-wrapper-init>
								<input
									type='text'
									className='border-gray-300 border-b-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									id='exampleFormControlInput2'
									placeholder='Email address'
								/>
								<label
									htmlFor='exampleFormControlInput2'
									className='pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black font-Montserrat transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none '
								>
									Email address
								</label>
							</div>

							{/* <!-- Password input --> */}
							<div className='relative mb-6' data-te-input-wrapper-init>
								<input
									type='password'
									className='border-gray-300 border-b-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
									id='exampleFormControlInput22'
									placeholder='Password'
								/>
								<label
									htmlFor='exampleFormControlInput22'
									className='pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black font-Montserrat transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none '
								>
									Password
								</label>
							</div>

							<div className='mb-6 flex items-center justify-between'>
								<div className='mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]'>
									<input
										className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
										type='checkbox'
										value=''
										id='exampleCheck2'
									/>
									<label
										className='inline-block pl-[0.15rem] hover:cursor-pointer text-black font-Montserrat'
										htmlFor='exampleCheck2'
									>
										Remember me
									</label>
								</div>
								<a href='#!' className='text-black font-Montserrat'>
									Terms and conditions
								</a>
							</div>

							<div className='text-center lg:text-left'>
								<button
									type='button'
									className='inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
									data-te-ripple-init
									data-te-ripple-color='light'
								>
									Login
								</button>
								<p className='mt-2 mb-0 pt-1 text-sm font-semibold text-black font-Montserrat'>
									Don't have an account?{" "}
									<Link
										to='/signup'
										href='#!'
										className='text-danger font-Montserrat transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700'
									>
										Sign Up
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
