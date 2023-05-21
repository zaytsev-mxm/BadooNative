import { FC } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { Person } from '@appTypes/person';
import { Image, Text, View, ScrollView, Button } from 'react-native';

import styles from './styles';
import PersonDetails from '@components/PersonDetails';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@appTypes/router';
import { RouteNames } from '@constants/route-names';

type Props = {
    person: Person;
    onClose: (event: GestureResponderEvent) => void;
    onChatOpen: () => void;
};

const PersonCard: FC<Props> = ({ person, onClose, onChatOpen }) => {
    const navigation = useNavigation<NavigationProp>();

    const handlePressOpenChat = () => {
        navigation.navigate(RouteNames.CHAT, { person });
        onChatOpen();
    };

    return (
        <View style={styles.root}>
            <View style={styles.topBlock}>
                <Text style={styles.topBlockText}>
                    {person.name.first}, {person.dob?.age}
                </Text>
            </View>
            <View style={styles.closeWrapper}>
                <Pressable onPress={onClose}>
                    <View style={styles.close}>
                        <Text style={styles.closeText}>❌</Text>
                    </View>
                </Pressable>
            </View>
            <ScrollView>
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: person.picture?.large || '' }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <PersonDetails
                    title="Location"
                    text={[
                        person.location?.city || '',
                        person.location?.country || '',
                    ]
                        .filter(Boolean)
                        .join(', ')}
                />
                <PersonDetails
                    title="Interests"
                    text={'Swimming, Bikes, Art'}
                />
            </ScrollView>
            <View style={styles.openChat}>
                <Button title="Open chat" onPress={handlePressOpenChat} />
            </View>
        </View>
    );
};

export default PersonCard;
