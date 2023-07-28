import React, { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetProducts } from '../../apicalls/products';
import { SetLoader } from '../../redux/loadersSlice';
import { message } from 'antd';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status:"approved",
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state)=> state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if(response.success){
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4">
      {products?.map((product) => {
        return (
        <div className='border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer'>
          <img
                  src={product.images[0]}
                  className="w-full h-52 p-2 rounded-md object-cover"
                  alt=""
                />
          <h1>{product.name}</h1>
        </div>
        );
      })}
      </div>
    </div>
  )
}

export default Home