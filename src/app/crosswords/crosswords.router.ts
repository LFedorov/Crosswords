import { Routes, RouterModule } from '@angular/router';
import { CrosswordListComponent } from './components/crossword-list';
import { CrosswordGameComponent } from './components/crossword-game';

const routes: Routes = [
    { path: '', component: CrosswordListComponent },
    { path: ':id', component: CrosswordGameComponent }
];

export const CrosswordsRouter = RouterModule.forChild(routes);