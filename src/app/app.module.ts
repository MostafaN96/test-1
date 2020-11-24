import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Admin Side
import { RoutingPageComponent } from './admin-pages/routing-page/routing-page.component';
import { NavbarComponent } from './admin-pages/navbar/navbar.component';

// Client Side
import { CRoutingPageComponent } from './client-pages/c-routing-page/c-routing-page.component';
import { CNavbarComponent } from './client-pages/c-navbar/c-navbar.component';

// ERROR PAGE
import { PageNotFoundComponent } from './general-pages/page-not-found/page-not-found.component';

// Login PAGE
import { LoginAdminComponent } from './general-pages/login-admin/login-admin.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module'; 

// Shared Module
import { SharedModule } from './shared-modues/shared/shared.module';

// Sission Service
import { SessionStorageService } from 'angular-web-storage';

// UIKIT ANimation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    
    // Admin Side
    RoutingPageComponent,
    NavbarComponent,
    
    // Client Side
    CRoutingPageComponent,
    CNavbarComponent,

    // ERROR PAGE
    PageNotFoundComponent,

    // Login PAGE
    LoginAdminComponent,

  ],
  imports: [
    BrowserModule,

    // Routing Module
    AppRoutingModule,

    // Shared Module
    SharedModule,

    // UIKIT ANimation
    BrowserAnimationsModule,

  ],
  providers: [SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
