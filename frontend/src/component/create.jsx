import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useState } from 'react';

const cardSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  image: z.any(), // image will be handled manually
  price: z.coerce.number().min(0),
  location: z.string().min(1),
  country: z.string().min(1),
  interest: z.string().min(1),
});

function CreateCard() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({ resolver: zodResolver(cardSchema) });

  const imageFile = watch("image");

  const onSubmit = async (data) => {
    if (buttonLoading) return;
    setButtonLoading(true);
    try {
      // 1. Upload image first
      console.log("start")
      const formData = new FormData();
      formData.append("image", data.image[0]); // input is FileList
      formData.append("filename", "custom_" + Date.now()); // optional custom name
      console.log(formData);
      const uploadRes = await axiosClient.post("/listing/upload-image", formData);
      const imageUrl = uploadRes.data.url;
      console.log("hello");
      // 2. Submit card details with image URL
      const payload = { ...data, image: imageUrl };
      delete payload.image; // avoid sending file object
      payload.image = imageUrl;

      const createRes = await axiosClient.post("/listing/createCard", payload);
      console.log("Card created:", createRes.data);
      reset();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-200 p-4 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="label">Title</label>
            <input type="text" id="title" {...register("title")} className="input input-bordered w-full" />
            {errors.title && <p className="text-error">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="label">Description</label>
            <textarea id="description" {...register("description")} className="textarea textarea-bordered w-full" />
            {errors.description && <p className="text-error">{errors.description.message}</p>}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="label">Upload Image</label>
            <input type="file" accept="image/*" {...register("image")} className="file-input file-input-bordered w-full" />
            {errors.image && <p className="text-error">{errors.image.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="label">Price</label>
            <input type="number" id="price" {...register("price")} className="input input-bordered w-full" />
            {errors.price && <p className="text-error">{errors.price.message}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="label">Location</label>
            <input type="text" id="location" {...register("location")} className="input input-bordered w-full" />
            {errors.location && <p className="text-error">{errors.location.message}</p>}
          </div>

          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="label">Country</label>
            <input type="text" id="country" {...register("country")} className="input input-bordered w-full" />
            {errors.country && <p className="text-error">{errors.country.message}</p>}
          </div>

          {/* Interest */}
          <div className="mb-4">
            <label className="label">Interest</label>
            {["cities", "mountains", "pools", "camping", "farm place"].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="radio" value={item} {...register("interest")} className="radio radio-error" />
                <span>{item}</span>
              </label>
            ))}
            {errors.interest && <p className="text-error">{errors.interest.message}</p>}
          </div>

          {/* Submit */}
          <div className="mt-6 text-center">
            <button type="submit" className={`btn bg-red-500 text-white ${buttonLoading ? "loading" : ""}`}>
              {buttonLoading ? "Creating..." : "Create Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
