import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Axis, Word } from '../models/word.model';
import { Crossword } from '../models/crossword.model';
import { Issue } from '../models/issue.model';

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

    public getIssue(id: number): Promise<Issue> {
        return this._http
            .get(`api/crosswords/list/page${id}.json`)
            .toPromise()
            .then(response => response.json())
            .then(json => {
                let issue = new Issue(id);
                json.Crosswords.forEach(crosswordId => {
                    issue.addCrossword(crosswordId);
                });

                return issue;
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