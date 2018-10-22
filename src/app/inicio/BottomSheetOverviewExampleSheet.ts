import { MatBottomSheetRef } from "@angular/material";
import { Component } from "@angular/core";

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
  })
  export class BottomSheetOverviewExampleSheet {
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}
  
    openLink(event: MouseEvent): void {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }

    getRandomImage(){
      return "assets/robo/caixa2.jpg"
    }
  }