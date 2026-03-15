import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

function CartPage() {

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // 🔥 TOTAL CALCULATION
  const total = cart.reduce((acc, item) => {
    const price =
      Number(item.discountPrice) || Number(item.price) || 0;

    const qty = Number(item.qty) || 0;

    return acc + price * qty;
  }, 0);

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => {

            const price =
              Number(item.discountPrice) ||
              Number(item.price) ||
              0;

            const subtotal = price * Number(item.qty);

            return (
              <div key={item.id} className={styles.card}>

                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.image}
                />

                <div className={styles.details}>

                  <h4>{item.name}</h4>

                  {/* PRICE DISPLAY */}
                  <p className={styles.priceBox}>

                    {item.discountPrice ? (
                      <>
                        <span className={styles.oldPrice}>
                          ₹{item.price}
                        </span>

                        <span className={styles.newPrice}>
                          ₹{item.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span className={styles.newPrice}>
                        ₹{item.price}
                      </span>
                    )}

                  </p>

                  {/* QUANTITY */}
                  <div className={styles.qtyBox}>

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className={styles.qtyBtn}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>

                  </div>

                  {/* SUBTOTAL */}
                  <p className={styles.subtotal}>
                    Subtotal: ₹{subtotal}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>

                </div>
              </div>
            );
          })}

          {/* TOTAL SECTION */}
          <div className={styles.totalSection}>

            <h3>Total: ₹{total}</h3>

            <button
              onClick={() => navigate("/checkout")}
              className={styles.checkoutBtn}
            >
              Process To Payment
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;
