import { FC } from 'react';
import { Text, View } from 'react-native';

import { HistoryEntry } from '@appTypes/chat';

import styles from './styles';

type Props = {
    historyEntry: HistoryEntry;
};

const ChatMessage: FC<Props> = ({ historyEntry }) => {
    return (
        <View style={styles.root}>
            <Text>From {historyEntry.author}:</Text>
            <Text>{historyEntry.message}</Text>
            <Text>({historyEntry.time.toLocaleDateString()})</Text>
        </View>
    );
};

export default ChatMessage;
