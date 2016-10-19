import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './app.router';
import { RootComponent } from './common/components/root/root.component';
import { HeaderComponent } from './common/components/header/header.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';

@NgModule({
  imports: [BrowserModule, HttpModule, AppRouterModule],
  declarations: [RootComponent, HeaderComponent, SidebarComponent],
  bootstrap: [RootComponent]
})
export class AppModule { }