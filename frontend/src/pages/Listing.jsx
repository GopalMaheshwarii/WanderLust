import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const commentSchema = z.object({
  comment: z.string().min(3).max(800),
  rating:  z.coerce.number().min(1).max(5)
});

function Listing(){
    let [card,setcard]=useState(null);
    let {id}=useParams();
    const {register,handleSubmit,formState: { errors },reset} = useForm({ resolver: zodResolver(commentSchema) });
    let [changereview,setchangereview]=useState(false);
    useEffect(()=>{
        let fetchdata=async()=>{
             try {
                let response= await axiosClient.get(`/listing/getCard/${id}`);
                setcard(response.data.card);
                
             } catch (error) {
                 console.log("error frontend : "+error.message);
             }  
        }
        fetchdata();
    },[changereview])
   
    if (!card) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading...
            </div>
        );
    }
    async function onSubmit(data){
        try {
            console.log("review start ",data)
            let response =await axiosClient.post(`/review/createReview/${id}`,data); 
            console.log("review end",response.data);
            reset({ comment: '', rating: 0 });
            setchangereview(!changereview);
        } catch (error) {
            console.log("Error occur in frontend = ",error.message)
        }

    }
    function Makingreview({name,rating,comment}){
        return(
            <div className="card card-border bg-base-100 w-96 hover:scale-105 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                     <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                        </span>
                    ))}
                </div>
                    <p>{comment}</p>
                    {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                </div>
           </div>
        )
    }

    return (
        <div className="flex flex-col items-center p-5">
              <div className="card bg-base-100 w-200 ">
                 <div className="card-title mb-5 text-4xl">{card.title}</div>
                <figure>
                    <img
                    src={card.image}
                    alt="Shoes" className="w-full h-80 rounded-4xl"
                  />
                </figure>
                <div className="card-body p-0 pt-5 pb-6">
                    
                    <p className="italic font-bold">owned by {card?.user?.firstName}</p>
                    <p className="text-xl text-gray-600">{card.description}</p>
                    <p  className="font-bold text-2xl"> &#8377; {card.price} + 25%</p>
                    <p className=" text-gray-600">{card.location}</p>
                    <p className=" text-gray-600">{card.country}</p>
                    <div className="card-actions justify-center">
                    <button className="btn btn-error text-white w-full">Buy Now</button>
                    </div>
                </div>
                </div>
               

              <div className=" w-200">
                    <div className="flex justify-start text-xl font-bold">Leave a Review</div>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="rating mb-4">
                                <input type="radio" value="1" {...register('rating')} name="rating" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                                <input type="radio" value="2" {...register('rating')} name="rating" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                                <input type="radio" value="3" {...register('rating')} name="rating" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                                <input type="radio" value="4" {...register('rating')} name="rating" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                                <input type="radio" value="5" {...register('rating')} name="rating" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                            </div>

                          <label htmlFor="comment" className="text-gray-500">Comment</label>
                            <textarea
                                id="comment"
                                className={`textarea textarea-bordered w-full h-40 mt-2 mb-4${errors.comment ? 'textarea-error' : ''}`}
                                placeholder="Write your comment here"
                                {...register('comment')}
                                />
                            {errors.comment && <p className="text-error">comment length show be under 3 to 800 characters.</p>}
        
                            <button type="submit" className="btn  btn-neutral btn-outline">Submit</button>
                        </form>
                    </div>
              </div>

              <div className="w-200  mt-10 mb-20">
                 <div className="font-bold text-xl mb-5">All Reviews</div>
                 <div className="grid grid-cols-2 gap-4">
                    {
                        card?.reviews.map((value,index)=><Makingreview key={value._id||index} 
                           name={value?.user?.firstName || "unknown"} rating={value?.rating} comment={value?.comment} />)
                    }
                 </div>
                     
              </div>
        </div>
    )
}

export default Listing; 