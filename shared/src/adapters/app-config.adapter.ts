import {get} from 'lodash';

import {AppConfigModel} from '../models';
import {Adapter} from './adapter';

export class AppConfigAdapter implements Adapter<AppConfigModel> {

    public static adapt(appConfig: any): AppConfigModel {
        if (!appConfig) {
            return null;
        }
        return new AppConfigModel(
            get(appConfig, 'features', []),
            get(appConfig, 'session', null),
        );
    }

    public static partition(appConfig: AppConfigModel): any {
        if (!appConfig) {
            return null;
        }
        return {
            features: get(appConfig, 'features', []),
            session: get(appConfig, 'session', null),
        };
    }

    public adapt(item: any): AppConfigModel {
        return AppConfigAdapter.adapt(item);
    }

    public partition(appConfig: AppConfigModel): any {
        return AppConfigAdapter.partition(appConfig);
    }

}
