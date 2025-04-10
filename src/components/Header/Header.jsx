import React, { useState } from 'react'
import { Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className='w-full py-4 bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 w-full'>
        <nav className='flex items-center justify-between'>
          <div>
            <Link to='/public/edu.png' className="flex items-center">
              <Logo width='100px' />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop menu */}
          <ul className='hidden md:flex items-center space-x-2'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-300 hover:bg-blue-600 rounded-full text-white hover:shadow-lg'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-700 pt-4">
            <ul className='flex flex-col space-y-2'>
              {navItems.map((item) => 
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setMobileMenuOpen(false)
                      }}
                      className='block w-full text-left px-4 py-2 duration-300 hover:bg-blue-600 rounded-md text-white'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
