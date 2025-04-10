import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="w-full py-6 bg-gray-700 border-t-2 border-t-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 w-full">
        <div className="flex flex-wrap">
          <div className="w-full p-4 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
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
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                COMPANY
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
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
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                SUPPORT
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
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
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-300">
                LEGALS
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-white hover:text-gray-300"
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