
 window.onload = function(){    
    set_calendar();
}


function set_calendar() {
    document.getElementById('ini-calendar').innerHTML = "";
    var d = new Date(document.getElementById("txtStartDate").value);
    d.setDate(d.getDate() + 1);  
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth();
    var year = d.getFullYear();
    var tmp = new Date(d).toDateString();
    var first_day = tmp.substring(0, 3);
    console.log(first_day);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year, month+1, 0).getDate();
    var day = d.getDate();
   
    var number_of_days = document.getElementById("txtNumberOfDays").value;
    console.log(parseInt(day)+parseInt(number_of_days));
     if (days-day > number_of_days) {
        var calendar = get_calendar(day, day_no, parseInt(day)+parseInt(number_of_days));
        generate_calendar(calendar, month_name[month],year);
    }
    else{
        var calendar = get_calendar(day, day_no, days);
        generate_calendar(calendar, month_name[month],year);
        number_of_days -= days - day;
        var next_month = d.getMonth()+1;        
        while(number_of_days > 0){
            if (next_month == 12) {
                next_month=0;
                year ++;
            }
            
            var next_first_date = month_name[next_month] + " " + 1 + " " + year;
            var tmp = new Date(next_first_date).toDateString();
            var next_first_day = tmp.substring(0, 3);    //Mon      
            var next_day_no = day_name.indexOf(next_first_day);   //1
            var new_days = new Date(year, next_month+1, 0).getDate();
            
            if (number_of_days > new_days) {
                var calendar = get_calendar(1, next_day_no, new_days);
                generate_calendar(calendar, month_name[next_month], year);

                number_of_days -= new_days;
                next_month++;
            }
            else{
                var calendar = get_calendar(1, next_day_no, number_of_days);
                generate_calendar(calendar, month_name[next_month],year);
                number_of_days = 0;
            }
        }
    }  
}

function get_calendar(day, day_no, days){
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        td.classList.add('past');
        tr.appendChild(td);
    }
    
    var count = day;
    for(; c<=6; c++){
        var td = document.createElement('td');
        if (c == 0 || c == 6) {
        	td.classList.add('weekend');
        }
        else
        {
        	td.classList.add('present');
        }
        if (count==1) {
            td.classList.add('first_day');
        }
        td.innerHTML = count; 
        
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            if (c == 0 || c == 6) {
        	td.classList.add('weekend');
	        }
	        else
	        {
	        	td.classList.add('present');
	        }
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function generate_calendar(calendar, month_name, year) {
    var calendar_container = document.createElement('div');     
                calendar_container.className = 'calendar-container';
                var calendar_header = document.createElement('div');        
                calendar_header.className = 'calendar-header';
                var calendar_month_year = document.createElement('span');
                calendar_month_year.className = 'calendar-month-year';
                calendar_month_year.innerHTML = month_name+" "+year;
                calendar_header.appendChild(calendar_month_year);

                var calendar_dates = document.createElement('div'); 
                calendar_dates.className = 'calendar-dates';
                calendar_dates.appendChild(calendar);

                calendar_container.appendChild(calendar_header);
                calendar_container.appendChild(calendar_dates);     
                
                document.getElementById('ini-calendar').appendChild(calendar_container);
}