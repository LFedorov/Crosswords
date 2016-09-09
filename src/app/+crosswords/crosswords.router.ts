import { Routes, RouterModule } from '@angular/router';
import { CrosswordListComponent } from './crossword-list';
import { CrosswordGameComponent } from './crossword-game';

const routes: Routes = [
    { path: '', component: CrosswordListComponent },
    { path: ':id', component: CrosswordGameComponent }
];

export const CrosswordsRouter = RouterModule.forChild(routes);