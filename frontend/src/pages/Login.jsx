import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';


function Login({ setIsLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setAuthUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {

      const response = await axios.post(
        `${apiUrl}/users/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {

        setAuthUser(response.data.user);

        toast.success(
          response.data.message || "Successfully logged in!"
        );

        navigate('/home');
      }

    } catch (err) {

      console.error("Login error:", err);

      toast.error("Invalid Username or Password");
    }
  };

 return (

 <div className="bg-white w-full max-w-xl min-h-70 px rounded-3xl shadow-2xl px-12 py-14 flex flex-col justify-center">

    {/* HEADING */}

    <div className="mb-10 text-center">

      <h2 className="text-4xl font-bold font-['Poppins'] tracking-tight text-center text-gray-900">
        Welcome Back
      </h2>

      <p className="text-gray-500 text-base text-center mt-3">
        Login to continue your journey with Linkup.
      </p>

    </div>

    {/* ERROR */}

    {error && (

      <div className="mb-6 text-red-500 text-sm text-center">
        {error}
      </div>

    )}

    {/* FORM */}

    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-6"
    >

      {/* USERNAME */}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="
          w-full
          p-4
          border
          border-gray-200
          rounded-2xl
          bg-gray-50
          text-gray-800
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
        "
        required
      />

      {/* PASSWORD */}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full
          p-4
          border
          border-gray-200
          rounded-2xl
          bg-gray-50
          text-gray-800
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
        "
        required
      />

      {/* BUTTON */}

      <button
        type="submit"
        className="
          mt-2
          bg-blue-500
          text-white
          p-4
          rounded-2xl
          font-semibold
          text-lg
          hover:bg-blue-600
          transition-all
          duration-200
          hover:scale-[1.01]
          active:scale-[0.98]
        "
      >
        Log In
      </button>

    </form>

    {/* SWITCH */}

    <p className="mt-8 text-center text-base text-gray-600">

      Don't have an account?{" "}

      <button
        onClick={() => setIsLogin(false)}
        className="
          text-blue-500
          font-semibold
          hover:underline
        "
      >
        Sign Up
      </button>

    </p>

  </div>
)
}

export default Login;