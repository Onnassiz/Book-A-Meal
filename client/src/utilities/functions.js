
// export const hasError = (errors, field) => {
//   let fieldHasError = false;
//   errors.forEach((item) => {
//     const key = Object.keys(item)[0];
//     if (key === field) {
//       fieldHasError = true;
//     }
//   });
//   return fieldHasError;
// };

function addZ(n) {
  return n < 10 ? `0${n}` : n;
}

export function getDate(dateTime) {
  if (dateTime !== null) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateAndTimeCreated = new Date(Date.parse(dateTime));
    const getDay = days[dateAndTimeCreated.getDay()];
    const fetchDate = addZ(dateAndTimeCreated.getDate());
    const getMonth = months[dateAndTimeCreated.getMonth()];
    const getYear = dateAndTimeCreated.getFullYear();
    const timeCreated = `${addZ(dateAndTimeCreated.getHours() + 1)}:${addZ(dateAndTimeCreated.getMinutes())}`;
    return (`${getDay}, ${getMonth} ${fetchDate}, ${getYear} ${timeCreated}`);
  }
}

/** export function convertUnixToDate(unixTime) {
  const dateTime = parseInt(unixTime, 10);
  if (dateTime !== null) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateAndTime = new Date(dateTime * 1000);
    const getDay = days[dateAndTime.getDay()];
    const getThisDate = addZ(dateAndTime.getDate());
    const getMonth = months[dateAndTime.getMonth()];
    const getYear = dateAndTime.getFullYear();
    return (`${getDay}, ${getMonth} ${getThisDate}, ${getYear}`);
  }
  return '----';
} */

export function convertUnixToDateForUpdate(unixTime) {
  const dateTime = parseInt(unixTime, 10);
  if (dateTime !== null) {
    const dateAndTime = new Date(dateTime * 1000);
    const getThisDate = addZ(dateAndTime.getDate());
    const getMonth = addZ(dateAndTime.getMonth() + 1);
    const getYear = dateAndTime.getFullYear();
    return (`${getYear}-${getMonth}-${getThisDate}`);
  }
}

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function getCurrentDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}

export function getDateFromMoment(moment) {
  let dd = moment.getDate();
  let mm = moment.getMonth() + 1; // January is 0!
  const yyyy = moment.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}

// export function compareAZ(a, b) {
//   if (a.name < b.name) { return -1; }
//   if (a.name > b.name) { return 1; }
//   return 0;
// }

export function sortMenu(c, d) {
  const a = c.date;
  const b = d.date;
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function getDateTime(dateTime) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateAndTime = new Date(Date.parse(dateTime));
  const getDay = days[dateAndTime.getDay()];
  const date = addZ(dateAndTime.getDate());
  const getMonth = months[dateAndTime.getMonth()];
  const getYear = dateAndTime.getFullYear();
  const timeCreated = `${addZ(dateAndTime.getHours() + 1)}:${addZ(dateAndTime.getMinutes())}`;
  return (`${getDay} ${getMonth} ${date} ${getYear}, ${timeCreated}`);
}

