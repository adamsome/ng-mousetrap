import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgMousetrapModule } from 'ng-mousetrap'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgMousetrapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
