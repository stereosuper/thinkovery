import { CustomEase } from '../plugins/CustomEase';

export const colors = {
    funGreen: '#1e5e32',
    pictonBlue: '#65a3da',
    persimmon: '#DF622D',
    darkOrange: '#EC8D28',
    selectiveYellow: '#f8ba41',
};

export const easing = {
    catMouseEaseIn: CustomEase.create(
        'custom',
        'M0,0,C0.72,0.01,0.74,-0.09,1,1'
    ),
    catMouseEaseOut: CustomEase.create(
        'custom',
        'M0,0,C0.26,1.09,0.28,0.99,1,1'
    ),
    easePop: CustomEase.create(
        'custom',
        'M0,0 C0.154,0 0.422,0.014 0.532,0.148 0.654,0.296 0.676,0.764 0.756,0.874 0.831,0.977 0.904,1 1,1'
    ),
};

export default { colors, easing };
