/* ==|== My Javascript =====================================================
   Author: Frank FitzGerald
   ========================================================================== */

$(document).ready(function() {
	$('form').bind('submit',function(e) {
		e.preventDefault();
		$.ajax({
			data: 'zip=' + $("#search input[type='text']").val()+'&output=json',
			dataType: 'jsonp',
			type: 'get',
			url: 'http://whoismyrepresentative.com/getall_mems.php',
			success: function(responseData) {
				find_reps(responseData);
			},
			error: function(responseData) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
	function find_reps (jsonObject) {
		// var zip_encoded = urlencode(zip);
		// echo $zip_encoded;
	
		// var url = "http://whoismyrepresentative.com/getall_mems.php";
		// url += "?zip=" + "" + zip_encoded;
		// url += "&output=json";
	  	// print "<p>$url</p>";
	
		// var feed = getResource(url);
		// var feed = jsonObject;
		// var jsonObject = json_decode(feed);
		// print_r($jsonObject);
	
		for (var resultKey in jsonObject.results) {		
	                var result = jsonObject.results[resultKey];
			var name = result.name;
			var getlastname = preg_split('/ /', name);
			find_twitter_username(getlastname[0], getlastname[1]);
		}
		$('#main').html(responseData);
	
	} // find_reps
});
