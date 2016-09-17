import { Component, OnInit } from '@angular/core';
import { RawCrossword } from 'app/shared/models';
import { CrosswordsService } from '../../services';

@Component({
    selector: 'app-crossword-list',
    templateUrl: './crossword-list.component.html',
    styleUrls: ['./crossword-list.component.css']
})
export class CrosswordListComponent implements OnInit {
    public crosswords: Array<RawCrossword> = new Array<RawCrossword>();

    constructor(private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .list()
            .subscribe(crosswords => {
                this.crosswords = crosswords;
            });
    }
}