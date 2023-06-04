import { FirestoreDataConverter } from 'firebase/firestore';
import { Person } from './entity';

export const converter: FirestoreDataConverter<Person> = {
    toFirestore: (person) => {
        console.log('person: ', person);
        return {
            gender: person.gender,
            name: person.name,
            location: person.location,
            email: person.email,
            login: person.login,
            dob: person.dob,
            registered: person.registered,
            phone: person.phone,
            cell: person.cell,
            id: person.id,
            picture: person.picture,
            nat: person.nat,
        } as Person;
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Person({
            gender: data.gender,
            name: data.name,
            location: data.location,
            email: data.email,
            login: data.login,
            dob: data.dob,
            registered: data.registered,
            phone: data.phone,
            cell: data.cell,
            id: data.id,
            picture: data.picture,
            nat: data.nat,
        });
    },
};
