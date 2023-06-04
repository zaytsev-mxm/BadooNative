import { FC, useState, useRef, useEffect } from 'react';
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
import { auth, getTimeStamp } from '@utils/firebase';
import MessagesModel, { Message } from '@models/messages';
import { OPEN_AI_API_KEY } from '@env';
import Messages from '@models/messages';

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
    const [history, setHistory] = useState<Message[]>([]);
    const flatListRef = useRef<FlatList<any>>(null);

    const userId = auth.currentUser?.uid;
    const botId = route?.params?.person.uid;

    useEffect(() => {
        MessagesModel.getInstance()
            .get([
                ['fromUserId', '==', userId],
                ['toUserId', '==', botId],
            ])
            .then((res) => {
                return res.docs.map((doc) => doc.data());
            })
            .then((fromMe) => {
                return MessagesModel.getInstance()
                    .get([
                        ['fromUserId', '==', botId],
                        ['toUserId', '==', userId],
                    ])
                    .then((res) => {
                        const toMe = res.docs.map((doc) => doc.data());
                        const allMessages = [...fromMe, ...toMe].sort(
                            (messageA, messageB) => {
                                const messageATime =
                                    messageA.dateTime?.toMillis() || 0;
                                const messageBTime =
                                    messageB.dateTime?.toMillis() || 0;
                                return messageATime - messageBTime;
                            }
                        );
                        return setHistory(allMessages);
                    });
            });
    }, []);

    const updateMessages = async (message: string, isFromMe: boolean) => {
        const fromUserId = isFromMe ? userId : botId;
        const toUserId = isFromMe ? botId : userId;
        const messageItem = new Message({
            fromUserId: fromUserId || '',
            toUserId: toUserId || '',
            message,
            dateTime: getTimeStamp(),
        });

        try {
            await MessagesModel.getInstance().set(messageItem);
        } catch (err) {
            console.log('[maxzaytsev]: err: ', err);
        } finally {
            setHistory((currentHistory) => {
                return [...currentHistory, messageItem];
            });
            try {
                flatListRef?.current?.scrollToEnd();
            } catch (_err) {
                // mute it for now
            }
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
                    updateMessages(answer, false);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleChangeText = (text: string) => {
        setPrompt(text);
    };

    const handlePressSendMessage = () => {
        if (!prompt) {
            Alert.alert('Empty message', 'Please enter a message');
            return;
        }

        setIsLoading(true);
        setPrompt('');
        updateMessages(prompt, true);
        sendRequest(prompt).finally(() => {
            setIsLoading(false);
        });
    };

    const renderChatMessage = (historyEntry: ListRenderItemInfo<Message>) => {
        return (
            <ChatMessage
                historyEntry={historyEntry.item}
                isBot={historyEntry.item.fromUserId !== userId}
            />
        );
    };

    const keyExtractor = (historyEntry: Message) => {
        return String(historyEntry.dateTime?.toMillis());
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
                    onPress={handlePressSendMessage}
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
