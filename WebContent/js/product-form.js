/**
 * Created by li_yi-pc on 11/1/2016.
 */

var nameInput = $('input[name="name"]');
var detailInput = $('textarea[name="detail"]');
var categoryInput = $('select[name="pcat"]');

var sizeInput = $('input[name="size"]');
var unitInput = $('select[name="unit"]');
var priceInput = $('input[name="price"]');



//fill classification selector
var rows = alasql('SELECT * FROM kind;');
for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var option = $('<option>');
    option.attr('value', row.id);
    option.text(row.kind);
    categoryInput.append(option);
}

//add new product record
$('#addnew').on('click',function () {
    var today = new Date();
    var code = "#";
    var cat = categoryInput.val();
    var count = alasql('column of select count(id)+1 from item where kind = '+cat);
    code = code + today.getYear()+today.getMonth()+today.getDate()+ cat + count.toString();
    //validate input

    DB.createItem(code,parseInt(cat),nameInput.val(),detailInput.val());

    //empty localStorage
    localStorage.removeItem('productName');
    localStorage.removeItem('productCat');
    localStorage.removeItem('productDetail');
    localStorage.removeItem('sizeRecords');
});



//preserve user input after refresh
var sizeRecords = [];

if(localStorage['sizeRecords']){
    sizeRecords = JSON.parse(localStorage.getItem('sizeRecords'));
    for(var i = 0 ; i<sizeRecords.length; i++){
        var record = sizeRecords[i];
        var tr = $('<tr><td>'+record.size+'</td>' +
            '<td>'+record.unit+'</td>' +
            '<td>'+record.price+'</td>' +
            '<td><span class="glyphicon glyphicon-trash btn-deletesize" onclick="deleteSizeRecord(this)"></span></td></tr>');
        tr.insertBefore('#form-addsize');

    }
}
if(localStorage['productName']){
    nameInput.val(localStorage.getItem('productName'));
}

if(localStorage['productCat']){
    categoryInput.val(localStorage.getItem('productCat'));
}


if(localStorage['productDetail']){
    detailInput.val(localStorage.getItem('productDetail'));
}

nameInput.on('blur',function () {
    localStorage.setItem('productName',nameInput.val());
});

categoryInput.on('blur',function () {
    localStorage.setItem('productCat',categoryInput.val());
});

detailInput.on('blur',function(){
    localStorage.setItem('productDetail',detailInput.val());
});

//add size-price
$('#addsize').on('click',function(){

    var record = {
        size : sizeInput.val(),
        unit : unitInput.val(),
        price : priceInput.val()
    };

    //check the input
    var tr = $('<tr><td>'+record.size+'</td>' +
        '<td>'+record.unit+'</td>' +
        '<td>'+record.price+'</td>' +
        '<td><span class="glyphicon glyphicon-trash btn-deletesize" onclick="deleteSizeRecord(this)"></span></td></tr>');

    //save the val in localStorage
    sizeRecords.push(record);
    localStorage.setItem('sizeRecords',JSON.stringify(sizeRecords));

    //insert user input
    tr.insertBefore('#form-addsize');

   //reset the form content
    sizeInput.val('');
    unitInput.val('Caplets');
    priceInput.val('');

});

//edit size-price

//delete size-price
function deleteSizeRecord(ele){
    var row = $(ele).parents('tr');
    var table = $('#tbl-addsize');
    var index = table.find('tr').index(row)-1;
    var records = JSON.parse(localStorage.getItem('sizeRecords'));
    records.splice(index,1);
    localStorage.setItem('sizeRecords',JSON.stringify(records));
    row.remove();
}


//generate QR code whicn can redirect user to the product page
function getQR(){

}

//validate size-price
/*
Check if the size is positive integer
Check if the price is number
 */

//validate the name
/*
Check if the product name exist
    if exist: remind user to add size and price
 */

//enable save and generate QR buttons
/*
this buttons are enabled when the following fields are filled:
 "name", "size" & "price"
 */


$(document).ready(function () {
    // $('#date-picker').click(function () {
    //
    //     $('#create-date').datepicker({
    //         prevText:"<",
    //         nextText:">",
    //         setDate:new Date()
    //     });
    //     $('#create-date').datepicker("show");
    // });
    //validate cannot be late than today
});