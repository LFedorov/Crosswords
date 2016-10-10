import { Injectable } from '@angular/core';
import { LocalDataService } from './local-data.service';
import { RemoteDataService } from './remote-data.service';

import { Crossword } from '../models/crossword.model';

@Injectable()
export class CrosswordsService {
    constructor(private _localData: LocalDataService, private _remoteData: RemoteDataService) {
    }

    public getIssues(): Promise<number> {
        return new Promise((resolve, reject) => {
            let crosswordsPerIssue = 20;

            this._remoteData
                .getIssues(crosswordsPerIssue)
                .then(issues => resolve(issues))
                .catch(() => {
                    this._localData
                        .getIssues(crosswordsPerIssue)
                        .then(issues => resolve(issues));
                })
                .catch((error) => reject(error));
        });
    }

    public getIssue(id: number) {
        return new Promise((resolve, reject) => {
            this._localData
                .getIssue(id)
                .then(issue => resolve(issue))
                .catch(() => {
                    this._remoteData
                        .getIssue(id)
                        .then(issue => resolve(issue));
                })
                .catch((error) => reject(error));
        });
    }

    public getCrossword(id: string): Promise<Crossword> {
        return new Promise((resolve, reject) => {
            this._localData
                .getCrossword(id)
                .then(crossword => resolve(crossword))
                .catch(() => {
                    this._remoteData
                        .getCrossword(id)
                        .then(crossword => resolve(crossword));
                })
                .catch((error) => reject(error));
        });
    }
}