import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignin from '../../hooks/useSignin';

const Login: React.FC = () => {
  const {loading, signin} = useSignin();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserCredentials((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin(userCredentials)
  }
  return (
    <div className='flex flex-col items-center jusitfy-center min-w-96 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-sxl font-semibold text-center text-gray-300">Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

       <form onSubmit={handleSubmit}>
        <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input type="text" name='username' placeholder='Enter Username' className="w-full input input-bordered h-10" onChange={handleChange} />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder='Enter Password' className="w-full input input-bordered h-10" onChange={handleChange} />
          </div>

          <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">Don't have an Account</Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading} type='submit'>
              {loading ? <span className="loading loading-spinner"></span>: "Login"}
            </button>
          </div>
       </form>
        
      </div>
      
    </div>
  )
}

export default Login
