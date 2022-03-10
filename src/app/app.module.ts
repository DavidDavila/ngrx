import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from 'src/app/app.component';
import { effects, metaReducers, reducers } from 'src/app/app.state';
import { HistoryComponent } from 'src/app/history/history.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DesignComponent } from './design/design.component';
import { EidComponent } from './eid-component/eid-component.component';
import { VideoComponent } from './eid-component/video/video.component';
import { InterceptorService } from './globals/interceptor.service';
import { Json2htmlComponent } from './globals/json2html/json2html.component';
import { PrepareParamsPipe } from './globals/prepare-params.pipe';
import { PrepareResponsePipe } from './globals/prepare-response.pipe';
import { OptionsComponent } from './options/options.component';




@NgModule({
  declarations: [
    AppComponent,
    
    HistoryComponent,
    OptionsComponent,
    VideoComponent,
    EidComponent,
    Json2htmlComponent,
    PrepareResponsePipe,
    DesignComponent,
    PrepareParamsPipe,
  ],
  imports: [
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatMenuModule,
    AppRoutingModule,
    FormsModule,
     BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
