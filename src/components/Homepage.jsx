 import React from 'react'
import { useState } from 'react';
import axios from 'axios'
const Homepage = () => {
  
  const [formData, setFormData] = useState({
    PlayerName: '',
    points: '',    
    description: '',

  });

  const handleChange = (e) => {
    const {name,value} = e.target;
     
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('PlayerName', formData.PlayerName);
    data.append('points', formData.points);
    data.append('description', formData.description);
    

    try {
      const response = await axios.post('http://localhost:3000/api/create-team', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('Product added successfully', response.data);
      console.log(response.data);
      setFormData({
        PlayerName: '',
        points: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding players:', error);
    }
  };

  return (
    <div className='bg-black h-screen w-screen'>
  
  <h2 className=''>Add Product</h2>
<div className='border-2 rounded-lg p-5 pt-2 absolute left-1/3 top-1 w-96 text-white mt-16 '>
<form className='' onSubmit={handleSubmit} >
  
  <div className='mr-5 mb-3'>
    <label htmlFor='PlayerName'>Player's name</label>
    <input className='w-full p-3 border-2 rounded-md text-white' style={{ backgroundColor: '#333' }}
      type='text'
      id='PlayerName'
      name='PlayerName'
      value={formData.PlayerName}
      onChange={handleChange}
      placeholder='Enter seller name'
    />
  </div>

  <div className='mr-5 mb-3'>
    <label htmlFor='points'>Points</label>
    <input className='w-full p-3 border-2 rounded-md text-white' style={{ backgroundColor: '#333' }}
      type='number'
      id='points'
      name='points'
      value={formData.points}
      onChange={handleChange}
      placeholder='Enter points'
    />
  </div>

  <div className='mr-5 mb-3'>
    <label htmlFor='description'>Description/Details</label>
    <textarea style={{ backgroundColor: '#333' }} className='resize-y h-24 w-full p-3 border-2 rounded-md text-white bg'
      id='description'
      name='description'
      value={formData.description}
       onChange={handleChange}
      placeholder='e.g- batsman/bowler/wicketkeeper etc.'
    />
  </div>
  
  <button type='submit'
  className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  > 
Submit</button>
</form>
</div>
    </div>
  )
}

export default Homepage
