import React, { useState } from "react";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase/firebase";

import {
	MdFastfood,
	MdCloudUpload,
	MdDelete,
	MdFoodBank,
	MdAttachMoney,
} from "react-icons/md";
import { Loader } from "../components";
import { categories } from "../utils/data";
import { getAllProperties, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Upload = () => {
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [imageAsset, setImageAsset] = useState(null);
	const [msg, setMsg] = useState(null);
	const [category, setCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState("danger");

	const [{ propertyItems }, dispatch] = useStateValue();

	// function to upload image
	const uploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				// console.log(error);
				setFields(true);
				setMsg("Error while uploading : Try AGain 🙇");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setMsg(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setIsLoading(false);
					setFields(true);
					setMsg("Image uploaded successfully 😊");
					setAlertStatus("success");
					setTimeout(() => {
						setFields(false);
						setMsg(false);
					}, 4000);
				});
			},
		);
	};

	// function to delete image
	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg("Image deleted successfully 😊");
			setAlertStatus("success");
			setTimeout(() => {
				setFields(false);
				setMsg(false);
			}, 4000);
		});
	};

	//function to reset the data
	const clearData = () => {
		setTitle("");
		setImageAsset(null);
		setAddress("");
		setPrice("");
		setDescription("");
		setCategory("Select Category");
	};

	//function to save the data
	const saveDetails = () => {
		setIsLoading(true);
		try {
			if (
				!title ||
				!address ||
				!imageAsset ||
				!price ||
				!description ||
				!category
			) {
				setFields(true);
				setMsg("Required fields can't be empty");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setMsg(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					imageURL: imageAsset,
					address: address,
					description: description,
					category: category,
					price: price,
				};
				saveItem(data);
				setIsLoading(false);
				setFields(true);
				setMsg("Data Uploaded successfully 😊");
				clearData();
				setAlertStatus("success");
				setTimeout(() => {
					setFields(false);
					setMsg(false);
				}, 4000);
			}
		} catch (error) {
			// console.log(error);
			setFields(true);
			setMsg("Error while uploading : Try AGain 🙇");
			setAlertStatus("danger");
			setTimeout(() => {
				setFields(false);
				setMsg(false);
				setIsLoading(false);
			}, 4000);
		}

		fetchData();
	};

	//function to fetch data
	const fetchData = async () => {
		await getAllProperties().then((data) => {
			dispatch({
				type: actionType.SET_PROPERTY_ITEMS,
				propertyItems: data,
			});
			// console.log(data);
		});
	};

	// useEffect(() => {
	// 	fetchData();
	// }, []);

	return (
		<div className='h-screen flex justify-center items-center flex-col'>
			{alertStatus === "danger" ? (
				<div className='text-xl font-Titillium text-red-600'>{msg}</div>
			) : (
				<div className='text-xl font-Titillium text-emerald-500'>{msg}</div>
			)}
			<div className='text-2xl font-Montserrat font-semibold'>
				Upload New Property
			</div>
			<div className='w-96 h-96  py-6'>
				{/* title */}
				<div className='relative mb-3 xl:w-96' data-te-input-wrapper-init>
					<input
						type='text'
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:placeholder:text-black dark:peer-focus:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						id='exampleFormControlInput1'
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label
						htmlFor='exampleFormControlInput1'
						className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-black peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-black font-Titillium font-medium text-lg dark:peer-focus:text-black'
					>
						Title
					</label>
				</div>
				{/* address */}
				<div className='relative mb-3 xl:w-96' data-te-input-wrapper-init>
					<input
						type='text'
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:placeholder:text-neutral-200 dark:peer-focus:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						id='exampleFormControlInput1'
						placeholder='Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<label
						htmlFor='exampleFormControlInput1'
						className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-black peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-black font-Titillium font-medium text-lg dark:peer-focus:text-black'
					>
						Address
					</label>
				</div>
				{/* categories */}
				<select
					onChange={(e) => setCategory(e.target.value)}
					className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
					value={category}
				>
					<option value='other' className='bg-white'>
						Select Category
					</option>
					{categories &&
						categories.map((item) => (
							<option
								key={item.id}
								className='text-base border-0 outline-none capitalize bg-white text-headingColor'
								value={item.urlParamName}
							>
								{item.name}
							</option>
						))}
				</select>
				{/* price */}
				<div className='relative mb-3 xl:w-96' data-te-input-wrapper-init>
					<input
						type='number'
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:placeholder:text-neutral-200 dark:peer-focus:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						id='exampleFormControlInput1'
						placeholder='Price'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<label
						htmlFor='exampleFormControlInput1'
						className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]  transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-black peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-black font-Titillium font-medium text-lg dark:peer-focus:text-black'
					>
						Price
					</label>
				</div>
				{/* description */}
				<div className='relative mb-3 xl:w-96' data-te-input-wrapper-init>
					<textarea
						className='peer block min-h-[auto] w-full rounded border-2 border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-black data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  dark:placeholder:text-neutral-200 dark:peer-focus:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						id='exampleFormControlTextarea1'
						rows='4'
						placeholder='Your message'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
					<label
						htmlFor='exampleFormControlTextarea1'
						className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.65rem] leading-[1.6] text-black font-Titillium font-medium text-lg transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-black peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none  dark:peer-focus:text-black'
					>
						Description
					</label>
				</div>
				{/* upload */}
				<div className='relative mb-3 xl:w-96 min-h-[auto]'>
					<div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg'>
						{isLoading ? (
							<Loader />
						) : (
							// <p>Loading...</p>
							<>
								{!imageAsset ? (
									<>
										<label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
											<div className='w-full h-full flex flex-col items-center justify-center gap-2'>
												<MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
												<p className='text-gray-500 hover:text-gray-700'>
													Click here to upload
												</p>
											</div>
											<input
												type='file'
												name='uploadimage'
												accept='image/*'
												onChange={uploadImage}
												className='w-0 h-0'
											/>
										</label>
									</>
								) : (
									<>
										<div className='relative h-full'>
											<img
												src={imageAsset}
												alt='uploaded image'
												className='w-full h-full object-cover'
											/>
											<button
												type='button'
												className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out'
												onClick={deleteImage}
											>
												<MdDelete className='text-white' />
											</button>
										</div>
									</>
								)}
							</>
						)}
					</div>
				</div>
				<div className='flex justify-center mt-6'>
					<button
						type='button'
						className='inline-block rounded bg-danger px-6 pb-2 pt-2.5 mr-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]'
						onClick={clearData}
					>
						Reset
					</button>
					<button
						type='button'
						data-te-ripple-init
						data-te-ripple-color='light'
						className='flex justify-center items-center inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
						onClick={saveDetails}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Upload;
