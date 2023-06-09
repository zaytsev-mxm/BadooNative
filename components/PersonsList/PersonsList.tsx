import { FC, useState } from 'react';
import { FlatList, View, ListRenderItemInfo, Modal } from 'react-native';

import PersonThumbnail from '@components/PersonThumbnail';
import PersonCard from '@components/PersonCard';

import { Person } from '@models/persons';

import styles from './styles';

type Props = {
    people: Person[];
};

const PersonsList: FC<Props> = (props) => {
    const { people } = props;

    const [chosenPerson, setChosenPerson] = useState<Person | undefined>();

    const handlePress = (person: Person) => () => {
        setChosenPerson(person);
    };

    const handleClose = () => {
        setChosenPerson(undefined);
    };

    const handleChatOpen = () => {
        setChosenPerson(undefined);
    };

    const renderItem = (person: ListRenderItemInfo<Person>) => {
        return (
            <PersonThumbnail
                picture={person.item.picture?.large || ''}
                name={person.item.name?.first}
                age={String(person.item.dob?.age)}
                location={person.item.location?.city || ''}
                isOnline={false}
                onPersonSelect={handlePress(person.item)}
            />
        );
    };

    const keyExtractor = (person: Person, i: number) => {
        return String(`${person?.id?.value}${i}`);
    };

    const renderModal = () => {
        if (chosenPerson) {
            return (
                <Modal animationType="slide" transparent={true}>
                    <PersonCard
                        person={chosenPerson}
                        onClose={handleClose}
                        onChatOpen={handleChatOpen}
                    />
                </Modal>
            );
        }
        return null;
    };

    return (
        <View style={styles.root}>
            <FlatList
                data={people}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
            {renderModal()}
        </View>
    );
};

export default PersonsList;
