import {filterType} from '../../../reducers/usersReducer';
import React from 'react';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {getUsersFilterSelector} from '../../../Common/Selectors/Selectors';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {routes} from '../../../Common/Routes';
import {createFieldF, formikField, formikSelect} from '../../../Common/FormComponents/FieldsComponentsFormik';
import {validatorCreator} from '../../../utils/validators';

type propsType = {
    onPageChanged: (filter?: filterType) => void
}

type friendFieldType = 'null' | 'true' | 'false';

type formFieldsType = {
    searchTerm: string,
    friend: friendFieldType
}

type selectOptionsType = Array<{key: friendFieldType, value: string}>;

type fieldNamesType = keyof formFieldsType;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        searchButton: {
            alignSelf: 'center',
        }
    }),
);

export const UsersSearchForm: React.FC<propsType> = React.memo((props) => {
    const classes = useStyles();
    const filter = useSelector(getUsersFilterSelector);

    /**
     * Process form-data to needed format and call API.
     * @param {formFieldsType} values object with data from form.
     * @param {boolean} setSubmitting set isSubmitting form.
     */
    function onSubmit(values: formFieldsType, {setSubmitting}: FormikHelpers<formFieldsType>) {
        const filter: filterType = {
            searchTerm: values.searchTerm || null,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onPageChanged(filter);
        setSubmitting(false);
    }

    const initialValues = {searchTerm: filter.searchTerm || '', friend: String(filter.friend)} as formFieldsType;

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: onSubmit,
    });

    /**
     * @const
     * @type selectOptionsType
     * @description array with select options
     */
    const selectOptions: selectOptionsType = [
        {key: 'null', value: 'All'},
        {key: 'true', value: 'Only followed'},
        {key: 'false', value: 'Only unfollowed'}
    ]

    return (
        <div>
            <h1>{routes.users.title}</h1>
                <form onSubmit={formik.handleSubmit} className={classes.root}>
                    <FormikProvider value={formik}>
                        {createFieldF<fieldNamesType>(
                            undefined,
                            'Enter user name or it\'s part',
                            'searchTerm',
                            formikField,
                            validatorCreator([])
                        )}
                        {createFieldF<fieldNamesType>(
                            undefined,
                            undefined,
                            'friend',
                            formikSelect,
                            validatorCreator([]),
                            {value: formik.values.friend, children: selectOptions}
                        )}
                    </FormikProvider>
                    <Button className={classes.searchButton}
                            color='primary'
                            variant='contained'
                            type='submit'
                            disabled={formik.isSubmitting || !formik.dirty}
                    >
                        Submit
                    </Button>
                </form>
        </div>
    );
});

export default UsersSearchForm;