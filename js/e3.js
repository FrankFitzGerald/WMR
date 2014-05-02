/* ==|== My Javascript =====================================================
   Author: Frank FitzGerald
   ========================================================================== */

$(document).ready(function() {
	$('form').bind('submit',function(e) {
		e.preventDefault();
		$.ajax({
			data: 'zip=' + $("#search input[type='text']").val()+'&output=json&apikey=592705b32fc040f18604970c758ff7a2',
			dataType: 'application/json',
			crossDomain: true,
			type: 'get',
			url: 'https://congress.api.sunlightfoundation.com/legislators/locate',
			// xhrFields: {
			// 	withCredentials: true
			// },
			success: function(data){
				console.log('Success Bitches!');
				var feed = responseData;
				var jsonObject = json_decode(feed);
				// print_r($jsonObject);
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
				$('#main').html();
			},
			error: function(data) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
});
