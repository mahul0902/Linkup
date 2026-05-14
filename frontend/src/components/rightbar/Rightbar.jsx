function Rightbar() {
  const stories = [
    { id: 1, name: 'Your Story', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop', isOwn: true },
    { id: 2, name: 'Sarah', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=150&fit=crop', isOwn: false },
    { id: 3, name: 'Alex', image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=100&h=150&fit=crop', isOwn: false },
  ]

  const chats = [
    { id: 1, name: 'Jessica Lee', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', message: 'See you tomorrow!', time: '5m' },
    { id: 2, name: 'Mike Davis', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', message: 'Thanks for the help!', time: '1h' },
    { id: 3, name: 'Anna Kim', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', message: 'Sounds good', time: '3h' },
  ]

  const suggestions = [
    { id: 1, name: 'Emma Wilson', username: 'emmaw', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face' },
    { id: 2, name: 'Tom Rivera', username: 'tomr', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    { id: 3, name: 'Lisa Park', username: 'lisap', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face' },
  ]

return (

  <aside className="
    w-85
    min-h-screen
    bg-slate-950
    border-l
    border-slate-800
    sticky
    top-0
    h-screen
    px-6
    py-8
    overflow-y-auto
  ">

    <div className="space-y-8">

      {/* CHATS */}

      <section className="
        bg-slate-900/80
        border
        border-slate-800
        rounded-l
        p-6
        shadow-xl
      ">

        <div className="flex items-center justify-between mb-6">

          <h2 className="
            text-white
            text-lg
            font-bold
            font-['Poppins']
          ">
            Chats
          </h2>

          <button className="
            text-sm
            text-blue-400
            hover:text-blue-300
            transition-colors
          ">
            View all
          </button>

        </div>

        <div className="space-y-4">

          {chats.map((chat) => (

            <div
              key={chat.id}
              className="
                flex
                items-center
                gap-4
                p-3
                rounded-lg
                hover:bg-slate-800
                cursor-pointer
                transition-all
                duration-200
              "
            >

              {/* AVATAR */}

              <div className="relative">

                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                    border-2
                    border-slate-700
                  "
                />

                {/* ONLINE STATUS */}

             

              </div>

              {/* TEXT */}

              <div className="flex-1 min-w-0">

                <h3 className="
                  text-white
                  font-semibold
                  truncate
                ">
                  {chat.name}
                </h3>

                <p className="
                  text-slate-400
                  text-sm
                  truncate
                  mt-1
                ">
                  {chat.message}
                </p>

              </div>

              {/* TIME */}

              <span className="
                text-slate-500
                text-xs
                whitespace-nowrap
              ">
                {chat.time}
              </span>

            </div>

          ))}

        </div>

      </section>
      {/* gap */}
      <div className="h-20"  />
      

      {/* SUGGESTIONS */}

      <section className="
        bg-slate-900/80
        border
        border-slate-800
        rounded-lg
        p-6
        shadow-xl
      ">

        <div className="flex items-center justify-between mb-6">

          <h2 className="
            text-white
            text-lg
            font-bold
            font-['Poppins']
          ">
            Suggestions
          </h2>

          <button className="
            text-sm
            text-blue-400
            hover:text-blue-300
            transition-colors
          ">
            Refresh
          </button>

        </div>

        <div className="space-y-5">

          {suggestions.map((user) => (

            <div
              key={user.id}
              className="
                flex
                items-center
                gap-4
              "
            >

              {/* AVATAR */}

              <img
                src={user.avatar}
                alt={user.name}
                className="
                  w-14
                  h-14
                  rounded-full
                  object-cover
                  border-2
                  border-slate-700
                "
              />

              {/* USER INFO */}

              <div className="flex-1 min-w-0">

                <h3 className="
                  text-white
                  font-semibold
                  truncate
                ">
                  {user.name}
                </h3>

                <p className="
                  text-slate-400
                  text-sm
                  truncate
                ">
                  @{user.username}
                </p>

              </div>

              {/* FOLLOW BUTTON */}

              <button className="
                px-5
                py-2.5
                bg-linear-to-r
                from-blue-500
                to-indigo-600
                text-white
                text-sm
                font-semibold
                rounded-lg
                hover:opacity-90
                transition-all
                duration-200
                hover:scale-[1.03]
                active:scale-[0.98]
                shadow-lg
              ">
                 <h1>‎ ‎ Follow ‎ ‎  </h1> 
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>

  </aside>
)
}

export default Rightbar
