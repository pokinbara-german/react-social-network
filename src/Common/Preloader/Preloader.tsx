import React from "react";
import styles from './Preloader.module.css';
import preloader from "../../assets/images/preloader-spinner.svg";

type preloaderPropsType = {
    notCentered?: boolean
}

/**
 * Returns block with preloader spinner.
 * @param {preloaderPropsType} props - props object
 * @param {boolean=} props.notCentered - if true, block will be aligned to center
 * @constructor
 */
const Preloader: React.FC<preloaderPropsType> = (props) => {
    return (
        <div className={!props.notCentered ? styles.preloaderWrapper : undefined}>
            <img alt='preloader' className={styles.preloader} src={preloader}/>
        </div>
    );
}

export default Preloader;