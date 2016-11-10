/*ring图表组件对象*/

var H5ComponentRing = function( name, cfg ){
	var component = new H5ComponentBase( name, cfg );
	
	var w = cfg.width;
	var h = cfg.height;

	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	$( canvas ).css('zIndex',1);
	component.append( canvas );

	var r = w / 2;

	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	//ctx.lineWidth = .1;
	ctx.arc( r, r, r, 0, Math.PI * 2, false );
	ctx.fill();

	//input data
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	$( canvas ).css('zIndex',2);
	component.append( canvas );

	if(cfg.data.length > 1){  //  
	    cfg.data = [cfg.data[0]];
	}

	var sAngel = Math.PI * 1.5;
	var eAngel = cfg.data[0][1] * Math.PI * 2 + sAngel;
	
	ctx.beginPath();
	ctx.fillStyle = '#ff7676';
	ctx.moveTo( r, r );
	ctx.arc( r, r, r, sAngel, eAngel, false );
	ctx.fill();

	


	//mask
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	$( canvas ).css('zIndex',3);
	component.append( canvas );
	ctx.fillStyle = '#eee';

	//append content
	var mask = $('<div class="mask">');
	var text = $('<div class="text">');

	text.text( cfg.data[0][0] );
	mask.append( text );
	var per = $('<div class="per">');
	per.text( `${cfg.data[0][1] * 100}%` );
	text.append( per );

	if( cfg.data[0][2] ){
		text.css( 'color', cfg.data[0][2] );
	}

	component.append( mask );


	var draw = function( per ){

		ctx.clearRect( 0, 0, w, h );
		ctx.beginPath();
		ctx.moveTo( r, r );
		if( per <= 0 ){
			ctx.arc( r, r, r, 0, Math.PI * 2, false );
			text.css( 'opacity', 0 );
		}else{
			ctx.arc( r, r, r, sAngel, sAngel + Math.PI*2 * per, true );
		}
		
		ctx.fill();

		if( per >= 1){
			text.css( 'opacity', 1 );
		}
	}	

	draw( 0 );

	component.on('onLoad', function(){
		var s = 0;
		for( let i = 0; i < 100; i++ ){
			setTimeout( function(){
				s += .01;
				draw( s );
			}, i * 10 + 500 )
		}
	})

	component.on('onLeave', function(){
		var s = 1;
		for( let i = 0; i < 100; i++ ){
			setTimeout( function(){
				s -= .01;
				draw( s );

			}, i * 10  )
		}
	})
	return component;
}