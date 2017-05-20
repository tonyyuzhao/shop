$.each( $( "button[name='add-to-cart']" ), ( index, button ) => {
	$( button ).click( () => {
		let id = button.id;
		let url = '/add-to-cart/' + id + '/' + $( button ).prev().val();

		window.location = url;
	} );
} );