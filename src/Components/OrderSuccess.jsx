import { Link } from "react-router-dom";
import "../Styles/OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-page">
      <h1>Order Placed Successfully</h1>
      <p>Thank you for shopping with Urban Cart</p>

      <Link to="/" className="home-btn">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
