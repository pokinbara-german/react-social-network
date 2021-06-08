import React from "react";
import styles from "./AdditionalInfoForm.module.css";
import {createField, Input, TextArea} from "../../../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators";
import {contactsType, profileType} from '../../../../reducers/types/types';

type formOwnPropsType = {
    contacts: contactsType,
    onChancel: () => void
}

type formDataType = profileType;
type fieldNamesType = keyof formDataType;


const AdditionalInfoForm: React.FC<InjectedFormProps<formDataType, formOwnPropsType> & formOwnPropsType> = (props) => {
    return (
        <form className={styles.additionalInfo} onSubmit={props.handleSubmit}>
            {props.error && <div className={styles.error}><div>{props.error}</div></div>}
            <button>Сохранить</button>
            <button onClick={props.onChancel}>Отмена</button>
            <div className={styles.row}>
                <span>Полное имя: </span>
                {createField<fieldNamesType>(
                    undefined,
                    'Ваше имя',
                    'fullName',
                    Input,
                    [required]
                )}
            </div>
            <div className={styles.row}>
                <span>Обо мне: </span>
                {createField<fieldNamesType>(
                    undefined,
                    'Расскажите о себе',
                    'aboutMe',
                    Input,
                    []
                )}
            </div>
            <div className={styles.row}>
                <span>Ищу работу: </span>
                {createField<fieldNamesType>(
                    undefined,
                    undefined,
                    'lookingForAJob',
                    Input,
                    [],
                    {type: 'checkbox'}
                )}
            </div>
            <div className={styles.row}>
                <span>Навыки: </span>
                {createField<fieldNamesType>(
                    undefined,
                    'Расскажите о навыках',
                    'lookingForAJobDescription',
                    TextArea,
                    []
                )}
            </div>
            <div>
                <span>Контакты: </span>
                <div>
                    {Object.keys(props.contacts).map(key => {
                        return (
                            <div key={key} className={styles.contact}><span>{key}:</span>
                                {createField(
                                    undefined,
                                    key,
                                    'contacts.' + key,
                                    Input,
                                    []
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </form>
);
}

export default reduxForm<formDataType, formOwnPropsType>({form: 'profileInfo'})(AdditionalInfoForm);