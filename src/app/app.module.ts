import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RootComponent } from './shared/components';
import { HeaderComponent } from './shared/components';
import { SidebarComponent } from './shared/components';

const routes: Routes = [
  { path: '', loadChildren: () => System.import('./+crosswords').then(m => m.CrosswordsModule) }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    RootComponent, HeaderComponent, SidebarComponent
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }