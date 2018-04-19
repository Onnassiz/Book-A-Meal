//Elements
var meal_form_div = document.getElementById('meal_form_div');
var tbody = document.getElementById('tbody');
var meal_form = document.getElementById('meal_form');

//Default states
var show_form = true;
var meals = meals;

function toggle_form() {
	show_form = !show_form;
	meal_form_div.hidden = show_form;
}

function prepare_table_rows(){
	let rows = '';
	meals.forEach((element, i) => {
		rows += '<tr><td>' + (i + 1) + '</td><td>'+ element.name +'</td><td>'+ element.category +'</td><td>#'+ element.price +'</td><td><span><a title="edit"><i class="material-icons">mode_edit</i></a></span><span><a title="add photo"><i class="material-icons">add_a_photo</i></a></span><span><a title="delete"><i class="material-icons">delete_sweep</i></a></span><span><a class="tooltips"><i class="material-icons">info_outline</i><div class="arrowBox">' + element.description + '</div></a></span><span></td></tr>';
	});
	return rows;
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    let name = document.getElementById('meal_name').value;
    let category = document.getElementById('category').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
	
	let new_meal = [
		{
			name,
			category,
			price,
			description
		}
	];
	
	meals = new_meal.concat(meals);

	document.getElementById('meal_name').value = '';
	document.getElementById('category').value = '';
	document.getElementById('price').value = '';
	document.getElementById('description').value = '';

	tbody.innerHTML = prepare_table_rows();
	
    return false;
}

if (meal_form.attachEvent) {
    meal_form.attachEvent("submit", processForm);
} else {
    meal_form.addEventListener("submit", processForm);
}

tbody.innerHTML = prepare_table_rows();
