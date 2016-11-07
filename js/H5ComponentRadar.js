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
		ctx.strokeStyle = '#e0e0e0';
		ctx.stroke();
	}
	

	return component;
}