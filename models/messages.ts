import BaseModel from '@models/base-model';
import { FirestoreDataConverter } from 'firebase/firestore';

export interface MessageType {
    fromUserId: string;
    toUserId: string;
    message: string;
    dateTime: string;
}

export const converter: FirestoreDataConverter<Message> = {
    toFirestore: (message) => {
        return {
            fromUserId: message.fromUserId,
            toUserId: message.toUserId,
            message: message.message,
            dateTime: message.dateTime,
        } as Message;
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Message({
            fromUserId: data.fromUserId,
            toUserId: data.fromUserId,
            message: data.fromUserId,
            dateTime: data.fromUserId,
        });
    },
};

export class Message implements MessageType {
    fromUserId: string = '';
    toUserId: string = '';
    message: string = '';
    dateTime: string = '';

    constructor(entity: MessageType) {
        this.fromUserId = entity.fromUserId;
        this.toUserId = entity.toUserId;
        this.message = entity.message;
        this.dateTime = entity.dateTime;
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

class MessagesModel extends BaseModel<Message> {
    name = 'messages';

    private static instance: MessagesModel | null = null;

    override converter = converter;

    static getInstance() {
        if (!MessagesModel.instance) {
            MessagesModel.instance = new MessagesModel('messages');
        }

        return MessagesModel.instance;
    }
}

export default MessagesModel;
