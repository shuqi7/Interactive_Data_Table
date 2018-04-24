// This interactive table runs based on the table created by Datatablem which is later modified by this JavaScript
$(document).ready(function(){

	// add anchor tag to the name of each service provider
	$("#theTable tbody tr").each(function(){
		$this = $(this);
		$this.find("td").first().wrapInner("<a href='#tableDisplayDiv' data-lity>");
		$this.find("td:nth-child(3)").wrapInner("<a href=" + $this.find("td:nth-child(3)").text() + " target='_blank'>");
	});

	// Setup - add a text input to each footer cell
	// Add text filter or Dropdown list to filter information
	$('#theTable tfoot th').each( function (){
		// get the name of the th
		var title = $(this).text();
		$(this).append( '<input id="filter'+ title + '" type="text" placeholder="Filter '+ title +'" />' );

		var widget = $(this).find("input");
		$(this).text(''); // clear the name
		$(this).append(widget);

		// create drop down list for Location, Region and Category
		if (title == "Category") { 
			// Clear the original Filter
			$(this).text('');
			// Add the dropdown list
			$(this).append('<select id="filter' + title + '"> <option>Choose Service</option> <option>Accounting Service</option> <option>Architectural Consulting Service</option> <option>Real Estate Brokerage Service</option> <option>Construction/Engineering Consulting Service</option> <option>Coworking Space</option> <option>Customs Brokerage Service</option> <option>Energy Audit or Consulting Services</option> <option>Environmental Consulting Service</option> <option>Human Resources and/or Executive Talent Search Services</option> <option>Insurance Brokerage Service</option> <option>Legal Service</option> <option>Managed IT Service</option><option>Marketing and Communication Services</option><option>Relocation Specialists</option></select>');
		} else if(title == "Location"){
			$(this).text('');
			$(this).append('<select id="filter' + title + '"> <option>Choose Location</option> <option>Barrie</option> <option>Belleville</option> <option>Brantford</option> <option>Cambridge</option> <option>Campbellford</option> <option>Elmira</option> <option>Essex</option> <option>Guelph</option> <option>Hamilton</option> <option>Kingston</option> <option>Kitchener</option> <option>London</option> <option>Manotick</option> <option>Markham</option> <option>Mississauga</option> <option>Niagara Falls</option> <option>North York</option> <option>Oakville</option> <option>Ottawa</option> <option>Owen Sound</option> <option>Peterborough</option> <option>Richmond Hill</option> <option>Sarnia</option> <option>Selwyn</option> <option>St. Catharines</option> <option>Thornhill</option> <option>Toronto</option> <option>Vaughan</option> <option>Waterloo</option> <option>Whitby</option> <option>Windsor</option> <option>Woodstock</option> </select>');

		} else if (title == "Region") {
			$(this).text('');
			$(this).append('<select id="filter' + title + '"><option>Choose Region</option><option>GTA Region</option><option>Central Region</option><option>Southwest Region</option><option>East Region</option></select>');
		}
		// add label for accessibility
		$(this).prepend( '<label class="access" for="filter' + title + '">'+ title + '</label>' );
	});

	// Initialize the DataTable
	var table = $('#theTable').DataTable({
		responsive: true,

		columnDefs: [
			{ responsivePriority: 1, targets: 0 },
			{ responsivePriority: 2, targets: -2 }
		],

		"bPaginate": true,
		"bLengthChange": true,
		"bFilter": true,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": true
	});

	//remove auto search and allow search to be done when the user hits enter
	$('#theTable_filter input').unbind();
	$('#theTable_filter input').bind('keyup', function(e) {
		// 13 represents the 'enter' key
		if(e.keyCode == 13) {
			table.search(this.value).draw();
		}
	});

	// add search button
	$('#theTable_filter label').append('<button id="tableSearchButton" class="fa fa-search"><span><\/span><\/button>');
	$("#tableSearchButton").click(function(){
		table.search($('#theTable_filter input').val()).draw();
	});

	// clear search input and search results when x is clicked
	$('#theTable_filter input').on('input', function(e) {
		if('' == this.value) {
			table.search($('#theTable_filter input').val()).draw();
		}	
	});


	// Apply the individual filter
	table.columns().every(function(){
		var that = this;
		//remove auto search and allow search to be done when the user hits enter
		$('input', this.footer()).on('keypress', function(e){
			if (e.which == 13){
				// detect changes in the search input
				if (that.search() !== this.value) {
					that.search(this.value)
						.draw();
				}
			}
		});

		//clear individual filtered results when all input are removed
		$('input', this.footer()).on('input', function(e){ // for text input filter
			// clear only when input is emptied
			if ('' == this.value) {
				that.search('').draw();
			}
		});

		// for drop down filter
		$('select', this.footer()).on('change', function(e){ 
			if (this.value.substring(0,6) == "Choose"){
				that.search( '' ).draw();
			} else {
				if (that.search() !== this.value) {
					that.search(this.value)
						.draw();
				}
			}
		});
	});

	// shift the filter table row from tfoot to thead
	$("tfoot tr").appendTo($("thead")); 

	// add pop window
	$("#theTable tbody").on('click', 'tr td:nth-child(1)', function(){

		var $row = $(this).closest("tr");
		var currTd = $row.find("td");
		var companyName = currTd.eq(0).text();
		var summary = currTd.eq(1).html();
		var website = currTd.eq(2).html();
		var address = currTd.eq(3).html();
		var region = currTd.eq(4).html();
		var companyLocation = currTd.eq(5).html();
		var repName = currTd.eq(6).html();
		var repPosition = currTd.eq(7).html();
		var repEmail = currTd.eq(8).html();
		var repPhone = currTd.eq(9).html();
		var category = currTd.eq(10).html();
		var specialization = currTd.eq(11).html();

		$("#tableDisplayDiv").empty()
							.append(
				"Company Name: " + companyName + "<br>" + "<br>" +
				"Summary: " + summary + "<br>" + "<br>" +
				"Website: " + website + "<br>" + "<br>" +
				"Address: " + address + "<br>" + "<br>" +
				"Region: " + region + "<br>" + "<br>" +
				"Location: " + companyLocation + "<br>" + "<br>" +
				"Representative: " + repName + "<br>" + "<br>" +
				"Position: " + repPosition + "<br>" + "<br>" +
				"Email: " + repEmail + "<br>" + "<br>" +
				"Phone: " + repPhone + "<br>" +"<br>" +
				"Category: " + category + "<br>" +"<br>" +
				"Specialization: " + specialization + "<br>" +"<br>"
		);
	});

	//shift position of Search to the front
	$("#rightWidgetWrapper").prependTo($("#theTable_wrapper"));
	$("#leftWidgetWrapper").prependTo($("#theTable_wrapper"));
	$("#theTable_filter").appendTo($("#leftWidgetWrapper"));


	//shift "search" inside button
	$("#theTable_filter label input").insertAfter($("#theTable_filter label"));
	$("#theTable_filter label button").insertAfter($("#theTable_filter label"));
	$("#theTable_filter label").text("Search");
	$("#theTable_filter label").addClass("access");
	$("#theTable_filter input").insertAfter($("#theTable_filter label"));
	$("#theTable_filter input").attr("id","searchTable");
	$("#theTable_filter label").attr("for","searchTable");
	$("#theTable_filter button span").text("Search");

	//add a dropdown to hide/show the coloumns
	$("#showHideDiv").after($("#theTable_length"));
	$("#showHideButton").on("click",function(){
		if ($("#showHideDropdown").css("display") == "none") {
			$("#showHideDropdown").css("display","block");
		} else {
			$("#showHideDropdown").css("display","none");
		}
	});

	//shift clear button after search button
	$("#clearDiv").insertAfter($("#theTable_filter"));

	// click other area to close the dropdown
	$(document).click(function(e){
		e.stopPropagation();
		var container = $("#showHideDiv");
		//check if the clicked area is dropDown or not
		if (container.has(e.target).length === 0) {
			$('#showHideDropdown').css("display","none");
		}
	})


	// hide certain columns when website is first loaded
	for (var i = 1; i <= 12; i++){
		if (i != 1 && i!= 5 && i != 6 && i!=11){
			$("#theTable tr th:nth-child(" +i+"),#theTable tr td:nth-child("+i+")").css("display","none");
		} else {
			$("#showHideDropdown input:nth-child(" + (1+(3*(i-1))).toString() +")") .prop("checked",true);
		}
	}

	//maintain the show/hide setting for columns
	var maintainColumn = function (){
		for (var i = 1; i <= 12; i++){
			var string_i = i.toString();
			if ($("#showHideDropdown input:nth-child(" + (1+(3*(i-1))).toString() +")").prop("checked") == false) {
				$("#theTable tr th:nth-child(" +string_i+"),#theTable tr td:nth-child("+string_i+")").css("display","none");
			} else {
				$("#theTable tr th:nth-child(" +string_i+"),#theTable tr td:nth-child("+string_i+")").css("display","");
			}
		}
	};

	// when users change the pages, keep the setting
	$(document).on("click", ".paginate_button", maintainColumn);
	$(document).on("keypress",".paginate_button ",maintainColumn);
	$('#theTable thead').on('keypress', 'input', maintainColumn);
	$('#theTable thead').on('change', 'select', maintainColumn);
	$("#theTable_filter").on("click","#tableSearchButton", maintainColumn);
	$('#theTable_filter').on('keyup', 'input', maintainColumn);
	$('#theTable_filter').on('input', 'input', maintainColumn);
	$("#theTable_length").on("change","select",maintainColumn);
	$("#theTable thead").on("click","th",maintainColumn);
	$("#theTable thead").on("keypress","th",maintainColumn);
	$("#clearDiv").on("keypress","button",maintainColumn);
	$("#clearDiv").on("click","button",maintainColumn);


	// allow user to hit enter to check box
	$('#rightWidgetWrapper input:checkbox').keypress(function(e){
		if((e.keyCode ? e.keyCode : e.which) == 13){
			$(this).trigger('click');
		}
	});

	//for clear button: clear all filters and search
	$("#clearButton").click(function(){

		table.columns().every(function(){
			var that = this;
			$('#theTable thead input').each(function(){ //clear text input filter results
				if (that.search() !== "") {
					that.search("").draw();
				}
			});
			$('#theTable thead select').each(function(){ // clear drop down filter results
				if (this.value.substring(0,6) != "Choose"){
					that.search( '' ).draw();
				}
			});
		});

		// clear fitler entries
		$("#theTable thead input").val('');
		// remove "selected" from any options that might already be selected
		$('#theTable thead select option[selected="selected"]').removeAttr('selected')
		// mark the first option as selected
		$("#theTable thead select option:nth-child(1)").attr('selected','selected')
		// clear Search Button
		$('#theTable_filter input').val("");
		table.search($('#theTable_filter input').val()).draw();
	});


	//shift the table into a wrapper for overflow:hidden when screen size gets smaller for responsiveness
	$("#theTable").wrap("<div id='theTableDiv'></div>");


});

// hide the table first and show it when the page finishes loading
$(window).bind("load", function() {
	$("#theTable").css("visibility","visible");
});


// for dropdown to hide/show the columns
function showHideCheck(){
	var currBox = event.target;
	var colNum = $(currBox).attr("data-number");
	if (currBox.checked == false) {
		$("#theTable tr th:nth-child(" +colNum+"),#theTable tr td:nth-child("+colNum+")").css("display","none");
	} else {
		$("#theTable tr th:nth-child(" +colNum+"),#theTable tr td:nth-child("+colNum+")").css("display","");
	}
}
