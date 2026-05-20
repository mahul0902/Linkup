import { Home, Search, Users, Bell, Link } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Sidebar() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    // { icon: Search, label: "Explore", active: false },
    // { icon: Users, label: "Friends", active: false },
    // { icon: Bell, label: "Notifications", active: false },
  ];

  const { authUser, setAuthUser } = useAuth();
  const username = authUser?.username || "Guest";
  const profilePic =
    authUser?.profileImage ||
    "https://images.unsplash.com/photo-1776715139572-ae3d62ce6f6c?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleLogout = async () => {
    try {
      // 1. Tell the backend to destroy the session and cookie
      // (Even for logout, withCredentials is required so the server knows WHO to log out)
      const response = await axios.post(
        `${apiUrl}/users/logout`,
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        // 2. Clear the global Context so the UI instantly updates
        setAuthUser(null);

        // 3. Show a nice message
        toast.success(response.data.message || "Logged out successfully");

        // 4. Kick them back to the Login or Signup page
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <aside
      className="
   w-70
  h-screen
  bg-slate-950
  border-r
  border-slate-800
  px-6
  py-8
  flex
  flex-col
  justify-between
  sticky
  top-0
  rounded-2xl
  "
    >
      {/* LOGO */}

      <div className="flex items-center gap-3 mb-12">
        <div
          className="
        w-11
        h-11
        rounded-2xl
        bg-linear-to-br
        from-blue-500
        to-indigo-600
        flex
        items-center
        justify-center
        shadow-lg
      "
        >
          <Link className="w-5 h-5 text-white" />
        </div>

        <h1
          className="
        text-3xl
        font-extrabold
        text-white
        tracking-tight
        font-['Poppins']
      "
        >
          LinkUp
        </h1>
      </div>

      {/* PROFILE */}

      <div
        className="
      bg-slate-900/80
      border
      border-slate-800
      rounded-3xl
      p-6
      flex
      flex-col
      items-center
      mb-10
      shadow-xl
    "
      >
        <div className="relative mb-4">
          <img
            src={profilePic}
            alt="User avatar"
            className="
            w-24
            h-24
            rounded-full
            border-4
            border-blue-500
            object-cover
            shadow-lg
          "
          />

          {/* ONLINE DOT */}

          <div
            className="
          absolute
          bottom-1
          right-1
          w-5
          h-5
          bg-green-400
          border-2
          border-slate-900
          rounded-full
        "
          />
        </div>

        <h3
          className="
        text-white
        text-lg
        font-semibold
      "
        >
          {username}
        </h3>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`
                group
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-200
                font-medium

                ${
                  item.active
                    ? `
                      bg-linear-to-r
                      from-blue-500
                      to-indigo-600
                      text-white
                      shadow-lg
                    `
                    : `
                      text-slate-300
                      hover:bg-slate-800
                      hover:text-white
                    `
                }
              `}
              >
                <item.icon
                  className="
                w-5
                h-5
                transition-transform
                duration-200
                group-hover:scale-110
              "
                />

                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className="
        mt-8
        w-full
        bg-red-500/90
        hover:bg-red-600
        text-white
        py-4
        rounded-2xl
        font-semibold
        transition-all
        duration-200
        hover:scale-[1.02]
        active:scale-[0.98]
        shadow-lg
      "
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
