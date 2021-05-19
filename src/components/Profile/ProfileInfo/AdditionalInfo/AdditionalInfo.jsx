import React from "react";
import styles from "./AdditionalInfo.module.css";

const AdditionalInfo = (props) => {
    return(
        <div className={styles.additionalInfo}>
            {props.isOwner && <button onClick={props.setEditMode}>Редактировать</button>}
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