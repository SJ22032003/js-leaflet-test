import loading from "../../../assets/loading.svg";
import styles from "./styles.module.css";

function Loader() {
  return (
    <div className={styles.mainLoaderContainer}>
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Loader;