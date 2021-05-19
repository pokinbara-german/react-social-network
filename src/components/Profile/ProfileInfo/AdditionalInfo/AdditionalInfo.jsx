import styles from "./AdditionalInfo.module.css";
import React from "react";

const AdditionalInfo = (props) => {
    return(
        <div className={styles.additionalInfo}>
            <div><span>Обо мне: </span>{props.aboutMe || 'Пусто'}</div>
            <div><span>Ищет работу: </span>{props.lookingForAJob ? 'Да' : 'Нет'}</div>
            {props.lookingForAJob && <div><span>Навыки: </span>{props.lookingForAJobDescription}</div>}
            <div>
                <span>Контакты: </span>
                {Object.keys(props.contacts).map(key => {
                    return <ProfileContact key={key} contactTitle={key} contactInfo={props.contacts[key]}/>
                })}
            </div>
        </div>
    );
}

const ProfileContact = ({contactTitle, contactInfo}) => {
    return (
        <div>
            <span>{contactTitle}:</span>{contactInfo}
        </div>
    );
}

export default AdditionalInfo