import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';

const cardSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  image: z.string().url(),
  price: z.coerce.number().min(0),
  location: z.string().min(1),
  country: z.string().min(1),
  interest: z.string().min(1)
});

function Updateform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ resolver: zodResolver(cardSchema) });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  // Fetch card data and fill the form
  useEffect(() => {
    async function fetchCardData() {
      try {
        const response = await axiosClient.get(`/listing/getCard/${id}`);
        console.log("Fetched card data:", response.data);

        const card = response.data.card || response.data;

        reset({
          title: card.title || '',
          description: card.description || '',
          image: card.image || '',
          price: card.price || 0,
          location: card.location || '',
          country: card.country || '',
          interest: card.interest || ''
        });

        // Optional debug
        setTimeout(() => {
          console.log("Form values after reset:", getValues());
        }, 300);

      } catch (err) {
        console.error('Failed to fetch card:', err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchCardData();
  }, [id]);

  async function onUpdate(data) {
    if (buttonLoading) return;

    try {
      setButtonLoading(true);
      const response = await axiosClient.put(`/listing/updateCard/${id}`, data);
      console.log('Card updated:', response.data);
      navigate(`/manage/update/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setButtonLoading(false);
    }
  }

  if (loadingData) return <p className="text-center mt-10">Loading card data...</p>;

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-200 p-4 rounded-2xl">
        <form onSubmit={handleSubmit(onUpdate)}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="label mb-1">Title</label>
            <input
              type="text"
              id="title"
              className={`input w-full input-bordered ${errors.title && 'input-error'}`}
              {...register('title')}
            />
            {errors.title && <p className="text-error">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="label mb-1">Description</label>
            <textarea
              id="description"
              className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
              rows={5}
              {...register('description')}
            />
            {errors.description && <p className="text-error">{errors.description.message}</p>}
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="label mb-1">Image URL</label>
            <input
              type="text"
              id="image"
              className={`input w-full input-bordered ${errors.image && 'input-error'}`}
              {...register('image')}
            />
            {errors.image && <p className="text-error">{errors.image.message}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="label mb-1">Price</label>
            <input
              type="number"
              id="price"
              className={`input w-full input-bordered ${errors.price && 'input-error'}`}
              {...register('price')}
            />
            {errors.price && <p className="text-error">{errors.price.message}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="label mb-1">Location</label>
            <input
              type="text"
              id="location"
              className={`input w-full input-bordered ${errors.location && 'input-error'}`}
              {...register('location')}
            />
            {errors.location && <p className="text-error">{errors.location.message}</p>}
          </div>

          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="label mb-1">Country</label>
            <input
              type="text"
              id="country"
              className={`input w-full input-bordered ${errors.country && 'input-error'}`}
              {...register('country')}
            />
            {errors.country && <p className="text-error">{errors.country.message}</p>}
          </div>

          {/* Interest */}
          <div className="mb-4">
            <label htmlFor="interest" className="label mb-1">Select Interest</label>
            <div className="flex flex-wrap gap-5">
              {["cities", "mountains", "pools", "camping", "farm place"].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={value}
                    {...register("interest")}
                    className="radio radio-error"
                  />
                  <span className="capitalize">{value}</span>
                </label>
              ))}
            </div>
            {errors.interest && <p className="text-error">{errors.interest.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={`btn bg-red-400 text-white ${buttonLoading ? 'loading' : ''}`}
              disabled={buttonLoading}

            >
              {buttonLoading ? 'Updating...' : 'Update Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updateform;
