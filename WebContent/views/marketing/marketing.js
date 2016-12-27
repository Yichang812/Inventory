$(document).ready(function() {
    App.init();

    selectInit();
    datePickerInit();
    $('.select').multipleSelect({
        width:'100%',
        multipleWidth:180,
        multiple: true,
        filter:true,
        minimumCountSelected:7
    });

    applyRule2();
    applyRule3();
    chartInit1();
    $('#data-table-top-selling').DataTable({
        "order":[[2,"desc"]],
        "paging":false,
        "info":false,
        "searching":false
    });

    $('#data-table-top-shop').DataTable({
        "order":[[2,"desc"]],
        "paging":false,
        "info":false,
        "searching":false
    });
});

var COLLAPSED = true;
var FILTER = {
    kinds : [],
    stores : [],
    cities : [],
    items : [],
    first:'',
    last:''
};
var CHART21, CHART22, CHART31, CHART32;

function selectInit(){
    FILTER.kinds = alasql('COLUMN OF SELECT name FROM kind');
    FILTER.stores = alasql('COLUMN OF SELECT name FROM retail WHERE id<>1');

    var cities = alasql('COLUMN OF SELECT DISTINCT city FROM retail WHERE id>1');

    FILTER.cities = cities;
    for(var i = 0; i< cities.length; i++){
        var op = $('<option selected="selected">'+cities[i]+'</option>');
        $('#city').append(op);
    }

    var items = alasql('COLUMN OF SELECT name FROM item');
    FILTER.items = items;
    for(var i = 0; i< items.length; i++){
        var op = $('<option selected="selected">'+items[i]+'</option>');
        $('#item').append(op);
    }
}

function chartInit1(){
    var temp = DB.getCatReport();

    for(var i = 0; i<temp.length; i++){
        var row = $('<tr><th style="border-bottom: 1px solid #ddd;">'+temp[i].name+'</th><td style="border-bottom: 1px solid #ddd;">'+Math.abs(temp[i].total)+'</td></tr>');
        $('#tbl-cat').append(row);
    }



    var data = [];
    var total = 0;
    for(var i = 0; i<temp.length; i++){
        var t = temp[i];
        total += t.total;
        data.push({label:t.name, value:t.total});
    }
    Morris.Donut({
        element:"donut-chart",
        data:data,
        formatter:function(e){
            var percent = Math.round(e/total*10000)/100;
            return percent+"%"
        },
        resize:true,
        colors:['#b6c832','#008a8a','#348fe2','#c47d15']
    });
    var temp_t = DB.getTotalReport();
    var data_t = [];
    var total_t = 0;
    var month_count = 0;
    for(t in temp_t){
        total_t += Math.abs(temp_t[t]);
        month_count ++;
        data_t.push({month:t, total:Math.abs(temp_t[t]),avg:Math.round(total_t/month_count)});
    }
    Morris.Line({
        element:'area-chart',
        data: data_t,
        xkey:'month',
        ykeys:['total','avg'],
        labels:['Total','Average'],
        resize:true,
        lineColors:['#008a8a','#b6c832']
    });

    $('#total-sale').text(total_t);
    $('#avg-total').text(total_t/month_count);


}

function chartInit2(item){
    $('#top-product-name').text(item);
    $('#chart-top-selling-by-retail').empty();
    $('#chart-top-selling-by-period').empty();
    var data = DB.getProductChartData(item,FILTER.stores,FILTER.first,FILTER.last);
    CHART21 = Morris.Donut({
        element:"chart-top-selling-by-retail",
        data:data.byRetail,
        resize:true,
        colors:['#b6c832','#008a8a','#348fe2','#c47d15']
    });

    CHART22 = Morris.Line({
        element:"chart-top-selling-by-period",
        data:data.byDate,
        xkey:"date",
        ykeys:["qty"],
        labels:['Sold Qty'],
        resize:true,
        lineColors:['#008a8a']
    });
}

function chartInit3(retail){
    $('#top-shop-name').text(retail);
    var data = DB.getRetailChartData(retail,FILTER.items,FILTER.first,FILTER.last);
    $('#chart-retail-by-item').empty();
    $('#chart-retail-by-period').empty();


    CHART31 = Morris.Donut({
        element:"chart-retail-by-item",
        data:data.byItem,
        resize:true,
        colors:['#b6c832','#008a8a','#348fe2','#c47d15','#f59c1a']
    });

    CHART32 = Morris.Line({
        element:"chart-retail-by-period",
        data:data.byDate,
        xkey:"date",
        ykeys:["qty"],
        labels:['Sold Qty'],
        resize:true,
        lineColors:['#008a8a']
    });
}

function applyRule2(){
    FILTER.kinds = $('#cat').val();
    FILTER.stores = $('#store').val();
    var table = $('#tbl-top-selling');
    var data = DB.getProductReport(FILTER.kinds,FILTER.stores,FILTER.first,FILTER.last);
    table.empty();
    for(var i =0; i<data.length; i++){
        var d = data[i];
        if(!d){
            $('<tr><td colspan="3">No sales data available</td></tr>').appendTo(table);
            $('#chart-2-container h4').text('');
            $('#chart-2-container div').html('');
            return;
        }
        if(i==0){
            var row = $('<tr onclick="showDetails2(this)" class="success pointer"></tr>');
        }else{
            var row = $('<tr onclick="showDetails2(this)" class="pointer"></tr>');
        }

        var qty = Math.abs(d.total);
        var revenue = Math.round(qty*d.price*100)/100;
        row.append('<td>' + d.name + '</td>');
        row.append('<td>' + qty + '</td>');
        row.append('<td>' + revenue + '</td>');
        table.append(row);
    }
    chartInit2(data[0].name);
}

function applyRule3(){
    FILTER.cities = $('#city').val();
    FILTER.items = $('#item').val();

    var table = $('#tbl-top-shop');
    var data = DB.getRetailReport(FILTER.items,FILTER.cities,FILTER.first,FILTER.last);
    table.empty();
    for(var i =0; i<data.length; i++){
        var d = data[i];
        if(!d.retail){
            $('<tr><td colspan="3">No sales data available</td></tr>').appendTo(table);
            $('#chart-3-container h4').text('');
            $('#chart-3-container div').html('');
            return;
        }
        var revenue = Math.abs(Math.round(d.revenue*100)/100);
        if(i==0){
            var row = $('<tr onclick="showDetails3(this)" class="success pointer"></tr>');
        }else{
            var row = $('<tr onclick="showDetails3(this)" class="pointer"></tr>');
        }
        row.append('<td>' + d.name + '</td>');
        row.append('<td>' + Math.abs(d.total) + '</td>');
        row.append('<td>' + revenue + '</td>');
        table.append(row);
    }
    chartInit3(data[0].name);
}

function showDetails2(ele){
    $(ele).siblings('tr').removeClass('success');
    $(ele).addClass('success');
    var item = $(ele).find('td:eq(0)').text();
    $('#top-product-name').text(item);
    chartInit2(item);
}

function showDetails3(ele){
    $(ele).siblings('tr').removeClass('success');
    $(ele).addClass('success');
    var retail = $(ele).find('td:eq(0)').text();
    $('#top-shop-name').text(retail);
    chartInit3(retail);
}

var date_picker_2 = $('input[name="datefilter2"]');
var date_picker_3 = $('input[name="datefilter3"]');
function datePickerInit(){
    var dateRage = DB.getDateRange();
    FILTER.first = moment(dateRage.first,'MM/DD/YYYY').format('YYYY-MM-DD');
    FILTER.last = moment(dateRage.today,'MM/DD/YYYY').format('YYYY-MM-DD');
    $('#period2').val(FILTER.first + ' - ' + FILTER.last);
    $('#period3').val(FILTER.first + ' - ' + FILTER.last);

    date_picker_2.daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        autoApply:true,
        startDate:dateRage.first,
        endDate:dateRage.today,
        minDate: dateRage.first,
        maxDate: dateRage.today
    });

    date_picker_3.daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        autoApply:true,
        startDate:dateRage.first,
        endDate:dateRage.today,
        minDate: dateRage.first,
        maxDate: dateRage.today
    });
}


date_picker_2.on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    FILTER.first = picker.startDate.format('YYYY-MM-DD');
    FILTER.last = picker.endDate.format('YYYY-MM-DD');
});

date_picker_2.on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

date_picker_3.on('apply.daterangepicker', function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
    FILTER.first = picker.startDate.format('YYYY-MM-DD');
    FILTER.last = picker.endDate.format('YYYY-MM-DD');
});

date_picker_3.on('cancel.daterangepicker', function(ev, picker) {
    $(this).val('');
});

$('ul.nav a').on('shown.bs.tab',function(e){
    CHART21.redraw();
    // CHART21.width = 658;
    CHART22.redraw();
    // CHART22.width = 658;
    CHART31.redraw();
    // CHART31.width = 658;
    CHART32.redraw();
    // CHART32.width = 658;
});

function toggleArrow(ele) {
    if(COLLAPSED){
        $(ele).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        COLLAPSED = false;
    }else{
        $(ele).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        COLLAPSED = true;
    }
}