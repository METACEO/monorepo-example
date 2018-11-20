import {SessionModel} from './session.model';

export class AppConfigModel {
    constructor(public readonly features: string[],
                public readonly session: SessionModel) {
    }
}
