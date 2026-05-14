import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component that wraps your app
export const AuthProvider = ({ children }) => {
    // State to hold the logged-in user's data (null means logged out)
    const [authUser, setAuthUser] = useState(null);
    
    // State to prevent the app from rendering before we check the session cookie
    const [loading, setLoading] = useState(true); 

    const apiUrl = import.meta.env.VITE_API_URL;

    // 3. The "Page Refresh" Check
    // This runs exactly once every time the user opens the app or refreshes the page
    useEffect(() => {
        const checkExistingSession = async () => {
            try {
                // Ask the backend: "Do I have a valid cookie right now?"
                // Note: Make sure your backend has a GET route like '/api/auth/me'
                const response = await axios.get(`${apiUrl}/users/auth`, {
                    withCredentials: true // CRITICAL: sends the session cookie to the server!
                });
                
                // If the server says "Yes, here is your info", save it to the global bubble
                setAuthUser(response.data.user);
            } catch (error) {
                // If the server replies 401 Unauthorized, the cookie is expired or missing.
                // Leave the user as null.
                setAuthUser(null);
            } finally {
                // Whether we succeeded or failed, stop the loading screen
                setLoading(false);
            }
        };

        checkExistingSession();
    }, [apiUrl]);

    // 4. Loading State
    // Wait to render the app until we know who is logged in. 
    // This prevents the user from being accidentally kicked to the Login page for 1 second on refresh.
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
                




   <div className="w-105 flex flex-col items-center"> <DotLottieReact
      src="https://lottie.host/96d899e1-0537-4c5b-baf1-069114d75655/Q9NI4v8n4x.lottie"
      loop
      autoplay
    />
  
    <p className="text-xl font-semibold text-gray-500">Loading Linkup...</p>
          </div>  </div>
        );
    }

    // 5. The Handoff
    // Provide the user data and the setter function to the rest of the application
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// 6. The Custom Hook
// This makes it incredibly easy for other files to grab the data.
// Instead of typing useContext(AuthContext) everywhere, you just type useAuth()
export const useAuth = () => {
    return useContext(AuthContext);
};