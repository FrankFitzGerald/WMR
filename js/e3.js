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
				var jsonObject = responseData;
				console.log('jsonObject ='+jsonObject.results[0].first_name);
				// print_r($jsonObject);
				var html = [];
				for (var i = 0; i < jsonObject.results.length; i++) {
					html.push('<ul>');
					console.log('Give me Names! = '+jsonObject.results[i].first_name);
					var firstname = jsonObject.results[i].first_name;
					var lastname = jsonObject.results[i].last_name;
					var twitterid = jsonObject.results[i].twitter_id;
					var chamber = jsonObject.results[i].chamber;
					var party = jsonObject.results[i].party;
					var gender = jsonObject.results[i].gender;
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
					 html.push('<span>Chamber:</span><li>' + "" + chamber + "" + '</li>');
					 html.push('<span>Party:</span><li>' + "" + party + "" + '</li>');
					if (twitterid === ''){
						 html.push("<li class='clearfix'><span class='fail_icon'></span> No Twitter, you fail " + gender + ".</li>");
					}else{
						 html.push("<li class='clearfix'><span class='twit_icon'></span> <a href='http://twitter.com/" + twitterid + "' target='new'>@" + twitterid + "</a></li>");
					}
					console.log('Successful Loop!');
					html.push("</ul>");
				}
			// # print <ul> closing
				$('#main').html(html.join(''));
			},
			error: function(data) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
});
