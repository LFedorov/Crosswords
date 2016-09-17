import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrosswordsRouter } from './crosswords.router';
import { CrosswordsService } from './services/crosswords.service';
import { CrosswordListComponent } from './components/crossword-list';
import { CrosswordGameComponent } from './components/crossword-game';

@NgModule({
    imports: [
        CommonModule,
        CrosswordsRouter
    ],
    declarations: [
        CrosswordListComponent,
        CrosswordGameComponent
    ],
    providers: [
        CrosswordsService
    ]
})
export class CrosswordsModule {
}