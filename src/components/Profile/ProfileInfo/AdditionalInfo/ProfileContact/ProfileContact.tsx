import React from 'react';

type propsType = {
    contactTitle: string,
    contactInfo: string
}
export const ProfileContact: React.FC<propsType> = ({contactTitle, contactInfo}) => {
    return (
        <div>
            <span>{contactTitle}:</span><a rel={'noreferrer'} href={contactInfo} target={'_blank'}>{contactInfo}</a>
        </div>
    );
}