// Angular2
import { Component, OnInit } from '@angular/core';

// App Services
import { CrosswordsService } from '../../services';

@Component({
    selector: 'app-crosswords-issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
    private _issues: Array<number>;

    constructor(private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .countIssues()
            .then(count => {
                this._issues = new Array<number>();

                for (let i = 1; i <= count; i++) {
                    this._issues.push(i);
                }
            });
    }

    public get issues(): Array<number> { return this._issues; }
}