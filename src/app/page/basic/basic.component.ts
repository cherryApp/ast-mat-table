import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  dataSource$: User[] = (this.userService.get() as unknown as User[]);

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

}
