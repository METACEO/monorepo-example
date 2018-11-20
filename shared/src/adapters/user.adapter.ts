import {get} from 'lodash';

import {UserModel} from '../models';
import {Adapter} from './adapter';

export class UserAdapter implements Adapter<UserModel> {

    public static adapt(user: any): UserModel {
        if (!user) {
            return null;
        }
        return new UserModel(
            get(user,'id', null),
            {
                oauth: {
                    github: {
                        id: get(user, 'auth.oauth.github.id', null),
                    },
                },
            },
        );
    }

    public static partition(user: UserModel): any {
        if (!user) {
            return null;
        }
        return {
            id: get(user, 'id', null),
            auth: {
                oauth: {
                    github: {
                        id: get(user, 'auth.oauth.github.id', null),
                    },
                },
            },
        };
    }

    public adapt(item: any): UserModel {
        return UserAdapter.adapt(item);
    }

    public partition(user: UserModel): any {
        return UserAdapter.partition(user);
    }

}
