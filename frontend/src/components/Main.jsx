import Sidebar from './sidebar/Sidebar.jsx'
import Feed from './feed/Feed.jsx'
import Rightbar from './rightbar/Rightbar.jsx'

function Main() {
  return (
    <div className="flex min-h-screen bg-gray-100 gap-30 px-6 py-6">
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  )
}

export default Main
