import React from "react";
import {contactsType, profileType} from '../../../../types';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {saveProfile} from '../../../../reducers/profileReducer';
import {FormBasicInfo, FormContactsInfo} from './AdditionalInfoParts/AdditionalInfoParts';

type propsType = {
    profile: profileType,
    onChancel: () => void
}

type formDataType = profileType;
export type fieldNamesType = keyof formDataType;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        additionalInfoForm: {
            display: 'flex',
            flexDirection: 'column',
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        infoWrapper: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                flexGrow: 1,
                flexBasis: '460px',
            }
        },
        statusText: {
            color: 'red',
            marginLeft: theme.spacing(1),
        },
        errorsWrapper: {
            display: 'flex',
            justifyContent: 'center'
        }
    }),
);

/**
 * Sets every contact value to empty string if it's value is null.
 * Because Material-UI not allow null as value to input.
 * @param {contactsType} contacts - object with contacts
 */
function normalizeContacts (contacts: contactsType) {
    for (let contact in contacts) {
        if (contacts.hasOwnProperty(contact)) {
            contacts[contact as keyof contactsType] = contacts[contact as keyof contactsType] || '';
        }

    }

    return contacts;
}

/**
 * Returns form with profile-info data.
 * @param {propsType} props
 * @constructor
 */
const AdditionalInfoForm: React.FC<propsType> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let initialValues = props.profile;
    initialValues.contacts = normalizeContacts(initialValues.contacts);

    const formik = useFormik({
        initialValues: props.profile,
        enableReinitialize: true,
        onSubmit: onSubmit,
    });

    async function onSubmit (formData: profileType, {setSubmitting, setFieldError, setStatus}: FormikHelpers<profileType>) {
        let hasApiErrors = '';

        try {
            await dispatch(saveProfile(formData,  setFieldError, setStatus));
        }
        catch (error) {
            hasApiErrors = error as string;
        }
        finally {
            setSubmitting(false);
        }

        if (!hasApiErrors && formik.submitCount > 0) {
            props.onChancel();
        }
    }

    /**
     * Handler for manually trigger lookingForAJob-checkbox in formik.
     * Because formik can't trigger Material-UI Checkbox by himself if default value set.
     */
    function triggerCheckbox() {
        formik.setFieldValue("lookingForAJob", !formik.values.lookingForAJob);
    }

    return (
        <form className={classes.additionalInfoForm} onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
            <div className={classes.infoWrapper}>
                <FormBasicInfo checked={props.profile.lookingForAJob} triggerCheckbox={triggerCheckbox}/>
                <FormContactsInfo contacts={props.profile.contacts}/>
            </div>
            <div className={classes.errorsWrapper}>
                <div className={classes.statusText}>{formik.status}</div>
            </div>
            <div className={classes.buttonsWrapper}>
                <Button color='primary'
                        variant='contained'
                        type='submit'
                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                >Save</Button>
                <Button color='secondary' variant='contained' onClick={props.onChancel}>Cancel</Button>
            </div>
            </FormikProvider>
        </form>
    );
}

export default AdditionalInfoForm;