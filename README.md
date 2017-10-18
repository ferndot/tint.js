# prow.js
Miscellaneous color tools for the web developer.

Documentation
----

#### prow.convert.hexToRGB
Converts **hex to sRGB**
Returns an array of the form [r,g,b] where r, g, and b are integers between 0 and 255
##### Example usage
```javascript
prow.convert.hexToRGB("#fff"); // Returns [ 255, 255, 255 ]
```
Hex can be:
- "fff"
- "ffffff"
- "#fff"
- "#ffffff"
- "0xffffff"

#### prow.convert.RGBToHex
Converts **sRGB to hex** where **rgb** is an **array** of the form [r,g,b] where r, g, and b are integers between 0 and 255
Returns a string of the form "#ffffff"
##### Example usage
```javascript
prow.convert.RGBToHex([255, 255, 255]); // Returns #ffffff
```

#### prow.convert.RGBToLinearRGB
Converts **sRGB to linear RGB** where **rgb** is an **array** of the form [r,g,b] where r, g, and b are integers between 0 and 255
Returns an array of the form [r,g,b] where r, g, and b are decimals between 0 and 1
##### Example usage
```javascript
prow.convert.RGBToLinearRGB([255, 255, 255]); 
// Returns [0.003676507324047436,​​​​​​​​​​ 0.004024717018496307,​​​​ 0.024157632448504756 ]​​​​​
```

#### prow.getRelativeLuminance
Returns a decimal value representing the relative [luminance](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef) of the given color.
Color must be an sRGB array of the form [r,g,b]
##### Example usage
```javascript
prow.getRelativeLuminance([255, 255, 255]); // Returns 0.9873055935982454​​​​​
```

#### prow.getContrastRatio
Returns the contrast ratio of the two given colors in fractional form.
Takes two parameters which must be sRGB arrays of the form [r,g,b]
##### Example usage
```javascript
prow.getContrastRatio([255,253,255], [1, 1, 1]); // Returns ​​​​​20.620931688099795
```

#### prow.randomColor
Returns a random RGB color in the form [r,g,b].
##### Example usage
```javascript
prow.randomColor(); // Returns ​​​​​[242,56,119]
```
