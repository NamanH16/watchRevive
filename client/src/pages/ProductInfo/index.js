import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts, GetProductById } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/Divider";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
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
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5">
          {/*Images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer " +
                      (selectedImageIndex === index
                        ? "border-2 border-green-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>


          </div>

          {/*details */}
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-bold text-cyan-200">{product.name}</h1>
              <span>
                {product.description}
              </span>
            </div>
            <Divider />
            <div>
              <h1 className="text-2xl font-semibold text-cyan-200">Product Details</h1>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductInfo;
