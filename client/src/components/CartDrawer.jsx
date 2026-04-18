import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const {
    cart,
    open,
    setOpen,
    removeFromCart,
    increaseQty,
    decreaseQty,
    updateQty,
  } = useCart();

  const navigate = useNavigate();

  if (!open) return null;

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* OVERLAY */}
      <div className="cart-overlay" onClick={() => setOpen(false)}></div>

      {/* DRAWER */}
      <div className="cart-drawer">

        {/* HEADER */}
        <div className="cart-header">
          <div className="cart-title">Your Bag</div>
          <div className="cart-close" onClick={() => setOpen(false)}>✖</div>
        </div>

        {/* ITEMS */}
        <div className="cart-items">
          {cart.length === 0 && <p>No items in cart</p>}

          {cart.map((item, i) => (
            <div key={i} className="cart-item">
              <img src={item.images[0]} />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price}</div>

                {/* QUANTITY */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <button onClick={() => decreaseQty(item._id)}>-</button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item._id, Number(e.target.value))
                    }
                    style={{
                      width: "50px",
                      textAlign: "center",
                      padding: "4px",
                    }}
                  />

                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                {/* REMOVE */}
                <div
                  className="remove-btn"
                  onClick={() => removeFromCart(i)}
                >
                  Remove
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* ADD MORE */}
          <button
            className="btn"
            onClick={() => setOpen(false)}
          >
            Add More Items
          </button>

          {/* CHECKOUT */}
          <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={() => {
              if (cart.length === 0) return;
              navigate("/checkout");
              setOpen(false);
            }}
          >
            {cart.length === 0 ? "Cart is empty" : "Checkout"}
            
          </button>
        </div>

      </div>
    </>
  );
};

export default CartDrawer;