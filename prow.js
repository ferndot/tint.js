/*
*                                     _     
*       ____  _________ _      __    (_)____
*      / __ \/ ___/ __ \ | /| / /   / / ___/
*     / /_/ / /  / /_/ / |/ |/ /   / (__  ) 
*    / .___/_/   \____/|__/|__(_)_/ /____/  
*   /_/                        /___/        
*
*
*   Miscellaneous color tools.
* 
*   Licensed under the GPLv3. See LICENSE.
*
*   Coded with <3 by Joshua Smith
*
*/

var prow = {
	//
	// getRelativeLuminance()
	//
	// Returns a decimal value representing the relative luminance (http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
	// of the given color.
	// 
	// color is accepted in the following forms:
	// - "#ffffff" (Hexadecimal)
	// - "rgb(255,255,255)" (sRGB)
	// - [255,255,255] (sRGB array)
	//
	getRelativeLuminance: function(color) {
		// Convert color to an sRGB array if needed
		var parsedColor;
		if (Array.isArray(color)) {
			parsedColor = color;
		} else if (color[0]=='#') {
			parsedColor = colors.rgbToArray(colors.toRgb(color));
		} else if (color.substring(0,3)=='rgb') {
			parsedColor = colors.rgbToArray(color);
		}
		
		// Get RGB values:
		// RsRGB = R8bit/255
		// GsRGB = G8bit/255
		// BsRGB = B8bit/255
		// if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
		// if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
		// if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
		var colorRGB = [];
		for (var i=0;i<parsedColor.length;i++) {
			var tempColor = parsedColor[i] / 255;
			if (tempColor <= 0.03928) {
				colorRGB[i] = tempColor / 12.92;
			} else {
				colorRGB[i] = Math.pow(((tempColor + 0.055) / 1.055), 2.4);		
			}
		}
		
		// Get relative luminance of the color
		// L = 0.2126R + 0.7152G + 0.0722B
		// From: https://en.wikipedia.org/wiki/Relative_luminance
		var relativeLuminance = 0.2126 * colorRGB[0] + 0.7152 * colorRGB[1] + 0.0722 * colorRGB[2];

		return relativeLuminance;
	},
	
	//
	// getContrastRatio()
	//
	// Returns the contrast ratio of the two given colors in fractional form.
	// 
	// color1 and color2 are accepted in the following forms:
	// - "#ffffff" (Hexadecimal)
	// - "rgb(255,255,255)" (sRGB)
	// - [255,255,255] (sRGB array)
	//
	getContrastRatio: function(color1,color2) {	
		// Get relative luminance of colors
		var color1Luminance = this.getRelativeLuminance(color1);
		var color2Luminance = this.getRelativeLuminance(color2);
		
		// Determine contrast ratio
		// Ratio = (L1 + 0.05) / (L2 + 0.05)
		// Where L1 > L2
		return (Math.max(color1Luminance,color2Luminance) + 0.05) / (Math.min(color1Luminance,color2Luminance) + 0.05);
	}
}

/* Helper functions */
String.prototype.padZero= function(len, c){
	var s= this, c= c || "0", len= len || 2;
	while(s.length < len) s= c + s;
	return s;
}

var colors={
	colornames:{
		aqua: '#00ffff', black: '#000000', blue: '#0000ff', fuchsia: '#ff00ff',
		gray: '#808080', green: '#008000', lime: '#00ff00', maroon: '#800000',
		navy: '#000080', olive: '#808000', purple: '#800080', red: '#ff0000',
		silver: '#c0c0c0', teal: '#008080', white: '#ffffff', yellow: '#ffff00'
	},
	toRgb: function(c){
		c= '0x'+colors.toHex(c).substring(1);
		c= [(c>> 16)&255, (c>> 8)&255, c&255];
		return 'rgb('+c.join(',')+')';
	},
	toHex: function(c){
		var tem, i= 0, c= c? c.toString().toLowerCase(): '';
		if(/^#[a-f0-9]{3,6}$/.test(c)){
			if(c.length< 7){
				var A= c.split('');
				c= A[0]+A[1]+A[1]+A[2]+A[2]+A[3]+A[3];
			}
			return c;
		}
		if(/^[a-z]+$/.test(c)){
			return colors.colornames[c] || '';
		}
		c= c.match(/\d+(\.\d+)?%?/g) || [];
		if(c.length<3) return '';
		c= c.slice(0, 3);
		while(i< 3){
			tem= c[i];
			if(tem.indexOf('%')!= -1){
				tem= Math.round(parseFloat(tem)*2.55);
			}
			else tem= parseInt(tem);
			if(tem< 0 || tem> 255) c.length= 0;
			else c[i++]= tem.toString(16).padZero(2);
		}
		if(c.length== 3) return '#'+c.join('').toLowerCase();
		return '';
	},
	rgbToArray: function(c) {
		return ((c.slice(4)).slice(0,-1)).split(',');
	}
}