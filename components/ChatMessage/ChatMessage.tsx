import { FC } from 'react';
import { Text, View } from 'react-native';

import { Message } from '@models/messages';

import styles from './styles';

type Props = {
    historyEntry: Message;
    isBot?: boolean;
};

const ChatMessage: FC<Props> = ({ historyEntry, isBot }) => {
    return (
        <View style={[styles.root, isBot ? styles.botRoot : styles.humanRoot]}>
            <View
                style={[
                    styles.content,
                    isBot ? styles.botContent : styles.humanContent,
                ]}
            >
                <Text style={[styles.text, styles.textMessage]}>
                    {historyEntry.message}
                </Text>
                <Text style={[styles.text, styles.textDate]}>
                    ({historyEntry.dateTime?.toDate().toLocaleTimeString()})
                </Text>
            </View>
        </View>
    );
};

export default ChatMessage;
