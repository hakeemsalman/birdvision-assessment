// app/products/[productId]/page.js
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

export default function ProductDetails({ params }) {
  const { productId } = React.use(params);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(data);
      } catch (err) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) return <div className="flex justify-center items-center h-[calc(100vh-200px)]"><ClipLoader color="#333" size={150} /></div>;
  if (error) return <p>{error}</p>;
  if (!product) return (
    <div className="not-found-page">
      <h1>Oops! Product Not Found</h1>
      <p>We couldn't find the product you're looking for.</p>
      <Link className="back-button">Go to Home</Link>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row items-center py-10 px-5 bg-white shadow-lg rounded-lg border border-slate-200">
      <div className="flex flex-col items-center md:items-start md:w-1/2 space-y-4 md:mr-8">
        <h1 className="text-center font-bold text-3xl text-gray-800">{product.title}</h1>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-auto max-w-[300px] rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="flex flex-col space-y-6 md:w-1/2">
        <p className="text-gray-700 text-lg">{product.description}</p>

        <div className="flex items-center space-x-2">
          <p className="text-2xl font-semibold text-gray-900">${product.price}</p>
          {product.discountPercentage && (
            <span className="text-lg text-red-500 bg-red-100 px-2 py-1 rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-600">Rating:</span>
          <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="text-gray-500">({product.rating})</span>
        </div>
        {product.brand && <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-600">Brand:</span>
          <p className="text-gray-800">{product.brand}</p>
        </div>}
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-600">Category:</span>
          <p className="text-gray-800">{product.category}</p>
        </div>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-center transition duration-300 transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
