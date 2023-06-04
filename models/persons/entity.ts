interface PersonType {
    gender: 'male' | 'female';
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street?: {
            number: number;
            name: string;
        };
        city?: string;
        state?: string;
        country?: string;
        postcode?: number | string;
        coordinates?: {
            latitude: string;
            longitude: string;
        };
        timezone?: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string | null;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
    uid?: string;
}

export class Person implements PersonType {
    gender: 'male' | 'female';
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street?: {
            number: number;
            name: string;
        };
        city?: string;
        state?: string;
        country?: string;
        postcode?: number | string;
        coordinates?: {
            latitude: string;
            longitude: string;
        };
        timezone?: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string | null;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
    uid?: string;

    constructor(person: PersonType) {
        this.gender = person.gender;
        this.name = person.name;
        this.location = person.location;
        this.email = person.email;
        this.login = person.login;
        this.dob = person.dob;
        this.registered = person.registered;
        this.phone = person.phone;
        this.cell = person.cell;
        this.id = person.id;
        this.picture = person.picture;
        this.nat = person.nat;
        this.uid = person?.uid || '';
    }

    toString() {
        return Object.values(this).join(', ');
    }
}
