import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios.get(`https://resin-store.onrender.com/api/products/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelected(res.data.images[0]);
      });
  }, []);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="product-container">

      {/* LEFT - IMAGE GALLERY */}
      <div className="product-gallery">
        <img src={selected} className="main-image" />

        <div className="thumbnail-row">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="thumbnail"
              onClick={() => setSelected(img)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT - DETAILS */}
      <div className="product-details">
        

        <h2 className="product-title-big">{product.name}</h2>
        <h3 className="product-price-big">₹{product.price}</h3>

        <p>{product.description}</p>

        <button
          className="btn"
          onClick={() => {
            addToCart(product);
            navigate("/");
          }}
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
};

export default ProductPage;