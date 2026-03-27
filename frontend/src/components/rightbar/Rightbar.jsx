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
    <aside className="w-[320px] bg-slate-800 min-h-screen px-6 py-6 sticky top-0 h-screen overflow-y-auto">
          
      <div className="pl-6 pr-2 py-6 space-y-8">
      <div className="w-full h-4"></div>
      {/* Stories */}
      <section className="mb-6">
        <h2 className="text-white font-bold text-xl mb-4">Stories</h2>
        <div className="flex gap-3">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className="w-20 h-28 rounded-xl overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
                {story.isOwn && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                    +
                  </div>
                )}
              </div>
              <span className="text-slate-300 text-xs mt-2">{story.name}</span>
            </div>
          ))}
        </div>
      </section>
      <div className="w-full h-8"></div>
      {/* Chats */}
      <section className="mb-8 p-4  rounded-lg">
        <h2 className="text-white font-bold text-xl mb-5">Chats</h2>
        <div className="space-y-6">
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center gap-4 py-2 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base">{chat.name}</h3>
                <p className="text-slate-400 text-sm truncate">{chat.message}</p>
              </div>
              <span className="text-slate-500 text-sm">{chat.time}</span>
            </div>
          ))}
        </div>
      </section>
       <div className="w-full h-8"></div>
      {/* Suggestions */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">Suggestions</h2>
        <div className="space-y-4">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center gap-4 py-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base">{user.name}</h3>
                <p className="text-slate-400 text-sm">@{user.username}</p>
              </div>
              <button className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors">
                Follow
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
