import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {products?.map((product) => {
          return (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                className="w-full h-56 p-2 rounded-md object-cover"
                alt=""
              />

              <div className="px-2 flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.description}</p>
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  $ {product.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
