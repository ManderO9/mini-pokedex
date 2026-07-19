import { Injectable } from '@angular/core';
// @ts-ignore
import toast from 'not-a-toast';
// @ts-ignore
import 'not-a-toast/style.css';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  public showError(message: string, action?: { message: string, callback: (...args: any[]) => any }) {
    toast(
      {
        message: message,
        theme: "legoBrick",
        duration: 10000,
        position: "top-right",
        entryAnimation: "slideInUp",
        exitAnimation: "windLeftOut",
        showIcon: true,
        iconType: "error",
        showActionButton: action != null,
        actionButtonLabel: action?.message,
        actionButtonTheme: "default",
        onAction: (t: any) => { t.close(); action?.callback(); },
      }
    )
  }
}
