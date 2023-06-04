import { useState, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PersonsList from '@components/PersonsList';
import PersonsModel, { Person } from '@models/persons';
import { signOutUser } from '@utils/firebase';

const PeopleNearbyScreen = () => {
    const [people, setPeople] = useState<Person[]>([]);

    const handleSignout = () => {
        signOutUser();
    };

    useEffect(() => {
        PersonsModel.getInstance()
            .get()
            .then((persons) => {
                setPeople(
                    persons.docs.map((doc) => {
                        return doc.data();
                    })
                );
            });
    }, []);

    return (
        <View style={styles.container}>
            <PersonsList people={people} />
            <View style={styles.button}>
                <Button title="Sign Out" onPress={handleSignout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
    },
});

export default PeopleNearbyScreen;
