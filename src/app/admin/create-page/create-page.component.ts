import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {
  form : FormGroup
}
