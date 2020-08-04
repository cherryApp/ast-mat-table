import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { USER_PROVIDERS, USER_INFO } from 'src/app/service/user.providers';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
  providers: [USER_PROVIDERS],
})
export class UserEditorComponent implements OnInit {

  constructor(
    @Inject(USER_INFO) private user$: Observable<User | User[]>,
  ) { }

  ngOnInit() {}

}
