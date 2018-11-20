export interface Adapter<T> {
    adapt(item: any): T;
    partition(model: T): any;
}
