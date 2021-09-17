import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {createField, FormikCheckbox, FormikField} from '../../../../../Common/FormComponents/FieldsComponentsFormik';
import {required, validatorCreator} from '../../../../../utils/validators';
import {ErrorMessage} from 'formik';
import {fieldNamesType} from '../AdditionalInfoForm';
import {contactsType} from '../../../../../types';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        stretched: {
            flexGrow: 1
        },
        errorText: {
            color: 'red',
            marginLeft: theme.spacing(1),
        },
    }),
);

type formBasicInfoPropsType = {
    checked: boolean,
    triggerCheckbox: () => void
}

/**
 * Returns fields: fullName, aboutMe, lookingForAJob, lookingForAJobDescription
 * for profile-info form with needed handlers.
 * @param {formBasicInfoPropsType} props
 * @constructor
 */
export const FormBasicInfo: React.FC<formBasicInfoPropsType> = (props) => {
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
                {createField<fieldNamesType>(
                    classes.stretched,
                    'Your name',
                    'fullName',
                    FormikField,
                    validatorCreator([required])
                )}
                <ErrorMessage name='fullName'/>
            </div>
            <div className={classes.additionalInfoRow}>
                <Typography>About me: </Typography>
                {createField<fieldNamesType>(
                    classes.stretched,
                    'Say about you',
                    'aboutMe',
                    FormikField,
                    validatorCreator([])
                )}
            </div>
            <div className={classes.additionalInfoRow}>
                <Typography>Look for job: </Typography>
                {createField<fieldNamesType>(
                    undefined,
                    undefined,
                    'lookingForAJob',
                    FormikCheckbox,
                    validatorCreator([]),
                    {checked, color: 'primary', onChange}
                )}
            </div>
            <div className={classes.errorText}><ErrorMessage name={'lookingForAJob'}/></div>
            <div className={classes.additionalInfoRow}>
                <Typography>Skills: </Typography>
                {createField<fieldNamesType>(
                    classes.stretched,
                    'Say about job or skills',
                    'lookingForAJobDescription',
                    FormikField,
                    validatorCreator([]),
                    {multiline: true}
                )}
            </div>
        </Card>
    );
}

type formContactsInfoPropsType = {
    contacts: contactsType
}

/**
 * Returns fields with contacts for profile-info form.
 * @param {formContactsInfoPropsType} props
 * @constructor
 */
export const FormContactsInfo: React.FC<formContactsInfoPropsType> = (props) => {
    const classes = useStyles();

    return (
        <Card variant={'outlined'}>
            {Object.keys(props.contacts).map(key => {
                return (
                    <div key={key} className={classes.additionalInfoRow}><Typography>{key}:</Typography>
                        {createField(
                            classes.stretched,
                            key + ' link with http',
                            'contacts.' + key,
                            FormikField,
                            validatorCreator([])
                        )}
                    </div>
                );
            })}
        </Card>
    );
}