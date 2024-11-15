'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
        setProducts(data.products);
      } catch (err) {
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  if (loading) return <div className="flex justify-center items-center h-[calc(100vh-200px)]"><ClipLoader color="#333" size={150} /></div>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-5 p-5 justify-center">
        {products.map((product) => (
          <div key={product.id} className="hover:scale-105 transition-transform bg-white shadow-lg rounded-lg border border-slate-200 p-2 text-center cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3 className='w-full h-auto max-w-[300px] rounded-lg'>{product.title}</h3>
              <p className='text-2xl font-semibold text-gray-900'>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 p-5">
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg text-center transition duration-300 transform hover:scale-105 disabled:bg-gray-500' onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span className='flex flex-row bg-green-400 rounded-full px-5 py-3 mx-3 text-white font-bold'>{page}</span>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg text-center transition duration-300 transform hover:scale-105' onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
