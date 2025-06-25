import { LogOut, Search } from 'lucide-react';
import { Navigate, NavLink, useNavigate } from 'react-router';
import {Outlet} from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slice/authSlice';

function Homepage(){
    let {isAuthenticated}=useSelector((state)=>state.auth);
    let dispatch=useDispatch();
    let navigate=useNavigate();

    function UserLogout(){
        dispatch(logoutUser());
        navigate("/explore")
    }
    
    
     return (
        <div className='flex flex-col h-screen '>
           <div className="shadow-md p-3 flex justify-between items-center gap-3 w-full sticky top-0 bg-white z-30">
                <div className="">
                        <i className="bi bi-compass text-red-400 text-3xl"></i>
                </div>
                <div className="pl-5 "><NavLink to="explore">Explore</NavLink></div>
                <div className="flex flex-1 justify-center">
                        <input type="text" className="input input-secondary rounded-3xl " placeholder="Search Destination"/>
                        <button className='btn btn-error rounded-3xl ml-5 text-white'><Search></Search>Search</button>
                </div>
                <div className=""><NavLink to="/manage" className="text-black opacity-65 hover:opacity-100 hover:font-bold">Become a host</NavLink></div>
                {isAuthenticated==false?(
                    <>
                    <div className="btn btn-outline btn-error border-none"><NavLink to="signup">Sign up</NavLink></div>
                    <div className="btn btn-outline btn-error border-none"><NavLink to="login">Login</NavLink></div>
                    </>
                ):(
                    <div className="btn btn-outline btn-error border-none"><button onClick={UserLogout}>Logout</button></div>
                )

                }
            </div>
              
            <Outlet/>
          

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
export default Homepage;