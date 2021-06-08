import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './ProfileInfo.module.css';
import Preloader from "../../../Common/Preloader/Preloader";

type propsType = {
    status: string,
    statusFetching: boolean,
    updateStatus: (status: string) => void
};

const ProfileStatus: React.FC<propsType> = (props) => {

    let statusText = props.status || 'No status';

    let [isStatusEditing, setStatusEditing] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditing = () => {
        let newValue = !isStatusEditing;
        setStatusEditing(newValue);

        if (!newValue && status && (statusText !== status)) {
            props.updateStatus(status);
        }
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }

    if (props.statusFetching) {
        return <Preloader notCentered={true}/>
    }

    return isStatusEditing
        ? <input autoFocus={true}
                 onBlur={toggleEditing}
                 onChange={onStatusChange}
                 className={styles.statusInput}
                 value={status}
        />
        : <div className={styles.statusDiv} onClick={toggleEditing}><span className={styles.statusSpan}>Статус: </span>{statusText}</div>;
}

export default ProfileStatus;