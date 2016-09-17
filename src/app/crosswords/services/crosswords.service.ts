import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Axis, Word, Crossword, RawCrossword } from '../../shared/models';

@Injectable()
export class CrosswordsService {
    private crosswordsListUrl: string = 'api/crosswords/list.json';

    constructor(private _http: Http) {
    }

    public list(): Observable<Array<RawCrossword>> {
        return this._http
            .get(this.crosswordsListUrl)
            .map(response => response.json())
            .map(json => { return this.converJsonToInfoArray(json); });
    }

    public getById(id: string): Observable<Crossword> {
        return this._http
            .get('api/crosswords/' + id + '.json')
            .map(response => response.json())
            .map(json => { return this.converJsonToCrossword(json); });
    }

    private converJsonToInfoArray(json: any): Array<RawCrossword> {
        let crosswordInfoArray = new Array<RawCrossword>();

        json.Crosswords.forEach(crossword => {
            let crosswordInfo = this.convertJsonToInfo(crossword);
            crosswordInfoArray.push(crosswordInfo);
        });

        return crosswordInfoArray;
    }

    private convertJsonToInfo(json: any): RawCrossword {
        return new RawCrossword(json.Id);
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