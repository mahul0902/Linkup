import React, { useState } from 'react';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(false);

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SECTION */}

      <div className="
        hidden
        md:flex
        w-1/2
        bg-linear-to-br
        from-blue-500
        to-indigo-700
        text-white
        flex-col
        justify-center
        items-center
        px-16
        relative
        overflow-hidden
      ">

        {/* GLOW EFFECT */}

        <div className="
          absolute
          w-125
          h-125
          bg-white/10
          rounded-full
          blur-3xl
          -top-37.5
          -left-25
        " />

        <div className="
          absolute
          w-100
          h-100
          bg-cyan-300/10
          rounded-full
          blur-3xl
          -bottom-37.5
          -right-25
        " />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col items-center">

          {/* LOTTIE */}

          <div className="w-105">

            <DotLottieReact
              src="https://lottie.host/c4ea0100-5a23-41e4-9c7c-5a9ae093efc6/E1LhDSInK0.lottie"
              loop
              autoplay
            />

          </div>

          {/* TITLE */}

          <h1 className="
            text-6xl
            font-extrabold
            tracking-tight
            mt-2
            font-['Poppins']
          ">
            Linkup
          </h1>

          {/* TAGLINE */}

          <p className="
            text-lg
            text-center
            max-w-md
            mt-5
            text-blue-100
            leading-relaxed
          ">
            Connect with people, share your moments,
            and build meaningful conversations in one place.
          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="
        w-full
        md:w-1/2
        flex
        justify-center
        items-center
        px-6
      ">

        {isLogin ? (

          <Login setIsLogin={setIsLogin} />

        ) : (

          <Signup setIsLogin={setIsLogin} />

        )}

      </div>

    </div>
  );
}