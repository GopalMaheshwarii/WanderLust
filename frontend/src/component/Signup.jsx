import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slice/authSlice';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { EyeOff,Eye} from 'lucide-react';


const signupSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  emailId:z.string().email(),
  password:z.string().min(8),
  age: z.coerce.number().min(6).max(80)
});

function Signup(){ 
    
     let dispatch=useDispatch();
     let navigate=useNavigate();
     let {isAuthenticated,loading}=useSelector((state)=>state.auth)
     let [showpassword,setshowpassword]=useState(false);
     
     const {register,handleSubmit,formState: { errors }} = useForm({resolver: zodResolver(signupSchema)});
     //it return an object 
     useEffect(()=>{
          if(isAuthenticated){
            navigate("/explore");
          }
     },[isAuthenticated])

     function submittedData(data){
        //it give json format data firstName:gopal
        dispatch(registerUser(data));
     }
     
   return (
    
      <div className='flex flex-1 justify-center items-center'>
          <div className="w-96 p-4 rounded-2xl">
              
              <div className="">
                    <form onSubmit={handleSubmit(submittedData)}>
                           <div className="mb-4">
                            <label htmlFor="firstname" className="label mb-1">First Name</label>
                            <br></br>
                            <input type="text" id="firstname" placeholder="John" className={`input input-bordered ${errors.firstName && 'input-error'}`} {...register('firstName')}/>
                            {errors.firstName && (<p className="text-error">{errors.firstName.message}</p>)}
                            </div>
                            <div className="mb-4">
                            <label htmlFor="lastname" className="label mb-1">Last Name</label>
                            <br></br>
                            <input type="text" id="lastname" placeholder="Doe" className={`input input-bordered ${errors.lastName && 'input-error'}`} {...register('lastName')}/>
                            {errors.lastName && (<p className="text-error">{errors.lastName.message}</p>)}
                            </div>

                            <div className="mb-4">
                            <label htmlFor="age" className="label mb-1">Age</label>
                            <br></br>
                            <input type="number" id="age" placeholder=".." className={`input input-bordered ${errors.age && 'input-error'}`} {...register('age')}/>
                            {errors.age && (<p className="text-error">{errors.age.message}</p>)}
                            </div>

                            <div className="mb-4">
                            <label htmlFor="emailId" className="label mb-1">Email</label>
                            <br></br>
                            <input type="text" id="emailId" placeholder="John@gmail.com" className={`input input-bordered ${errors.emailId && 'input-error'}`} {...register('emailId')}/>
                            {errors.emailId && (<p className="text-error">{errors.emailId.message}</p>)}
                            </div>

                            <div className="mb-4 ">
                            <label htmlFor="password" className="label mb-1">Password</label>
                            <br></br>
                            <div className="relative">
                            <input type={showpassword ? "text" : "password"} id="password" placeholder="........" className={`input input-bordered ${errors.password && 'input-error'}`} {...register('password')}/>
                            <button type="button"
                                onClick={() => setshowpassword(!showpassword)}
                                className="absolute top-2 right-10 text-gray-500 hover:text-gray-700"
                              >
                                {showpassword ? <EyeOff /> : <Eye />}
                            </button>
                            </div>
                            {errors.password && (<p className="text-error">{errors.password.message}</p>)}
                            </div>
                           
                            <div className="flex justify-center ${loading ? 'loading' : ''}`">
                                <button type="submit" className="btn bg-red-400 text-white" disabled={loading}> {loading ? 'Signing Up...' : 'Sign Up'}</button>
                            </div>

                            <div className="mt-8 text-center">
                                  Already have an account? <NavLink to="/login" className="text-red-500 underline">Login</NavLink>
                            </div>
                    </form>
              </div>
          </div>
      </div>
 )
}
export default Signup;
