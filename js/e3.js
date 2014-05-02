/* ==|== My Javascript =====================================================
   Author: Frank FitzGerald
   ========================================================================== */

$(document).ready(function() {
    $('form').bind('submit',function(e) {
		e.preventDefault();
		$.ajax({
			data: 'zip=' + $("#search input[type='text']").val(),
			dataType: 'json',
			type: 'get',
			url: 'http://whoismyrepresentative.com/getall_mems.php?output=json',
			success: function(responseData) {
			// # uses libcurl to return the response body of a GET request on $url
			function getResource (url){
				var ch = curl_init();
				curl_setopt(ch, CURLOPT_URL, url);
				curl_setopt(ch, CURLOPT_RETURNTRANSFER, 1);
				var result = curl_exec(ch);
				curl_close(ch);
			
				return result;
			}
			
			function find_reps (zip) {
				var zip_encoded = urlencode(zip);
				// echo $zip_encoded;
			
				var url = "http://whoismyrepresentative.com/getall_mems.php";
				url += "?zip=" + "" + zip_encoded;
				url += "&output=json";
			  	// print "<p>$url</p>";
			
				var feed = getResource(url);
				var jsonObject = json_decode(feed);
				// print_r($jsonObject);
			
				for (var resultKey in jsonObject.results) {		
			                 var result = jsonObject.results[resultKey];
					var name = result.name;
					var getlastname = preg_split('/ /', name);
					find_twitter_username(getlastname[0], getlastname[1]);
				}
			
			} 
			// # find_reps
			
			
			function find_twitter_username (firstname, lastname) {
				var lastname_encoded = urlencode(lastname);
				var firstname_encoded = urlencode(firstname);
				// echo $lastname_encoded;
				// #insert your own Who's My Representative API KEY here
				// http://services.sunlightlabs.com/api/api.method.format?apikey=YOUR_API_KEY&params
				var api_key = "YOUR_API_KEY"; 
				var url = "http://services.sunlightlabs.com/api/legislators.getList.json";
				url +=  "?apikey=" + "" + api_key;
				url +=  "&firstname=" + "" + firstname_encoded;
				url +=  "&lastname=" + "" + lastname_encoded;
			  	// print "<p>$url</p>";
			
				var feed = getResource(url);
				var jsonObject = json_decode(feed);
				// print_r($jsonObject);
			// # print <ul> start
				 "<ul>"; 
				for (var responseKey in jsonObject.response) {		
			                 var response = jsonObject.response[responseKey];
					firstname = response[0].legislator.firstname;
					lastname = response[0].legislator.lastname;
					var twitterid = response[0].legislator.twitter_id;
					var chamber = response[0].legislator.chamber;
					var party = response[0].legislator.party;
					var gender = response[0].legislator.gender;
					if (gender === 'M'){
						gender = 'Sir';
					}else{
						gender = 'Maam';
					}
					if (party === 'R'){
						party = 'Republican';
					}else{
						party = 'Democrat';
					}
					 '<span>Name:</span><li>' + "" + firstname + "" + ' ' + "" + lastname + "" + '</li>';
					 '<span>Chamber:</span><li>' + "" + ucfirst(chamber) + "" + '</li>';
					 '<span>Party:</span><li>' + "" + party + "" + '</li>';
					if (twitterid === ''){
						 "<li class='clearfix'><span class='fail_icon'></span> No Twitter, you fail " + gender + ".</li>";
					}else{
						 "<li class='clearfix'><span class='twit_icon'></span> <a href='http://twitter.com/" + twitterid + "' target='new'>@" + twitterid + "</a></li>";
					}
				}
			// # print <ul> closing
				 "</ul>";
			
			
			} 
			// # find_twitter_username

				$('#main').html(responseData);
			},
			error: function(responseData) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
});
