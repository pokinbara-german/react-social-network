import {filterType} from '../../../reducers/usersReducer';
import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';

type propsType = {
    onPageChanged: (filter?: filterType) => void
}

type formFieldsType = {
    searchTerm: string,
    friend: 'null' | 'true' | 'false'
}

const formValidate = () => {
    return {};
}

export const UsersSearchForm: React.FC<propsType> = (props) => {
    function onSubmit(values: formFieldsType, {setSubmitting}: FormikHelpers<formFieldsType>) {
        const filter: filterType = {
            searchTerm: values.searchTerm || null,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onPageChanged(filter);
        setSubmitting(false);
    }

    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <Formik
                initialValues={{searchTerm: '', friend: "null"} as formFieldsType}
                validate={formValidate}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="searchTerm"/>
                        <Field name="friend" component="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <ErrorMessage name="searchTerm" component="div"/>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UsersSearchForm;