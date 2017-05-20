$.each( $( "button[name='update-cart']" ), ( index, button ) => {
	$( button ).click( () => {
		let id = button.id;
		let url = '/update-cart/' + id + '/' + $( button ).prev().val();

		window.location = url;
	} );
} );