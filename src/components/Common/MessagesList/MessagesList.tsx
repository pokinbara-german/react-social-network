import React from 'react';
import List from '@material-ui/core/List';
import {useSelector} from 'react-redux';
import {getIsMessageSentFetchingSelector} from '../../../selectors/selectors';
import Preloader from '../Preloader/Preloader';

type messagesListPropsType = {
    messages: Array<JSX.Element>,
    height: string
}

/**
 * Returns list of messages width autoscroll functionality.
 * If list scrolled to bottom list will autoscroll.
 * @param {messagesListPropsType} props - props object.
 * @param {Array<JSX.Element>} props.messages - array of messages as JSX.
 * @param {string} props.height - CSS string value for height (i.e. "10px").
 * @constructor
 */
export const MessagesList: React.FC<messagesListPropsType> = (props) => {
    const {messages} = props;
    const isMessageSentFetching = useSelector(getIsMessageSentFetchingSelector);
    const messagesRef = React.useRef<HTMLLIElement>(null);
    const [isAutoscroll, setIsAutoscroll] = React.useState(true);

    /**
     * Detects scroll end and set autoscroll to true or false.
     * @param event
     */
    function scrollHandler(event: React.UIEvent<HTMLUListElement, UIEvent>) {
        const element = event.currentTarget;

        if ((element.scrollHeight - element.scrollTop) === element.clientHeight) {
            !isAutoscroll && setIsAutoscroll(true);
        } else {
            isAutoscroll && setIsAutoscroll(false);
        }
    }

    React.useEffect(() => {
        if (isAutoscroll) {
            setTimeout(() => {
                messagesRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
            }, 500);
        }
    }, [messages, isAutoscroll]);

    return (
        <List style={{height: props.height, overflowY: 'auto', width: '100%'}} onScroll={scrollHandler}>
            {messages}
            {isMessageSentFetching && <li><Preloader notCentered={true}/></li>}
            <li ref={messagesRef}/>
        </List>
    );
}