import { Dimensions, StyleSheet } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        height: screen.height - 60,
        shadowColor: '#ff0000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: 'white',
    },
    imageWrapper: {
        flex: 1,
        height: screen.height - 100,
    },
    topBlock: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'black',
        opacity: 0.9,
        borderRadius: 8,
        zIndex: 999,
        padding: 10,
    },
    topBlockText: {
        color: 'white',
        fontSize: 24,
    },
    closeWrapper: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: 'white',
        opacity: 0.9,
        borderRadius: 20,
        zIndex: 999,
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 0,
        left: -20,
        width: 40,
        height: 40,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeText: {
        fontSize: 12,
    },
});

export default styles;
