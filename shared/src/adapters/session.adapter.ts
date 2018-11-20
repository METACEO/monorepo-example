import {get} from 'lodash';

import {SessionModel} from '../models';
import {Adapter} from './adapter';

export class SessionAdapter implements Adapter<SessionModel> {

    public static adapt(session: any): SessionModel {
        if (!session) {
            return null;
        }
        return new SessionModel(
            get(session, 'id', null),
            get(session, 'user', null),
            get(session, 'userId', null),
        );
    }

    public static partition(session: SessionModel): any {
        if (!session) {
            return null;
        }
        return {
            id: get(session, 'id', null),
            user: get(session, 'user', null),
            userId: get(session, 'userId', null),
        };
    }

    public adapt(item: any): SessionModel {
        return SessionAdapter.adapt(item);
    }

    public partition(session: SessionModel): any {
        return SessionAdapter.partition(session);
    }

}
