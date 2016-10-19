import { RouterModule } from '@angular/router';

export const AppRouterModule = RouterModule.forRoot([
    { 'path': '', redirectTo: 'crosswords', pathMatch: 'full' },
    { 'path': 'crosswords', loadChildren: 'app/crosswords/crosswords.module#CrosswordsModule' }
]);