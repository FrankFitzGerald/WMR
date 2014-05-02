/* ==|== My Javascript =====================================================
   Author: Frank FitzGerald
   ========================================================================== */

$(document).ready(function() {
	$('form').bind('submit',function(e) {
		e.preventDefault();
		$.ajax({
			data: 'zip=' + $("#search input[type='text']").val()+'&output=json&apikey=592705b32fc040f18604970c758ff7a2',
			dataType: 'json',
			type: 'get',
			url: 'https://congress.api.sunlightfoundation.com/legislators/locate',
			success: function(responseData){
				console.log('Success!');
				var feed = responseData;
				var jsonObject = feed;
				console.log('jsonObject ='+eval(jsonObject.results[0].first_name));
				// print_r($jsonObject);
				var html = ['<ul>'];
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
					 html.push('<span>Name:</span><li>' + "" + firstname + "" + ' ' + "" + lastname + "" + '</li>');
					 html.push('<span>Chamber:</span><li>' + "" + ucfirst(chamber) + "" + '</li>');
					 html.push('<span>Party:</span><li>' + "" + party + "" + '</li>');
					if (twitterid === ''){
						 html.push("<li class='clearfix'><span class='fail_icon'></span> No Twitter, you fail " + gender + ".</li>");
					}else{
						 html.push("<li class='clearfix'><span class='twit_icon'></span> <a href='http://twitter.com/" + twitterid + "' target='new'>@" + twitterid + "</a></li>");
					}
				}
			// # print <ul> closing
				 html.push("</ul>");
				$('#main').html(html.join(''));
			},
			error: function(data) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
});
