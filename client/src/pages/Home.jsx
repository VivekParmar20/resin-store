import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://resin-store.onrender.com/api/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Handmade Resin Art</h1>
          <p className="hero-subtitle">
            Unique, aesthetic & handmade pieces crafted with love.
          </p>
          <a href="#products" className="hero-btn">Shop Now</a>
        </div>

        <div className="hero-image"></div>
      </div>

      <div className="container" id="products">
        <h2 className="section-title">Products</h2>

        <div className="product-grid">
          {products.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;