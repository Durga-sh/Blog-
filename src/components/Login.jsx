"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authSlice"
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-200px)] bg-gradient-to-b from-blue-900 to-gray-900 py-10">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-800/90 backdrop-blur-sm rounded-xl p-10 border border-blue-700/50 shadow-xl`}
      >
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[120px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-white mb-2">Welcome back</h2>
        <p className="mt-2 text-center text-base text-gray-300 mb-8">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-all duration-200 hover:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-500 text-center font-medium">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className="bg-gray-900 border-gray-700 text-white focus:border-blue-500"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                className="bg-gray-900 border-gray-700 text-white focus:border-blue-500"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <Button
              type="submit"
              className="w-full"
              bgColor="bg-blue-500 hover:bg-blue-600 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
