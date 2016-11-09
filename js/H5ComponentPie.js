/*雷达图表组件对象*/

var H5ComponentPie = function( name, cfg ){
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
	ctx.lineWidth = 1;
	ctx.arc( r, r, r, 0, Math.PI * 2 );
	ctx.fill();
	ctx.stroke();

	//绘制数据层
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	$( canvas ).css('zIndex',2);
	component.append( canvas );

	var colors = ['red','green','blue','darkred','orange'];
	var sAngel = 1.5 * Math.PI;
	var eAngel = 0;
	var aAnger = Math.PI * 2;

	

	var step = cfg.data.length;
	for( var i = 0; i < step; i++ ){
		var item = cfg.data[i];
		var color = item[2] || ( item[2] = colors.pop() );

		eAngel = sAngel + aAnger * item[1]
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;
		ctx.moveTo( r, r );
		ctx.arc( r, r, r, sAngel, eAngel , false );
		ctx.fill();
		ctx.stroke();
		sAngel = eAngel;

		//add text
		var text = $('<div class="text">');
		text.text( cfg.data[i][0] );
		var per = $('<div class="per">');
		per.text(`${cfg.data[i][1] * 100}%`);
		text.append( per );

		var x = r + Math.sin( .5 * Math.PI - sAngel ) * r;
		var y = r + Math.cos( .5 * Math.PI - sAngel ) * r;

		
		
		if( x > w / 2 ){
			text.css( 'left', x / 2 );
		}else{
			text.css( 'right', (w - x) / 2 );
		}
		if( y > h / 2 ){
			text.css( 'top', y / 2 );
		}else{
			text.css( 'bottom', (h - y) / 2 );
		}
		if( cfg.data[i][2] ){
			text.css( 'color', cfg.data[i][2] );
		}
		text.css( 'opacity', 0 );
		component.append( text );
	}

	//加蒙版层
	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	$( canvas ).css('zIndex',3);
	component.append( canvas );
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = .1;


	var draw = function( per ){

		ctx.clearRect( 0, 0, w, h );
		ctx.beginPath();
		
		ctx.moveTo( r, r );
		if( per <= 0 ){
			ctx.arc( r, r, r, 0, Math.PI * 2 );
		}else{
			ctx.arc( r, r, r, sAngel, sAngel + Math.PI * 2 * per, true );
		}
		
		ctx.fill();
		ctx.stroke();
		if( per >= 1 ){
			component.find('.text').css( 'opacity', 1 );
		}
		if( per <= 0 ){
			component.find('.text').css( 'opacity', 0 );
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