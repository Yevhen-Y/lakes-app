import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ILakeModel } from '../models/lake.interface';

@Component({
  selector: 'app-lakes',
  templateUrl: './lakes.component.html',
  styleUrls: ['./lakes.component.scss']
})
export class LakesComponent implements OnInit {

  public lakes = new Array<ILakeModel>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getLakes();
  }

  public getLakes(): void {
    this.apiService.getAllLakes().subscribe(
      (res) => {
        this.lakes.push(...res as Array<ILakeModel>)
        this.lakes.forEach((lake) => this.lakeToFishArray(lake));
      }
    )
  };

  private lakeToFishArray(lake: ILakeModel): void {
    lake.salmonArray = new Array<ILakeModel>();
    lake.tunaArray = new Array<ILakeModel>();

    if (lake.salmon) {
      for (let i = 0; lake.salmon !== i; i++) {
        lake.salmonArray.push({ type: lake.type });
      }
    }

    if (lake.tuna) {
      for (let i = 0; lake.tuna !== i; i++) {
        lake.tunaArray.push({ type: lake.type });
      }
    }
  }

  public onCatchFish(e): void {
    if (e.target.className !== 'tuna' && e.target.className !== 'salmon') {
      return
    } else {
      let currentLake: string = e.target.parentElement.id;
      let fishType = e.target.className;
      this.apiService.updateLake(currentLake, { fishType }).subscribe();
    }
  };

}
