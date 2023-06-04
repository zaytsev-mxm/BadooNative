import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    FirestoreDataConverter,
} from 'firebase/firestore';

import { db } from '@utils/firebase';

class BaseModel<T> {
    name: string = '';

    converter: FirestoreDataConverter<T> | null = null;

    set(entity: T) {
        const collectionRef = collection(db, this.name);
        const docRef = doc(collectionRef).withConverter(
            this.converter as FirestoreDataConverter<T>
        );
        const documentUuid = docRef.id;

        return setDoc(docRef, { ...entity, uuid: documentUuid });
    }

    get(id: string) {
        const docRef = doc(db, this.name, id).withConverter(
            this.converter as FirestoreDataConverter<T>
        );
        return getDoc(docRef);
    }

    getAll() {
        const collectionRef = collection(db, this.name).withConverter(
            this.converter as FirestoreDataConverter<T>
        );
        return getDocs(collectionRef);
    }
}

export default BaseModel;
