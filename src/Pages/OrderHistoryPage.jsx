import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "./OrderHistoryPage.module.css";

function OrderHistoryPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ORDERS
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const snapshot = await getDocs(collection(db, "orders"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(list);

      } catch (error) {

        console.error("Order fetch error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);


  // 🔥 REMOVE ORDER
  const handleRemove = async (id) => {

    try {

      await deleteDoc(doc(db, "orders", id));

      setOrders((prev) =>
        prev.filter((order) => order.id !== id)
      );

    } catch (error) {

      console.error("Delete Error:", error);

    }

  };


  if (loading) {

    return (
      <div className={styles.container}>
        <h2>Loading Orders...</h2>
      </div>
    );

  }


  return (

    <div className={styles.container}>

      <h2 className={styles.heading}>My Orders</h2>

      {orders.length === 0 ? (

        <p className={styles.empty}>No orders found.</p>

      ) : (

        <div className={styles.grid}>

          {orders.map((order) => (

            <div key={order.id} className={styles.card}>

              {/* ORDER HEADER */}

              <div className={styles.top}>

                <div>

                  <p className={styles.orderId}>
                    Order ID: {order.orderId}
                  </p>

                  <p className={styles.date}>
                    {order.createdAt?.toDate()?.toLocaleString()}
                  </p>

                </div>

                <span className={styles.status}>
                  {order.paymentStatus || "Success"}
                </span>

              </div>


              {/* ORDER ITEMS */}

              <div className={styles.items}>

                {Array.isArray(order.items) &&
                  order.items.map((item, index) => {

                    const price =
                      Number(item.discountPrice) ||
                      Number(item.price) ||
                      0;

                    return (

                      <div key={index} className={styles.item}>

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className={styles.info}>

                          <h4>{item.name}</h4>

                          <p>Qty: {item.qty}</p>

                          <p>₹{price}</p>

                        </div>

                      </div>

                    );

                  })}

              </div>


              {/* ORDER FOOTER */}

              <div className={styles.bottom}>

                <h3>Total: ₹{order.total}</h3>

                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(order.id)}
                >
                  Remove Order
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default OrderHistoryPage;
