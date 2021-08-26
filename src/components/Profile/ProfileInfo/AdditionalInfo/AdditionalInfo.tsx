import React from "react";
import {contactsType} from '../../../../types';
import {ProfileContact} from './ProfileContact/ProfileContact';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type propsType = {
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    contacts: contactsType,
    isOwner: boolean,
    setEditMode: () => void
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        additionalInfo: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '52.5ch',
            '& > div': {
                marginLeft: theme.spacing(2),
                marginRight: theme.spacing(2),
            },
        },
        additionalInfoItem: {
            marginTop: theme.spacing(1)
        },
        jobDesc: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        contacts: {
            display: 'flex',
            alignItems: 'center'
        }
    }),
);

/**
 * Returns additional info about user with 3 text blocks and 1 block of contact-links.
 * If user is owner of profile also returns button for edit data.
 * @param {propsType} props
 * @constructor
 */
const AdditionalInfo: React.FC<propsType> = (props) => {
    const classes = useStyles();

    let ContactsList = getContactsList(props.contacts);
    let isNeedContacts = !ContactsList.every(contact => contact === null);

    /**
     * Returns array of ProfileContacts if contact value is not empty.
     * @param {contactsType} contacts - array of contacts from profile.
     */
    function getContactsList (contacts: contactsType) {
        return Object.keys(contacts).map((key) => {
            let contactValue = contacts[key as keyof contactsType];

            return contactValue
                ? <ProfileContact key={key} contactTitle={key as keyof contactsType} contactInfo={contactValue}/>
                : null;
        })
    }

    return (
        <div className={classes.additionalInfo}>
            {props.isOwner && <Button color='primary' variant='contained' onClick={props.setEditMode}>Edit info</Button>}

            <div className={classes.additionalInfoItem}>
                <Typography>About Me: {props.aboutMe || 'Empty'}</Typography>
                <Typography>Looking for a job: {props.lookingForAJob ? 'Yes' : 'No'}</Typography>
                {props.lookingForAJob && <Typography className={classes.jobDesc}>Job description: {props.lookingForAJobDescription}</Typography>}
            </div>

            {isNeedContacts
                ? <div className={classes.contacts}>
                    <Typography variant='h6'>Contacts:</Typography>
                    {ContactsList}
                </div>
                : <div className={classes.contacts}>
                    <Typography>no contacts</Typography>
                </div>
            }
        </div>
    );
};

export default AdditionalInfo