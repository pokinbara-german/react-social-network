/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Messages.module.css';
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {TextArea} from "../../Common/FormComponents/FieldsComponents/FieldsComponents";

let maxLength10 = maxLengthCreator(10);

const Messages = (props) => {
    let users = props.dialogsPage.userList.map( (user, userIndex) => {
        return <DialogsItem key={'User'+userIndex} id={user.id} name={user.name}/>;
    });
    let messages = props.dialogsPage.messageList.map( (message, messageIndex) => {
        return <Message key={'Message' + messageIndex} message={message.text} userId={message.userId}/>;
    });

    const AddMessage = (formData) => {
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

const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessage'
                       component={TextArea}
                       placeholder='enter message'
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageReduxForm = reduxForm({form: 'addMessage'})(AddMessageForm);

export default Messages;