import CategorySection from "../components/CategorySection";
import TrendingSection from "../components/TrendingSection";
import VideoShowcase from "../components/VideoShowcase";
import LuxuryVideoSection from "../components/LuxuryVideoSection";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";
import styles from "../App.module.css";

function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroline}>Luxury Beauty Experience</h1>
      </section>

      <CategorySection />
      <TrendingSection />
      <VideoShowcase />
      <LuxuryVideoSection />
      <TrustSection />
      <Footer />
    </>
  );
}

export default Home;
