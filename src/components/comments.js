import AbstractSmartComponent from './abstract-smart-component';
import Comment from './comment';
import {generateComments} from '../mocks/comments';
import {render, RenderPosition} from '../utils/render';

export default class Comments extends AbstractSmartComponent {
  constructor() {
    super();
    this._comments = generateComments(4);
    this._renderComments();
  }

  getTemplate() {
    return (`<div class="form-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
          
                  <ul class="film-details__comments-list">
                    
                  </ul>
          
                  <div class="film-details__new-comment">
                    <div for="add-emoji" class="film-details__add-emoji-label"></div>
          
                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>
          
                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                      <label class="film-details__emoji-label" for="emoji-gpuke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </section>\`);`);
  }

  _renderComments() {
    const commentsList = this.getElement().querySelector(`.film-details__comments-list`);
    this._comments.forEach((comment) => {
      render(commentsList, new Comment(comment), RenderPosition.BEFOREEND);
    });
  }
}
