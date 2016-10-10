import { Injectable } from '@angular/core';

import { Crossword } from '../models/crossword.model';
import { Issue } from '../models/issue.model';

@Injectable()
export class LocalDataService {
    constructor() { }

    private _connect(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            let request = window.indexedDB.open('Crosswords');

            request.onupgradeneeded = () => {
                let database: IDBDatabase = request.result;

                database.createObjectStore('Issues', { keyPath: 'id' });
                database.createObjectStore('Crosswords', { keyPath: 'id' });

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
                .then(db => { return db.transaction('Issues', 'readonly'); })
                .then(tx => { return tx.objectStore('Issues'); })
                .then(os => { return os.count(); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public getIssue(id: number): Promise<Issue> {
        return new Promise((resolve, reject) => {
            this._connect()
                .then(db => { return db.transaction('Issues', 'readonly'); })
                .then(tx => { return tx.objectStore('Issues'); })
                .then(os => { return os.get(id); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public getCrossword(id: string): Promise<Crossword> {
        return new Promise((resolve, reject) => {
            this._connect()
                .then(db => { return db.transaction('Crosswords', 'readonly'); })
                .then(tx => { return tx.objectStore('Crosswords'); })
                .then(os => { return os.get(id); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public saveCrossword(crossword: Crossword): Promise<void> {
        return new Promise((resolve, reject) => {
            this._connect()
                .then(db => { return db.transaction('Crosswords', 'readwrite'); })
                .then(tx => { return tx.objectStore('Crosswords'); })
                .then(os => { return os.put(crossword); })
                .then(rq => {
                    rq.onsuccess = () => resolve();
                    rq.onerror = (error) => reject(error);
                });
        });
    }
}