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
	alasql('CREATE TABLE user(id INT IDENTITY, name STRING, password STRING, type INT, login BOOLEAN);');
	var puser = alasql.promise('SELECT MATRIX * FROM CSV("../data/USER-USER.csv", {headers: true})').then(function(users) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			alasql('INSERT INTO user VALUES(?,?,?,?,?);', user);
		}
	});


	// Classes
	alasql('DROP TABLE IF EXISTS kind;');
	alasql('CREATE TABLE kind(id INT IDENTITY, parent_id INT, name STRING);');
	var pkind = alasql.promise('SELECT MATRIX * FROM CSV("../data/KIND-KIND.csv", {headers: true})').then(function(kinds) {
		for (var i = 0; i < kinds.length; i++) {
			var kind = kinds[i];
			alasql('INSERT INTO kind VALUES(?,?,?);', kind);
		}
	});

	//Parent Classes
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
	alasql('CREATE TABLE expire(id INT IDENTITY, stock INT, expiration DATE, qty INT);');
	var pexpire = alasql.promise('SELECT MATRIX * FROM CSV("../data/EXPIRE-EXPIRE.csv", {headers: true})').then(
		function(expires) {
			for (var i = 0; i < expires.length; i++) {
				var expire = expires[i];
				alasql('INSERT INTO expire VALUES(?,?,?,?);', expire);
			}
		});

	alasql('DROP TABLE IF EXISTS restock;');
	alasql('CREATE TABLE restock(id INT IDENTITY, ref STRING, date DATE, status STRING);');
	var prestock = alasql.promise('SELECT MATRIX * FROM CSV("../data/RESTOCK-RESTOCK.csv", {headers: true})').then(
		function(restocks) {
			for (var i = 0; i < restocks.length; i++) {
				var restock = restocks[i];
				alasql('INSERT INTO restock VALUES(?,?,?,?);', restock);
			}
		});

	alasql('DROP TABLE IF EXISTS receipt;');
	alasql('CREATE TABLE receipt(id INT IDENTITY, type STRING, operator STRING, date DATE);');
	var preceipt = alasql.promise('SELECT MATRIX * FROM CSV("../data/RECEIPT-RECEIPT.csv", {headers: true})').then(
		function(receipts) {
			for (var i = 0; i < receipts.length; i++) {
				var receipt = receipts[i];
				alasql('INSERT INTO receipt VALUES(?,?,?,?);', receipt);
			}
		});

	// Reload page
	Promise.all([puser, pkind, ppkind, pitem, pretail, pstock, ptrans, pexpire, prestock, preceipt]).then(function() {
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

DB.newTrans = function(trans){
    var id = DB.getNextID('trans');

    //insert a new transaction record
    alasql('INSERT INTO trans VALUES (?,?,?,?)',[id,trans.stock,trans.amount,trans.receipt]);

    //update the balance in stock table
    var sql = 'UPDATE stock SET balance = balance +('+trans.amount+') WHERE id = '+trans.stock;

    //update expire if the qty of the closet-expired product is 0
    var qty = trans.amount;
    if(qty<0){ //stock in
        var records = alasql('SELECT * FROM expire WHERE stock = ? ORDER BY expiration ASC',[trans.stock]);
        for(var i = 0; i<records.length; i++){
            var record = records[i];
            qty += record.qty;
            if(qty<0){
                alasql('UPDATE expire SET qty = 0 WHERE id = ?',[record.id]);
            }else{
                //update expire
                alasql('UPDATE stock SET expire = ? WHERE id = ?',[record.expiration,trans.stock]);
                alasql('UPDATE expire SET qty = ? WHERE id = ?',[qty,record.id]);
                break;
            }
        }
        if(qty<0){
            alert('OUT-OF-STOCK!');
        }

    }
    alasql(sql);
};

DB.newExpire = function(record) {

    //insert a new expire record
    var id = DB.getNextID('expire');
    alasql('INSERT INTO expire VALUES (?,?,?,?)',[id,record.stock,record.expire,record.amount]);

    //update the expire in stock table if the expire date is earlier than the current expire date
    var expire  = alasql('COLUMN OF SELECT expire FROM stock WHERE id ='+record.stock)[0];
    // var stock_expire = moment(expire,'YYYY-MM-DD');
    // var new_expire = moment(record.expire,'YYYY-MM-DD');
    var diff = moment(expire,'YYYY-MM-DD').diff(moment(record.expire,'YYYY-MM-DD'),'days');
    if(diff>0){
        alasql('UPDATE stock SET expire = ? WHERE id = ?',[record.expire,record.stock]);
    }
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
        expire : record.expire,
		receipt: receipt
	};
	DB.newTrans(trans);

    //update expire
    DB.newExpire(trans);
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
            alasql('INSERT INTO restock VALUES (?,?,?,?)',[id,ref,today,'collected']);
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
            id : central,
            amount : (0-restock.amount),
            stock : central,
			receipt : receipt
        };
        DB.newTrans(record_c);

    }

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

DB.getNextID = function(table){
    return alasql('COLUMN OF SELECT MAX(id)+1 AS id FROM '+table)[0];
};

DB.getProductHistory = function(id,retail){
	var sql = 'SELECT trans.qty, trans.date ' +
        'FROM trans ' +
        'JOIN stock on trans.stock = stock.id ' +
        'WHERE stock.retail = '+retail+' AND stock.item = '+id;
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

DB.getProductInfo = function(id,retail){
	var sql = 'SELECT item.*, stock.balance, kind.name AS kind ' +
		'FROM item ' +
		'JOIN stock ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
		'WHERE item.id = '+id+' AND stock.retail = '+retail;
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
	var sql = 'SELECT item.name, item.code, item.detail, item.size, item.unit, item.price, stock.id, kind.name as kind, stock.balance, stock.expire ' +
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

DB.getAllRestock = function(){
    return alasql('SELECT restock.*, item.name as item, retail.name as retail ' +
        'FROM restock ' +
        'JOIN stock ON restock.ref = stock.restock ' +
        'JOIN retail ON stock.retail = retail.id ' +
        'JOIN item ON stock.item = item.id ');
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
    var sql = 'SELECT stock.id, stock.item, stock.expire, expire.qty, item.returning ' +
        'FROM stock ' +
        'JOIN expire ON stock.id = expire.stock ' +
        'JOIN item ON item.id = stock.item ' +
        'WHERE retail = ?';
    var products = alasql(sql,[retail]);

    var today = new Date();
    var returning =[];
    for(var i = 0; i<products.length; i++){
        var product = products[i];
        var diff = moment(product.expire,'YYYY-MM-DD').diff(today,'days');
        if(diff<product.returning){
            returning.push(product);
        }
    }
    return returning;
};

//User
DB.loginUser = function(user,password){
	var rs = alasql('SELECT * FROM user WHERE name = ?',[user])[0];
	password = password.toString();
	if(!rs){
		return 0;
	}else if(password === rs.password){
		alasql('UPDATE user SET login = true WHERE name = ?',[user]);
		localStorage.setItem('loginUser',JSON.stringify(rs));
		return rs.type;
	}
	//user is not found or invalid password
	return 0;
};

DB.logoutUser = function(){
	var user = JSON.parse(localStorage.getItem('loginUser'));
	alasql('UPDATE user SET login = false WHERE name = ?',[user]);
	localStorage.removeItem('loginUser');
};