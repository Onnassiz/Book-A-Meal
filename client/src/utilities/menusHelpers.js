
/* eslint no-underscore-dangle: 0 */
import { convertUnixToDateForUpdate, getDateFromMoment } from './functions';

export function registerMethods($thisBind) {
  const $this = $thisBind;
  $this.onChange = $this.onChange.bind($this);
  $this.updateUnits = $this.updateUnits.bind($this);
  $this.addToCart = $this.addToCart.bind($this);
  $this.removeFromCart = $this.removeFromCart.bind($this);
  $this.showMore = $this.showMore.bind($this);
  $this.showCalender = $this.showCalender.bind($this);
  $this.showCart = $this.showCart.bind($this);
  $this.closeCartPane = $this.closeCartPane.bind($this);
}

export function getMenuForDate(number, $this) {
  const { getMealsInDailyMenu } = $this.props;
  let date = new Date($this.state.date);
  date = convertUnixToDateForUpdate(date.setDate(date.getDate() + number) / 1000);
  getMealsInDailyMenu(date).then((response) => {
    if (response.status === 200) {
      $this.setState({
        date, mealsCount: response.data.count, meals: response.data.meals, activePage: 1,
      });
    }
  });
}

export function handlePageChange(pageNumber, $this) {
  const { getMealsInDailyMenu } = $this.props;
  const offset = (pageNumber - 1) * 12;
  getMealsInDailyMenu($this.state.date, offset, 12).then((response) => {
    if (response.status === 200) {
      $this.setState({
        activePage: pageNumber,
        meals: response.data.meals,
        mealsCount: response.data.count,
      });
    }
  });
}

export function handleDateChange(date, $this) {
  const { getMealsInDailyMenu } = $this.props;
  const selectedDate = getDateFromMoment(date._d);
  getMealsInDailyMenu(selectedDate).then((response) => {
    if (response.status === 200) {
      $this.setState({
        date: selectedDate,
        mealsCount: response.data.count,
        meals: response.data.meals,
        activePage: 1,
      });
    }
  });
}
