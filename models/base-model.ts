import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    QuerySnapshot,
    DocumentSnapshot,
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

    data: Record<string, any> = {};

    get(): Promise<QuerySnapshot<T>>;
    get(id: string): Promise<DocumentSnapshot<T>>;
    get(id?: string) {
        if (id === undefined) {
            const collectionRef = collection(db, this.name).withConverter(
                this.converter as FirestoreDataConverter<T>
            );
            return getDocs(collectionRef);
        } else {
            const docRef = doc(db, this.name, id).withConverter(
                this.converter as FirestoreDataConverter<T>
            );
            return getDoc(docRef);
        }
    }
}

export default BaseModel;
