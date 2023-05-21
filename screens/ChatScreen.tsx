import { FC, useState, useRef } from 'react';
import {
    Alert,
    Button,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ChatScreenRouteProp } from '@appTypes/router';
import TextField from '@components/TextField';
import ChatMessage from '@components/ChatMessage';
import { HistoryEntry } from '@appTypes/chat';
import { OPEN_AI_API_KEY } from '@env';

const OPTIONS = {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        'Content-Type': 'application/json',
    },
};

const ChatScreen: FC = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const flatListRef = useRef<FlatList<any>>(null);

    const updateMessages = (
        message: string,
        author: HistoryEntry['author']
    ) => {
        setHistory((currentHistory) => {
            return [
                ...currentHistory,
                {
                    author: author,
                    message: message,
                    time: new Date(),
                },
            ];
        });
        try {
            flatListRef?.current?.scrollToEnd();
        } catch (_err) {
            // mute it for now
        }
    };

    const sendRequest = (message: string) => {
        return fetch('https://api.openai.com/v1/chat/completions', {
            ...OPTIONS,
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 100,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data: ', JSON.stringify(data));
                const answer = data?.choices?.[0]?.message?.content || '';
                if (answer) {
                    updateMessages(answer, 'bot');
                }
            })
            .catch((err) => console.error(err));
    };

    const handleChangeText = (text: string) => {
        setPrompt(text);
    };

    const handlePress = () => {
        if (!prompt) {
            Alert.alert('Empty message', 'Please enter a message');
        } else {
            setIsLoading(true);
            setPrompt('');
            updateMessages(prompt, 'human');
            sendRequest(prompt).finally(() => {
                setIsLoading(false);
            });
        }
    };

    const renderChatMessage = (
        historyEntry: ListRenderItemInfo<HistoryEntry>
    ) => {
        return <ChatMessage historyEntry={historyEntry.item} />;
    };

    const keyExtractor = (historyEntry: HistoryEntry) => {
        return String(historyEntry.time.toLocaleTimeString());
    };

    return (
        <View style={styles.root}>
            <View style={styles.greetings}>
                <Text style={styles.greetingsText}>
                    Hello, I am {route?.params?.person?.name?.first}!
                </Text>
            </View>
            <View style={styles.messages}>
                <FlatList
                    ref={flatListRef}
                    data={history}
                    renderItem={renderChatMessage}
                    keyExtractor={keyExtractor}
                />
            </View>
            <View style={styles.form}>
                <TextField
                    nativeID="prompt"
                    onChangeText={handleChangeText}
                    value={prompt}
                />
                <Button
                    title="Send"
                    onPress={handlePress}
                    disabled={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        padding: 20,
        height: '100%',
        justifyContent: 'space-between',
    },
    greetings: {
        padding: 10,
    },
    greetingsText: {
        fontSize: 24,
    },
    messages: {
        padding: 10,
        flex: 10,
    },
    form: {
        padding: 10,
    },
});

export default ChatScreen;
