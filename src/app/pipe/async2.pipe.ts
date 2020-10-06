import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { from, isObservable, Observable, Subject, Subscription, throwError } from 'rxjs';
import { distinctUntilChanged, switchAll, tap } from 'rxjs/operators';

const isPromise = (obj: any) => {
  return obj.then && obj.resolve;
};

@Pipe({
  name: 'async2'
})
export class Async2Pipe implements PipeTransform, OnDestroy {
  value: any = null;
  subscription: Subscription;
  observablesToSubscribeSubject: Subject<any> = new Subject<Observable<any>>();
  obs$: Observable<any> = this.observablesToSubscribeSubject
    .pipe(
      distinctUntilChanged(Object.is),
      switchAll(),
      distinctUntilChanged(),
      tap( v => {
        console.log(v);
        this.value = v;
        this.ref.detectChanges();
      })
    );

  constructor(
    private ref: ChangeDetectorRef,
  ) {
    this.subscription = this.obs$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transform(obj: Observable<any> | Promise<any> | null | undefined): any {
    if (isObservable(obj) || isPromise(obj)) {
      this.observablesToSubscribeSubject.next( from(obj) );
      return this.value;
    }

    throwError( new Error('invalidPipeArgumentError') );
  }

}
