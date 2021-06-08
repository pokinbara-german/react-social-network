/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Messages.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {createField, TextArea} from "../../Common/FormComponents/FieldsComponents/FieldsComponents";
import {initialStageType} from '../../reducers/dialogsReducer';

type mapStatePropsType = {
    dialogsPage: initialStageType
};

type mapDispatchPropsType = {
    sendMessage: (newMessage: string) => void
};

type ownPropsType = {};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

type formDataType = {
    newMessage: string
}

type fieldNamesType = keyof formDataType

let maxLength50 = maxLengthCreator(50);

const Messages: React.FC<propsType> = (props) => {
    let users = props.dialogsPage.userList.map( (user, userIndex) => {
        return <DialogsItem key={'User'+userIndex} id={user.id} name={user.name}/>;
    });
    let messages = props.dialogsPage.messageList.map( (message, messageIndex) => {
        return <Message key={'Message' + messageIndex} message={message.text} userId={message.userId}/>;
    });

    const AddMessage = (formData: formDataType) => {
        props.sendMessage(formData.newMessage);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {users}
            </div>
            <div className={styles.messages}>
                {messages}
                <AddMessageReduxForm onSubmit={AddMessage}/>
            </div>
        </div>
    );
};

const AddMessageForm: React.FC<InjectedFormProps<formDataType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<fieldNamesType>(
                    undefined,
                    'Введите сообщение',
                    'newMessage',
                    TextArea,
                    [required, maxLength50]
                )}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageReduxForm = reduxForm<formDataType>({form: 'addMessage'})(AddMessageForm);

export default Messages;