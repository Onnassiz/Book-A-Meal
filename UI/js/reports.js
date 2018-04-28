//Elements
var report_tag = document.getElementById('menus');


Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}



//Default values
var start_date = new Date(2018, 3, 16);
var reports = [];

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

function prepare_reports(){
	for (var i = 0; i < 8; i++) {
		let data = {
			date: getDate(start_date.addDays(i)),
			report: {
				order: {
					total: 1023,
					delivered: 923,
					pending: 100
				},
				money: {
					total: 300000,
					delivery_cost: 20000,
					balance: 280000
				}
			}
		}
		reports.push(data);
	}
	reports.reverse();
}

function set_accordion_html(){
	prepare_reports();
	let innerHTML = '';
	reports.forEach((element, i) => {
		innerHTML += '<button class="accordion">'+ element.date +'</button>';
		innerHTML += '<div class="panel"><div class="panel-body">'+ set_report(element.report) +'</div></div>';
	});
	return innerHTML;
}


function set_report(report){
	let innerHTML = '';
	innerHTML += '<h3>Orders</h3>';
	innerHTML += '<div><p><b>Total Orders: </b>'+report.order.total+'</p><p><b>Total Delivered: </b>'+ report.order.delivered +'</p><p><b>Pending: </b>'+report.order.pending+'</p></div>';
	innerHTML += '<h3>Money</h3>';
	innerHTML += '<div><p><b>Total Recieved: </b>'+report.money.total+'</p><p><b>Delivery Cost: </b>'+ report.money.delivery_cost +'</p><p><b>Balance: </b>'+report.money.balance+'</p></div>';
	return innerHTML;
}

report_tag.innerHTML = set_accordion_html();

handle_accordion();

