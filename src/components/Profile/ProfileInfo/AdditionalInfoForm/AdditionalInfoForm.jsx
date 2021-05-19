import React from "react";
import styles from "./AdditionalInfoForm.module.css";
import {Input, TextArea} from "../../../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {Field, reduxForm} from "redux-form";

const AdditionalInfoForm = (props) => {
    return(
        <form className={styles.additionalInfo} onSubmit={props.handleSubmit}>
            <button>Сохранить</button>
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
        </form>
    );
}

export default reduxForm({form: 'profileInfo'})(AdditionalInfoForm);