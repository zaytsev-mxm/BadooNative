import { doc, setDoc, collection, query, getDocs } from 'firebase/firestore';

import { db } from '@utils/firebase';

interface IBaseModel<Entity> {
    set(entity: Entity | Entity[]): Promise<any>;
    get(id?: string): Promise<any | null>;
}

type EntityBase = { [field: string]: any };

class BaseModel<Entity extends EntityBase> implements IBaseModel<Entity> {
    name: string = 'model';

    private static instance: BaseModel<any> | null = null;

    static makeGetInstance(ModelClass: typeof BaseModel<EntityBase>) {
        return () => {
            if (!ModelClass.instance) {
                ModelClass.instance = new ModelClass(ModelClass.name);
            }

            return ModelClass.instance;
        };
    }

    constructor(name: string) {
        this.name = name;
    }

    set(entity: Entity[] | Entity) {
        // Create a new document reference
        const messageRef = doc(db, this.name);

        // Write data to the new document
        return setDoc(messageRef, entity);
    }

    get(id?: string) {
        const q = query(collection(db, this.name));

        return getDocs(q);
    }
}

export default BaseModel;
