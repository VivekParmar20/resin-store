import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setOpen, cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      style={{
        width: "100%",
        padding: "12px 20px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT - STORE NAME */}
      <h2
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          whiteSpace: "nowrap"
        }}
      >
        Resin Store
      </h2>

      {/* RIGHT - CART */}
      <div
        onClick={() => setOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* ICON */}
        <span style={{ fontSize: "20px" }}>🛍️</span>

        {/* COUNT BADGE */}
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-10px",
              background: "red",
              color: "white",
              fontSize: "11px",
              padding: "2px 6px",
              borderRadius: "50%",
              minWidth: "18px",
              textAlign: "center"
            }}
          >
            {totalItems}
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;