import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

const TextField = (props: TextInputProps) => {
    return (
        <View style={styles.root}>
            <TextInput style={styles.input} {...props} />
        </View>
    );
};

export default TextField;
