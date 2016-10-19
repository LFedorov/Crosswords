import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Axis, Word } from '../models/word.model';
import { Crossword } from '../models/crossword.model';
import { RawCrossword } from '../models/raw-crossword.model';

@Injectable()
export class RemoteDataService {
    constructor(private _http: Http) {
    }

    public getIssues(crosswordsPerIssue: number): Promise<number> {
        return this._http
            .get('api/crosswords/count.json')
            .toPromise()
            .then(response => response.json())
            .then(json => {
                return Math.ceil(json.Count / crosswordsPerIssue);
            });
    }

    public getIssue(id: number) {
        return this._http
            .get(`api/crosswords/list/page${id}.json`)
            .toPromise()
            .then(response => response.json())
            .then(json => {
                return this.converJsonToIssue(json);
            });
    }

    public getCrossword(id: string): Promise<Crossword> {
        return this._http
            .get(`api/crosswords/${id}.json`)
            .toPromise()
            .then(response => response.json())
            .then(json => {
                return this.converJsonToCrossword(json);
            });
    }

    private converJsonToIssue(json: any): Array<RawCrossword> {
        let crosswordInfoArray = new Array<RawCrossword>();

        json.Crosswords.forEach(crossword => {
            let crosswordInfo = new RawCrossword(crossword);
            crosswordInfoArray.push(crosswordInfo);
        });

        return crosswordInfoArray;
    }

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