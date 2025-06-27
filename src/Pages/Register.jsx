import React from 'react';
import AuthImage from '../Assets/auth-image.png';
import Logo from '../Assets/Instagram-Logo.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../Helper/Firebase';

function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, { displayName: name })
      
      const updateUser = auth.currentUser;
      
      dispatch(setUser({
        name: updateUser.displayName,
        email: updateUser.email,
        uid: updateUser.uid
      }))
      reset();
      navigate('/Dashboard');
    }
    catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-4">

        <div className="hidden md:block md:w-1/2">
          <img src={AuthImage} alt="App Screenshots" className="w-[512px]" />
        </div>

        <div className="md:w-1/2 w-full max-w-sm bg-black md:border-none border p-8 border-[#262626] rounded-lg">

          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={Logo}
              alt="Instagram Logo"
              className="h-24 object-contain filter invert"
            />
            <p className="text-sm text-gray-400 mt-2 text-center px-2">
              Sign up to see photos and videos from your friends.
            </p>
          </div>


          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("name", { required: "Username is required" })}
              placeholder="Username"
              className="bg-transparent border border-[#333] text-sm p-2 rounded focus:outline-none"
            />
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="bg-transparent border border-[#333] text-sm p-2 rounded focus:outline-none"
            />
            <input
              type="password"
              {...register("password", { required: "Username is required", minLength: { value: 6, message: "min 6 characters" } })}
              placeholder="Password"
              className="bg-transparent border border-[#333] text-sm p-2 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#0095f6] text-white py-1 rounded-lg font-semibold hover:bg-[#1877f2]"
            >
              Sign up
            </button>
          </form>

          <div className="text-center text-sm mt-6">
            <span className="text-[#a8a8a8]">Have an account? </span>
            <Link to='/' className="text-[#0095f6] cursor-pointer hover:underline font-medium">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
