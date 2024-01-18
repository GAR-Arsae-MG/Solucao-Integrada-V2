import Footer from '../components/ui/Footer'
import TopNav from '../components/ui/TopNav'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
        <TopNav />

        <div className='flex flex-col w-full items-center gap-4 p-4 min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
            <Outlet />
        </div>

        <Footer />
    </>
  )
}

export default RootLayout