import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formText : any;

  logOutput(output : any) {
    console.log("LOGGING");
    console.log(output);
  }
}
