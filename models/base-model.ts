import {
    doc,
    setDoc,
    collection,
    getDocs,
    FirestoreDataConverter,
} from 'firebase/firestore';

import { db } from '@utils/firebase';

class BaseModel<T> {
    name: string = '';

    converter: FirestoreDataConverter<T> | null = null;

    set(entity: T) {
        const ref = doc(db, this.name).withConverter(
            this.converter as FirestoreDataConverter<T>
        );

        return setDoc(ref, entity);
    }

    get(id?: string) {
        const ref = collection(db, this.name).withConverter(
            this.converter as FirestoreDataConverter<T>
        );
        return getDocs(ref);
    }
}

export default BaseModel;
