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
        return this._remoteData.getIssue(id);
    }

    public getCrossword(id: string): Promise<Crossword> {
        return this._remoteData.getCrossword(id);
    }
}