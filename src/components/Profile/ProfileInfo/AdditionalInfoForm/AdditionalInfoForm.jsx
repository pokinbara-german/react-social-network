import React from "react";
import styles from "./AdditionalInfoForm.module.css";
import {Input, TextArea} from "../../../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../../utils/validators";

const AdditionalInfoForm = (props) => {
    return (
        <form className={styles.additionalInfo} onSubmit={props.handleSubmit}>
            {props.error && <div className={styles.error}>{props.error.map(error => {
                return <div>{error}</div>
            })}</div>}
            <button>Сохранить</button>
            <button onClick={props.onChancel}>Отмена</button>
            <div className={styles.row}>
                <span>Полное имя: </span>
                <Field placeholder={'Ваше имя'}
                       name={'fullName'}
                       component={Input}
                       validate={[required]}
                />
            </div>
            <div className={styles.row}>
                <span>Обо мне: </span>
                <Field placeholder={'Расскажите о себе'}
                       name={'aboutMe'}
                       component={Input}
                       validate={[]}
                />
            </div>
            <div className={styles.row}>
                <span>Ищу работу: </span>
                <Field name={'lookingForAJob'}
                       component={Input}
                       validate={[]}
                       type={'checkbox'}
                />
            </div>
            <div className={styles.row}>
                <span>Навыки: </span>
                <Field placeholder={'Расскажите о себе'}
                       name={'lookingForAJobDescription'}
                       component={TextArea}
                       validate={[]}
                />
            </div>
            <div>
                <span>Контакты: </span>
                <div>
                    {Object.keys(props.contacts).map(key => {
                        return (
                            <div key={key} className={styles.contact}><span>{key}:</span>
                                <Field placeholder={key}
                                       name={'contacts.' + key}
                                       component={Input}
                                       validate={[]}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </form>
);
}

export default reduxForm({form: 'profileInfo'})(AdditionalInfoForm);