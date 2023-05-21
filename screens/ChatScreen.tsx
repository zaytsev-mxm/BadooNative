import { FC, useState } from 'react';
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
import { Person } from '@appTypes/person';
import { ChatScreenRouteProp } from '@appTypes/router';
import TextField from '@components/TextField';
import ChatMessage from '@components/ChatMessage';
import { HistoryEntry } from '@appTypes/chat';
import { OPEN_AI_API_KEY } from '@env';

type Props = {
    person?: Person;
};

const OPTIONS = {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
        'Content-Type': 'application/json',
    },
};

const ChatScreen: FC<Props> = ({ person }) => {
    const route = useRoute<ChatScreenRouteProp>();
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState<HistoryEntry[]>([]);

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
                    setHistory((currentHistory) => {
                        return [
                            ...currentHistory,
                            {
                                author: 'bot',
                                message: answer,
                                time: new Date(),
                            },
                        ];
                    });
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
            setHistory((currentHistory) => {
                return [
                    ...currentHistory,
                    {
                        author: 'human',
                        message: prompt,
                        time: new Date(),
                    },
                ];
            });
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
            <View>
                <Text>Hello, I am {route?.params?.person?.name?.first}!</Text>
            </View>
            <View>
                <FlatList
                    data={history}
                    renderItem={renderChatMessage}
                    keyExtractor={keyExtractor}
                />
            </View>
            <View>
                <TextField
                    nativeID="prompt"
                    onChangeText={handleChangeText}
                    value={prompt}
                />
            </View>
            <Button title="Send" onPress={handlePress} disabled={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        padding: 20,
        height: '100%',
    },
    greetings: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    messages: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    form: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
});

export default ChatScreen;
