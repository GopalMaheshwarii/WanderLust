import { CheckCheck,Building2, Mountain, Waves, TentTree, Tractor } from 'lucide-react';
import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';

function Explore(){
    let [listing,setlisting]=useState([]);
        let [option,setoption]=useState("all");
        let [taxes,settaxes]=useState(false);
        let [filtercard,setfiltercard]=useState([]);
        let [pageno,setpageno]=useState(1);
        let  [currentitems,setcurrentitems]=useState([])
        
        useEffect(()=>{
          let fetchData=async()=>{
             try{
                 let response=await axiosClient.get("/listing/getAllCards");
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
                setpageno(1);
             } else {
                setfiltercard(listing);
             }
        },[option]);

        useEffect(()=>{
         const limit=6;
         const startIndex =(pageno-1)*limit;
         const endIndex=startIndex+limit<=filtercard.length?startIndex+limit:filtercard.length;
         setcurrentitems(filtercard.slice(startIndex, endIndex));

        },[pageno, filtercard]);
        
        
    

    function Card({value}){
        return (
         <NavLink to={`/listing/${value?._id}`}>
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
           <div className="">
           <div className="flex flex-wrap justify-center gap-5 p-5 h-200 overflow-auto ml-10 mr-10 custom-scrollbar">
                  {
                     currentitems.map((value,index)=>{
                        return <Card key={value?._id||value.index}  value={value} ></Card>
                     })
                  }
                 
           </div>
            {/* pagination */}
            <div className="flex justify-center pt-10">
           <div className="join ">
                     <button
                        className="join-item btn  btn-neutral btn-dash bg-red-400 text-white hover:scale-120"
                        onClick={() => setpageno(pageno === 1 ? 1 : pageno - 1)}
                     >
                        «
                     </button>

                     <button className="join-item btn btn-outline bg-white hover:scale-120">Page {pageno}</button>

                     <button
                        className="join-item btn btn-neutral btn-dash  bg-red-400 text-white hover:scale-120"
                        disabled={pageno >= Math.ceil(filtercard.length / 6)}
                        onClick={() => setpageno(pageno + 1)}
                        >
                        »
                     </button>
                        
               </div>
               </div>
            </div>
           

           <div className="h-30"></div>
           </div>
      
    )
}

export default Explore;