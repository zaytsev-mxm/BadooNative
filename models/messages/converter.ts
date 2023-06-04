import { FirestoreDataConverter } from 'firebase/firestore';
import { Message } from './entity';

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
            toUserId: data.toUserId,
            message: data.message,
            dateTime: data.dateTime,
        });
    },
};
