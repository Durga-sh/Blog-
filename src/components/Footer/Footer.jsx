import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="w-full py-10 bg-gray-800 border-t border-gray-700 text-white">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex flex-wrap">
          <div className="w-full p-4 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-4 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-blue-400">
                COMPANY
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-4 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-blue-400">
                SUPPORT
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-4 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-blue-400">
                LEGALS
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-blue-400 transition-colors duration-200"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
