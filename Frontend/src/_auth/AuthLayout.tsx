
import { Navigate, Outlet } from 'react-router-dom'
import Wallpaper from '../assets/wallpaperLogin.png'

const AuthLayout = () => {
    const isAuthenticaded = false
  return (
    <>
        {isAuthenticaded ? (
            <Navigate to='/' />
        ) : (
            <>
                <img 
                    src={Wallpaper}
                    alt="Wallpaper"
                    className="w-full h-full absolute top-0 left-0 object-cover bg-no-repeat z-0" 
                
                />
                
                <section className='flex flex-1 justify-center items-center flex-col z-10 gap-4 p-4 min-h-screen'>
                    <Outlet />
                </section>

            </>
        )}    
    </>
  )
}

export default AuthLayout