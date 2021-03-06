/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, {useState} from 'react';
import styles from './Navbar.module.css';
import {Link, LinkProps, useHistory} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {getRouteIdByName, getRouteNameById, routes, routesVariants} from '../../utils/routes';
import {useSelector} from 'react-redux';
import {getNewMessagesCountSelector} from '../../selectors/selectors';
import {Counter} from '../Common/Counter/Counter';

interface MainMenuItemProps {
    icon: React.ReactElement;
    primary: string;
    secondary?: JSX.Element;
    to: string;
    selected?: boolean;
    onClick: () => void;
}

type navbarPropsType = {
    onMenuClick: () => void
}

/**
 * Returns one item (<li> for <ul>) of app menu.
 * @param {MainMenuItemProps} props
 * @constructor
 */
const MenuItem = (props: MainMenuItemProps) => {
    const {icon, primary, secondary, to, selected, onClick} = props;

    const renderLink = React.useMemo(() =>
            React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} />
            )),
        [to]);

    return (
        <li>
            <ListItem button component={renderLink} selected={selected} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText style={{display: 'flex'}} primary={primary} secondary={secondary}/>
            </ListItem>
        </li>
    );
}

/**
 * Returns complete app menu list.
 * @constructor
 */
const Navbar: React.FC<navbarPropsType> = (props) => {
    const history = useHistory();
    const currentRoute = history.location.pathname.substr(1) as routesVariants;
    const newMessagesCount = useSelector(getNewMessagesCountSelector);
    const [selectedIndex, setSelectedIndex] = useState(getRouteIdByName(currentRoute));

    const setActive = (index: number) => {
        props.onMenuClick();
        setSelectedIndex(index);
    };

    const MenuList = Object.keys(routes).map(route => {
        let currentRoute = route as routesVariants;
        let currentRouteId = routes[currentRoute].id;
        let title = routes[currentRoute].title;
        let icon = React.createElement(routes[currentRoute].icon);
        let routeName = getRouteNameById(currentRouteId);
        let secondary = (routeName === 'dialogs' && newMessagesCount > 0) ? <Counter count={newMessagesCount}/> : undefined;

        return <MenuItem to={"/" + routeName}
                         primary={title}
                         secondary={secondary}
                         icon={icon}
                         selected={selectedIndex === currentRouteId}
                         onClick={() => {setActive(currentRouteId)}}
                         key={routeName}
        />
    });

    return(
        <div className={styles.drawerContainer}>
            <List>
                {MenuList}
            </List>
        </div>
    );
};

export default Navbar;