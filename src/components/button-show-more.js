import AbstractComponent from './abstract-component';

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return (`<button class="films-list__show-more">Show more</button>`);
  }
}
