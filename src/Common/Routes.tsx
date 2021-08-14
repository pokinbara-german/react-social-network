import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import LibraryMusicOutlinedIcon from '@material-ui/icons/LibraryMusicOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import {SvgIconTypeMap} from '@material-ui/core';

export type routesVariants = 'profile' | 'messages' | 'news' | 'music' | 'chat' | 'users' | 'settings';

export type routesType = {
    [key in routesVariants]: {
        id: number,
        title: string,
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    };
};

/**
 * Object for pages routines in app.
 */
export const routes: routesType = {
    'profile': {id: 1, title: 'Profile', icon: PersonOutlinedIcon},
    'messages': {id: 2, title: 'Messages', icon: EmailOutlinedIcon},
    'news': {id: 3, title: 'News', icon: FeaturedPlayListOutlinedIcon},
    'music': {id: 4, title: 'Music', icon: LibraryMusicOutlinedIcon},
    'chat': {id: 5, title: 'Chat', icon: MessageOutlinedIcon},
    'users': {id: 6, title: 'Users', icon: PeopleAltOutlinedIcon},
    'settings': {id: 7, title: 'Settings', icon: SettingsOutlinedIcon},
}

/**
 * Gets route ID.
 * @param {routesVariants} routeName route as string
 */
export const getRouteIdByName = (routeName: routesVariants) => {
    return routeName in routes ? routes[routeName].id : 0;
}

/**
 * Gets route name as string.
 * @param {number} routeId route ID
 */
export const getRouteNameById = (routeId: number) => {
    return Object.keys(routes).find(route => routes[route as routesVariants].id === routeId);
}