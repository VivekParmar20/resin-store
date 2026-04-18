import sendEmail from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    // ✅ BASIC VALIDATION (backend safety)
    if (
      !customer?.name ||
      !customer?.phone ||
      !customer?.email ||
      !customer?.instagram ||
      !customer?.address ||
      !customer?.city ||
      !customer?.state ||
      !customer?.pincode
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ RE-CALCULATE TOTAL (DON'T TRUST FRONTEND)
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // 🧾 ITEMS HTML
    const itemList = items
      .map(
        (item) =>
          `<li>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</li>`
      )
      .join("");

    // 💌 CUSTOMER EMAIL
    const customerHTML = `
      <h2>✨ Thank you for your order 💖</h2>
      <p>Hi ${customer.name},</p>

      <p>Your order has been successfully placed!</p>

      <h3>🛍️ Order Details:</h3>
      <ul>${itemList}</ul>

      <p><strong>Total:</strong> ₹${total}</p>

      <p>We will contact you soon via Instagram: <b>${customer.instagram}</b></p>

      <p>Thank you for supporting our handmade resin store 🌸</p>
    `;

    await sendEmail({
      to: customer.email,
      subject: "Your Order is Confirmed 🎉",
      html: customerHTML,
    });

    // 📩 ADMIN EMAIL
    const adminHTML = `
      <h2>🚀 New Order Received</h2>

      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Instagram:</strong> ${customer.instagram}</p>

      <p><strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state}, ${customer.pincode}</p>

      <h3>📦 Items:</h3>
      <ul>${itemList}</ul>

      <p><strong>Total:</strong> ₹${total}</p>

      <p><strong>Note:</strong> ${customer.note || "None"}</p>
    `;

    await sendEmail({
      to: "vivek9898688479@gmail.com",
      subject: "🛒 New Order Received",
      html: adminHTML,
    });

    res.status(200).json({ message: "Order placed & emails sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};