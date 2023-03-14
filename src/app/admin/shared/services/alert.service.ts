import {Injectable} from "@angular/core";

export type AlertType = 'success' | 'warning' | 'danger'
export interface Alert {
  type: AlertType,
  text: string,
}
@Injectable()
export class AlertService{
}
