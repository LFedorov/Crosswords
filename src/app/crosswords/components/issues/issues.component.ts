// Angular2
import { Component, OnInit } from '@angular/core';

// App Services
import { CrosswordsService } from '../../services/crosswords.service';

@Component({
    selector: 'app-crosswords-issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
    private _issues: Array<number> = new Array<number>();

    constructor(private _crosswordsService: CrosswordsService) {
    }

    public ngOnInit(): void {
        this._crosswordsService
            .getIssues()
            .then(total => {
                for (let i = 1; i <= total; i++) {
                    this._issues.push(i);
                }
            });
    }

    public get issues(): Array<number> { return this._issues; }
}