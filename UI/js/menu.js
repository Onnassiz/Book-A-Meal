
var card_container = document.getElementById('card_container');

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

meals = shuffleArray(meals).splice(0,7);



function prepare_cards_tags(){
	let innerHTML = '';
	meals.forEach((element, i) => {
		innerHTML += '<div class="card"><div class="card-header"><img src="../images/food/'+element.image+'" alt="food"><div class="cover"></div><div class="menu"><ul><li class="ion-social-twitter"></li><li class="ion-social-facebook"></li></ul><span class="ion-android-more-vertical" style="font-size: 28px"></span></div><div class="name"><span class="last">'+element.name+'</span></div></div><div class="card_container"><div class="left"><h3>Description</h3><p>'+element.description+'</p><a class="add_button" href="#">Add to cart</a></div><div class="right"><div class="item"><span class="num">#'+element.price+'</span><span class="word">'+element.category+'</span></div></div></div></div>';
	})
	return innerHTML;
}


card_container.innerHTML = prepare_cards_tags();