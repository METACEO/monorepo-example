import {CorsMiddleware} from './cors.middleware';

describe('CorsMiddleware', () => {
    it('should be defined', () => {
        expect(new CorsMiddleware()).toBeTruthy();
    });
});
