import {FilterType} from '../const.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getTasksByFilter} from '../utils/filter.js';
import Menu from "../components/menu";

export default class FilterController {
  constructor(container, movieModel, showStatisticHandler) {
    this._container = container;
    this._movieModel = movieModel;
    this._showStatisticHandler = showStatisticHandler;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._movieModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allTasks = this._movieModel.getCardsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getTasksByFilter(allTasks, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new Menu(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    this._filterComponent.setShowStatisticHandler(this._showStatisticHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._movieModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
