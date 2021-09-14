import {Theme} from '@material-ui/core/styles';

/**
 * Returns fontFamily string.
 * @param {Theme} theme - Material-UI theme
 */
export function getFontsWithEmoji(theme: Theme) {
    let fontPool = theme.typography.fontFamily?.split(',');
    fontPool?.splice(1, 0, "Twemoji Mozilla");
    return fontPool?.join(',');
}