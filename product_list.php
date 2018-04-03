<?php
	//include the database configuration file
	require('db.php');
	$query = "SELECT * FROM products";
	$stmt = $db->prepare($query);
	$stmt->execute();
	$result = $stmt->get_result();
	while ($row = $result->fetch_object()) {
		$output = '	<div class="product" data-id="{{id}}">
									<div class="image">
										<img src="img/products/{{image}}" width="120" alt="{{name}}">
									</div>
									<div class="p-name">
										<span class="product-name">{{name}}</span>
									</div>
									<div class="details">
										<div class="details-inner">
											<strong>{{name}}</strong>
											<br><br>
											<img class="small-img" src="img/products/{{image}}" width="60" alt="{{name}}">
											<br><br>
											<span class="short-desc">{{short}}</span>
										</div>
									</div>
									<div class="specs" hidden>{{specs}}</div>
									<div class="description" hidden>{{description}}</div>
								</div>';
		$output = str_replace('{{id}}', $row->id, $output);
		$output = str_replace('{{image}}', $row->image, $output);
		$output = str_replace('{{name}}', $row->name, $output);
		$output = str_replace('{{short}}', $row->in_short, $output);
		$output = str_replace('{{description}}', $row->in_detail, $output);
		$output = str_replace('{{specs}}', $row->specs, $output);
		echo $output;
	}
?>