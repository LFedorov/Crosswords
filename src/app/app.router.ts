import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { 'path': '', loadChildren: 'app/+crosswords/crosswords.module#CrosswordsModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);