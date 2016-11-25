// get id
var id = parseInt($.url().param('id'));
$("input[name=id]").val(id);

// read item data
var sql = 'SELECT item.*, kind.name as kind, size.* \
	FROM item\
	JOIN kind ON kind.id = item.kind \
	JOIN size ON item.id = size.item\
	WHERE item.id = ?';

var info = alasql(sql, [ id ])[0];
// $('#image').attr('src', 'img/' + info.id + '.jpg');
$('#name').text(info.name);
$('#code').text(info.code);
$('#detail').text(info.detail);
// $('#price').text(numberWithCommas(info.price));
// var balance = info.balance;
// $('#balance').text(balance);


//read stock data
var stockRecords = alasql('SELECT stock.balance, retail.name FROM stock JOIN retail ON stock.retail = retail.id WHERE item = ?',[id]);
$('#central-stock').text(stockRecords[0].balance);
for(var i = 1; i< stockRecords.length; i++){
	var record = stockRecords[i];
	var row = $('<tr><td>'+record.name+'</td><td>'+record.balance+'</td></tr>');
	$('#stock-records').append(row);
}

var sizeRecords = alasql('SELECT size.* FROM size JOIN item ON size.item = item.id WHERE item = ?',[id]);
for(var i = 0; i<sizeRecords.length; i++){
	var record = sizeRecords[i];
	var row = $('<tr><td>'+record.size+' ('+record.unit+')</td><td>'+record.price+'</td></tr>');
	$('#size-records').append(row);
}

// read transaction
// var rows = alasql('SELECT * FROM trans WHERE stock = ?', [ id ]);
// var tbody = $('#tbody-transs');
// var bals = [];
// var sold = [];
// var date = [];
// var qty = 0;
// for (var i = 0; i < rows.length; i++) {
// 	var row = rows[i];
// 	var tr = $('<tr>').appendTo(tbody);
// 	tr.append('<td>' + row.date + '</td>');
// 	tr.append('<td>' + row.qty + '</td>');
// 	tr.append('<td>' + row.balance + '</td>');
// 	tr.append('<td>' + row.memo + '</td>');
// 	date = row.date.split('-');
// 	bals.push([Date.UTC(date[0],date[1]-1,date[2]),row.balance]);
// 	if(row.qty<0){
// 		qty = qty-row.qty;
// 		sold.push([Date.UTC(date[0],date[1]-1,date[2]),qty]);
// 	}
//
// }
// initChart(sold,bals,info.code,info.name);
// storage/retrieval
// $('#update').on('click', function() {
// 	var date = $('input[name="date"]').val();
// 	var qty = parseInt($('input[name="qty"]').val());
// 	var memo = $('textarea[name="memo"]').val();
// 	alasql('UPDATE stock SET balance = ? WHERE id = ?', [ balance + qty, id ]);
// 	var trans_id = alasql('SELECT MAX(id) + 1 as id FROM trans')[0].id;
// 	alasql('INSERT INTO trans VALUES(?,?,?,?,?,?)', [ trans_id, id, date, qty, balance + qty, memo ]);
// 	window.location.assign('stock.html?id=' + id);
// });



// function initChart(sold,balance,model,whouse){
// 	Highcharts.setOptions({
// 		colors:['#f39c12','#18bc9c','#3498db','#e74c3c','#0d1318']
// 	});
// 	$('#chart-container').highcharts({
// 		chart:{
// 			width:848,
// 			height:400
// 		},
// 		title: {
// 			text: 'Stock summary',
// 			x: -20 //center
// 		},
// 		subtitle: {
// 			text: model+'@'+whouse,
// 			x: -20
// 		},
// 		xAxis: {
// 			type: 'datetime'
// 		},
// 		yAxis: {
// 			title: {
// 				text: 'Stock (Pcs)'
// 			},
// 			plotLines: [{
// 				value: 0,
// 				width: 1,
// 				color: '#808080'
// 			}]
// 		},
// 		tooltip: {
// 			valueSuffix: 'Pcs'
// 		},
// 		legend: {
// 			layout: 'vertical',
// 			align: 'right',
// 			verticalAlign: 'middle',
// 			borderWidth: 0
// 		},
// 		series: [{
// 			name: 'Sold',
// 			data: sold
// 		},{
// 			name:"Balance",
// 			data:balance
// 		}]
// 	});
// }