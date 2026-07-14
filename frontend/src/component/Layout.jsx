import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Header />
    <div className='pt-16'>
    <Outlet /></div>
    </>
  )
}

export default Layout