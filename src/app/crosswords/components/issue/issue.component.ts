// Angular 2
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// App Models
import { RawCrossword } from '../../models';

// App Services
import { CrosswordsService } from '../../services/crosswords.service';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    private _crosswords: Array<RawCrossword> = new Array<RawCrossword>();

    constructor(private _route: ActivatedRoute, private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .getIssue(this._route.snapshot.params['issueId'])
            .subscribe(crosswords => {
                this._crosswords = crosswords;
            });
    }

    public get crosswords(): Array<RawCrossword> {
        return this._crosswords;
    }
}