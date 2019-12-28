import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListener() {
    throw new Error(`Abstract method not implemented: recoveryListener`);
  }

  rerender() {
    const oldElement = this.getElement();

    this.removeElement();

    const newElement = this.getElement();
    oldElement.replaceWith(newElement);

    this.recoveryListener();
  }
}
