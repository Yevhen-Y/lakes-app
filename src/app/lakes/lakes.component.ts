import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ILakeModel } from '../models/lake.interface';
import { SocketIoService } from '../services/socket-io.service';
import { ILakeViewModel } from '../models/lake.view-model';

@Component({
  selector: 'app-lakes',
  templateUrl: './lakes.component.html',
  styleUrls: ['./lakes.component.scss'],
  providers: [SocketIoService]
})
export class LakesComponent implements OnInit {

  public lakes = new Array<ILakeModel>();
  private fishType: ILakeViewModel;


  constructor(private apiService: ApiService, private socketService: SocketIoService) {
    socketService.socketDataSource.subscribe(data => {
      console.log(data);
      this.removeFish(data)
    })
  }

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

  public onCatchFish(e: any): void {
    if (e.target.className !== 'tuna' && e.target.className !== 'salmon') {
      return;
    } else {
      let currentLake: string = e.target.parentElement.id;
      this.fishType = { fishType: e.target.className };
      this.apiService.updateLake(currentLake, this.fishType).subscribe();
    }
  };

  public removeFish(socketData: any) {
    const index = this.lakes.findIndex(item => item.name === socketData.res.name)
    let nameOfLakeArray = socketData.fishType + 'Array';
    this.lakes[index][this.lakes[index].type] -= 1;
    this.lakes[index][nameOfLakeArray].splice(0, 1);
  }

}
