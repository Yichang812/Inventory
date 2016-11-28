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
	var puser = alasql.promise('SELECT MATRIX * FROM CSV("data/USER-USER.csv", {headers: true})').then(function(users) {
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			alasql('INSERT INTO user VALUES(?,?,?,?,?);', user);
		}
	});


	// Classes
	alasql('DROP TABLE IF EXISTS kind;');
	alasql('CREATE TABLE kind(id INT IDENTITY, parent_id INT, name STRING);');
	var pkind = alasql.promise('SELECT MATRIX * FROM CSV("data/KIND-KIND.csv", {headers: true})').then(function(kinds) {
		for (var i = 0; i < kinds.length; i++) {
			var kind = kinds[i];
			alasql('INSERT INTO kind VALUES(?,?,?);', kind);
		}
	});

	//Parent Classes
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
	alasql('CREATE TABLE item(id INT IDENTITY, code STRING, kind INT, name STRING, detail STRING, price FLOAT, size INT, unit STRING);');
	var pitem = alasql.promise('SELECT MATRIX * FROM CSV("data/ITEM-ITEM.csv", {headers: true})').then(function(items) {
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			alasql('INSERT INTO item VALUES(?,?,?,?,?,?,?,?);', item);
		}
	});

	// //Sizes
	// alasql('DROP TABLE IF EXISTS size;');
	// alasql('CREATE TABLE size(id INT IDENTITY, item INT, price FLOAT, size FLOAT, unit STRING);');
	// var psize = alasql.promise('SELECT MATRIX * FROM CSV("data/SIZE-SIZE.csv", {headers: true})').then(function(sizes) {
	// 	for (var i = 0; i < sizes.length; i++) {
	// 		var size = sizes[i];
	// 		alasql('INSERT INTO size VALUES(?,?,?,?,?);', size);
	// 	}
	// });

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

	// Inventories
	alasql('DROP TABLE IF EXISTS stock;');
	alasql('CREATE TABLE stock(id INT IDENTITY, item INT, retail INT, safe INT, balance INT);');
	var pstock = alasql.promise('SELECT MATRIX * FROM CSV("data/STOCK-STOCK.csv", {headers: true})').then(
			function(stocks) {
				for (var i = 0; i < stocks.length; i++) {
					var stock = stocks[i];
					alasql('INSERT INTO stock VALUES(?,?,?,?,?);', stock);
				}
			});

	// Transaction
	alasql('DROP TABLE IF EXISTS trans;');
	alasql('CREATE TABLE trans(id INT IDENTITY, stock INT, date DATE, qty INT, type INT, proof STRING);');
	var ptrans = alasql.promise('SELECT MATRIX * FROM CSV("data/TRANS-TRANS.csv", {headers: true})').then(
			function(transs) {
				for (var i = 0; i < transs.length; i++) {
					var trans = transs[i];
					alasql('INSERT INTO trans VALUES(?,?,?,?,?,?);', trans);
				}
			});

	//Receipt
	alasql('DROP TABLE IF EXISTS receipt;');
	alasql('CREATE TABLE receipt(id INT IDENTITY, retail INT);');
	var preceipt = alasql.promise('SELECT MATRIX * FROM CSV("data/RECEIPT-RECEIPT.csv", {headers: true})').then(
		function(receipts) {
			for (var i = 0; i < receipts.length; i++) {
				var receipt = receipts[i];
				alasql('INSERT INTO receipt VALUES(?,?);', receipt);
			}
		});

	//Batch
	alasql('DROP TABLE IF EXISTS batch;');
	alasql('CREATE TABLE batch(id INT IDENTITY, date DATE);');
	var pbatch = alasql.promise('SELECT MATRIX * FROM CSV("data/BATCH-BATCH.csv", {headers: true})').then(
		function(batchs) {
			for (var i = 0; i < batchs.length; i++) {
				var batch = batchs[i];
				alasql('INSERT INTO batch VALUES(?,?);', batch);
			}
		});

	//Expire
	alasql('DROP TABLE IF EXISTS expire;');
	alasql('CREATE TABLE expire(id INT IDENTITY, item INT, batch INT, expiration DATE);');
	var pexpire = alasql.promise('SELECT MATRIX * FROM CSV("data/EXPIRE-EXPIRE.csv", {headers: true})').then(
		function(expires) {
			for (var i = 0; i < expires.length; i++) {
				var expire = expires[i];
				alasql('INSERT INTO expire VALUES(?,?,?,?);', expire);
			}
		});
	//Type
	alasql('DROP TABLE IF EXISTS type;');
	alasql('CREATE TABLE type(id INT IDENTITY, type STRING);');
	var ptype = alasql.promise('SELECT MATRIX * FROM CSV("data/TYPE-TYPE.csv", {headers: true})').then(
		function(types) {
			for (var i = 0; i < types.length; i++) {
				var type = types[i];
				alasql('INSERT INTO type VALUES(?,?);', type);
			}
		});
	// Reload page
	Promise.all([puser, pkind, ppkind, pitem, pretail, pstock, ptrans, preceipt, pbatch, pexpire, ptype]).then(function() {
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

DB.getitems = function(){
    return alasql('COLUMN OF SELECT name FROM item');
};

DB.getNextID = function(table){
    return alasql('column of select MAX(id)+1 as id from '+table);
};

DB.createItem = function(code,kind,name,detail){
    var id =DB.getNextID('item');
    console.log(id);
  alasql('INSERT INTO item VALUES (?,?,?,?,?)',[id,code,kind,name,detail]);
};

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

DB.getProductInfo = function(id,retail){
	var sql = 'SELECT item.*, stock.balance, kind.name AS kind ' +
		'FROM item ' +
		'JOIN stock ON item.id = stock.item ' +
		'JOIN kind ON item.kind = kind.id ' +
		'WHERE item.id = '+id+' AND stock.retail = '+retail;
	return alasql(sql)[0];
};

DB.getAllRetailStock = function (id) {
	var sql = 'SELECT retail.name as retail, stock.balance ' +
		'FROM stock ' +
		'JOIN retail ON stock.retail = retail.id ' +
		'WHERE stock.item = '+id;
	return alasql(sql);
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
        var d = new Date(r.date);
        balance += parseInt(r.qty);
        var record = {
            date : d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(),
            stock : balance
        };

        history.push(record);
    }
    return history;
};


// DB.getRestockNumber = function(item){
//     var initStock = alasql('SELECT stock.id, qty FROM trans JOIN stock on trans.stock = stock.id WHERE trans.type = 1 AND trans.stock > 5 AND stock.item=?',[item]);
//     var curStock = alasql('SELECT id, balance, retail FROM stock WHERE id > 5 AND item=?',[item]);
//     var restock = [];
//     for(var i = 0; i<initStock.length; i++){
//         var init = initStock[i];
//         var cur = curStock[i];
//         if(init.id === cur.id){
//             restock.push(init.qty-cur.balance);
//         }else{
//             return [];
//         }
//     }
//     return restock;
// };

DB.getRestockInfo = function(id){
	var sql = 'SELECT stock.id, item.name as item, retail.name as retail, stock.safe, stock.balance ' +
        'FROM stock JOIN item ON stock.item = item.id ' +
        'JOIN retail ON stock.retail = retail.id WHERE stock.retail = ? ';
    return alasql(sql,[id]);
};

DB.getAllProductStock = function(retail){
	var sql = 'SELECT item.id, item.name as item, stock.balance FROM stock JOIN item on stock.item = item.id where retail = ?';
	return alasql(sql,[retail]);
};