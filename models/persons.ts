import { PERSONS } from '@data/PERSONS';

export const getPeople = () => {
    return PERSONS.map((person) => {
        return {
            ...person,
            online: Math.random() > 0.5,
        };
    }).sort(() => (Math.random() > 0.5 ? 1 : -1));
};
