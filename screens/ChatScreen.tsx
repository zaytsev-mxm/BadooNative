import { FC } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Person } from '@appTypes/person';
import { ChatScreenRouteProp } from '@appTypes/router';

type Props = {
    person?: Person;
};

const ChatScreen: FC<Props> = ({ person }) => {
    const route = useRoute<ChatScreenRouteProp>();

    return (
        <View>
            <Text>Hello, I am {route?.params?.person?.name?.first}!</Text>
        </View>
    );
};

export default ChatScreen;
