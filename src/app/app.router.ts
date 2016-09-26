import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { 'path': '', redirectTo: 'crosswords', pathMatch: 'full' },
    { 'path': 'crosswords', loadChildren: 'app/crosswords/crosswords.module#CrosswordsModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);