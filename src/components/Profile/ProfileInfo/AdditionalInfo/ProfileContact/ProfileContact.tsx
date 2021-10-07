import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';
import HttpIcon from '@material-ui/icons/Http';
import {contactsType} from '../../../../../types';
import {ReactComponent as VkRounded} from '../../../../../assets/images/vk-rounded.svg';

type contactKeysType = keyof contactsType;

type propsType = {
    contactTitle: contactKeysType,
    contactInfo: string
}

/**
 * Returns one icon-button as anchor with contact.
 * @param {{
 * contactTitle: contactKeysType
 * contactInfo: string
 * }} props - props like contactsType
 * @param {contactKeysType} props.contactTitle - name of contact
 * @param {string} props.contactInfo - contact link
 * @constructor
 */
export const ProfileContact: React.FC<propsType> = ({contactTitle, contactInfo}) => {
    let Icon = <div/>;
    const urlPrefix = contactInfo.indexOf('http') === 0 ? '' : '//';

    switch (contactTitle) {
        case 'facebook':
            Icon = <FacebookIcon/>;
            break;
        case 'website':
            Icon = <LanguageIcon/>;
            break;
        case 'vk':
            Icon = <SvgIcon component={VkRounded}/>;
            break;
        case 'twitter':
            Icon = <TwitterIcon/>;
            break;
        case 'instagram':
            Icon = <InstagramIcon/>;
            break;
        case 'youtube':
            Icon = <YouTubeIcon/>;
            break;
        case 'github':
            Icon = <GitHubIcon/>;
            break;
        case 'mainLink':
            Icon = <HttpIcon/>;
            break;
    }

    return (
        <IconButton color="primary" component='a' rel={'noreferrer'} href={urlPrefix + contactInfo} target={'_blank'}>
            {Icon}
        </IconButton>
    );
}