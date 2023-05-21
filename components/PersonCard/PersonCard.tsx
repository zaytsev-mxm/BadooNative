import { FC } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { Person } from '@appTypes/person';
import { Image, Text, View, ScrollView } from 'react-native';

import styles from './styles';
import PersonDetails from '@components/PersonDetails';

type Props = {
    person: Person;
    onPress: (event: GestureResponderEvent) => void;
};

const PersonCard: FC<Props> = ({ person, onPress }) => {
    return (
        <View style={styles.root}>
            <View style={styles.topBlock}>
                <Text style={styles.topBlockText}>
                    {person.name.first}, {person.dob?.age}
                </Text>
            </View>
            <View style={styles.closeWrapper}>
                <Pressable onPress={onPress}>
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
        </View>
    );
};

export default PersonCard;
