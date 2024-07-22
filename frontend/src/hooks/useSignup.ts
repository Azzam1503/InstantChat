import { useState } from 'react'
import { UserI } from '../pages/signup/Signup';
import toast from 'react-hot-toast';


const useSignup = () => {
  const [loading, setLoading]= useState(false);
  
  const signup = async ({fullName, username, email, password, confirmPassword, gender}: UserI) => {
    console.log('working')
    const success= handleInputErrors({fullName, username, email, password, confirmPassword, gender})
    console.log(success)
    if(!success){
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({fullName, username, email, password, confirmPassword, gender})
      });

      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }

      //Local Storage
      //Context
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return {loading, signup}
}

export default useSignup;

function handleInputErrors({fullName, username, email, password, confirmPassword, gender}: UserI){
  if(!fullName || !username || !email || !password || !confirmPassword || !gender){
    toast.error('Please fill in all fields')
    return false;
  }

  if(password !== confirmPassword){
    toast.error('Password do not match')
    return false;
  };

  if(password.length < 6){
    toast.error('Password must be at least 6 characters')
    return false;
  }

  return true;
}
