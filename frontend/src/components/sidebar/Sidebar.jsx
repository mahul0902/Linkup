import { Home, Search, Users, Bell, Link } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Explore', active: false },
    { icon: Users, label: 'Friends', active: false },
    { icon: Bell, label: 'Notifications', active: false },
  ]

  const {authUser, setAuthUser} = useAuth();
  const username = authUser?.username || 'Guest';
  const profilePic = authUser?.profileImage || 'https://images.unsplash.com/photo-1776715139572-ae3d62ce6f6c?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleLogout = async () => {
    try {
        // 1. Tell the backend to destroy the session and cookie
        // (Even for logout, withCredentials is required so the server knows WHO to log out)
        const response = await axios.post(`${apiUrl}/users/logout`, 
            {},
            { withCredentials: true }
        );

        if (response.status === 200) {
            // 2. Clear the global Context so the UI instantly updates
            setAuthUser(null);
            
            // 3. Show a nice message
            toast.success(response.data.message || 'Logged out successfully');
            
            // 4. Kick them back to the Login or Signup page
            navigate('/');
        }
    } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <aside className="w-64 bg-slate-800 min-h-screen p-4 flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-400 font-bold text-xl mb-8">
        <Link className="w-6 h-6" />
        <span>LinkUp</span>
      </div>

      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-2">
          <img
            src={profilePic}
            alt="User avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-400"
          />
          {/* <div className="absolute -bottom-1 -right-1 flex">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=30&h=30&fit=crop&crop=face"
              alt="Friend 1"
              className="w-6 h-6 rounded-full border-2 border-slate-800"
            />
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=30&h=30&fit=crop&crop=face"
              alt="Friend 2"
              className="w-6 h-6 rounded-full border-2 border-slate-800 -ml-2"
            />
          </div> */}
        </div>
        <h3 className="text-white font-semibold">{username}</h3>
        {/* <p className="text-slate-400 text-sm">@samosapaglu</p> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'text-white bg-slate-700'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors">Logout</button>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
