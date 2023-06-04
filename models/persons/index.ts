import BaseModel from '@models/base-model';
import { Person, PersonType } from './entity';
import { converter } from './converter';

class PersonsModel extends BaseModel<Person> {
    override name = 'persons';

    override converter = converter;

    private static instance: PersonsModel | null = null;

    static getInstance() {
        if (!PersonsModel.instance) {
            PersonsModel.instance = new PersonsModel();
        }

        return PersonsModel.instance;
    }
}

export { Person, PersonType };

export default PersonsModel;
