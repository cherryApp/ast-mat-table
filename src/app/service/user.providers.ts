import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user';
import { UserService } from './user.service';

// Token to access a stream with the information you need
export const USER_INFO = new InjectionToken<Observable<User>>(
  'A stream with current user information.'
);

export const USER_PROVIDERS: Provider[] = [
  {
    provide: USER_INFO,
    deps: [ActivatedRoute, UserService],
    useFactory: userFactory,
  },
];

export function userFactory(
  { params }: ActivatedRoute,
  userService: UserService): Observable<User | User[]> {
  return params.pipe(
    switchMap((paramsObject) => {
      return userService.get(paramsObject.id);
    })
  );
}
