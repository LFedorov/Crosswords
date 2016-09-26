// Angular 2
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// App Models
import { RawCrossword } from 'app/shared/models';

// App Services
import { CrosswordsService } from '../../services';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    public crosswords: Array<RawCrossword> = new Array<RawCrossword>();

    constructor(private _route: ActivatedRoute, private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .list()
            .subscribe(crosswords => {
                this.crosswords = crosswords;
            });
    }
}