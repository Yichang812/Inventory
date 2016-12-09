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
	alasql('CREATE TABLE user(id INT IDENTITY, name STRING, password STRING, type INT, login BOOLEAN, retail INT);');
	var puser = alasql.promise('SELECT MATRIX * FROM CSV("../data/USER-USER.csv", {headers: true})').then(function(users) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			alasql('INSERT INTO user VALUES(?,?,?,?,?,?);', user);
		}
	});


	// category
	alasql('DROP TABLE IF EXISTS kind;');
	alasql('CREATE TABLE kind(id INT IDENTITY, parent_id INT, name STRING);');
	var pkind = alasql.promise('SELECT MATRIX * FROM CSV("../data/KIND-KIND.csv", {headers: true})').then(function(kinds) {
		for (var i = 0; i < kinds.length; i++) {
			var kind = kinds[i];
			alasql('INSERT INTO kind VALUES(?,?,?);', kind);
		}
	});

	//Parent Category
	alasql('DROP TABLE IF EXISTS pkind;');
	alasql('CREATE TABLE pkind(id INT IDENTITY, name STRING);');
	var ppkind = alasql.promise('SELECT MATRIX * FROM CSV("../data/PKIND-PKIND.csv", {headers: true})').then(function(pkinds) {
		for (var i = 0; i < pkinds.length; i++) {
			var pkind = pkinds[i];
			alasql('INSERT INTO pkind VALUES(?,?);', pkind);
		}
	});


	// Items
	alasql('DROP TABLE IF EXISTS item;');
	alasql('CREATE TABLE item(id INT IDENTITY, code STRING, kind INT, name STRING, detail STRING, price FLOAT, size INT, unit STRING, returning INT);');
	var pitem = alasql.promise('SELECT MATRIX * FROM CSV("../data/ITEM-ITEM.csv", {headers: true})').then(function(items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			alasql('INSERT INTO item VALUES(?,?,?,?,?,?,?,?,?);', item);
		}
	});

	// retails
	alasql('DROP TABLE IF EXISTS retail;');
	alasql('CREATE TABLE retail(id INT IDENTITY, name STRING, addr STRING, city STRING, tel STRING);');
	var pretail = alasql.promise('SELECT MATRIX * FROM CSV("../data/RETAIL-RETAIL.csv", {headers: true})').then(
			function(retails) {
				for (var i = 0; i < retails.length; i++) {
					var retail = retails[i];
					alasql('INSERT INTO retail VALUES(?,?,?,?,?);', retail);
				}
			});

	// Stock
	alasql('DROP TABLE IF EXISTS stock;');
	alasql('CREATE TABLE stock(id INT IDENTITY, item INT, retail INT, safe INT, balance INT, expire DATE, restock STRING, r_qty INT);');
	var pstock = alasql.promise('SELECT MATRIX * FROM CSV("../data/STOCK-STOCK.csv", {headers: true})').then(
			function(stocks) {
				for (var i = 0; i < stocks.length; i++) {
					var stock = stocks[i];
					alasql('INSERT INTO stock VALUES(?,?,?,?,?,?,?,?);', stock);
				}
			});

	// Transaction
	alasql('DROP TABLE IF EXISTS trans;');
	alasql('CREATE TABLE trans(id INT IDENTITY, stock INT, qty INT, receipt INT);');
	var ptrans = alasql.promise('SELECT MATRIX * FROM CSV("../data/TRANS-TRANS.csv", {headers: true})').then(
			function(transs) {
				for (var i = 0; i < transs.length; i++) {
					var trans = transs[i];
					alasql('INSERT INTO trans VALUES(?,?,?,?);', trans);
				}
			});

	//Expire
	alasql('DROP TABLE IF EXISTS expire;');
	alasql('CREATE TABLE expire(id INT IDENTITY, stock INT, expiration DATE, qty INT, received BOOL);');
	var pexpire = alasql.promise('SELECT MATRIX * FROM CSV("../data/EXPIRE-EXPIRE.csv", {headers: true})').then(
		function(expires) {
			for (var i = 0; i < expires.length; i++) {
				var expire = expires[i];
				alasql('INSERT INTO expire VALUES(?,?,?,?,?);', expire);
			}
		});
    // Restock
	alasql('DROP TABLE IF EXISTS restock;');
	alasql('CREATE TABLE restock(id INT IDENTITY, ref STRING, date DATE, status INT, expect DATE);');
	var prestock = alasql.promise('SELECT MATRIX * FROM CSV("../data/RESTOCK-RESTOCK.csv", {headers: true})').then(
		function(restocks) {
			for (var i = 0; i < restocks.length; i++) {
				var restock = restocks[i];
				alasql('INSERT INTO restock VALUES(?,?,?,?,?);', restock);
			}
		});
	//Receipt
	alasql('DROP TABLE IF EXISTS receipt;');
	alasql('CREATE TABLE receipt(id INT IDENTITY, type STRING, operator STRING, date DATE);');
	var preceipt = alasql.promise('SELECT MATRIX * FROM CSV("../data/RECEIPT-RECEIPT.csv", {headers: true})').then(
		function(receipts) {
			for (var i = 0; i < receipts.length; i++) {
				var receipt = receipts[i];
				alasql('INSERT INTO receipt VALUES(?,?,?,?);', receipt);
			}
		});

	//Dead Stock
	alasql('DROP TABLE IF EXISTS dead;');
	alasql('CREATE TABLE dead(id INT IDENTITY, stock INT, qty INT, handled BOOLEAN);');
	var pdead = alasql.promise('SELECT MATRIX * FROM CSV("../data/DEADSTOCK-DEADSTOCK.csv", {headers: true})').then(
		function(deads) {
			for (var i = 0; i < deads.length; i++) {
				var dead = deads[i];
				alasql('INSERT INTO dead VALUES(?,?,?,?);', dead);
			}
		});

	// Reload page
	Promise.all([puser, pkind, ppkind, pitem, pretail, pstock, ptrans, pexpire, prestock, preceipt, pdead]).then(function() {
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

	alasql('INSERT INTO item VALUES (?,?,?,?,?,?,?,?,?)',[id,code,product.cat,product.name,product.detail,product.price,product.size,product.unit,product.return]);
	var retails = alasql('column of select id from retail');
	var s_id = DB.getNextID('stock');
	var expire =(date.getFullYear()+1000) + '-' + (date.getMonth()+1) + '-' + date.getDate();
	for(var i = 0; i<retails.length; i++){
		alasql('INSERT INTO stock VALUES(?,?,?,?,?,?,?,?);',[s_id,id,retails[i],product.safe,0,expire,0,0]);
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

DB.newTrans = function(trans,target){
	/*
	keys: stock, amount, receipt
	 */

    //update expire if the qty of the closet-expired product is 0
    var qty = trans.amount;
    if(qty<0){
        //if stock out
        //send out products that will be expired earlier
        var records = alasql('SELECT * FROM expire WHERE stock = ? ORDER BY expiration ASC',[parseInt(trans.stock)]);
        for(var i = 0; i<records.length; i++){
            var record = records[i];
            qty += record.qty;
            if(qty<0){
                alasql('DELETE FROM expire WHERE id = ?',[record.id]);
                alasql('INSERT INTO expire VALUES (?,?,?,?,?)',[DB.getNextID('expire'), target, record.expiration, record.qty, false]);
            }else{
                alasql('UPDATE expire SET qty = ? WHERE id = ?',[qty,record.id]);
                alasql('INSERT INTO expire VALUES (?,?,?,?,?)',[DB.getNextID('expire'), target, record.expiration, (record.qty-qty), false]);
                break;
            }

        }
        if(qty<0){
            alert('OUT-OF-STOCK!');
            return;
        }

    }
    var id = DB.getNextID('trans');

    //insert a new transaction record
    alasql('INSERT INTO trans VALUES (?,?,?,?)',[id,trans.stock,trans.amount,trans.receipt]);

    //update the balance in stock table
    var sql = 'UPDATE stock SET balance = balance +('+trans.amount+') WHERE id = '+trans.stock;
    alasql(sql);
};

DB.newReceipt = function (type,operator,today){
	var id = DB.getNextID('receipt');
	//type STRING, operator STRING, date DATE
	alasql('INSERT INTO receipt VALUES (?,?,?,?)',[id,type,operator,today]);
	return id;
};

DB.newStockIn = function(record) {
	//insert the trans
    var today  = new Date();
	var receipt = DB.newReceipt(record);
	var trans = {
		stock: alasql('COLUMN OF SELECT id FROM stock WHERE retail = 1 AND item = '+[record.id])[0],
		date: today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
		amount : record.qty,
		receipt: receipt
	};
	DB.newTrans(trans);

    //update expire
	var id = DB.getNextID('expire');

	alasql('INSERT INTO expire VALUES (?,?,?,?,?)',[id,trans.stock,record.expire,record.qty,true]);
};

DB.newRestock = function (restocks) {

    var date  = new Date();
    var d = date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString();
	var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    var refs = alasql('COLUMN OF SELECT ref FROM restock');
	var receipt = DB.newReceipt('Restock','Alice',today);
    for(var i = 0; i<restocks.length; i++){

        var restock = restocks[i];
        var r = alasql('COLUMN OF SELECT id FROM retail WHERE name =?',[restock.retail])[0];
        var ref = d + r;
        //if the ref does not exist, create a new restock ref
        if(refs.indexOf(ref)===-1){
            var id = DB.getNextID('restock');
            alasql('INSERT INTO restock VALUES (?,?,?,?,?)',[id,ref,today,0,null]);
            refs.push(ref);
        }

        //update stock of the retail
        //the balance does NOT change, r_qty changes
        var record_r = {
            r_qty : restock.amount,
            restock : ref
        };
        DB.updateStock(record_r,restock.id);

        //update the stock of the central warehouse
        //add a new trans --> update the balance of central warehouse
        var central = alasql('SELECT stock.id FROM stock JOIN item ON item.id = stock.item WHERE item.name = ? AND stock.retail = 1',[restock.item])[0].id;
        var record_c = {
            amount : (0-restock.amount),
            stock : central,
			receipt : receipt
        };
        DB.newTrans(record_c,restock.id);

    }

};

DB.newSold = function (soldProducts) {
	var date = new Date();
	var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
	var receipt = DB.newReceipt('Sold','Bob',today);
	//update trans
	for(var i =0 ;i <soldProducts.length; i++){
		var product = soldProducts[i];
		product['receipt'] = receipt;
		DB.newTrans(product);
	}
	return {receipt: receipt, date: today};
};



DB.getNextID = function(table){
    return alasql('COLUMN OF SELECT MAX(id)+1 AS id FROM '+table)[0];
};

DB.getProductHistory = function(id){
	var sql = 'SELECT trans.qty, receipt.date ' +
        'FROM trans ' +
        'JOIN stock on trans.stock = stock.id ' +
        'JOIN receipt ON trans.receipt = receipt.id ' +
        'WHERE stock.id = '+id;
    var trans = alasql(sql);
    var history = [];
    var balance = 0;
    for(var i = 0; i<trans.length; i++){
        var r = trans[i];
        balance += parseInt(r.qty);
        var record = {
            date : r.date,
            stock : balance
        };
        history.push(record);
    }
    return history;
};

DB.getRestockInfo = function(retail){
	var sql = 'SELECT stock.id, item.name AS item, retail.name AS retail, stock.safe, stock.balance, (stock.safe - stock.balance - stock.r_qty) AS restock ' +
        'FROM stock JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'WHERE stock.retail <> 1';
	if(retail){
		sql += ' AND stock.retail = '+retail;
	}
    return alasql(sql);
};

DB.getProductInfo = function(id){
	var sql = 'SELECT item.*, stock.balance, kind.name AS kind ' +
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
	var sql = 'SELECT item.name, item.code, item.detail, item.size, item.unit, item.price, stock.id, kind.name as kind, stock.balance ' +
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

DB.getAllRestock = function(retail){
    var sql = 'SELECT restock.*, item.name as item, item.code as code, retail.name as retail, stock.r_qty as qty ' +
        'FROM restock ' +
        'JOIN stock ON restock.ref = stock.restock ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'JOIN item ON stock.item = item.id ';
    var condition = '';
    if(retail){
        condition = 'WHERE stock.retail = '+retail;
        sql = sql + condition;

    }else if(retail === 0){
        condition = 'WHERE restock.status = 0 ';
        sql = sql + condition;
    }
    return alasql(sql);
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

DB.getReturnProducts = function(retail){
    var sql = 'SELECT stock.id, stock.balance, expire.expiration, expire.qty, item.returning, item.name, item.code, item.detail, item.size, item.unit, item.price, kind.name AS kind ' +
        'FROM stock ' +
        'JOIN expire ON stock.id = expire.stock ' +
        'JOIN item ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
        'WHERE expire.received = "true" ' +
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
	var sql = 'SELECT stock.id, expire.expiration, expire.qty, item.name AS item ' +
		'FROM stock ' +
		'JOIN expire ON stock.id = expire.stock ' +
        'JOIN item ON stock.item = item.id ' +
		'WHERE expire.received = "true" ' +
        'AND retail = ?';
	var products = alasql(sql,[retail]);
	var today = new Date();
	var expiring =[];
	for(var i = 0; i<products.length; i++){
		var product = products[i];
		var diff = moment(product.expiration,'YYYY-MM-DD').diff(today,'days');
		if(diff<days){
			expiring.push(product);
		}
	}
	return expiring;
};

DB.getProductExpiration = function(stock){
    var sql = 'SELECT * FROM expire WHERE received = "true" AND stock = '+stock;
    return alasql(sql);
};

DB.getProductReport = function(kinds,retails,period){
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

	sql = 'SELECT stock.item, SUM(trans.qty) AS total ' +
		'FROM trans ' +
		'JOIN stock ON trans.stock = stock.id ' +
		'JOIN receipt ON trans.receipt = receipt.id ' +
		'WHERE trans.stock IN ('+stocks.toString()+') ' +
		'AND receipt.date <= ? ' +
		'AND trans.qty < 0 GROUP BY stock.item';

	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()-period+1)+'-'+today.getDate();
	var trans = alasql(sql,[date]);
	var result = [];
	for(i = 0; i<trans.length;i++){
		var tran = trans[i];
		record = {
			item : alasql('COLUMN OF SELECT name FROM item WHERE id = ?',[tran.item])[0],
			qty : Math.abs(tran.total)
		};
		result.push(record);
	}
	return result;

};

DB.getSoldDetail = function(item,retails,period){
	var q1 = '"'+retails[0]+'"';
	for(i = 1; i<retails.length; i++){
		q1 += ',"'+retails[i]+'"';
	}

    var sql = 'SELECT trans.qty, receipt.date, stock.retail ' +
        'FROM trans ' +
        'JOIN stock on trans.stock = stock.id ' +
        'JOIN receipt ON trans.receipt = receipt.id ' +
		'JOIN item ON stock.item = item.id ' +
		'JOIN retail ON stock.retail = retail.id ' +
        'WHERE trans.qty<0 ' +
		'AND retail.name IN ('+q1+') ' +
        'AND receipt.date <= ? ' +
        'AND item.name = ?';

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()-period+1)+'-'+today.getDate();
    var trans = alasql(sql,[date,item]);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var record = [];
    var result = [];

    for(var i = 0; i<trans.length; i++){
        var r = trans[i];
        var d = new Date(r.date);
        var test = months[d.getMonth()]+' '+d.getFullYear();
        var index = record.indexOf(test);
        if(index === -1){
            record.push(test);
			var data = {
				month : test
			};
			data[r.retail] = Math.abs(r.qty);
            result.push(data);
        }else{
			//if the month exists
            if(result[index][r.retail]){
				result[index][r.retail] += Math.abs(r.qty);
			}else{
				result[index][r.retail] = Math.abs(r.qty);
			}
        }
    }
    return result;
};

DB.getRetailReport = function(items,cities,period){
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
    sql = 'SELECT stock.retail, SUM(trans.qty) AS total ' +
        'FROM trans ' +
        'JOIN stock ON trans.stock = stock.id ' +
        'JOIN receipt ON trans.receipt = receipt.id ' +
        'WHERE trans.stock IN ('+stocks.toString()+') ' +
        'AND receipt.date <= ? ' +
        'AND trans.qty < 0 GROUP BY stock.retail';

    if(isNaN(period)){
        period = 0;
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()-period+1)+'-'+today.getDate();
    var trans = alasql(sql,[date]);
    var result = [];
    for(i = 0; i<trans.length;i++){
        var tran = trans[i];
        record = {
            retail : alasql('COLUMN OF SELECT name FROM retail WHERE id = ?',[tran.retail])[0],
            qty : Math.abs(tran.total)
        };
        result.push(record);
    }
    return result;
};

DB.getRetailSoldDetail = function(retail,items,period){
    var q1 = '"'+items[0]+'"';
    for(i = 1; i<items.length; i++){
        q1 += ',"'+items[i]+'"';
    }

    var sql = 'SELECT trans.qty, receipt.date, stock.item ' +
        'FROM trans ' +
        'JOIN stock on trans.stock = stock.id ' +
        'JOIN receipt ON trans.receipt = receipt.id ' +
        'JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'WHERE trans.qty<0 ' +
        'AND item.name IN ('+q1+') ' +
        'AND receipt.date <= ? ' +
        'AND retail.name = ?';

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()-period+1)+'-'+today.getDate();
    var trans = alasql(sql,[date,retail]);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var record = [];
    var result = [];

    for(var i = 0; i<trans.length; i++){
        var r = trans[i];
        var d = new Date(r.date);
        var test = months[d.getMonth()]+' '+d.getFullYear();
        var index = record.indexOf(test);
        if(index === -1){
            record.push(test);
            var data = {
                month : test
            };
            data[r.item] = Math.abs(r.qty);
            result.push(data);
        }else{
            //if the month exists
            if(result[index][r.item]){
                result[index][r.item] += Math.abs(r.qty);
            }else{
                result[index][r.item] = Math.abs(r.qty);
            }
        }
    }
    console.log(result);
    return result;
};

DB.getMonthPeriod = function(){
    var first = alasql('COLUMN OF SELECT TOP 1 date FROM receipt ORDER BY date ASC')[0];
    var today = new Date();
    var diff = moment(first,'YYYY-MM-DD').diff(today,'months');
    return Math.abs(diff);

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
    alasql('UPDATE restock SET status = 1, expect = ? WHERE ref = ?',[expect,ref]);
};

DB.receiveRestock = function(retail){
    var stocks = alasql('SELECT id, restock, r_qty, balance FROM stock WHERE retail = ? AND restock<>0',[retail]);
    var date  = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();


    for(var i = 0 ; i< stocks.length; i++){
        var record = stocks[i];
        alasql('UPDATE stock SET restock = 0, r_qty = 0 WHERE id = ?',[record.id]);
        alasql('UPDATE restock SET status = 2 WHERE ref = ?',[record.restock]);
        alasql('UPDATE expire SET received = "true" WHERE stock = ?',[record.id]);

        var receipt = DB.newReceipt('Received','Bob',today);
        var trans = {
            amount : record.r_qty,
            stock : record.id,
            receipt : receipt
        };
        console.log(trans);

        DB.newTrans(trans);
    }
};

DB.returnProduct = function(items){
    var date  = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    var receipt = DB.newReceipt('Return expiring products','Bob',today);
    for(var i = 0; i<items.length; i++){
        var item = items[i];//item.id should be stock id
        //update balance of the retail
        console.log(item);
        var id = DB.getNextID('trans');
        //insert a new transaction record
        alasql('INSERT INTO trans VALUES (?,?,?,?)',[id,item.id,(-item.qty),receipt]);

        //update the balance in stock table
        var sql = 'UPDATE stock SET balance = balance - '+item.qty+' WHERE id = '+item.id;
        alasql(sql);

        //update expire
        sql = 'DELETE FROM expire WHERE stock =' + item.id + ' AND expiration <= "' + item.expire + '"';
        alasql(sql);

        //update dead stock
        id = DB.getNextID('dead');
        alasql('INSERT INTO dead VALUES (?,?,?,?)',[id,item.id,item.qty,false]);
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