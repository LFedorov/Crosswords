// Angular2
import { Routes, RouterModule } from '@angular/router';

// App Components
import { IssuesComponent } from './components/issues/issues.component';
import { IssueComponent } from './components/issue/issue.component';
import { CrosswordComponent } from './components/crossword/crossword.component';

const routes: Routes = [
    { path: '', component: IssuesComponent },
    { path: 'issue/:issueId', component: IssueComponent },
    { path: 'issue/:issueId/:crosswordId', component: CrosswordComponent }
];

export const CrosswordsRouter = RouterModule.forChild(routes);