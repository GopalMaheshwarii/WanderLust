import { CheckCheck,Building2, Mountain, Waves, TentTree, Tractor } from 'lucide-react';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';


function UpdateCard(){
     let [listing,setlisting]=useState([]);
            let [option,setoption]=useState("all");
            let [taxes,settaxes]=useState(false);
            let [filtercard,setfiltercard]=useState([]);
            let [page,setpage]=useState("explore")
            
            useEffect(()=>{
              let fetchData=async()=>{
                 try{
                     let response=await axiosClient.get("/listing/getYourCards");
                       setlisting(response.data);
                       setfiltercard(response.data);
                 }
                 catch(err){
                    console.log("Error : ",err.message);
                 }
              }
              fetchData();
        
            },[])
        
            useEffect(()=>{
                  if (option !== "all") {
                    const data = listing.filter((value) => value?.interest === option);
                    setfiltercard(data);
                 } else {
                    setfiltercard(listing);
                 }
            },[option])
        
    
        function Card({value}){
            return (
             <NavLink to={`/manage/update/${value?._id}`}>
                <div className="card bg-base-100 w-80 shadow-sm opacity-95 hover:opacity-100 hover:scale-105">
                
                   <figure>
                      <img
                         src={value.image}
                         alt="Shoes" 
                         className='h-55 w-full rounded-2xl'/>
                   </figure>
                   <div className="card-body">
                   
                         <h2 className="card-title truncate overflow-hidden whitespace-nowrap">{value?.title}</h2>
                   
                      {
                         taxes==true? (
                            <>
                            <p className='text-gray-500'>&#8377; {value?.price+0.25*value?.price}/night </p>
                            </>
                         ):(
                            <>
                            <p className='text-gray-500'>&#8377; {value?.price}/night + 25%tax</p>
                            </>
                         )
                      }
                      
                   </div>
                   
                
                </div>
             </NavLink>
            )
        }
    
        return (
            <div>
               <div className="flex p-3 gap-5 justify-between pl-5 pr-5">
                   <div className="flex gap-1 text-black">
                         {/* All */}
                         <div>
                         <button
                            className={`rounded p-1 pl-4 pr-4 ${
                               option === 'all' ? 'bg-red-400 text-white' : 'bg-white'
                            } hover:bg-red-200`}
                            onClick={() => setoption('all')}
                         >
                            <div className="flex flex-col items-center">
                               <CheckCheck className="h-6 w-6" />
                               <span className="text-xs font-light px-2">All</span>
                            </div>
                         </button>
                         </div>
    
                         {/* Cities */}
                         <div>
                         <button
                            className={`rounded p-1 ${
                               option === 'cities' ? 'bg-red-400 text-white' : 'bg-white'
                            }  hover:bg-red-200`}
                            onClick={() => setoption('cities')}
                         >
                            <div className="flex flex-col items-center">
                               <Building2 className="h-6 w-6" />
                               <span className="text-xs font-light px-2">Iconic Cities</span>
                            </div>
                         </button>
                         </div>
    
                         {/* Mountains */}
                         <div>
                         <button
                            className={`rounded p-1 ${
                               option === 'mountains' ? 'bg-red-400 text-white' : 'bg-white'
                            }  hover:bg-red-200`}
                            onClick={() => setoption('mountains')}
                         >
                            <div className="flex flex-col items-center">
                               <Mountain className="h-6 w-6" />
                               <span className="text-xs font-light px-2">Mountains</span>
                            </div>
                         </button>
                         </div>
    
                         {/* Pools */}
                         <div>
                         <button
                            className={`rounded p-1 ${
                               option === 'pools' ? 'bg-red-400 text-white' : 'bg-white'
                            }  hover:bg-red-200`}
                            onClick={() => setoption('pools')}
                         >
                            <div className="flex flex-col items-center">
                               <Waves className="h-6 w-6" />
                               <span className="text-xs font-light px-2">Pools</span>
                            </div>
                         </button>
                         </div>
    
                         {/* Camping */}
                         <div>
                         <button
                            className={`rounded p-1 ${
                               option === 'camping' ? 'bg-red-400 text-white' : 'bg-white'
                            }  hover:bg-red-200`}
                            onClick={() => setoption('camping')}
                         >
                            <div className="flex flex-col items-center">
                               <TentTree className="h-6 w-6" />
                               <span className="text-xs font-light px-2">Camping</span>
                            </div>
                         </button>
                         </div>
    
                         {/* Farm Place */}
                         <div>
                         <button
                            className={`rounded p-1 ${
                               option === 'farm place' ? 'bg-red-400 text-white' : 'bg-white'
                            }  hover:bg-red-200`}
                            onClick={() => setoption('farm place')}
                         >
                            <div className="flex flex-col items-center">
                               <Tractor className="h-6 w-6" />
                               <span className="text-xs font-light px-2">Farm Place</span>
                            </div>
                         </button>
                         </div>
                      </div>
    
                    <div className="flex flex-row border items-center pl-3 pr-3 rounded-4xl">
                         <label for="taxes" className='pr-2'>Display total after taxes</label>
                         <input id="taxes" type="checkbox" className="toggle checked:text-red-600" onClick={()=>{settaxes(!taxes)}} />
                    </div>
               </div>
               <div className="flex flex-wrap justify-center gap-5 p-5 h-200 overflow-auto ml-10 mr-10 custom-scrollbar">
                      {
                         filtercard.map((value,index)=>{
                            return <Card key={value?._id||value.index}  value={value} ></Card>
                         })
                      }
               </div>
               <div className="h-30"></div>
               </div>
          
        )
}

export default UpdateCard