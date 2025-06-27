import React from 'react';
import AuthImage from '../Assets/auth-image.png';
import Logo from '../Assets/Instagram-Logo.png';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from '../Helper/Firebase'
import { setUser } from '../Redux/Slices/authSlice';

function Login() {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      dispatch(setUser({
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        uid: loggedInUser.uid,
      }))
      reset();
      navigate('/Dashboard')
    }
    catch (err) {
      alert(err.message)
    }
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-4">

        <div className="hidden md:block md:w-1/2 ">
          <img src={AuthImage} alt="App Screenshots" className="w-[512px]" />
        </div>

        <div className="md:w-1/2 w-full max-w-sm bg-black md:border-none border p-8 border-[#262626] rounded-lg">

          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Instagram Logo"
              className="h-24 object-contain filter invert"
            />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Enter your email address"
              className="bg-transparent border border-[#333] text-sm p-2 rounded focus:outline-none"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="bg-transparent border border-[#333] text-sm p-2 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#0095f6] text-white py-1 rounded-lg font-semibold hover:bg-[#1877f2]"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-[#333]" />
            <span className="text-xs text-gray-400">OR</span>
            <hr className="flex-grow border-[#333]" />
          </div>

          <div className="text-center text-sm mt-6">
            <span className="text-[#a8a8a8]">Don't have an account? </span>
            <Link to='/register' className="text-[#0095f6] cursor-pointer hover:underline font-medium">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
