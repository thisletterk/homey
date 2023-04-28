import React from 'react'
import { notfound } from '../assets'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <img src={notfound} title='not found' />
      <p className='font-Montserrat text-lg'>Please go back to the home page</p>
    </div>
  )
}

export default NotFound