import { FC } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {
    title: string;
    text: string;
};

const PersonDetails: FC<Props> = ({ title, text }) => {
    return (
        <View style={styles.root}>
            <View style={styles.title}>
                <Text style={styles.titleContent}>{title}</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.textContent}>{text}</Text>
            </View>
        </View>
    );
};

export default PersonDetails;
