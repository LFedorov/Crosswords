import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RawCrossword } from '../../models/raw-crossword.model';
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
            .then(issue => {
                this._crosswords = new Array<RawCrossword>();
                issue.crosswords.forEach(id => {
                    this._crosswords.push(new RawCrossword(id));
                });
            });
    }

    public get crosswords(): Array<RawCrossword> {
        return this._crosswords;
    }
}