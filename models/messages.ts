import BaseModel from '@models/base-model';

export type Message = {
    author: string;
    text: string;
    date: string;
};

class Messages extends BaseModel<Message> {
    name = 'messages';

    static getInstance = BaseModel.makeGetInstance(Messages);
}

export default Messages;
