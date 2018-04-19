//Elements
var menu_tag = document.getElementById('menus');
var menu_options = document.getElementById('meal_options');
var meal_form_div = document.getElementById('meal_form_div');

var show_form = true;

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}


function toggle_form() {
	show_form = !show_form;
	meal_form_div.hidden = show_form;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


//Default values
var start_date = new Date(2018, 3, 16);
var menu = [];

function handle_accordion() {
	let acc = document.getElementsByClassName('accordion');


	for (var i = 0; i < acc.length; i++) {
		acc[i].onclick = function() {
			this.classList.toggle('active');
			let panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			}else{
				panel.style.maxHeight = panel.scrollHeight + 'px';
			}
		}
	}
}

function addZ(n) {
    return n < 10 ? '0' + n : n;
}

function getDate(dateTime) {
    if(dateTime !== null){
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date_and_time_created = new Date(Date.parse(dateTime));
        const getDay = days[date_and_time_created.getDay()];
        const getDate = addZ(date_and_time_created.getDate());
        const getMonth = months[date_and_time_created.getMonth()];
        const getYear = date_and_time_created.getFullYear();
        return (getDay + ', ' + getMonth + ' ' + getDate + ', ' + getYear);
    }
    return '----';
}

function prepare_menu_from_meals(){
	for (var i = 0; i < 8; i++) {
		let data = {
			date: getDate(start_date.addDays(i)),
			meals: shuffleArray(meals).slice(0, 3)
		}
		menu.push(data);
	}
	menu.reverse();
}

function set_accordion_html(){
	prepare_menu_from_meals();
	let innerHTML = '';
	menu.forEach((element, i) => {
		innerHTML += '<button class="accordion">'+ element.date +'</button>';
		innerHTML += '<div class="panel"><div class="panel-body">'+ set_meals(element.meals) +'</div></div>';
	});
	return innerHTML;
}

function set_meal_options(){
	let innerHTML = '';
	meals.forEach((element, i) => {
		innerHTML += '<label class="checkbox"> '+ element.name +'<input type="checkbox"><span class="check"></span></label>';
	});
	return innerHTML;
}


function set_meals(meal_items){
	let innerHTML = '';
	innerHTML += '<a title="edit"><i class="material-icons">mode_edit</i> edit menu</a>';
	meal_items.forEach((element, i) => {
		innerHTML += '<h3>'+element.name+'</h3>';
		innerHTML += '<div><p><b>Description: </b>'+element.description+'</p><p><b>Category: </b>'+ element.category +'</p><p><b>Price: </b>#'+element.price+'</p></div>';
	});

	return innerHTML;
}

menu_options.innerHTML = set_meal_options();
menu_tag.innerHTML = set_accordion_html();

handle_accordion();

