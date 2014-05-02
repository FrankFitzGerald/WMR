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
			url: 'getReps.php&output=json',
			success: function(responseData) {
				$('#main').html(responseData);
			},
			error: function(responseData) {
				console.log('the getReps.php ajax call failed');
			}
		});
	});
});
