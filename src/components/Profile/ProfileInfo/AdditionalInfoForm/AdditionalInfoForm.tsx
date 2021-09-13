import React, {useState} from "react";
import {required, validatorCreator} from "../../../../utils/validators";
import {contactsType, profileType} from '../../../../types';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {createFieldF, formikCheckbox, formikField} from '../../../../Common/FormComponents/FieldsComponentsFormik';
import {ErrorMessage, FormikHelpers, FormikProvider, useFormik} from 'formik';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {useDispatch} from 'react-redux';
import {saveProfile} from '../../../../reducers/profileReducer';

type propsType = {
    profile: profileType,
    onChancel: () => void
}

type formBasicInfoPropsType = {
    checked: boolean,
    triggerCheckbox: () => void
}

type formContactsInfoPropsType = {
    contacts: contactsType
}

type formDataType = profileType;
type fieldNamesType = keyof formDataType;

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
        additionalInfoRow: {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
            '& > p': {
                flexBasis: '92px',
                textAlign: 'end',
                margin: theme.spacing(1),
            },
            '& > div': {
                flexGrow: 1,
                display: 'flex'
            }
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
        stretched: {
            flexGrow: 1
        },
        errorText: {
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
            hasApiErrors = error;
        }
        finally {
            setSubmitting(false);
        }

        if (!hasApiErrors && formik.submitCount > 0) {
            props.onChancel();
        }
    }

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
                <div className={classes.errorText}>{formik.status}</div>
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

/**
 * Returns fields: fullName, aboutMe, lookingForAJob, lookingForAJobDescription
 * for profile-info form with needed handlers.
 * @param {formBasicInfoPropsType} props
 * @constructor
 */
const FormBasicInfo: React.FC<formBasicInfoPropsType> = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(props.checked);

    /**
     * Checkbox trigger handler. Sets value to Checkbox and to formik differently.
     * Because formik can't trigger Material-UI Checkbox by himself if default value set.
     * @param event
     */
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.triggerCheckbox();
        setChecked(event.target.checked);
    };

    return (
        <Card variant={'outlined'}>
            <div className={classes.additionalInfoRow}>
                <Typography>Full name: </Typography>
                {createFieldF<fieldNamesType>(
                    classes.stretched,
                    'Your name',
                    'fullName',
                    formikField,
                    validatorCreator([required])
                )}
                <ErrorMessage name='fullName' />
            </div>
            <div className={classes.additionalInfoRow}>
                <Typography>About me: </Typography>
                {createFieldF<fieldNamesType>(
                    classes.stretched,
                    'Say about you',
                    'aboutMe',
                    formikField,
                    validatorCreator([])
                )}
            </div>
            <div className={classes.additionalInfoRow}>
                <Typography>Look for job: </Typography>
                {createFieldF<fieldNamesType>(
                    undefined,
                    undefined,
                    'lookingForAJob',
                    formikCheckbox,
                    validatorCreator([]),
                    {checked, color: 'primary', onChange}
                )}
            </div>
            <div className={classes.errorText}><ErrorMessage name={'lookingForAJob'} /></div>
            <div className={classes.additionalInfoRow}>
                <Typography>Skills: </Typography>
                {createFieldF<fieldNamesType>(
                    classes.stretched,
                    'Say about job or skills',
                    'lookingForAJobDescription',
                    formikField,
                    validatorCreator([]),
                    {multiline: true}
                )}
            </div>
        </Card>
    );
}

/**
 * Returns fields with contacts for profile-info form.
 * @param {formContactsInfoPropsType} props
 * @constructor
 */
const FormContactsInfo: React.FC<formContactsInfoPropsType> = (props) => {
    const classes = useStyles();

    return (
        <Card variant={'outlined'}>
            {Object.keys(props.contacts).map(key => {
                return (
                    <div key={key} className={classes.additionalInfoRow}><Typography>{key}:</Typography>
                        {createFieldF(
                            classes.stretched,
                            key + ' link with http',
                            'contacts.' + key,
                            formikField,
                            validatorCreator([])
                        )}
                    </div>
                );
            })}
        </Card>
    );
}

export default AdditionalInfoForm;