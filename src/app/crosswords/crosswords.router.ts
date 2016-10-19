import { RouterModule } from '@angular/router';

import { IssuesComponent } from './components/issues/issues.component';
import { IssueComponent } from './components/issue/issue.component';
import { CrosswordComponent } from './components/crossword/crossword.component';

export const CrosswordsRouterModule = RouterModule.forChild([
    { path: '', component: IssuesComponent },
    { path: 'issue/:issueId', component: IssueComponent },
    { path: 'issue/:issueId/:crosswordId', component: CrosswordComponent }
]);