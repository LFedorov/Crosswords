import { Component, OnInit } from '@angular/core';
import { Info } from 'app/shared/models';
import { CrosswordsService } from '../../services';

@Component({
    selector: 'app-crossword-list',
    templateUrl: './crossword-list.component.html',
    styleUrls: ['./crossword-list.component.css']
})
export class CrosswordListComponent implements OnInit {
    public crosswords: Array<Info> = new Array<Info>();

    constructor(private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .getList()
            .subscribe(crosswords => {
                this.crosswords = crosswords;
            });
    }
}