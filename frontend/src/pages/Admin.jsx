import { Plus, Edit, Trash2,Video  } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slice/authSlice';
function Admin(){
  let {isAuthenticated}=useSelector((state)=>state.auth);
  let dispatch=useDispatch();
  let navigate=useNavigate();
   function UserLogout(){
          dispatch(logoutUser());
          navigate("/manage")
      }
   return (
    <div className="flex flex-col h-screen ">
       
        <div className="shadow-md p-3 flex justify-between items-center gap-3 w-full sticky top-0 bg-white z-30">
                <div className="">
                        <i className="bi bi-compass text-red-400 text-3xl"></i>
                </div>
                <div className="pl-5 "><NavLink to="/explore">Explore</NavLink></div>

                <div className="flex-1 flex justify-center font-bold font-stretch-150% text-red-500 text-shadow-lg text-2xl "> WanderLust</div>

                {isAuthenticated==false?(
                    <>
                    <div className="btn btn-outline btn-error border-none"><NavLink to="/signup">Sign up</NavLink></div>
                    <div className="btn btn-outline btn-error border-none"><NavLink to="/login">Login</NavLink></div>
                    </>
                ):(
                    <div className="btn btn-outline btn-error border-none"><button onClick={UserLogout}>Logout</button></div>
                )

                }
        </div>

        <div className="flex-1">
        <Outlet />
        </div>

        <div className="p-6 bg-gray-200 flex flex-col items-center gap-10">
                      <div className="flex gap-3">
                           <a href="" className="bg-black text-white pr-1 pl-1 opacity-75 hover:opacity-100"><i class="bi bi-facebook"></i></a>
                           <a href="" className="bg-black text-white pr-1 pl-1 opacity-75 hover:opacity-100"><i class="bi bi-instagram"></i></a>
                           <a href="" className="bg-black text-white pr-1 pl-1 opacity-75 hover:opacity-100"><i class="bi bi-linkedin"></i></a>
                      </div>
                      <div className="opacity-75 hover:opacity-100">
                          <i class="bi bi-c-circle"></i> <a href="">Wanderlust Private Limited</a>
                      </div>
                      <div className="opacity-75 hover:opacity-100">
                        <a href=""> Privacy terms</a> 
                      </div>
        </div>
    </div>
   )

}
export default Admin; 