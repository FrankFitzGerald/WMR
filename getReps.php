<?php
if (isset($_POST['zip'])) {
	find_reps($_POST['zip']);
}

# uses libcurl to return the response body of a GET request on $url
function getResource($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($ch);
	curl_close($ch);

	return $result;
}

function find_reps($zip) {
	$zip_encoded = urlencode($zip);
	// echo $zip_encoded;

	$url = "http://whoismyrepresentative.com/getall_mems.php";
	$url .="?zip=".$zip_encoded;
	$url .="&output=json";
  	// print "<p>$url</p>";

	$feed = getResource($url);
	$jsonObject = json_decode($feed);
	// print_r($jsonObject);

	foreach ($jsonObject->results as $result) {
		$name = $result->name;
		$getlastname = preg_split('/ /', $name);
		find_twitter_username($getlastname[0], $getlastname[1]);
	}

} # find_reps


function find_twitter_username($firstname, $lastname) {
	$lastname_encoded = urlencode($lastname);
	$firstname_encoded = urlencode($firstname);
	// echo $lastname_encoded;
	#insert your own Who's My Representative API KEY here
	// http://services.sunlightlabs.com/api/api.method.format?apikey=YOUR_API_KEY&params
	$api_key = "YOUR_API_KEY"; 
	$url = "http://services.sunlightlabs.com/api/legislators.getList.json";
	$url .= "?apikey=".$api_key;
	$url .= "&firstname=".$firstname_encoded;
	$url .= "&lastname=".$lastname_encoded;
  	// print "<p>$url</p>";

	$feed = getResource($url);
	$jsonObject = json_decode($feed);
	// print_r($jsonObject);
# print <ul> start
	print "<ul>"; 
	foreach ($jsonObject->response as $response) {
		$firstname = $response[0]->legislator->firstname;
		$lastname = $response[0]->legislator->lastname;
		$twitterid = $response[0]->legislator->twitter_id;
		$chamber = $response[0]->legislator->chamber;
		$party = $response[0]->legislator->party;
		$gender = $response[0]->legislator->gender;
		if ($gender === 'M'){
			$gender = 'Sir';
		}else{
			$gender = 'Maam';
		}
		if ($party === 'R'){
			$party = 'Republican';
		}else{
			$party = 'Democrat';
		}
		print '<span>Name:</span><li>'.$firstname.' '.$lastname.'</li>';
		print '<span>Chamber:</span><li>'.ucfirst($chamber).'</li>';
		print '<span>Party:</span><li>'.$party.'</li>';
		if ($twitterid === ''){
			print "<li class='clearfix'><span class='fail_icon'></span> No Twitter, you fail $gender.</li>";
		}else{
			print "<li class='clearfix'><span class='twit_icon'></span> <a href='http://twitter.com/$twitterid' target='new'>@$twitterid</a></li>";
		}
	}
# print <ul> closing
	print "</ul>";


} # find_twitter_username


?>