import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuccessPage.module.css";

function SuccessPage() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  return (

    <div className={styles.container}>

      <div className={styles.card}>

        <div className={styles.tick}>✓</div>

        <h2>Order Placed Successfully!</h2>

        <p>You will be redirected to home page...</p>

      </div>

    </div>

  );
}

export default SuccessPage;
