import React from "react";
import styles from './Preloader.module.css';
import preloader from "../../assets/images/preloader-spinner.svg";

const Preloader = () => {
    return (
        <div className={styles.preloaderWrapper}>
            <img alt='preloader' className={styles.preloader} src={preloader}/>
        </div>
    );
}

export default Preloader;