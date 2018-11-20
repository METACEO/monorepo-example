import {BaseModel} from './models';
import {UserModel} from './user.model';

export class SessionModel extends BaseModel {
    constructor(public readonly id: string,
                public readonly user: UserModel,
                public readonly userId: string) {
        super(id);
    }
}
