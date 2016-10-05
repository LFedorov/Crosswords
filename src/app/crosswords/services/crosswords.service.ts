import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LocalDataService } from './local-data.service';
import { RemoteDataService } from './remote-data.service';

import { Axis, Word } from '../models/word.model';
import { Crossword } from '../models/crossword.model';
import { RawCrossword } from '../models/raw-crossword.model';

@Injectable()
export class CrosswordsService {
    constructor(private _http: Http, private _localData: LocalDataService, private _remoteData: RemoteDataService) {
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
                .catch((error) => { reject(error) });
        });
    }

    public getIssue(id: number) {
        return this._remoteData.getIssue(id);
    }

    public getCrossword(id: string): Promise<Crossword> {
        return this._remoteData.getCrossword(id);
    }
}