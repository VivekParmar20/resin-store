import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card-ui">
      <div className="product-image-wrapper">
        <img src={product.images[0]} className="product-image" />
        <span className="badge">New</span>
      </div>

      <div className="product-title-ui">{product.name}</div>
      <div className="product-price-ui">₹{product.price}</div>

      <button
        className="btn"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        Book Now
      </button>
    </div>
  );
};

export default ProductCard;