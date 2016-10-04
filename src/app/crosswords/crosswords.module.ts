import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrosswordsRouter } from './crosswords.router';

import { DatabaseService } from './services/database.service';
import { CrosswordsService } from './services/crosswords.service';

import { IssuesComponent } from './components/issues/issues.component';
import { IssueComponent } from './components/issue/issue.component';
import { CrosswordComponent } from './components/crossword/crossword.component';

@NgModule({
    imports: [
        CommonModule,
        CrosswordsRouter
    ],
    declarations: [
        IssuesComponent,
        IssueComponent,
        CrosswordComponent
    ],
    providers: [
        DatabaseService,
        CrosswordsService
    ]
})
export class CrosswordsModule { }