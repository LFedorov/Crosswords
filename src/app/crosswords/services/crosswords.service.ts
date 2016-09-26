import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Axis, Word, Crossword, RawCrossword } from '../../shared/models';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrosswordsService {
    constructor(private _http: Http) {
    }

    public getIssues(): Promise<number> {
        return this._http
            .get('api/crosswords/count.json')
            .toPromise()
            .then(response => response.json())
            .then(json => {
                let crosswordsPerIssue = 20;

                // Only full issues
                // return Math.floor(json.Count / crosswordsPerIssue);

                // Raw issues
                return Math.ceil(json.Count / crosswordsPerIssue);
            })
            .catch(() => {
                return 2;
            });
    }

    public getIssue(id: number) {
        return this._http
            .get(`api/crosswords/list/page${id}.json`)
            .map(response => response.json())
            .map(json => { return this.converJsonToInfoArray(json); });
    }

    public getCrossword(id: string): Observable<Crossword> {
        return this._http
            .get('api/crosswords/' + id + '.json')
            .map(response => response.json())
            .map(json => { return this.converJsonToCrossword(json); });
    }

    private converJsonToInfoArray(json: any): Array<RawCrossword> {
        let crosswordInfoArray = new Array<RawCrossword>();

        json.Crosswords.forEach(crossword => {
            let crosswordInfo = new RawCrossword(crossword);
            crosswordInfoArray.push(crosswordInfo);
        });

        return crosswordInfoArray;
    }

    // private convertJsonToInfo(json: any): RawCrossword {
    //     return new RawCrossword(json);
    // }

    private converJsonToCrossword(json: any): Crossword {
        let id = json.Id;
        let words: Array<Word> = new Array<Word>();

        json.Words.forEach(word => {
            let crosswordWord = this.convertJsonToWord(word);
            words.push(crosswordWord);
        });

        return new Crossword(id, words);
    }

    private convertJsonToWord(json: any): Word {
        let x = json.X;
        let y = json.Y;
        let clue = json.Clue;
        let question = json.Question;
        let answer = json.Answer;
        let axis = json.Axis === 'X' ? Axis.x : json.Axis === 'Y' ? Axis.y : null;

        return new Word(x, y, clue, axis, question, answer);
    }
}