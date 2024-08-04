import React, { useState } from "react";
import GenderCheckBox from "./Checkbox"
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

export interface UserI{
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const Signup: React.FC = () => {
  const [inputs , setInputs] = useState<UserI>({
    fullName:'',
    username:'',
    email: '',
    password:'',
    confirmPassword:'',
    gender:''
  });

  const {loading, signup} = useSignup();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs((prevInputs) => ({...prevInputs, [name]: value}));
  }

  const handleCheckBoxChage = (gender: string): void => {
    setInputs({...inputs, gender});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signup(inputs);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col items-center jusitfy-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-sxl font-semibold text-center text-gray-300">
          Register
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={inputs.fullName}
              className="w-full input input-bordered h-10"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={inputs.username}
              className="w-full input input-bordered h-10"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={inputs.email}
              className="w-full input input-bordered h-10"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={inputs.password}
              className="w-full input input-bordered h-10"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              name="confirmPassword"
              className="w-full input input-bordered h-10"
              onChange={handleChange}
            />
          </div>

          <GenderCheckBox onCheckBoxChange = {handleCheckBoxChage} selectedGender={inputs.gender} />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an Account
          </Link>
          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span>: "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
