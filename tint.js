/*
*
*   tint.js
*   Miscellaneous color tools for the web developer.
*   Licensed under the GPLv3. See LICENSE.
*
*/

var tint = {
	convert: {
		hexToRGB: function(hex){
			// Replace "0x" with "#"
			hex.replace('0x','#');

			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
		},

		RGBToHex: function(rgb) {
			return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
		},

		RGBToLinearRGB: function(rgb) {
			var linearRGB = [];
			for (var i=0;i<rgb.length;i++) {
				// Normalize color between 0 (black) and 1 (white)
				var normalizedColor = rgb[i] / 255;

				// Convert to linear RGB
				if (normalizedColor <= 0.03928) {
					linearRGB[i] = normalizedColor / 12.92;
				} else {
					linearRGB[i] = Math.pow(((normalizedColor + 0.055) / 1.055), 2.4);
				}
			}
			return linearRGB;
		}
	},

	getRelativeLuminance: function(color) {
		// Convert sRGB array to linear RGB
		color = this.convert.RGBToLinearRGB(color)

		// Return relative luminance of the color
		// L = 0.2126R + 0.7152G + 0.0722B
		// From: https://en.wikipedia.org/wiki/Relative_luminance
		return relativeLuminance = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
	},

	getContrastRatio: function(color1,color2) {
		// Get relative luminance of colors
		var color1Luminance = this.getRelativeLuminance(color1);
		var color2Luminance = this.getRelativeLuminance(color2);

		// Return contrast ratio
		// Ratio = (L1 + 0.05) / (L2 + 0.05)
		// Where L1 > L2
		return (Math.max(color1Luminance,color2Luminance) + 0.05) / (Math.min(color1Luminance,color2Luminance) + 0.05);
	},

	function randomColor(){
		var color = [],
			min = Math.ceil(0),
			max = Math.floor(255);

		while (color.length < 3) {
			color.push(Math.floor(Math.random() * (max - min + 1)) + min);
		}
		return color;
	}
}
