import React from 'react'
import { Login as LoginComponent } from '../components'

function login() {
  return (
    <div className='w-full flex-1 flex flex-col'>
      <LoginComponent/>
    </div>
  )
}

export default login