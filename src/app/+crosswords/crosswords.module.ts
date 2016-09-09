import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { CrosswordsRouter } from './crosswords.router';

import { CrosswordListComponent } from './crossword-list';
import { CrosswordGameComponent } from './crossword-game';

import { CrosswordsService } from '../services';

@NgModule({
    imports: [
        CommonModule,
        CrosswordsRouter,
        HttpModule,
        JsonpModule
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