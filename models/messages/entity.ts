import { Timestamp } from 'firebase/firestore';

export interface MessageType {
    fromUserId: string;
    toUserId: string;
    message: string;
    dateTime?: Timestamp;
}

export class Message implements MessageType {
    fromUserId: string = '';
    toUserId: string = '';
    message: string = '';
    dateTime: Timestamp | undefined = undefined;

    constructor(message: MessageType) {
        this.fromUserId = message.fromUserId;
        this.toUserId = message.toUserId;
        this.message = message.message;
        this.dateTime = message.dateTime;
    }

    toString() {
        return [
            this.fromUserId,
            this.toUserId,
            this.message,
            this.dateTime,
        ].join(', ');
    }
}
