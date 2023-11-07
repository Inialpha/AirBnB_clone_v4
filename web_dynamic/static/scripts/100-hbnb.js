$(function () {
	let states = {};
	let cities = {};
	let amenities = {};
	$('input').on('change', function (obj) {
		let i = obj.target;
		if (i.id === 'state') {
			if ($(this).is(':checked')) {
				states[$(this).data('id')] = $(this).data('name')
			} else {
				delete cities[$(this).data('id')]
			}
			$('div.locations h4').text(Object.values(Object.assign({}, states, cities)).sort().join(", "));
		}
		if (i.id === 'city') {
			if ($(this).is(':checked')) {
				cities[$(this).data('id')] = $(this).data('name')
			} else {
				delete cities[$(this).data('id')]
			}
			$('div.locations h4').text(Object.values(Object.assign({}, cities, states)).sort().join(", "));
		}
		if (i.id === 'amenity') {
			if ($(this).is(':checked')) {
				amenities[$(this).data('id')] = $(this).data('name')
			} else {
				delete amenities[$(this).data('id')]
			}
			$('div.amenities h4').text(Object.values(amenities).sort().join(", "));
		}
	});



	$.ajax({
	  type: 'GET',
	  url: 'http://0.0.0.0:5001/api/v1/status/',
	  dataType: 'json',
	  success: function (response) {
	    if (response.status === 'OK') {
	      $('div#api_status').addClass('available');
	    } else {
	      $('div#api_status').removeClass('available');
	    }
	  }
	});

	
	$.ajax({
	  type: 'POST',
	  url: 'http://0.0.0.0:5001/api/v1/places_search/',
	  contentType: 'application/json',
	  data: JSON.stringify({}),
	  success: function (response) {
		  $("section.places").empty();

		  response.forEach((value) => {

			  $('section.places').append(`<article>
		<div class="title_box">
			<h2>${value.name}</h2>
			<div class="price_by_night">
			${value.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">
			${value.max_guest} Guests
			</div>
			<div class="number_rooms">
			${value.number_rooms} Bedrooms</div>
			<div class="number_bathrooms">
			${value.number_bathrooms} Bathroom</div>
			</div>
			<div class="user">
			<b>Owner:</b>
			</div>
			<div class="description">
			${value.description}
			</div>

				  </article>`)
	  });
		}
	});

	$('button').on('click', function () {
	  $.ajax({
	    type: 'POST',
	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
	    data: JSON.stringify({
		    amenities: Object.values(amenities),
		    states: Object.values(states),
		    cities: Object.values(cities)
	    }),
	    contentType: 'application/json',
		  success: function (response) {
		  $("section.places").empty();
			alert(response);
		  response.forEach((value) => {

			  $('section.places').append(`<article>
		<div class="title_box">
			<h2>${value.name}</h2>
			<div class="price_by_night">
			${vaLue.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">
			${value.max_guest} Guests
			</div>
			<div class="number_rooms">
			${value.number_rooms} Bedrooms</div>
			<div class="number_bathrooms">
			${value.number_bathrooms} Bathroom</div>
			</div>
			<div class="user">
			<b>Owner:</b>
			</div>
			<div class="description">
			${value.description}
			</div>

				  </article>`)
		  });
		  }
	});
	});

});
