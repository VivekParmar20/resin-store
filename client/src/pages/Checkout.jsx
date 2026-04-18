import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, setOpen, setCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter valid 10-digit phone";

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter valid email";

    if (!form.instagram.trim())
      newErrors.instagram = "Instagram ID is required";

    if (!form.instagram.match(/^[a-zA-Z0-9._]{3,30}$/))
      newErrors.instagram = "Invalid Instagram username";

    if (!form.address.trim())
      newErrors.address = "Address is required";

    if (!form.city.trim())
      newErrors.city = "City is required";

    if (!form.state.trim())
      newErrors.state = "State is required";

    if (!form.pincode.match(/^[0-9]{6}$/))
      newErrors.pincode = "Invalid pincode";

    return newErrors;
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
  const newErrors = validate();
  setErrors(newErrors);

  // ❌ Validation failed → scroll to error
  if (Object.keys(newErrors).length > 0) {
    const firstField = Object.keys(newErrors)[0];
    const element = document.getElementsByName(firstField)[0];

    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  try {
    // ✅ SEND DATA TO BACKEND
    const res = await axios.post("https://resin-store.onrender.com/api/orders", {
      customer: form,
      items: cart,
      total,
    });

    // ✅ SUCCESS
    alert("Order placed successfully 🎉 Check your email!");
    setCart([]);

    // OPTIONAL UX IMPROVEMENTS
    navigate("/"); // go back to home

  } catch (error) {
    console.error(error);
    alert("Something went wrong ❌");
  }
};

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cart.length === 0) {
      // optional redirect
      // navigate("/");
    }
  }, [cart]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #fdf2f8)",
        padding: "20px"
      }}
    >
      <div style={{ maxWidth: "600px", margin: "auto" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Checkout
        </h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "12px" }}>
            <h3>Your cart is empty 🛍️</h3>
            <button className="btn" onClick={() => navigate("/")}>
              Add Products
            </button>
          </div>
        ) : (
          <>
            

            {/* PERSONAL INFO */}
            <div className="section" style={{ background: "#fff0f6" }}>
              <h3>Personal Info</h3>

              <input name="name" className="input" placeholder="Full Name *" onChange={handleChange}
                style={{ border: errors.name ? "1px solid red" : "" }} />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

              <input name="phone" className="input" placeholder="Phone *" onChange={handleChange}
                style={{ border: errors.phone ? "1px solid red" : "" }} />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

              <input name="email" className="input" placeholder="Email *" onChange={handleChange}
                style={{ border: errors.email ? "1px solid red" : "" }} />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

              <input name="instagram" className="input" placeholder="Instagram ID *" onChange={handleChange}
                style={{ border: errors.instagram ? "1px solid red" : "" }} />
              {errors.instagram && <p style={{ color: "red" }}>{errors.instagram}</p>}
            </div>

            {/* ADDRESS */}
            <div className="section" style={{ background: "#eef2ff" }}>
              <h3>Shipping Address</h3>

              <textarea name="address" className="input" placeholder="Address *" onChange={handleChange}
                style={{ border: errors.address ? "1px solid red" : "" }} />
              {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

              <input name="city" className="input" placeholder="City *" onChange={handleChange}
                style={{ border: errors.city ? "1px solid red" : "" }} />
              {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}

              <input name="state" className="input" placeholder="State *" onChange={handleChange}
                style={{ border: errors.state ? "1px solid red" : "" }} />
              {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}

              <input name="pincode" className="input" placeholder="Pincode *" onChange={handleChange}
                style={{ border: errors.pincode ? "1px solid red" : "" }} />
              {errors.pincode && <p style={{ color: "red" }}>{errors.pincode}</p>}
            </div>

            {/* NOTE */}
            <div className="section" style={{ background: "#ecfeff" }}>
              <h3>Order Note</h3>
              <textarea name="note" className="input" placeholder="Optional message" onChange={handleChange} />
            </div>

            {/* SUMMARY */}
            <div className="section" style={{ background: "#fff", border: "2px solid #6366f1" }}>
              <h3>Order Summary</h3>

              {cart.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}

              <hr />

              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* UPDATE CART */}
            <button className="btn" style={{ marginBottom: "15px" }} onClick={() => setOpen(true)}>
              Update Cart
            </button>

            {/* PLACE ORDER */}
            <button
              className="btn"
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(90deg, #6366f1, #ec4899)",
                fontSize: "16px"
              }}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;