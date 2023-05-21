import { FC, useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    ListRenderItemInfo,
    Text,
    View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Person } from '@appTypes/person';
import { ChatScreenRouteProp } from '@appTypes/router';
import TextField from '@components/TextField';

type HistoryEntry = {
    author: 'human' | 'bot';
    message: string;
    time: Date;
};

type Props = {
    person?: Person;
};

const API_KEY = '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';

const OPTIONS = {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
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
                console.log('data: ', data.choices[0].message);
                setHistory((currentHistory) => {
                    return [
                        ...currentHistory,
                        {
                            author: 'bot',
                            message: data.choices[0].message.content,
                            time: new Date(),
                        },
                    ];
                });
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
        return (
            <View>
                <Text>From {historyEntry.item.author}:</Text>
                <Text>{historyEntry.item.message}</Text>
                <Text>({historyEntry.item.time.toLocaleDateString()})</Text>
            </View>
        );
    };

    return (
        <View>
            <View>
                <Text>Hello, I am {route?.params?.person?.name?.first}!</Text>
            </View>
            <View>
                <FlatList data={history} renderItem={renderChatMessage} />
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

export default ChatScreen;
