import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpinnButtonModule } from './spinn-button/spinn-button.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SpinnButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
