import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

// const navigate = useNavigate();

//   const handleCreateClick = () => {
//     navigate('/create-team'); // Navigate to Create page
//   };

const Navbar = () => {
 
    return (

<nav className='bg-gray-800 text-white flex align-middle justify-between px-4 w-full h-16 items-center'>
   
<Link to="/create-team">
<button 
  className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  > 
create Team
</button>
</Link>

<Link to="/teams">
<button 
  className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  > 
Teams  
</button>
</Link>

    </nav>
  )
}

export default Navbar
