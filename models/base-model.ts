import {
    doc,
    query,
    where,
    setDoc,
    getDocs,
    collection,
    FirestoreDataConverter,
} from 'firebase/firestore';

import { db } from '@utils/firebase';

type Query = [string, any, any];

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

    get(queries?: Query[]) {
        const collectionRef = collection(db, this.name).withConverter(
            this.converter as FirestoreDataConverter<T>
        );
        const conditions = queries
            ? queries.map((query) => {
                  return where(query[0], query[1], query[2]);
              })
            : [];
        return getDocs(query(collectionRef, ...conditions));
    }
}

export default BaseModel;
