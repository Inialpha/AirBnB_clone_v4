$(function () {
	let dict = {};
	$('input').on('change', function () {
		if ($(this).is(':checked')) {
			dict[$(this).data('id')] = $(this).data('name')
		} else {
			delete dict[$(this).data('id')]
		}
		let am = ''
		for (let i in dict) {
			am += dict[i];
			am += ', ';
		}
		$('div.amenities h4').text(am);

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
	  let amenities = {};
	  $('input[type=checkbox]:checked').each(function () {
	    amenities[$(this).attr('data-id')] = $(this).attr('data-name');
	  });

	  $.ajax({
	    type: 'POST',
	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
	    data: JSON.stringify(amenities),
	    contentType: 'application/json',
	    success: function (response) {
	      $('section.places').empty();

	      $.each(response, function(key, value) {
                const articleHTML = `
		<article>
                	<div class="title_box">
                		<h2>${value.name}</h2>
                		<div class="price_by_night">
                			${value.price_by_night}
                		</div>
                	</div>
                	<div class="information">
                		<div class="max_guest">
					${value.max_guest} Guests
                		</div>
                		<div class="number_rooms">
					${value.number_rooms} Bedrooms
				</div>
                		<div class="number_bathrooms">
					${value.number_bathrooms} Bathroom
                		</div>
                	</div>
                	<div class="user">
                		<b>Owner:</b>
                	</div>
                	<div class="description">
                		${value.description}
                	</div>
                </article>`
              $('section.places').append(articleHTML);
	      })
	    },
	    error: function (xhr, status, error) {
	      console.log(error)
	    }
	  });
	});
});
