import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        marginBottom: 10,
        width: '70%',
    },
    botRoot: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    humanRoot: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    content: {
        backgroundColor: '#cccccc',
        padding: 10,
        borderRadius: 10,
    },
    botContent: {
        backgroundColor: '#8dcb76',
    },
    humanContent: {
        backgroundColor: '#5b8bcb',
    },
    text: {
        color: '#ffffff',
    },
    textMessage: {
        fontSize: 14,
        marginBottom: 20,
    },
    textDate: {
        fontSize: 10,
    },
});

export default styles;
