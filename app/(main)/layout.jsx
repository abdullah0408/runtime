import React from 'react'
import Navbar from "@/components/Navbar";

const layout = ({ children }) => {
  return (
    <div>
        <Navbar />
        <div className='relative top-20'>
          {children}
        </div>
    </div>
  )
}

export default layout