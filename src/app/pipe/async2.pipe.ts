import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject, from, throwError, Subscription, isObservable } from 'rxjs';
import { distinctUntilChanged, switchAll, tap } from 'rxjs/operators';

const isPromise = (obj: any) => {
  return obj.then && obj.resolve;
};

// let counter = 0;

@Pipe({ name: 'async2', pure: false })
export class Async2Pipe implements OnDestroy, PipeTransform {
  value: any = null;
  subscription: Subscription;
  observablesToSubscribeSubject: Subject<any> = new Subject<Observable<any>>();
  obs$: Observable<any> = this.observablesToSubscribeSubject
    .pipe(
      distinctUntilChanged(Object.is),
      switchAll(),
      distinctUntilChanged(),
      tap( v => {
        // console.log(`CHANGED ${counter}`, v);
        this.value = v;
        this.ref.detectChanges();
      })
    );

  constructor(private ref: ChangeDetectorRef) {
    this.subscription = this.obs$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transform(obj: Observable<any> | Promise<any> | null | undefined): any {
    if (isObservable(obj) || isPromise(obj)) {
      // console.log(`INPUT ${++counter}`, obj);
      this.observablesToSubscribeSubject.next( from(obj) );
      return this.value;
    }

    throwError(new Error('invalidPipeArgumentError'));
  }
}
