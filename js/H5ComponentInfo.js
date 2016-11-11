/*柱图表组件对象*/

var H5ComponentInfo = function( name, cfg ){
	var component = new H5ComponentBase( name, cfg );
	
	for( var name in cfg.data ){
		var div = $('<div class="info">');
		div.text( `${ name }:${ cfg.data[name] }` );
		component.append(div);
	}

	
	return component;
}