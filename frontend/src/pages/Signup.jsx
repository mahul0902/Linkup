import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setAuthUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/users/signup`, 
        { email, username, password },
        { 
          // CRITICAL: Tells the browser to save the session cookie sent by your backend!
          withCredentials: true 
        }
      );

      if (response.status === 201 || response.status === 200) {
        setAuthUser(response.data.user);
        toast.success(response.data.message || 'Signed up Successfully!');
        // Success! Route the user to the Feed page
        navigate('/home'); 
      }
    } catch (err) {
      console.error("Signup error:", err);
    //   setError(err.response?.data?.error || "Sign up failed. Please try again.");
      toast.error("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Join Linkup</h2>
        
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600 transition-colors">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;