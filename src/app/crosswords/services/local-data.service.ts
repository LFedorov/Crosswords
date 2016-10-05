import { Injectable } from '@angular/core';

@Injectable()
export class LocalDataService {
    constructor() {
    }

    private _connect(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            let request = window.indexedDB.open('Crosswords');

            request.onupgradeneeded = () => {
                let database: IDBDatabase = request.result;

                database.createObjectStore('Issues', { keyPath: 'id' });

                resolve(database);
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = (error) => {
                reject(error);
            };
        });
    }

    public getIssues(crosswordsPerIssue: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this._connect()
                .then(database => {
                    let request = database
                        .transaction('Issues', 'readwrite')
                        .objectStore('Issues')
                        .count();

                    request.onsuccess = () => {
                        let count = request.result;
                        resolve(count);
                    };

                    request.onerror = (error) => {
                        reject(error);
                    };
                });
        });
    }
}