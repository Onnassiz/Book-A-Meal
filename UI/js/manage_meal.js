//Elements
var meal_form = document.getElementById('meal_form');

//Default states
var show_form = true;

function toggle_form() {
	show_form = !show_form;
	meal_form.hidden = show_form;
}