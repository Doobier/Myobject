/*雷达图表组件对象*/

var H5ComponentRadar = function( name, cfg ){
	var component = new H5ComponentBase( name, cfg );
	
	var w = cfg.width;
	var h = cfg.height;

	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	component.append( canvas );

	var r = w / 2;
	var step = cfg.data.length;
	
	var isBlue = false;
	for(var s = 10; s > 0; s-- ){
		ctx.beginPath();
		for( var i = 0; i < step; i++ ){
			var rad = ( Math.PI / 180 * ( -18 + 360 / step * i ) );
			var x = r + Math.cos( rad ) * (r - 5) * (s / 10);
			var y = r + Math.sin( rad ) * (r - 5) * (s / 10);

			//ctx.beginPath();
			//ctx.arc( x, y, 5, 0, Math.PI * 2 );
			//ctx.moveTo( r, r );
			ctx.lineTo( x, y );
			
		}
		ctx.closePath();
		ctx.fillStyle = ( isBlue = !isBlue ) ? '#99c0ff' : '#f1f9ff';
		ctx.fill();
	}
	//绘制三骨头
	for( var i = 0; i < step; i++ ){
		var rad = ( Math.PI / 180 * ( -18 + 360 / step * i ) );
		var x = r + Math.cos( rad ) * (r - 5);
		var y = r + Math.sin( rad ) * (r - 5);

		ctx.beginPath();
		ctx.moveTo( r, r );
		ctx.lineTo( x, y );
		

		var text = $('<div class="text">');
		text.text( cfg.data[i][0] );
		text.css('transition','all .5s ' + (.1 * i) + 's')
		//text.css( 'left', x/2 )
		//text.css( 'top', y/2 )
		if( x > w/2 ){
			text.css( 'left', x / 2 + 5 )
			
		}else{
			text.css( 'right', ( w - x ) / 2 + 5 )
			
		}
		if( y > h/2 ){
			text.css( 'top', y / 2 + 5 )
		}else{
			text.css( 'bottom', ( h - y ) / 2 + 5)
		}

		if( cfg.data[i][2] ){
			text.css( 'color', cfg.data[i][2] );
		}
		text.css( 'opacity',0 );
		component.append( text );
	}
		ctx.strokeStyle = '#e0e0e0';
		ctx.stroke();
		//数据层开发

	var canvas = document.createElement( 'canvas' );
	var ctx = canvas.getContext( '2d' );
	canvas.width = w;
	canvas.height = h;
	component.append( canvas );
	
	ctx.strokeStyle = "#f00";
	var draw = function( per ){
		if( per <=1 ){
			component.find('.text').css('opacity', 0 );
		}
		if( per >=1 ){
			component.find('.text').css('opacity', 1 );
		}
		ctx.clearRect( 0, 0, w, h );
		for( var i = 0; i < step; i++ ){
			
			var rad = ( Math.PI / 180 * ( -18 + 360 / step * i ) );

			var rate = cfg.data[i][1] * per;
			var x = r + Math.cos( rad ) * (r - 5) * rate;
			var y = r + Math.sin( rad ) * (r - 5) * rate;

			ctx.lineTo( x, y );
		}

		ctx.closePath();
		ctx.stroke();

		ctx.fillStyle = '#ff7667';
		for( var i = 0; i < step; i++ ){
			
			var rad = ( Math.PI / 180 * ( -18 + 360 / step * i ) );

			var rate = cfg.data[i][1] * per;
			var x = r + Math.cos( rad ) * (r - 5) * rate;
			var y = r + Math.sin( rad ) * (r - 5) * rate;

			ctx.beginPath();
			ctx.arc( x, y, 5, 0, Math.PI * 2 );
			ctx.fill();
			ctx.closePath();
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