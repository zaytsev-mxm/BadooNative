import { FC } from 'react';
import { Text, View } from 'react-native';

import { HistoryEntry } from '@appTypes/chat';

import styles from './styles';

type Props = {
    historyEntry: HistoryEntry;
};

const ChatMessage: FC<Props> = ({ historyEntry }) => {
    return (
        <View
            style={[
                styles.root,
                historyEntry.author === 'bot'
                    ? styles.botRoot
                    : styles.humanRoot,
            ]}
        >
            <View
                style={[
                    styles.content,
                    historyEntry.author === 'bot'
                        ? styles.botContent
                        : styles.humanContent,
                ]}
            >
                <Text style={[styles.text, styles.textMessage]}>
                    {historyEntry.message}
                </Text>
                <Text style={[styles.text, styles.textDate]}>
                    ({historyEntry.time.toLocaleTimeString()})
                </Text>
            </View>
        </View>
    );
};

export default ChatMessage;
