import * as Chance from 'chance';

export class WindowService {
  public readonly windowId = new Chance().guid();

  constructor() {
    window.addEventListener('message', event => {
      if (event.origin === window.location.origin && event.data.windowId !== this.windowId) {
        console.log('received message from', event.data.windowId);
      }
    });
  }
}