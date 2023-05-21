import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
    },
    picture: {
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        padding: 8,
    },
    topLine: {},
    topLineText: {
        fontSize: 18,
    },
    bottomLine: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    bottomLineText: {},
    status: {
        width: 8,
        height: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    online: {
        backgroundColor: 'green',
    },
    offline: {
        backgroundColor: 'red',
    },
});

export default styles;
