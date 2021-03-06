var DB = {};

DB.init = function() {
	if (window.confirm('are you sure to initialize database?')) {
		DB.load();
	}
};

DB.load = function() {
	alasql.options.joinstar = 'overwrite';
	//Users
	alasql('DROP TABLE IF EXISTS user;');
	alasql('CREATE TABLE user(id INT IDENTITY, name STRING, password STRING, type INT, login BOOL, retail INT);');
	var puser = alasql.promise('SELECT MATRIX * FROM CSV("data/USER-USER.csv", {headers: true})').then(function(users) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
            user[4]= false;
			alasql('INSERT INTO user VALUES(?,?,?,?,?,?);', user);
		}
	});


	// category
	alasql('DROP TABLE IF EXISTS kind;');
	alasql('CREATE TABLE kind(id INT IDENTITY, parent_id INT, name STRING);');
	var pkind = alasql.promise('SELECT MATRIX * FROM CSV("data/KIND-KIND.csv", {headers: true})').then(function(kinds) {
		for (var i = 0; i < kinds.length; i++) {
			var kind = kinds[i];
			alasql('INSERT INTO kind VALUES(?,?,?);', kind);
		}
	});

	//Parent Category
	alasql('DROP TABLE IF EXISTS pkind;');
	alasql('CREATE TABLE pkind(id INT IDENTITY, name STRING);');
	var ppkind = alasql.promise('SELECT MATRIX * FROM CSV("data/PKIND-PKIND.csv", {headers: true})').then(function(pkinds) {
		for (var i = 0; i < pkinds.length; i++) {
			var pkind = pkinds[i];
			alasql('INSERT INTO pkind VALUES(?,?);', pkind);
		}
	});


	// Items
	alasql('DROP TABLE IF EXISTS item;');
	alasql('CREATE TABLE item(id INT IDENTITY, code STRING, kind INT, name STRING, detail STRING, price FLOAT, size INT, unit STRING, returning INT, threshold INT);');
	var pitem = alasql.promise('SELECT MATRIX * FROM CSV("data/ITEM-ITEM.csv", {headers: true})').then(function(items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			alasql('INSERT INTO item VALUES(?,?,?,?,?,?,?,?,?,?);', item);
		}
	});

	// retails
	alasql('DROP TABLE IF EXISTS retail;');
	alasql('CREATE TABLE retail(id INT IDENTITY, name STRING, addr STRING, city STRING, tel STRING);');
	var pretail = alasql.promise('SELECT MATRIX * FROM CSV("data/RETAIL-RETAIL.csv", {headers: true})').then(
			function(retails) {
				for (var i = 0; i < retails.length; i++) {
					var retail = retails[i];
					alasql('INSERT INTO retail VALUES(?,?,?,?,?);', retail);
				}
			});

	// Stock
	alasql('DROP TABLE IF EXISTS stock;');
	alasql('CREATE TABLE stock(id INT IDENTITY, item INT, retail INT, balance INT, expire DATE, restock STRING);');
	var pstock = alasql.promise('SELECT MATRIX * FROM CSV("data/STOCK-STOCK.csv", {headers: true})').then(
			function(stocks) {
				for (var i = 0; i < stocks.length; i++) {
					var stock = stocks[i];
					alasql('INSERT INTO stock VALUES(?,?,?,?,?,?);', stock);
				}
			});

	// Transaction
	alasql('DROP TABLE IF EXISTS trans;');
	alasql('CREATE TABLE trans(id INT IDENTITY, stock INT, qty INT, receipt INT);');
	var ptrans = alasql.promise('SELECT MATRIX * FROM CSV("data/TRANS-TRANS.csv", {headers: true})').then(
			function(transs) {
				for (var i = 0; i < transs.length; i++) {
					var trans = transs[i];
					alasql('INSERT INTO trans VALUES(?,?,?,?);', trans);
				}
			});

	//Expire
	alasql('DROP TABLE IF EXISTS expire;');
	alasql('CREATE TABLE expire(id INT IDENTITY, stock INT, expiration DATE, qty INT, received BOOL, promotion FLOAT);');
	var pexpire = alasql.promise('SELECT MATRIX * FROM CSV("data/EXPIRE-EXPIRE.csv", {headers: true})').then(
		function(expires) {
			for (var i = 0; i < expires.length; i++) {
				var expire = expires[i];
                expire[4]= true;
				alasql('INSERT INTO expire VALUES(?,?,?,?,?,?);', expire);
			}
		});
    // Restock
	alasql('DROP TABLE IF EXISTS restock;');
	alasql('CREATE TABLE restock(id INT IDENTITY, ref STRING, date DATE, status INT, expect DATE);');
	var prestock = alasql.promise('SELECT MATRIX * FROM CSV("data/RESTOCK-RESTOCK.csv", {headers: true})').then(
		function(restocks) {
			for (var i = 0; i < restocks.length; i++) {
				var restock = restocks[i];
				alasql('INSERT INTO restock VALUES(?,?,?,?,?);', restock);
			}
		});
	//Receipt
	alasql('DROP TABLE IF EXISTS receipt;');
	alasql('CREATE TABLE receipt(id INT IDENTITY, type STRING, operator STRING, date DATE);');
	var preceipt = alasql.promise('SELECT MATRIX * FROM CSV("data/RECEIPT-RECEIPT.csv", {headers: true})').then(
		function(receipts) {
			for (var i = 0; i < receipts.length; i++) {
				var receipt = receipts[i];
				alasql('INSERT INTO receipt VALUES(?,?,?,?);', receipt);
			}
		});

	//Dead Stock
	alasql('DROP TABLE IF EXISTS dead;');
	alasql('CREATE TABLE dead(id INT IDENTITY, stock INT, qty INT, handled BOOLEAN);');
	var pdead = alasql.promise('SELECT MATRIX * FROM CSV("data/DEADSTOCK-DEADSTOCK.csv", {headers: true})').then(
		function(deads) {
			for (var i = 0; i < deads.length; i++) {
				var dead = deads[i];
				alasql('INSERT INTO dead VALUES(?,?,?,?);', dead);
			}
		});

    //request
    alasql('DROP TABLE IF EXISTS request;');
    alasql('CREATE TABLE request(id INT IDENTITY, stock STRING, item STRING, qty STRING, msg STRING, retail INT, status STRING);');
    var prequest = alasql.promise('SELECT MATRIX * FROM CSV("data/REQUEST-REQUEST.csv", {headers: true})').then(
        function(requests) {
            for (var i = 0; i < requests.length; i++) {
                var request = requests[i];
                alasql('INSERT INTO request VALUES(?,?,?,?,?,?,?);', request);
            }
        });

	//setting
	alasql('DROP TABLE IF EXISTS setting;');
	alasql('CREATE TABLE setting(id INT IDENTITY, factor FLOAT, duration INT, start DATE);');
	var psetting = alasql.promise('SELECT MATRIX * FROM CSV("data/SETTING-SETTING.csv", {headers: true})').then(
		function(settings) {
			for (var i = 0; i < settings.length; i++) {
				var setting = settings[i];
				alasql('INSERT INTO setting VALUES(?,?,?,?);', setting);
			}
		});

    //Delivery
    alasql('DROP TABLE IF EXISTS delivery;');
    alasql('CREATE TABLE delivery(id INT IDENTITY, restock INT, stock INT, qty INT);');
    var pdelivery = alasql.promise('SELECT MATRIX * FROM CSV("data/DELIVERY-DELIVERY.csv", {headers: true})').then(
        function(deliveries) {
            for (var i = 0; i < deliveries.length; i++) {
                var delivery = deliveries[i];
                alasql('INSERT INTO delivery VALUES(?,?,?,?);', delivery);
            }
        });

	// Reload page
	Promise.all([puser, pkind, ppkind, pitem, pretail, pstock, ptrans, pexpire, prestock, preceipt, pdead, prequest, psetting, pdelivery]).then(function() {
		window.location.reload(true);
	});
};

DB.remove = function() {
	if (window.confirm('are you sure to delete dababase?')) {
		alasql('DROP localStorage DATABASE STK')
	}
};

// add commas to number
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// DO NOT CHANGE!
alasql.promise = function(sql, params) {
	return new Promise(function(resolve, reject) {
		alasql(sql, params, function(data, err) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

// connect to database
try {
	alasql('ATTACH localStorage DATABASE STK;');
	alasql('USE STK;');
} catch (e) {
	alasql('CREATE localStorage DATABASE STK;');
	alasql('ATTACH localStorage DATABASE STK;');
	alasql('USE STK;');
	DB.load();
}

DB.newProduct = function(product){
	var date = new Date();
    var id =DB.getNextID('item');
	var code = date.getYear().toString() + date.getMonth().toString() + date.getDate().toString() + id;

	alasql('INSERT INTO item VALUES (?,?,?,?,?,?,?,?,?,?)',[id,code,product.cat,product.name,product.detail,product.price,product.size,product.unit,product.return,product.threshold]);
	var retails = alasql('column of select id from retail');
	var s_id = DB.getNextID('stock');
	var expire =(date.getFullYear()+1000) + '-' + (date.getMonth()+1) + '-' + date.getDate();
	for(var i = 0; i<retails.length; i++){
		alasql('INSERT INTO stock VALUES(?,?,?,?,?,?,?);',[s_id,id,retails[i],0,expire,0,0]);
		s_id ++;
	}
	return code;
};

DB.newStore = function(store){
	var id = DB.getNextID('retail');
	alasql('INSERT INTO retail VALUES (?,?,?,?,?)',[id,store.name,store.addr,store.city,store.tel]);

	var items = alasql('column of select id from item');
	var s_id = DB.getNextID('stock');
	var date = new Date();
	var expire =(date.getFullYear()+1000) + '-' + (date.getMonth()+1) + '-' + date.getDate();

	for(var i = 0; i<items.length; i++){
		alasql('INSERT INTO stock VALUES(?,?,?,?,?,?,?,?);',[s_id,items[i],id,0,0,expire,0,0]);
		s_id ++;
	}
};

DB.newTrans = function(trans,target,expire){

    var qty = trans.amount;
    if(qty<0){
		if(expire && parseInt(expire)!==0){
            console.log(trans,target,expire);
			var dQty = alasql('SELECT qty FROM expire WHERE id = ?',[parseInt(expire)])[0].qty;
			if(dQty==qty){
                console.log('delete');
				alasql('DELETE FROM expire WHERE id = ?',[parseInt(expire)]);
			}else{
				alasql('UPDATE expire SET qty = ? WHERE id = ?',[dQty+qty,parseInt(expire)]);
			}
		}else{
			var returning = alasql('SELECT returning FROM item JOIN stock ON stock.item = item.id WHERE stock.id = ?',[parseInt(trans.stock)])[0].returning;
			var returning_day = moment().add(returning,'d').format('YYYY-MM-DD');
			var records = alasql('SELECT * FROM expire WHERE stock = ? AND expiration > ? AND promotion = 0 ORDER BY expiration ASC',[parseInt(trans.stock),returning_day]);
			for(var i = 0; i<records.length; i++){
				var record = records[i];
				qty += record.qty;
				if(qty<0){
					alasql('DELETE FROM expire WHERE id = ?',[record.id]);
					alasql('INSERT INTO expire VALUES (?,?,?,?,?,?)',[DB.getNextID('expire'), target, record.expiration, record.qty, false, 0]);
				}else{
					alasql('UPDATE expire SET qty = ? WHERE id = ?',[qty,record.id]);
					alasql('INSERT INTO expire VALUES (?,?,?,?,?,?)',[DB.getNextID('expire'), target, record.expiration, (record.qty-qty), false, 0]);
					break;
				}

			}
			if(qty<0){
				alert('OUT-OF-STOCK!');
				return false;
			}
		}


    }
    var id = DB.getNextID('trans');

    //insert a new transaction record
    alasql('INSERT INTO trans VALUES (?,?,?,?)',[id,trans.stock,trans.amount,trans.receipt]);

    //update the balance in stock table
    var sql = 'UPDATE stock SET balance = balance +('+trans.amount+') WHERE id = '+trans.stock;
    alasql(sql);
    return true;
};

DB.newReceipt = function (type,operator,today){
	var id = DB.getNextID('receipt');
	alasql('INSERT INTO receipt VALUES (?,?,?,?)',[id,type,operator,today]);
	return id;
};

DB.newStockIn = function(record) {
	//insert the trans
    var date = moment().format('YYYY-MM-DD');
	var receipt = DB.newReceipt('StockIn','Alice',date);
	var trans = {
		stock: alasql('COLUMN OF SELECT id FROM stock WHERE retail = 1 AND item = '+[record.id])[0],
		date: date,
		amount : record.qty,
		receipt: receipt
	};
	DB.newTrans(trans);

    //update expire
	var id = DB.getNextID('expire');

	alasql('INSERT INTO expire VALUES (?,?,?,?,?,?)',[id,trans.stock,record.expire,record.qty,true,0]);
};

DB.newRestock = function (restocks) {

    var d = moment().format('YYYYMMDD');
	var today = moment().format('YYYY-MM-DD');
    var refs = alasql('COLUMN OF SELECT ref FROM restock');
	var receipt = DB.newReceipt('Restock','Alice',today);
    var res;
    for(var i = 0; i<restocks.length; i++){
        var record = restocks[i];
        var r = alasql('COLUMN OF SELECT id FROM retail WHERE name =?',[record.retail])[0];
        var ref = d + r + '0';
        if(refs.indexOf(ref)===-1){
            var restock_id = DB.getNextID('restock');
            res = alasql('INSERT INTO restock VALUES (?,?,?,?,?)',[restock_id,ref,today,0,null]);
            refs.push(ref);
            var delivery_id = DB.getNextID('delivery');
            res = alasql('INSERT INTO delivery VALUES (?,?,?,?)',[delivery_id,restock_id,record.id,record.amount]);
        }else{
            var temp = alasql('SELECT id, qty FROM delivery WHERE stock = ?',[parseInt(record.id)]);
            if(temp.length===0){
                var delivery_id = DB.getNextID('delivery');
                var restock_id = alasql('SELECT id FROM restock WHERE ref = ?',[ref])[0].id;
                alasql('INSERT INTO delivery VALUES (?,?,?,?)',[delivery_id,restock_id,record.id,record.amount]);
            }else{
				console.log(temp);
                var q = parseInt(temp[0].qty)+parseInt(record.amount);
				console.log();
                alasql('UPDATE delivery SET qty = ? WHERE id = ?',[q,temp[0].id]);
            }
        }


        //update the stock of the central warehouse
        //add a new trans --> update the balance of central warehouse
        var central = alasql('SELECT stock.id FROM stock JOIN item ON item.id = stock.item WHERE item.name = ? AND stock.retail = 1',[record.item])[0].id;
        var record_c = {
            amount : (0-record.amount),
            stock : central,
			receipt : receipt
        };
        DB.newTrans(record_c,record.id);
    }

};

DB.newSold = function (soldProducts) {
	var today = moment().format('YYYY-MM-DD');
	var receipt = DB.newReceipt('Sold','Bob',today);
	//update trans
	for(var i =0 ;i <soldProducts.length; i++){
		var product = soldProducts[i];
		product['receipt'] = receipt;
		DB.newTrans(product,null,product.expire);
	}
	return {receipt: receipt, date: today};
};

DB.newRequest = function (requests,msg,retail){
    var stock = requests[0].stock;
    var qty = requests[0].qty;
    var item = requests[0].item;
    for(var i = 1; i<requests.length; i++){
        var request = requests[i];
        stock += "|"+request.stock;
        item += "|"+request.item;
        qty += "|"+request.qty;
    }
    var id = DB.getNextID('request');
    alasql("INSERT INTO request VALUES (?,?,?,?,?,?,?)",[id, stock, item, qty, msg, retail, 'Pending']);
};

DB.newRetailUser = function(){
	var id = DB.getNextID('user');
	var r_id = DB.getNextID('retail');
	var temp = "retailer"+r_id;
	alasql('INSERT INTO user VALUES (?,?,?,?,?,?)',[id,temp,temp+temp,3,false,r_id]);
	return({username:temp,password:(temp+temp)});
};


//used by calendars in retailer page
DB.getRestockDates = function(n){
	var setting = alasql('SELECT start, duration FROM setting')[0];

	var start = moment(setting.start,'YYYY-MM-DD').format('D/M/YYYY');
	var result = [[start,"Start Date","#","#5da5e8",""]];
	for(var i = 0; i<n; i++){
		var date = moment(start,'D/M/YYYY').add(parseInt(setting.duration),'days').format('D/M/YYYY');
		result.push([date,"Restocking day","#","#00acac",""]);
		start = date;
	}
	return(result);
};

DB.getNextID = function(table){
    return alasql('COLUMN OF SELECT MAX(id)+1 AS id FROM '+table)[0];
};

DB.getProductHistory = function(id){
	var sql = 'SELECT trans.qty, receipt.date ' +
        'FROM trans ' +
        'JOIN stock on trans.stock = stock.id ' +
        'JOIN receipt ON trans.receipt = receipt.id ' +
        'WHERE stock.id = '+id + ' ORDER BY receipt.date ASC';
    var trans = alasql(sql);
    var history = [];
    var balance = 0;
	var dates = [];
    for(var i = 0; i<trans.length; i++){
        var r = trans[i];
        balance += parseInt(r.qty);
		var test = dates.indexOf(r.date);
		if(test==-1){

			dates.push(r.date);
			var record = {
				date : r.date,
				stock : balance
			};
			history.push(record);
		}

    }
    return history;
};

DB.getThreshold = function(){
	var thresholds = [];
	var sql = 'SELECT stock.*, SUM(trans.qty) AS total ' +
		'FROM stock ' +
		'JOIN trans ON trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'WHERE receipt.type = "Sold" ' +
		'GROUP BY stock.id';
	var stocks = alasql(sql);
	var today = new Date();
	var duration;
	var setting = alasql('SELECT start, duration FROM setting')[0];
	var date = setting.start;
	for(var i = 0; i<100; i++){
		if(moment(date).isAfter(today)){
			duration = moment(date).diff(today,'days');
			break;
		}
		date = moment(date,'YYYY-MM-DD').add(parseInt(setting.duration),'days').format('YYYY-MM-DD');
	}

	for(var i = 0; i<stocks.length; i++){
		var stock = stocks[i];
		var first_day = alasql('COLUMN OF SELECT TOP 1 date FROM receipt ORDER BY date ASC')[0];
		var diff = moment(first_day,'YYYY-MM-DD').diff(today,'days');
		var threshold = Math.ceil((stock.total/diff)*duration);
		thresholds[stock.id] = threshold;
	}
	return thresholds;
};

DB.getSafeStock = function(retail){
	var setting = alasql('SELECT factor, duration FROM setting')[0];
	var safeStocks = [];
	var sql = 'SELECT stock.*, SUM(trans.qty) AS total ' +
		'FROM stock ' +
		'JOIN trans ON trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'WHERE receipt.type = "Sold" ';
	if(retail){
		sql += 'AND stock.retail = ? ';
	}
	sql += 'GROUP BY stock.item';
	var stocks = alasql(sql,[retail]);
	var today = new Date();
	for(var i = 0; i<stocks.length; i++){
		var stock = stocks[i];
		var first_day = alasql('COLUMN OF SELECT TOP 1 date FROM receipt ORDER BY date ASC')[0];
		var diff = moment(first_day,'YYYY-MM-DD').diff(today,'days');
		var safe_stock = Math.ceil((stock.total/diff)*setting.duration* setting.factor);
		safeStocks[stock.id] = safe_stock;
	}
	return safeStocks;
};

DB.getRestockInfo = function(retail){
	var safeStocks = DB.getSafeStock(retail);
    var sql = 'SELECT stock.id, item.code, item.name AS item, retail.name AS retail, stock.balance, delivery.qty as delivering ' +
        'FROM stock ' +
		'JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'LEFT JOIN delivery ON stock.id = delivery.stock ' +
        'WHERE stock.retail <> 1';
    if(retail){
		sql += ' AND stock.retail = '+retail;
    }
    var stocks = alasql(sql);
	for(var i = 0; i<stocks.length; i ++){
		var stock = stocks[i];
        if(!stock.delivering){
            stock.delivering = 0;
        }
		if(safeStocks[stock.id]){
			stock.safe = safeStocks[stock.id];
		}else{
			stock.safe = 0;
		}
	}
	return stocks;
};

DB.getProductInfo = function(id){
	var sql = 'SELECT item.*, stock.balance, kind.name AS cat ' +
		'FROM item ' +
		'JOIN stock ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
		'WHERE stock.id = '+id;
	return alasql(sql)[0];
};

DB.getStocksOfProduct = function (id) {
	var sql = 'SELECT retail.name as retail, stock.balance ' +
		'FROM stock ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE stock.item = '+id;
	return alasql(sql);
};

DB.getStocksOfRetail = function(retail){
	var sql = 'SELECT item.name, item.code, item.detail, item.size, item.unit, item.price, item.threshold, stock.id, kind.name as kind, stock.balance ' +
        'FROM stock ' +
        'JOIN item ON stock.item = item.id ' +
        'JOIN kind ON item.kind = kind.id';
	if(retail){
		sql += ' WHERE retail = '+retail;
	}
	return alasql(sql);
};

DB.getAllProduct = function(cols){
	if(!cols){
		return alasql('SELECT * FROM item');
	}
	var c = cols[0];
	for(var i = 0; i<cols.length;i++){
		c = c + ', ' + cols[i];
	}
	var sql = 'SELECT '+c+' FROM item';

	return alasql(sql);
};

DB.getAllKinds = function () {

	return alasql('SELECT name, id FROM kind');
};


//used to track restocking info
DB.getAllRestock = function(retail){
    var sql = 'SELECT restock.*, item.name as item, item.code as code, retail.name as retail, delivery.qty as qty ' +
        'FROM restock ' +
        'JOIN delivery ON delivery.restock = restock.id ' +
        'JOIN stock ON delivery.stock = stock.id ' +
        'JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id';
    var condition = '';
    if(retail){
        condition = ' WHERE stock.retail = '+retail;

    }else if(retail === 0){
        condition = ' WHERE restock.status = 0 ';
    }
    sql += condition;
    return alasql(sql);
};

DB.getAllPending = function(){
    var requests = alasql('SELECT * FROM request WHERE status = "Pending"');
    for(var i = 0; i<requests.length; i++){
        var retail = requests[i].retail;
        var name = alasql('SELECT name FROM retail WHERE id = ?',[retail])[0].name;
        requests[i].retail = name;
    }
    return requests;
};

DB.getReceiptList = function(retail){
	//this function will only return the receipt for selling
    var sql = 'SELECT receipt.id FROM receipt ' +
        'JOIN trans ON trans.receipt = receipt.id ' +
        'JOIN stock ON trans.stock = stock.id ' +
        'WHERE stock.retail = ? ' +
        'AND receipt.type = "Sold"';

    return alasql(sql,[retail]);
};

DB.getSellingProduct = function(retail){
	var sql = 'SELECT stock.id, expire.id as expire, expire.expiration, expire.qty, expire.promotion, item.returning, item.name, item.size, item.unit, item.price '+
		'FROM stock ' +
		'JOIN expire ON stock.id = expire.stock ' +
		'JOIN item ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
		'WHERE expire.received = true ' +
		'AND retail = ?';
	var products = alasql(sql,[retail]);
	var today = new Date();
	var result = [];
	var memo = [];
	for(var i = 0; i<products.length; i++){
		var product = products[i];
		var diff = moment(product.expiration,'YYYY-MM-DD').diff(today,'days');
		if(diff>product.returning){
			if(product.promotion>0){
				result.push(product);
				memo.push(0);
			}else{
				var index = memo.indexOf(product.id);
				if(index!==-1){
					result[index].qty +=product.qty;
				}else{
					result.push(product);
					memo.push(product.id);
				}
			}
		}
	}
	return result;
};

DB.getReturnProducts = function(retail){
    var sql = 'SELECT stock.id, stock.balance, expire.expiration, expire.qty, item.returning, item.name, item.code, item.detail, item.size, item.unit, item.price, kind.name AS kind ' +
        'FROM stock ' +
        'JOIN expire ON stock.id = expire.stock ' +
        'JOIN item ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
        'WHERE expire.received = true ' +
        'AND retail = ?';
    var products = alasql(sql,[retail]);
    var today = new Date();
	var result = [];
	var item = [];
    for(var i = 0; i<products.length; i++){
        var product = products[i];
        var diff = moment(product.expiration,'YYYY-MM-DD').diff(today,'days');
		product.returnable = 0;
		if(diff<product.returning){
			product.returnable = product.qty;
			product.expire = product.expiration;
        }

		var index = item.indexOf(product.id);
		if(index===-1){
			result.push(product);
			item.push(product.id);
		}else{
			result[index].returnable += product.returnable;
            if(result[index].expire < product.expire){
                result[index].expire = product.expire;
            }
		}
    }
    return result;
};

DB.getExpiringProducts = function(days,retail){
	var sql = 'SELECT expire.id, expire.expiration, expire.qty, expire.promotion, item.name AS item, item.returning ' +
		'FROM stock ' +
		'JOIN expire ON stock.id = expire.stock ' +
        'JOIN item ON stock.item = item.id ' +
		'WHERE expire.received = true ' +
        'AND retail = ?';
	var products = alasql(sql,[retail]);
	var today = new Date();
	var expiring =[];
	for(var i = 0; i<products.length; i++){
		var product = products[i];
		var diff = moment(product.expiration,'YYYY-MM-DD').diff(today,'days');
		if(diff<days && diff>product.returning){
			expiring.push(product);
		}
	}
	return expiring;
};

DB.getProductExpiration = function(stock){
    var sql = 'SELECT expire.*, item.returning FROM expire JOIN stock ON stock.id = expire.stock JOIN item ON stock.item = item.id WHERE expire.received = true AND stock.id = '+stock;
    var products = alasql(sql);
    var today = new Date();
    for(var i = 0; i<products.length; i++){
        var product = products[i];
        var diff = moment(product.expiration,'YYYY-MM-DD').diff(today,'days');
        if(diff<product.returning){
            product.returnable = true;
        }else{
            product.returnable = false;
        }
    }
    return products;
};

DB.getDeadProduct = function(){
    var sql = 'SELECT item.name AS item, retail.name AS retail, dead.qty ' +
        'FROM dead ' +
        'JOIN stock ON dead.stock = stock.id ' +
        'JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'WHERE dead.handled = false';
    return alasql(sql);
};




DB.updateSetting = function(setting){
	alasql('UPDATE setting SET factor =?, duration =?, start = ?',[setting.factor, setting.dur, setting.start]);
};

DB.updateStock = function(record,stock){
    var keys = Object.keys(record);
    var sql = 'UPDATE stock SET ' + keys[0]+ '= '+record[keys[0]];
    for(var i = 1; i<keys.length; i++){
        var key = keys[i];
        var value = record[key];
        sql += ', '+ key+'= '+ value;
    }

    sql += ' WHERE id = '+stock;
    alasql(sql);

};

DB.dispatchRestock = function(ref,days){
    var today = alasql('SELECT date FROM restock WHERE ref = ?',[ref])[0].date;
    var expect = moment(today,'YYYY-MM-DD').add(parseInt(days),'day').format('YYYY-MM-DD');
    alasql('UPDATE restock SET status = 1, expect = ?, ref = ? WHERE ref = ?',[expect,ref.replace(/\w$/,'1'),ref]);
};

DB.receiveRestock = function(restock){
	var sql ='SELECT stock.id as stock, stock.balance, delivery.qty, delivery.restock as restock, delivery.id as delivery ' +
		'FROM delivery ' +
		'JOIN stock ON delivery.stock = stock.id ' +
		'JOIN restock ON delivery.restock = restock.id ' +
		'WHERE delivery.restock = ?';
	var stocks = alasql(sql,[restock]);
	var today = moment().format('YYYY-MM-DD');


	for(var i = 0 ; i< stocks.length; i++){
		var record = stocks[i];

		alasql('DELETE FROM delivery WHERE id = ?',[record.delivery]);
		alasql('DELETE FROM restock WHERE id = ?',[record.restock]);
		alasql('UPDATE expire SET received = true WHERE stock = ?',[record.stock]);

		var receipt = DB.newReceipt('Received','Bob',today);
		var trans = {
			amount : record.qty,
			stock : record.stock,
			receipt : receipt
		};
		DB.newTrans(trans);
	}
};

DB.returnProduct = function(retail){
    var items = DB.getReturnProducts(retail);
    var today = moment().format('YYYY-MM-DD');
    var receipt = DB.newReceipt('Return expiring products','Bob',today);
    for(var i = 0; i<items.length; i++){
        var item = items[i];
        if(item.returnable>0){
            var id = DB.getNextID('trans');
            alasql('INSERT INTO trans VALUES (?,?,?,?)',[id,item.id,(-item.returnable),receipt]);

            var sql = 'UPDATE stock SET balance = balance - '+item.returnable+' WHERE id = '+item.id;
            alasql(sql);

            sql = 'DELETE FROM expire WHERE stock =' + item.id + ' AND expiration <= "' + item.expire + '"';
            alasql(sql);

            id = DB.getNextID('dead');
            alasql('INSERT INTO dead VALUES (?,?,?,?)',[id,item.id,item.returnable,false]);
        }

    }
};

DB.handleDeadProduct = function(){
    alasql('UPDATE dead SET handled = true WHERE handled = false');
};
//User
DB.loginUser = function(user,password){
	var rs = alasql('SELECT * FROM user WHERE name = ?',[user])[0];
	password = password.toString();
	var info = {
		type:0
	};
	if(rs && password === rs.password){
		alasql('UPDATE user SET login = "true" WHERE name = ?',[user]);
		info.name = rs.name;
		info.type = rs.type;
		info.retail = rs.retail;
	}
	return info;
};

DB.logoutUser = function(){
	var user = JSON.parse(localStorage.getItem('loginUser'));
	alasql('UPDATE user SET login = false WHERE name = ?',[user]);
	localStorage.removeItem('loginUser');
};

DB.PromoteProduct = function(id,discount){
	alasql('UPDATE expire SET promotion = ? WHERE id = ?',[discount/100,parseInt(id)]);
};

//report

DB.getDateRange = function(){
	var first = alasql('COLUMN OF SELECT TOP 1 date FROM receipt ORDER BY date ASC')[0];
	return {first: moment(first,'YYYY-MM-DD').format('MM/DD/YYYY'),today: moment().format('MM/DD/YYYY')};
};

DB.getCatReport = function (){
	var sql = 'SELECT SUM(trans.qty) AS total, pkind.* ' +
	'FROM trans ' +
	'JOIN receipt ON trans.receipt = receipt.id ' +
	'JOIN stock ON trans.stock = stock.id ' +
	'JOIN item ON item.id = stock.item ' +
	'JOIN kind ON item.kind = kind.id ' +
	'JOIN pkind ON kind.parent_id = pkind.id ' +
	'WHERE receipt.type = "Sold" ' +
	'GROUP BY kind.parent_id';

	return alasql(sql);
};

DB.getTotalReport = function () {
	var sql = 'SELECT SUM(trans.qty) AS total, receipt.date ' +
		'FROM trans ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'WHERE receipt.type = "Sold" ' +
		'GROUP BY receipt.date';
	var temp = alasql(sql);
	var result = {};
	for(var i = 0; i<temp.length; i++){
		var data = temp[i];
		data.date = moment(data.date,'YYYY-MM-DD').format('YYYY-MM');
		if(result.hasOwnProperty(data.date)){
			result[data.date] += data.total;
		}else{
			result[data.date] = data.total;
		}
	}
	return  result;
};

DB.getProductReport = function(kinds,retails,first,last){
	var i;
	var q1 = '"'+kinds[0]+'"';
	for(i = 1; i<kinds.length; i++){
		q1 += ',"'+kinds[i]+'"';
	}

	var q2 = '"'+retails[0]+'"';
	for(i = 1; i<retails.length; i++){
		q2 += ',"'+retails[i]+'"';
	}

	var sql = 'COLUMN OF SELECT stock.id ' +
		'FROM stock ' +
		'JOIN item on stock.item = item. id ' +
		'JOIN kind ON item.kind = kind.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE kind.name IN ('+q1+') ' +
		'AND retail.name IN ('+q2+') ' +
		'AND stock.retail <> 1';
	var stocks = alasql(sql);

	sql = 'SELECT item.*, SUM(trans.qty) AS total ' +
		'FROM trans ' +
		'JOIN stock ON trans.stock = stock.id JOIN item ON stock.item = item.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'WHERE trans.stock IN ('+stocks.toString()+') ' +
		'AND receipt.date >=? ' +
		'AND receipt.date <=? ' +
		'AND receipt.type = "Sold" GROUP BY stock.item';


	return alasql(sql,[first,last]);
};

DB.getProductChartData = function(item,retails,first,last){
	var i;
	var q1 = '"'+retails[0]+'"';
	for(i = 1; i<retails.length; i++){
		q1 += ',"'+retails[i]+'"';
	}

	var sql = 'SELECT trans.qty, receipt.date, retail.name as retail ' +
		'FROM trans ' +
		'JOIN stock on trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'JOIN item ON stock.item = item.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE receipt.type = "Sold" ' +
		'AND retail.name IN ('+q1+') ' +
		'AND receipt.date >= ? ' +
		'AND receipt.date <= ? ' +
		'AND item.name = ?';
	var trans = alasql(sql,[first,last,item]);
	var byRetailer = [];
	var byPeriod = [];
	var rMemo = [];
	var pMemo = [];
	for(i = 0; i < trans.length; i++){
		var record = trans[i];
		record.qty = Math.abs(record.qty);
		var iR = rMemo.indexOf(record.retail);
		var iP = pMemo.indexOf(record.date);
		if(iR == -1){
			rMemo.push(record.retail);
			byRetailer.push({label:record.retail,value:record.qty});
		}else{
			byRetailer[iR].value += record.qty;
		}

		if(iP == -1){
			pMemo.push(record.date);
			byPeriod.push({date:record.date, qty:record.qty});
		}else{
			byPeriod[iP].qty += record.qty;
		}
	}
	return {byRetail: byRetailer, byDate: byPeriod};
};

DB.getRetailReport = function(items,cities,first,last){
	var i;
	var q1 = '"'+items[0]+'"';
	for(i = 1; i<items.length; i++){
		q1 += ',"'+items[i]+'"';
	}

	var q2 = '"'+cities[0]+'"';
	for(i = 1; i<cities.length; i++){
		q2 += ',"'+cities[i]+'"';
	}

	var sql = 'COLUMN OF SELECT stock.id ' +
		'FROM stock ' +
		'JOIN item on stock.item = item. id ' +
		'JOIN kind ON item.kind = kind.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE item.name IN ('+q1+') ' +
		'AND retail.city IN ('+q2+') ' +
		'AND stock.retail <> 1';
	var stocks = alasql(sql);
	sql = 'SELECT retail.*, SUM(trans.qty*item.price) AS revenue, SUM(trans.qty) AS total ' +
		'FROM trans ' +
		'JOIN stock ON trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'JOIN item ON stock.item = item.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE trans.stock IN ('+stocks.toString()+') ' +
		'AND receipt.date >= ? ' +
		'AND receipt.date <= ? ' +
		'AND receipt.type = "Sold" GROUP BY stock.retail';

	return alasql(sql,[first,last]);
};

DB.getRetailChartData = function(retail,items,first,last){
	var q1 = '"'+items[0]+'"';
	var i;
	for(i = 1; i<items.length; i++){
		q1 += ',"'+items[i]+'"';
	}

	var sql = 'SELECT trans.qty, receipt.date, item.name AS item ' +
		'FROM trans ' +
		'JOIN stock on trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'JOIN item ON stock.item = item.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE receipt.type = "Sold" ' +
		'AND item.name IN ('+q1+') ' +
		'AND receipt.date >= ? ' +
		'AND receipt.date <= ? ' +
		'AND retail.name = ?';

	var trans = alasql(sql,[first,last,retail]);
	var byItem = [];
	var byPeriod = [];
	var iMemo = [];
	var pMemo = [];
	for(i = 0 ; i<trans.length; i++){
		var record = trans[i];
		record.qty = Math.abs(record.qty);
		var iI = iMemo.indexOf(record.item);
		var iP = pMemo.indexOf(record.date);
		if(iI == -1 ){
			byItem.push({label:record.item, value:record.qty});
			iMemo.push(record.item);
		}else{
			byItem[iI].value += record.qty;
		}

		if(iP == -1){
			pMemo.push(record.date);
			byPeriod.push({date:record.date, qty:record.qty});
		}else{
			byPeriod[iP].qty += record.qty;
		}
	}
	return {byItem:byItem, byDate:byPeriod};
};