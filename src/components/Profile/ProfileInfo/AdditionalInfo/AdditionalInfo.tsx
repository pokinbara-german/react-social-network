import React from "react";
import styles from "./AdditionalInfo.module.css";
import {contactsType} from '../../../../reducers/types/types';
import {ProfileContact} from './ProfileContact/ProfileContact';

type propsType = {
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    contacts: contactsType,
    isOwner: boolean,
    setEditMode: () => void
};

const AdditionalInfo: React.FC<propsType> = (props) => {
    return (
        <div className={styles.additionalInfo}>
            {props.isOwner && <button onClick={props.setEditMode}>Редактировать</button>}
            <div className={styles.item}><span>Обо мне: </span>{props.aboutMe || 'Пусто'}</div>
            <div className={styles.item}><span>Ищет работу: </span>{props.lookingForAJob ? 'Да' : 'Нет'}</div>
            {props.lookingForAJob && <div><span>Навыки: </span>{props.lookingForAJobDescription}</div>}
            <div className={styles.item}>
                <span>Контакты: </span>
                {Object.keys(props.contacts).map((key) => {
                    return <ProfileContact key={key} contactTitle={key} contactInfo={props.contacts[key as keyof contactsType]}/>
                })}
            </div>
        </div>
    );
}

export default AdditionalInfo