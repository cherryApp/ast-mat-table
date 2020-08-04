import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  /* user$: Observable<User | User[]> = this.activatedRoute.params.pipe(
    switchMap( params => {
      return this.userService.get(params.id);
    } )
  ); */

  user$: Observable<User | User[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.user$ = this.userService.get(params.id);
      },
      err => console.error(err)
    );
  }

}
