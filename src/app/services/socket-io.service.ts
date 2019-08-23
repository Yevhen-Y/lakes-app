import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject, Observable } from 'rxjs';
import { ILakeModel } from '../models/lake.interface';

@Injectable()
export class SocketIoService {
    socket: SocketIOClient.Socket;

    socketData$: Subject<{ fishType: string; res: Array<ILakeModel> }> = new Subject();

    socketDataSource = this.socketData$ as Observable<{ fishType: string; res: Array<ILakeModel> }>;

    constructor() {
        this.socket = io.connect('//localhost:8081', {
            path: '/socket.io'
        });
        this.listen();

        this.socket.on('data', (data) => {
            this.socketData$.next(data);
        });
    }

    private listen() {
        this.socket.on('connect', (socket) => {
            console.log('Connection socket');
        });
    }
}