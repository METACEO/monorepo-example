import {BaseModel} from './models';

export class UserModel extends BaseModel {
    constructor(public readonly id: string,
                public readonly auth: {
                    oauth?: {
                        github?: {
                            id: string;
                        };
                    };
                }) {
        super(id);
    }

}
