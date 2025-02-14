import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
        {children}
    </div>
  )
}

export default layout