import BaseModel from '@models/base-model';
import { Message, MessageType } from './entity';
import { converter } from './converter';

class MessagesModel extends BaseModel<Message> {
    override name = 'messages';

    override converter = converter;

    private static instance: MessagesModel | null = null;

    static getInstance() {
        if (!MessagesModel.instance) {
            MessagesModel.instance = new MessagesModel();
        }

        return MessagesModel.instance;
    }
}

export { Message, MessageType };

export default MessagesModel;
