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
					var state = jsonObject.results[i].state_name;
					var phone = jsonObject.results[i].phone;
					var website = jsonObject.results[i].website;
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
					 html.push('<li><span>Name:</span>' + "" + firstname + "" + ' ' + "" + lastname + "" + '</li>');
					 html.push('<li><span>Chamber:</span>' + "" + $.ucfirst(chamber) + "" + '</li>');
					 html.push('<li><span>Party:</span>' + "" + party + "" + '</li>');
					 html.push('<li><span>State:</span>' + "" + state + "" + '</li>');
					 html.push('<li><span>Phone:</span>' + "<a href='tel:"+phone+"'target='new'>" + phone + "</a>" + '</li>');
					 html.push('<li><span>Website:</span>' + "<a href='"+website+"'target='new'>" + website + "</a>" + '</li>');
					if (twitterid === null){
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
    $.ucfirst = function(str) {

        var text = str;


        var parts = text.split(' '),
            len = parts.length,
            i, words = [];
        for (i = 0; i < len; i++) {
            var part = parts[i];
            var first = part[0].toUpperCase();
            var rest = part.substring(1, part.length);
            var word = first + rest;
            words.push(word);

        }

        return words.join(' ');
    };
});
