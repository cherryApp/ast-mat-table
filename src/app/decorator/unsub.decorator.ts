import { Subscription } from 'rxjs';

export function Unsub(): ClassDecorator {
  function DecoratorFactory(target): void {
    const subList: Subscription[] = [];
    target.prototype.__defineSetter__('sub', (s: Subscription) => {
      subList.push(s);
    });
    target.prototype.__defineGetter__('sub', () => {
      return subList;
    });

    const targetNgOnDestroy = target.prototype.ngOnDestroy;

    function ngOnDestroy(): void {
      subList.forEach(item => {
        console.log(item);
        item.unsubscribe();
      });
      subList.length = 0;

      if (targetNgOnDestroy) {
        targetNgOnDestroy.apply(this);
      }
    }

    target.prototype.ngOnDestroy = ngOnDestroy;
  }

  return DecoratorFactory;
}
