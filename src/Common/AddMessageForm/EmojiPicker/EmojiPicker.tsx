import Picker, {IEmojiData} from 'emoji-picker-react';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import Popover from '@material-ui/core/Popover';

type emojiPickerPropsType = {
    onEmojiClick: (event: any, emojiObject: IEmojiData) => void
}

/**
 * Returns IconButton with emoji picker in popup.
 * @param {emojiPickerPropsType} props - props object
 * @param {function(event: any, emojiObject: IEmojiData):void} props.onEmojiClick - function which will set picked emoji.
 * @constructor
 */
export const EmojiPicker: React.FC<emojiPickerPropsType> = (props) => {
    const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const isPopoverOpen = Boolean(anchorElement);

    return (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <EmojiEmotionsOutlinedIcon/>
            </IconButton>
            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isPopoverOpen}
                anchorEl={anchorElement}
                onClose={handleClose}
            >
                <Picker onEmojiClick={props.onEmojiClick} />
            </Popover>
        </React.Fragment>
    );
}