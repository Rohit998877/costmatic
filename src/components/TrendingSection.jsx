import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CartContext } from "../context/CartContext";
import styles from "./TrendingSection.module.css";

function TrendingSection() {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const trendingProducts = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.category &&
              item.category.toLowerCase() === "trending"
          );

        setProducts(trendingProducts);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Trending Products</h2>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : products.length === 0 ? (
        <p className={styles.loading}>No trending products found.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageBox}>
                <img src={item.image} alt={item.name} />
                <span className={styles.badge}>🔥 Trending</span>
              </div>

              <div className={styles.content}>
                <h4>{item.name}</h4>

                {item.caption && (
                  <p className={styles.caption}>
                    {item.caption}
                  </p>
                )}

                <p className={styles.rating}>
                  ⭐ {item.rating || 4.7}
                </p>

                <div className={styles.price}>

{item.discountPrice ? (

<>

<span style={{textDecoration:"line-through",color:"gray",marginRight:"8px"}}>

₹{item.price}

</span>

<span style={{color:"#be123c",fontWeight:"700"}}>

₹{item.discountPrice}

</span>

<span style={{
background:"#16a34a",
color:"white",
fontSize:"11px",
padding:"3px 6px",
borderRadius:"5px",
marginLeft:"8px"
}}>

{Math.round(((item.price-item.discountPrice)/item.price)*100)}% OFF

</span>

</>

) : (

<span>₹{item.price}</span>

)}

</div>

                <button
                  className={styles.btn}
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingSection;
