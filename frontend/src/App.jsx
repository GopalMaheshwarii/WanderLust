import './App.css'
import { Routes,Route, Navigate } from 'react-router';
import Homepage from './pages/homepage';
import Listing from './pages/Listing';
import Login from './component/Login';
import Explore from './component/Explore';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './component/Signup';
import Admin from './pages/Admin';
import CreateCard from './component/create';
import UpdateCard from './component/updatelist';
import DeleteCard from './component/delete';
import { Magnet } from 'lucide-react';
import Manage from './component/mangepanel';
import { checkAuth } from './slice/authSlice';
import { useEffect } from 'react';
import UpdateCardId from './component/updatecardid';
import Updateform from './component/updateform';




function App() {
  let {isAuthenticated}=useSelector((state)=>state.auth);
  let dispatch=useDispatch();
  useEffect(()=>{
       dispatch(checkAuth());
  },[])

  
  
  return (
    <>
      <Routes>
           <Route path="/" element={<Homepage/>}>
               <Route  element={<Explore/>} index></Route>
               <Route path="explore" element={<Explore />} />
               <Route path='login' element={<Login/>}></Route>
               <Route path='signup' element={<Signup/>}></Route>
               <Route path="listing/:id" element={<Listing/>}></Route>
           </Route>
           <Route path="/manage" element={<Admin></Admin>}>
               <Route index element={<Manage></Manage>}/>
               <Route path="create" element={isAuthenticated?<CreateCard />:<Navigate to="/login"/>}/>
               <Route path='update' element={isAuthenticated?<UpdateCard/>:<Navigate to="/login"/>}></Route>
               <Route path='update/:id' element={isAuthenticated?<UpdateCardId/>:<Navigate to="/login"/>}></Route>
                <Route path='update/:id/updateform' element={isAuthenticated?<Updateform/>:<Navigate to="/login"/>}></Route>
               <Route path='delete' element={isAuthenticated?<DeleteCard/>:<Navigate to="/login"/>}></Route>
           </Route>
      </Routes>
    </>
  )
}

export default App;
