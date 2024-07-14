interface Unsubscribable {
  unsubscribe(): void;
}

const isFunction = (fn: unknown) => typeof fn === 'function';

export class Subsync {
  private _subs: Unsubscribable[] = [];

  set sync(subscription: Unsubscribable) {
    if (!isFunction(subscription.unsubscribe)) {
      throw Error('.unsubscribe must be a function');
    }

    this._subs.push(subscription);
  }

  public unsubscribe(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
