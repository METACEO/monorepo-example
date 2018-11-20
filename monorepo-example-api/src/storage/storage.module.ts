import {UserModel} from '@monorepo-example/shared';
import {Module} from '@nestjs/common';
import {Observable} from 'rxjs';

import {ConfigModule, BaseConfigService} from '../config';
import {MemoryStorageService} from './memory-storage.service';

export abstract class BaseStorageService {
    abstract createUser(user: UserModel): Observable<UserModel>;
    abstract getUser(id: string): Observable<UserModel>;
    abstract getUserByGithubId(githubId: string): Observable<UserModel>;
}

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [
        {
            provide: BaseStorageService,
            useFactory: StorageModule.Factory,
            inject: [BaseConfigService]
        }
    ],
    exports: [
        BaseStorageService,
    ],
})
export class StorageModule {
    public static Factory(baseConfigService: BaseConfigService) {
        switch (baseConfigService.storage.type) {
            case 'aws-dynamodb': {
                return null;
            }
            case 'azure-cosmosdb': {
                return null;
            }
            case 'local-sqlite': {
                return null;
            }
            default: {
                return new MemoryStorageService();
            }
        }
    }
}
