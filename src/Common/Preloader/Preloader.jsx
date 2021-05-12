import React from "react";
import styles from './Preloader.module.css';
import preloader from "../../assets/images/preloader-spinner.svg";

const Preloader = (props) => {
    return (
        <div className={!props.notCentered ? styles.preloaderWrapper : null}>
            <img alt='preloader' className={styles.preloader} src={preloader}/>
        </div>
    );
}

export default Preloader;