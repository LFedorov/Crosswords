import { Injectable } from '@angular/core';

import { Crossword } from '../models/crossword.model';
import { Issue } from '../models/issue.model';

@Injectable()
export class LocalDataService {
    constructor() { }

    private connectDatabase(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            let request = window.indexedDB.open('Crosswords');

            request.onupgradeneeded = () => {
                request.result.createObjectStore('Issues', { keyPath: 'id' });
                request.result.createObjectStore('Crosswords', { keyPath: 'id' });
                resolve(this.connectDatabase());
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = (error) => reject(error);
        });
    }

    private getReadObjectStore(storeName: string): Promise<IDBObjectStore> {
        return this.connectDatabase()
            .then(db => { return db.transaction(storeName, 'readonly'); })
            .then(tx => { return tx.objectStore(storeName); });
    }

    private getWriteObjectStore(storeName: string): Promise<IDBObjectStore> {
        return this.connectDatabase()
            .then(db => { return db.transaction(storeName, 'readwrite'); })
            .then(tx => { return tx.objectStore(storeName); });
    }

    public getIssues(crosswordsPerIssue: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.getReadObjectStore('Issues')
                .then(os => { return os.count(); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public getIssue(id: number): Promise<Issue> {
        return new Promise((resolve, reject) => {
            this.getReadObjectStore('Issues')
                .then(os => { return os.get(id); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public saveIssue(issue: Issue): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getWriteObjectStore('Issues')
                .then(os => { return os.put(issue); })
                .then(rq => {
                    rq.onsuccess = () => resolve();
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public getCrossword(id: string): Promise<Crossword> {
        return new Promise((resolve, reject) => {
            this.getReadObjectStore('Crosswords')
                .then(os => { return os.get(id); })
                .then(rq => {
                    rq.onsuccess = () => resolve(rq.result);
                    rq.onerror = (error) => reject(error);
                });
        });
    }

    public saveCrossword(crossword: Crossword): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getWriteObjectStore('Crosswords')
                .then(os => { return os.put(crossword); })
                .then(rq => {
                    rq.onsuccess = () => resolve();
                    rq.onerror = (error) => reject(error);
                });
        });
    }
}