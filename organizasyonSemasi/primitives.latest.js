/**
 * @preserve Basic Primitives orgDiagram v2.1.9
 * Copyright (c) 2013 - 2015 Basic Primitives Inc
 *
 * Non-commercial - Free
 * http://creativecommons.org/licenses/by-nc/3.0/
 *
 * Commercial and government licenses:
 * http://www.basicprimitives.com/pdf/license.pdf
 *
 */


(function () {

	var namespace = function (name) {
		var namespaces = name.split('.'),
			namespace = window,
			index;
		for (index = 0; index < namespaces.length; index += 1) {
			namespace = namespace[namespaces[index]] = namespace[namespaces[index]] || {};
		}
		return namespace;
	};

	namespace("primitives.common");
	namespace("primitives.common.perimeter");
	namespace("primitives.orgdiagram");
	namespace("primitives.famdiagram");
	namespace("primitives.text");
	namespace("primitives.callout");
	namespace("primitives.connector");
	namespace("primitives.shape");
}());
/*
    Function: primitives.common.isNullOrEmpty
    Indicates whether the specified string is null or an Empty string.
    
    Parameters:
	value - The string to test.
    Returns: 
	true if the value is null or an empty string(""); otherwise, false.
*/
primitives.common.isNullOrEmpty = function (value) {
	var result = true,
		string;
	if (value !== undefined && value !== null) {
		string = value.toString();
		if (string.length > 0) {
			result = false;
		}
	}
	return result;
};

/*
    Function: primitives.common.isEmptyObject
    Indicates whether the specified object is empty.
    
    Parameters:
	item - The object to test.
    Returns: 
	true if the item is object otherwise, false.
*/
primitives.common.isEmptyObject = function (item) {
    var key;
    for (key in item) {
        if (item.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

/*
    Function: primitives.common.hashCode
    Returns hash code for specified string value.
    
    Parameters:
	value - The string to calculate hash code.
    Returns:
	int hash code.
*/
primitives.common.hashCode = function (value) {
	var hash = 0,
		character,
		i;
	/*ignore jslint start*/
	if (value.length > 0) {
		for (i = 0; i < value.length; i += 1) {
			character = value.charCodeAt(i);
			hash = ((hash << 5) - hash) + character;
			hash = hash & hash;
		}
	}
	/*ignore jslint end*/
	return hash;
};

/*
    Function: primitives.common.attr
    This method assigns HTML element attributes only if one of them does not match its current value.
    This function helps to reduce number of HTML page layout invalidations.
    
    Parameters:

	element - jQuery selector of element to be updated.
	attr - object containg attributes and new values.
*/
primitives.common.attr = function (element, attr) {
	var attribute,
		value;
	if (element.hasOwnProperty("attrHash")) {
		for (attribute in attr) {
			if (attr.hasOwnProperty(attribute)) {
				value = attr[attribute];
				if (element.attrHash[attribute] != value) {
					element.attrHash[attribute] = value;
					element.attr(attribute, value);
				}
			}
		}
	} else {
		element.attr(attr);
		element.attrHash = attr;
	}
};

/*
    Function: primitives.common.css
    This method assigns HTML element style attributes only if one of them does not match its current value.
    This function helps to reduce number of HTML page layout invalidations.
    
    Parameters:
	element - jQuery selector of element to be updated.
	attr - object containing style attributes.
*/
primitives.common.css = function (element, attr) {
	var attribute,
		value;
	if (element.hasOwnProperty("cssHash")) {
		for (attribute in attr) {
			if (attr.hasOwnProperty(attribute)) {
				value = attr[attribute];
				if (element.cssHash[attribute] != value) {
					element.cssHash[attribute] = value;
					element.css(attribute, value);
				}
			}
		}
	} else {
		element.css(attr);
		element.cssHash = attr;
	}
};

/*
    Function: primitives.common.stopPropogation
    This method uses various approaches used in different browsers to stop event propagation.
    Parameters:
	event - Event to be stopped.
*/
primitives.common.stopPropagation = function (event) {
	if (event.stopPropagation !== undefined) {
		event.stopPropagation();
	} else if (event.cancelBubble !== undefined) {
		event.cancelBubble = true;
	} else if (event.preventDefault !== undefined) {
		event.preventDefault();
	}
};

/*
    Function: primitives.common.indexOf
    Searches array for specified item and returns index (or -1 if not found)
    Parameters:
	vector - An array through which to search.
	item - The value to search for.
    Returns:
	Index of search item or -1 if not found.
*/
primitives.common.indexOf = function (vector, item, compFunc) {
	var index,
		treeItem;
	for (index = 0; index < vector.length; index += 1) {
	    treeItem = vector[index];
	    if (compFunc != null ? compFunc(treeItem, item) : treeItem === item) {
            return index;
	    }
	}
	return -1;
};

primitives.common._supportsSVG = null;

/*
    Function: primitives.common.supportsSVG
    Indicates whether the browser supports SVG graphics.
    
    Returns: 
	true if browser supports SVG graphics.
*/
primitives.common.supportsSVG = function () {
	if (primitives.common._supportsSVG === null) {
		primitives.common._supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
			|| document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
	}
	return primitives.common._supportsSVG;
};

primitives.common._supportsVML = null;

/*
    Function: primitives.common.supportsVML
    Indicates whether the browser supports VML graphics. It is applicable to Internet Explorer only. This graphics mode is depricated in favour of SVG.
    
    Returns: 
	true if browser supports VML graphics.
*/
primitives.common.supportsVML = function () {
	var div,
		shape;
	if (primitives.common._supportsVML === null) {
		primitives.common._supportsVML = false;
		if (!jQuery.support.opacity) {
			div = document.createElement('div');
			div = document.body.appendChild(div);
			div.innerHTML = '<v:shape adj="1" />';
			shape = div.firstChild;
			shape.style.behavior = "url(#default#VML)";
			primitives.common._supportsVML = shape ? typeof shape.adj === "object" : false;
			div.parentNode.removeChild(div);
		}
	}
	return primitives.common._supportsVML;
};

primitives.common._supportsCanvas = null;

/*
    Function: primitives.common.supportsCanvas
    Indicates whether the browser supports HTML Canvas graphics.
    
    Returns: 
	true if browser supports HTML Canvas graphics.
*/
primitives.common.supportsCanvas = function () {
	if (primitives.common._supportsCanvas === null) {
		primitives.common._supportsCanvas = !!window.HTMLCanvasElement;
	}
	return primitives.common._supportsCanvas;
};

primitives.common.createGraphics = function (preferred, widget) {
	var result = null,
		modes,
		key,
		index;

	modes = [preferred];
	for (key in primitives.common.GraphicsType) {
		if (primitives.common.GraphicsType.hasOwnProperty(key)) {
			modes.push(primitives.common.GraphicsType[key]);
		}
	}
	for (index = 0; result === null && index < modes.length; index += 1) {
		switch (modes[index]) {
			case 2/*primitives.common.GraphicsType.VML*/:
				if (primitives.common.supportsVML()) {
					result = new primitives.common.VmlGraphics(widget);
				}
				break;
			case 0/*primitives.common.GraphicsType.SVG*/:
				if (primitives.common.supportsSVG()) {
					result = new primitives.common.SvgGraphics(widget);
				}
				break;
			case 1/*primitives.common.GraphicsType.Canvas*/:
				if (primitives.common.supportsCanvas()) {
					result = new primitives.common.CanvasGraphics(widget);
				}
				break;
		}
	}
	return result;
};

/*
    Function: primitives.common.getColorHexValue
    Converts color string into HEX color string.
    
    Parameters:
	color - regular HTML color string.

    Returns: 
	    Color value in form of HEX string.
*/
primitives.common.getColorHexValue = function (color) {
	var digits,
		red,
		green,
		blue,
		rgb,
		colorIndex,
		colorKey;
	if (color.substr(0, 1) === '#') {
		return color;
	}

	/*ignore jslint start*/
	digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
	/*ignore jslint end*/
	if (digits !== null && digits.length > 0) {
		red = parseInt(digits[2], 10);
		green = parseInt(digits[3], 10);
		blue = parseInt(digits[4], 10);

		/*ignore jslint start*/
		rgb = ((red << 16) | (green << 8) | blue).toString(16);
		/*ignore jslint end*/
		return digits[1] + "000000".substr(0, 6 - rgb.length) + rgb;
	}
	if (primitives.common.ColorHexs === undefined) {
		primitives.common.ColorHexs = {};
		colorIndex = 0;
		for (colorKey in primitives.common.Colors) {
			if (primitives.common.Colors.hasOwnProperty(colorKey)) {
				primitives.common.ColorHexs[colorKey.toUpperCase()] = primitives.common.Colors[colorKey];
				colorIndex += 1;
			}
		}
	}

	return primitives.common.ColorHexs[color.toUpperCase()];
};

/*
    Function: primitives.common.getColorName
        Converts color string into HTML color name string or return hex color string.
    
    Parameters:
	color - regular HTML color string.

    Returns: 
	    HTML Color name or HEX string.
*/
primitives.common.getColorName = function (color) {
	var colorIndex,
		colorKey;
	color = primitives.common.getColorHexValue(color);

	if (primitives.common.ColorNames === undefined) {
		primitives.common.ColorNames = {};
		colorIndex = 0;
		for (colorKey in primitives.common.Colors) {
			if (primitives.common.Colors.hasOwnProperty(colorKey)) {
				primitives.common.ColorNames[primitives.common.Colors[colorKey]] = colorKey;
				colorIndex += 1;
			}
		}
	}

	return primitives.common.ColorNames[color];
};

/*
    Function: primitives.common.getRed
        Gets red value of HEX color string.
    
    Parameters:
	color - HEX string color value.

    Returns: 
	    Int value.
*/
primitives.common.getRed = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(1, 2), 16);
	}
	return null;
};

/*
    Function: primitives.common.getGreen
        Gets green value of HEX color string.

    Parameters:
	color - HEX string color value.
    
    Returns: 
	    Int value.
*/
primitives.common.getGreen = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(3, 2), 16);
	}
	return null;
};

/*
    Function: primitives.common.getBlue
        Gets blue value of HEX color string.
    
    Parameters:
	color - HEX string color value.

    Returns: 
	    Int value.
*/
primitives.common.getBlue = function (color) {
	if (color.substr(0, 1) === '#' && color.length === 7) {
		return parseInt(color.substr(5, 2), 16);
	}
	return null;
};

/*
    Function: primitives.common.beforeOpacity
        Calculates before opacity color value producing color you need after applying opacity.
    
    Parameters:
	color - Color you need after applying opacity.
	opacity - Value of opacity.

    Returns: 
	    HEX color value.
*/
primitives.common.beforeOpacity = function (color, opacity) {
	var common = primitives.common,
		red,
		green,
		blue,
		rgb;
	color = common.getColorHexValue(color);

	red = Math.ceil((common.getRed(color) - (1.0 - opacity) * 255.0) / opacity);
	green = Math.ceil((common.getGreen(color) - (1.0 - opacity) * 255.0) / opacity);
	blue = Math.ceil((common.getBlue(color) - (1.0 - opacity) * 255.0) / opacity);

	/*ignore jslint start*/
	rgb = ((red << 16) | (green << 8) | blue).toString(16);
	/*ignore jslint end*/
	return '#' + "000000".substr(0, 6 - rgb.length) + rgb;
};

/*
    Function: primitives.common.highestContrast
        Calculates contrast between base color and two optional first and second colors
        and returns the one which has highest contrast.
    
    Parameters:
	baseColor - Base color to compare with.
	firstColor - First color.
    secondColor - Second color.

    Returns: 
	    Color value.
*/
primitives.common.highestContrast = function (baseColor, firstColor, secondColor) {
	var result = firstColor,
		common = primitives.common,
		key = baseColor + "," + firstColor  + "," + secondColor;

	if (common.highestContrasts === undefined) {
		common.highestContrasts = {};
	}
	if (common.highestContrasts.hasOwnProperty(key)) {
		result = common.highestContrasts[key];
	} else {
		if (common.luminosity(firstColor, baseColor) < common.luminosity(secondColor, baseColor)) {
			result = secondColor;
		}
		common.highestContrasts[key] = result;
	}
	return result;
};

/*
    Function: primitives.common.luminosity
        Calculates luminosity between two HEX string colors.
    
    Parameters:
	firstColor - First color.
    secondColor - Second color.

    Returns: 
	    Luminosity value
*/
primitives.common.luminosity = function (firstColor, secondColor) {
	var result,
		common = primitives.common,
		first = common.getColorHexValue(firstColor),
		second = common.getColorHexValue(secondColor),
		firstLuminosity =
          0.2126 * Math.pow(common.getRed(first) / 255.0, 2.2)
        + 0.7152 * Math.pow(common.getRed(first) / 255.0, 2.2)
        + 0.0722 * Math.pow(common.getRed(first) / 255.0, 2.2),
		secondLuminosity =
          0.2126 * Math.pow(common.getRed(second) / 255.0, 2.2)
        + 0.7152 * Math.pow(common.getRed(second) / 255.0, 2.2)
        + 0.0722 * Math.pow(common.getRed(second) / 255.0, 2.2);

	if (firstLuminosity > secondLuminosity) {
		result = (firstLuminosity + 0.05) / (secondLuminosity + 0.05);
	}
	else {
		result = (secondLuminosity + 0.05) / (firstLuminosity + 0.05);
	}

	return result;
};

/*
    Function: primitives.common.compareArrays
        Compares non-object non-sorted arrays.
    
    Parameters:
	array1 - First array.
    array2 - Second array.

    Returns: 
	    True if arrays are identical.
*/
primitives.common.compareArrays = function (array1, array2, getKeyFunc) {
    var result = true,
        index, len, value,
        hashArray1;
    if (array1.length != array2.length) {
        result = false;
    } else {
        hashArray1 = {};
        for (index = 0, len = array1.length; index < len; index += 1) {
            value = getKeyFunc != null ? getKeyFunc(array1[index]) : array1[index];
            if (hashArray1.hasOwnProperty(value)) {
                hashArray1[value] += 1;
            } else {
                hashArray1[value] = 1;
            }
        }
        for (index = 0, len = array2.length; index < len; index += 1) {
            value = getKeyFunc != null ? getKeyFunc(array2[index]) : array2[index];
            if (!hashArray1.hasOwnProperty(value)) {
                result = false;
                break;
            } else {
                hashArray1[value] -= 1;
                if (hashArray1[value] < 0) {
                    result = false;
                    break;
                }
            }
        }
    }
    return result;
};
var mouseHandled2 = false;
jQuery(document).mouseup(function () {
    mouseHandled2 = false;
});

jQuery.widget("ui.mouse2", {
    version: "1.10.1",
    options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
    },
    _mouseInit: function (element2) {
        var that = this;

        this.element2 = element2;
        this.element2
			.bind("mousedown." + this.widgetName, function (event) {
			    return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function (event) {
			    if (true === jQuery.data(event.target, that.widgetName + ".preventClickEvent")) {
			        jQuery.removeData(event.target, that.widgetName + ".preventClickEvent");
			        event.stopImmediatePropagation();
			        return false;
			    }
			});

        this.started = false;
    },

    // make sure destroying one instance of mouse doesn't mess with
    // other instances of mouse
    _mouseDestroy: function () {
        this.element2.unbind("." + this.widgetName);
        if (this._mouseMoveDelegate) {
            jQuery(document)
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        }
    },

    _mouseDown: function (event) {
        // don't let more than one widget handle mouseStart
        if (mouseHandled2) { return; }

        // we may have missed mouseup (out of window)
        (this._mouseStarted && this._mouseUp(event)); //ignore jslint

        this._mouseDownEvent = event;

        var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? jQuery(event.target).closest(this.options.cancel).length : false);
        if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
            return true;
        }

        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(function () { //ignore jslint
                that.mouseDelayMet = true;
            }, this.options.delay);
        }

        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
            this._mouseStarted = (this._mouseStart(event) !== false);
            if (!this._mouseStarted) {
                event.preventDefault();
                return true;
            }
        }

        // Click event may never have fired (Gecko & Opera)
        if (true === jQuery.data(event.target, this.widgetName + ".preventClickEvent")) {
            jQuery.removeData(event.target, this.widgetName + ".preventClickEvent");
        }

        // these delegates are required to keep context
        this._mouseMoveDelegate = function (event) {
            return that._mouseMove(event);
        };
        this._mouseUpDelegate = function (event) {
            return that._mouseUp(event);
        };
        jQuery(document)
			.bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
			.bind("mouseup." + this.widgetName, this._mouseUpDelegate);

        event.preventDefault();

        mouseHandled2 = true;
        return true;
    },

    _mouseMove: function (event) {
        // IE mouseup check - mouseup happened when mouse was out of window
        if (jQuery.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) {
            return this._mouseUp(event);
        }

        if (this._mouseStarted) {
            this._mouseDrag(event);
            return event.preventDefault();
        }

        if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
            this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
            (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));//ignore jslint
        }

        return !this._mouseStarted;
    },

    _mouseUp: function (event) {
        jQuery(document)
			.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
			.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);

        if (this._mouseStarted) {
            this._mouseStarted = false;

            if (event.target === this._mouseDownEvent.target) {
                jQuery.data(event.target, this.widgetName + ".preventClickEvent", true);
            }

            this._mouseStop(event);
        }

        return false;
    },

    _mouseDistanceMet: function (event) {
        return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
    },

    _mouseDelayMet: function (/* event */) {
        return this.mouseDelayMet;
    },

    // These are placeholder methods, to be overriden by extending plugin
    _mouseStart: function (/* event */) { },
    _mouseDrag: function (/* event */) { },
    _mouseStop: function (/* event */) { },
    _mouseCapture: function (/* event */) { return true; }
});
/*
    Enum: primitives.common.AdviserPlacementType
        Defines item placement in tree relative to parent.
    
    Auto - Layout manager defined.
    Left - Item placed on the left side of parent.
    Right - Item placed on the right side of parent.
*/
primitives.common.AdviserPlacementType =
{
	Auto: 0,
	Left: 2,
	Right: 3
};

primitives.orgdiagram.AdviserPlacementType = primitives.common.AdviserPlacementType;
/*
    Enum: primitives.common.VerticalAlignmentType
    Defines text label alignment inside text box boundaries.
    
    Top - Positined at the top of text box
    Middle - Aligned to the middle
    Bottom - Aligned to the bottom of text box
*/
primitives.common.VerticalAlignmentType =
{
	Top: 0,
	Middle: 1,
	Bottom: 2
};
primitives.common.VectorRelationType =
{
    None: 0,
    Null: 1,
	Collinear: 2,
	Opposite: 3
};
/*
    Enum: primitives.common.UpdateMode
        Defines redraw mode of diagram.
    
    Recreate - Forces widget to make a full chart redraw. It is equivalent to initial chart creation. 
    It removes everything from chart layout and recreares all elements again. For example when you 
    open chart in jQuery UI dDialog you have to use this mode, since jQuery UI invalidates VML graphics elements in the DOM, so
    the only way to update chart is to recreate its contents.
    Refresh - This update mode is optimized for widget fast redraw caused by resize or changes of 
	next options: <primitives.orgdiagram.Config.items>, <primitives.orgdiagram.Config.cursorItem> 
	or <primitives.orgdiagram.Config.selectedItems>.
    PositonHighlight - This update mode redraws only <primitives.orgdiagram.Config.highlightItem>.

    See Also:
      <primitives.orgdiagram.Config.update>
*/
primitives.common.UpdateMode =
{
	Recreate: 0,
	Refresh: 1,
	PositonHighlight: 2
};

primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;
/*
    Enum: primitives.text.TextOrientationType
        Defines label orientation type.
    
    Horizontal - Regular horizontal text.
    RotateLeft - Rotate all text 90 degree.
    RotateRight - Rotate all text 270 degree.
*/
primitives.text.TextOrientationType =
{
	Horizontal: 0,
	RotateLeft: 1,
	RotateRight: 2,
	Auto: 3
};
primitives.common.SideFlag =
{
	Top: 1,
	Right: 2,
	Bottom: 4,
	Left: 8
};
/*
    Enum: primitives.common.ShapeType
        Defines shape type.
    
	Rectangle - rectangle
	Oval - oval
	Triangle - triangle
	CrossOut - cross out
	Circle - circle
	Rhombus - rhombus
    Wedge - wedge
	FramedOval - Framed Oval
	FramedTriangle - Framed Triangle
	FramedWedge - Framed Wedge
    FramedRhombus - Framed Rhombus
*/
primitives.common.ShapeType =
{
	Rectangle: 0,
	Oval: 1,
	Triangle: 2,
	CrossOut: 3,
	Circle: 4,
	Rhombus: 5,
	Wedge: 7,
	FramedOval: 8,
	FramedTriangle: 9,
	FramedWedge: 10,
    FramedRhombus: 11,
    None: 6
};
/*
    Enum: primitives.common.SelectionPathMode
        Defines the display mode for items between root item of diagram and selected items.
    
    None - Selection path items placed and sized as regular diagram items.
    FullStack - Selection path items are shown in normal template mode.
*/
primitives.common.SelectionPathMode =
{
	None: 0,
	FullStack: 1
};

primitives.orgdiagram.SelectionPathMode = primitives.common.SelectionPathMode;
primitives.common.SegmentType =
{
	Line: 0,
	Move: 1,
	QuadraticArc: 2,
	CubicArc: 3,
	Dot: 4
};
/*
    Enum: primitives.common.RenderingMode
    This enumeration is used as option in arguments of rendering events.
    It helps to tell template initialization stage, 
    for example user can widgitize some parts of template on create
    and update and refresh them in template update stage.
    
    Create - Template is just created.
    Update - Template is reused and update needed.
*/
primitives.common.RenderingMode =
{
	Create: 0,
	Update: 1
};
/*
    Enum: primitives.common.PlacementType
        Defines element placement relative to rectangular area.
    
    Auto - Depends on implementation
    Left - Left side
    Top - Top side
    Right - Right side
    Bottom - Bottom side
    TopLeft - Top left side
    TopRight - Top right side
    BottomLeft - Bottom left side
    BottomRight - Bottom right side
	LeftTop - Left Top side
	LeftBottom - Left Bottom side
	RightTop - Right Top side
    RightBottom - Right Bottom side
*/
primitives.common.PlacementType =
{
	Auto: 0,
	TopLeft: 8,
	Top: 1,
	TopRight: 2,
	RightTop: 11,
	Right: 3,
	RightBottom: 12,
	BottomRight: 4,
	Bottom: 5,
	BottomLeft: 6,
	LeftBottom: 10,
	Left: 7,
	LeftTop: 9
};
/*
    Enum: primitives.common.PageFitMode
        Defines diagram auto fit mode.
    
    None - All diagram items are shown in normal template mode.
    PageWidth - Diagram tries to layout and auto size items in order to fit diagram into available page width.
    PageHeight - Diagram tries to layout and auto size items in order to fit diagram into available page height.
    FitToPage - Diagram tries to layout and auto size items in order to fit diagram into available page size.
    PrintPreview - Enable chart print preview mode. In this mode chart draws grid of pages in the background and aligns items, so they are not cut by page boundaries. 
    AutoSize - Chart sets its placeholder div size to fit its contents without minimizing items.
*/
primitives.common.PageFitMode =
{
	None: 0,
	PageWidth: 1,
	PageHeight: 2,
	FitToPage: 3,
	PrintPreview: 4,
    AutoSize: 5
};

primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;
/*
    Enum: primitives.common.OrientationType
        Defines diagram orientation type.
    
    Top - Vertical orientation having root item at the top.
	Bottom - Vertical orientation having root item at the bottom.
    Left - Horizontal orientation having root item on the left.
    Right - Horizontal orientation having root item on the right.
*/
primitives.common.OrientationType =
{
	Top: 0,
	Bottom: 1,
	Left: 2,
	Right: 3
};

primitives.orgdiagram.OrientationType = primitives.common.OrientationType;
/*
    Enum: primitives.common.LineType
        Defines type of line pattern. Dash and dot intervals depend on line width. 
    
    Solid - Regular solid line.
    Dotted - Dots.
    Dashed - Dashes.
*/
primitives.common.LineType =
{
	Solid: 0,
	Dotted: 1,
	Dashed: 2
};
/*
    Enum: primitives.common.Visibility
        Defines nodes visibility mode.
    
    Auto - Auto select best visibility mode.
    Normal - Show node in normal template mode.
    Dot - Show node as dot.
    Line - Show node as line.
    Invisible - Make node invisible.

    See Also:

      <primitives.orgdiagram.Config.minimalVisibility>
*/
primitives.common.Visibility =
{
	Auto: 0,
	Normal: 1,
	Dot: 2,
	Line: 3,
	Invisible: 4
};
primitives.common.Layers =
{
    BackgroundAnnotations: 1,
    Connector: 2,
	Highlight: 3,
	Marker: 4,
	Label : 5,
	Cursor: 6,
	Item: 7,
	ForegroundAnnotations: 8,
	Annotation: 9,
	Controls: 10
};
/*
    Enum: primitives.orgdiagram.ItemType
        Defines diagram item type.
    
    Regular - Regular item.
    Assistant - Child item which is placed at separate level above all other children, but below parent item. It has connection on its side.
    Adviser - Child item which is placed at the same level as parent item. It has connection on its side.
    SubAssistant - Child item which is placed at separate level above all other children, but below parent item.  It has connection on its top.
    SubAdviser - Child item placed at the same level as parent item. It has connection on its top.
    GeneralPartner - Child item placed at the same level as parent item and visually grouped with it together via sharing common parent and children.
	LimitedPartner - Child item placed at the same level as parent item and visually grouped with it via sharing common children.
	AdviserPartner - Child item placed at the same level as parent item. It has connection on its side. It is visually grouped with it via sharing common children.
*/
primitives.orgdiagram.ItemType =
{
	Regular: 0,
	Assistant: 1,
	Adviser: 2,
	SubAssistant: 4,
	SubAdviser: 5,
	GeneralPartner: 6,
	LimitedPartner: 7,
	AdviserPartner: 8
};
/*
    Enum: primitives.common.HorizontalAlignmentType
    Defines text label alignment inside text box boundaries.
    
    Center - Positooned in the middle of the text box
    Left - Aligned to the begging of the text box
    Right - Aligned to the end of text box
*/
primitives.common.HorizontalAlignmentType =
{
	Center: 0,
	Left: 1,
	Right: 2
};
/*
    Enum: primitives.common.GroupByType
        Defines objects gravity in chart.
    
    Parents - To parents.
    Children - To children.
*/
primitives.common.GroupByType =
{
	None: 0,
	Parents: 1,
	Children: 2
};
/*
    Enum: primitives.ocommon.GraphicsType
        Graphics type. 
    
    VML - Vector Markup Language. It is only graphics mode available in IE6, IE7 and IE8.
    SVG - Scalable Vector Graphics. Proportionally scales on majority of device. It is not available on Android 2.3 devices and earlier.
    Canvas - HTML canvas graphics. It is available everywhere except IE6, IE7 and IE8. It requires widget redraw after zooming page.
*/
primitives.common.GraphicsType =
{
	SVG: 0,
	Canvas: 1,
	VML: 2
};
/*
    Enum: primitives.common.Enabled
        Defines option state.
    
    Auto - Option state is auto defined.
    True - Enabled.
    False - Disabled.
*/
primitives.common.Enabled =
{
	Auto: 0,
	True: 1,
	False: 2
};
/*
    Enum: primitives.common.ElbowType
        Defines type of connector line elbow style.
    
    Dot - Two lines intersection marked with dot.
    Angular - Squared connection has angular .
    Dashed - Dashes.
*/
primitives.common.ElbowType =
{
    None: 0,
    Dot: 1,
    Bevel: 2,
	Round: 3
};
/*
    Enum: primitives.common.ConnectorType
        Defines diagram connectors style for dot and line elements.
    
    Squared - Connector lines use only right angles.
    Angular - Connector lines use angular lines comming from common vertex.
    Curved - Connector lines are splines comming from common vertex.
*/
primitives.common.ConnectorType =
{
	Squared: 0,
	Angular: 1,
	Curved: 2
};

primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;
primitives.common.ConnectorStyleType =
{
    Extra: 0,
    Regular: 1,
    Highlight: 2
};
/*
    Enum: primitives.common.ConnectorShapeType
        Defines connector shape style between two rectangles.
    
    SingleLine - Single line.
    DoubleLine - Double line.
*/
primitives.common.ConnectorShapeType =
{
	OneWay: 0,
	TwoWay: 1
};
/*
    Enum: primitives.common.ConnectorLabelPlacementType
    Defines connector label placement.
    
    
    From - Place at the "from" rectangle
    Between - Place along connector line, between rectangles
    To - Place at "to" rectangle
*/
primitives.common.ConnectorLabelPlacementType =
{
	From: 0,
	Between: 1,
	To: 2
};
/*
    Enum: primitives.common.Colors
        Named colors.

*/
primitives.common.Colors =
{
	AliceBlue: "#f0f8ff",
	AntiqueWhite: "#faebd7",
	Aqua: "#00ffff",
	Aquamarine: "#7fffd4",
	Azure: "#f0ffff",

	Beige: "#f5f5dc",
	Bisque: "#ffe4c4",
	Black: "#000000",
	BlanchedAlmond: "#ffebcd",
	Blue: "#0000ff",
	BlueViolet: "#8a2be2",
	Brown: "#a52a2a",
	BurlyWood: "#deb887",
	Bronze: "#cd7f32",

	CadetBlue: "#5f9ea0",
	ChartReuse: "#7fff00",
	Chocolate: "#d2691e",
	Coral: "#ff7f50",
	CornflowerBlue: "#6495ed",
	Cornsilk: "#fff8dc",
	Crimson: "#dc143c",
	Cyan: "#00ffff",
	DarkBlue: "#00008b",
	DarkCyan: "#008b8b",
	DarkGoldenrod: "#b8860b",
	DarkGray: "#a9a9a9",
	DarkGreen: "#006400",
	DarkKhaki: "#bdb76b",
	DarkMagenta: "#8b008b",
	DarkOliveGreen: "#556b2f",
	Darkorange: "#ff8c00",
	DarkOrchid: "#9932cc",
	DarkRed: "#8b0000",
	DarkSalmon: "#e9967a",
	DarkSeaGreen: "#8fbc8f",
	DarkSlateBlue: "#483d8b",
	DarkSlateGray: "#2f4f4f",
	DarkTurquoise: "#00ced1",
	DarkViolet: "#9400d3",
	DeepPink: "#ff1493",
	DeepSkyBlue: "#00bfff",
	DimGray: "#696969",
	DodgerBlue: "#1e90ff",

	FireBrick: "#b22222",
	FloralWhite: "#fffaf0",
	ForestGreen: "#228b22",
	Fuchsia: "#ff00ff",

	Gainsboro: "#dcdcdc",
	GhostWhite: "#f8f8ff",
	Gold: "#ffd700",
	Goldenrod: "#daa520",
	Gray: "#808080",
	Green: "#008000",
	GreenYellow: "#adff2f",

	Honeydew: "#f0fff0",
	Hotpink: "#ff69b4",

	IndianRed: "#cd5c5c",
	Indigo: "#4b0082",
	Ivory: "#fffff0",
	Khaki: "#f0e68c",

	Lavender: "#e6e6fa",
	LavenderBlush: "#fff0f5",
	Lawngreen: "#7cfc00",
	Lemonchiffon: "#fffacd",
	LightBlue: "#add8e6",
	LightCoral: "#f08080",
	LightCyan: "#e0ffff",
	LightGoldenrodYellow: "#fafad2",

	LightGray: "#d3d3d3",
	LightGreen: "#90ee90",
	LightPink: "#ffb6c1",
	LightSalmon: "#ffa07a",
	LightSeaGreen: "#20b2aa",
	LightSkyBlue: "#87cefa",
	LightSlateGray: "#778899",
	LightSteelBlue: "#b0c4de",

	LightYellow: "#ffffe0",
	Lime: "#00ff00",
	Limegreen: "#32cd32",
	Linen: "#faf0e6",

	Magenta: "#ff00ff",
	Maroon: "#800000",
	MediumAquamarine: "#66cdaa",
	MediumBlue: "#0000cd",
	MediumOrchid: "#ba55d3",
	MediumPurple: "#9370d8",
	MediumSeaGreen: "#3cb371",
	MediumSlateBlue: "#7b68ee",

	MediumSpringGreen: "#00fa9a",
	MediumTurquoise: "#48d1cc",
	MediumVioletRed: "#c71585",
	MidnightBlue: "#191970",
	MintCream: "#f5fffa",
	MistyRose: "#ffe4e1",
	Moccasin: "#ffe4b5",

	NavajoWhite: "#ffdead",
	Navy: "#000080",

	Oldlace: "#fdf5e6",
	Olive: "#808000",
	Olivedrab: "#6b8e23",
	Orange: "#ffa500",
	OrangeRed: "#ff4500",
	Orchid: "#da70d6",

	PaleGoldenRod: "#eee8aa",
	PaleGreen: "#98fb98",
	PaleTurquoise: "#afeeee",
	PaleVioletRed: "#d87093",
	Papayawhip: "#ffefd5",
	Peachpuff: "#ffdab9",
	Peru: "#cd853f",
	Pink: "#ffc0cb",
	Plum: "#dda0dd",
	PowderBlue: "#b0e0e6",
	Purple: "#800080",

	Red: "#ff0000",
	RosyBrown: "#bc8f8f",
	RoyalBlue: "#4169e1",

	SaddleBrown: "#8b4513",
	Salmon: "#fa8072",
	SandyBrown: "#f4a460",
	SeaGreen: "#2e8b57",
	Seashell: "#fff5ee",
	Sienna: "#a0522d",
	Silver: "#c0c0c0",
	SkyBlue: "#87ceeb",
	SlateBlue: "#6a5acd",
	SlateGray: "#708090",
	Snow: "#fffafa",
	SpringGreen: "#00ff7f",
	SteelBlue: "#4682b4",

	Tan: "#d2b48c",
	Teal: "#008080",
	Thistle: "#d8bfd8",
	Tomato: "#ff6347",
	Turquoise: "#40e0d0",

	Violet: "#ee82ee",

	Wheat: "#f5deb3",
	White: "#ffffff",
	WhiteSmoke: "#f5f5f5",

	Yellow: "#ffff00",
	YellowGreen: "#9acd32"
};
/*
    Enum: primitives.common.ChildrenPlacementType
        Defines children placement shape.
    
    Auto - Children placement auto defined.
    Vertical - Children form vertical column.
    Horizontal - Children placed horizontally.
    Matrix - Children placed in form of matrix.
*/
primitives.common.ChildrenPlacementType =
{
	Auto: 0,
	Vertical: 1,
	Horizontal: 2,
	Matrix: 3
};

primitives.orgdiagram.ChildrenPlacementType = primitives.common.ChildrenPlacementType;
/*
    Enum: primitives.common.AnnotationType
        Defines type of annotation object.
    
    Connector - Connector lines between two rectangular areas.
    Shape - Shape around rectanglur area.
    HighlightPath - Use highlight properties for connector lines between items.
*/
primitives.common.AnnotationType =
{
	Connector: 0,
	Shape: 1,
	HighlightPath: 2,
	Label: 3,
    Background: 4
};
primitives.common.LabelType =
{
	Regular: 0,
	Dummy: 1,
	Fixed: 2
};
/*
    Enum: primitives.common.ZOrderType
        Defines elements Z order. This option is used to place annotations relative to chart.
    
    Auto - Auto selects best order depending on type of element.
    Background - Place element in chart background.
    Foreground - Place element into foreground.
*/
primitives.common.ZOrderType =
{
	Auto: 0,
	Background: 1,
	Foreground: 2
};
/*
    Class: primitives.common.RenderEventArgs
	    Rendering event details class.
*/
primitives.common.RenderEventArgs = function () {
	/*
	Property: element
	    jQuery selector referencing template's root element.
    */
	this.element = null;

	/*
	Property: context
	    Reference to item.
    */
	this.context = null;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
    */
	this.templateName = null;

	/*
	Property: renderingMode
	    This option indicates current template state.

    Default:
        <primitives.common.RenderingMode.Update>

	See also:
	    <primitives.common.RenderingMode>
    */
	this.renderingMode = null;

	/*
	Property: isCursor
	    Rendered item is cursor.
    */
	this.isCursor = false;

	/*
	Property: isSelected
	    Rendered item is selected.
    */
	this.isSelected = false;
};
primitives.common.BaseShape = function () {

};


primitives.common.BaseShape.prototype._getLabelPosition = function (x, y, width, height, labelWidth, labelHeight, labelOffset, labelPlacement) {
    var result = null;
    switch (labelPlacement) {
        case 1/*primitives.common.PlacementType.Top*/:
            result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
            break;
        case 2/*primitives.common.PlacementType.TopRight*/:
            result = new primitives.common.Rect(x + width - labelWidth, y - labelOffset - labelHeight, labelWidth, labelHeight);
            break;
        case 8/*primitives.common.PlacementType.TopLeft*/:
            result = new primitives.common.Rect(x, y - labelOffset - labelHeight, labelWidth, labelHeight);
            break;
        case 3/*primitives.common.PlacementType.Right*/:
            result = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
            break;
        case 11/*primitives.common.PlacementType.RightTop*/:
            result = new primitives.common.Rect(x + width + labelOffset, y, labelWidth, labelHeight);
            break;
        case 12/*primitives.common.PlacementType.RightBottom*/:
            result = new primitives.common.Rect(x + width + labelOffset, y + height - labelHeight, labelWidth, labelHeight);
            break;
        case 4/*primitives.common.PlacementType.BottomRight*/:
            result = new primitives.common.Rect(x + width - labelWidth, y + height + labelOffset, labelWidth, labelHeight);
            break;
        case 6/*primitives.common.PlacementType.BottomLeft*/:
            result = new primitives.common.Rect(x, y + height + labelOffset, labelWidth, labelHeight);
            break;
        case 7/*primitives.common.PlacementType.Left*/:
            result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
            break;
        case 9/*primitives.common.PlacementType.LeftTop*/:
            result = new primitives.common.Rect(x - labelWidth - labelOffset, y, labelWidth, labelHeight);
            break;
        case 10/*primitives.common.PlacementType.LeftBottom*/:
            result = new primitives.common.Rect(x - labelWidth - labelOffset, y + height - labelHeight, labelWidth, labelHeight);
            break;
        case 0/*primitives.common.PlacementType.Auto*/: //ignore jslint
        case 5/*primitives.common.PlacementType.Bottom*/: //ignore jslint
        default: //ignore jslint
            result = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
            break;
    }
    return result;
};

primitives.common.BaseShape.prototype._betweenPoint = function (first, second) {
    return new primitives.common.Point((first.x + second.x) / 2, (first.y + second.y) / 2);
};

primitives.common.BaseShape.prototype._offsetPoint = function (first, second, offset) {
    var result = null,
        distance = first.distanceTo(second);

    if (distance == 0 || offset == 0) {
        result = new primitives.common.Point(first);
    } else {
        result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
    }
    return result;
};
primitives.common.Callout = function (graphics) {
	this.m_graphics = graphics;

	this.pointerPlacement = 0/*primitives.common.PlacementType.Auto*/;
	this.cornerRadius = "10%";
	this.offset = 0;
	this.opacity = 1;
	this.lineWidth = 1;
	this.pointerWidth = "10%";
	this.borderColor = "#000000"/*primitives.common.Colors.Black*/;
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.fillColor = "#d3d3d3"/*primitives.common.Colors.LightGray*/;

	this.m_map = [[8/*primitives.common.PlacementType.TopLeft*/, 7/*primitives.common.PlacementType.Left*/, 6/*primitives.common.PlacementType.BottomLeft*/],
                [1/*primitives.common.PlacementType.Top*/, null, 5/*primitives.common.PlacementType.Bottom*/],
                [2/*primitives.common.PlacementType.TopRight*/, 3/*primitives.common.PlacementType.Right*/, 4/*primitives.common.PlacementType.BottomRight*/]
	];
};

primitives.common.Callout.prototype = new primitives.common.BaseShape();

primitives.common.Callout.prototype.draw = function (snapPoint, position) {
	position = new primitives.common.Rect(position).offset(this.offset);

	var pointA = new primitives.common.Point(position.x, position.y),
	pointB = new primitives.common.Point(position.right(), position.y),
	pointC = new primitives.common.Point(position.right(), position.bottom()),
	pointD = new primitives.common.Point(position.left(), position.bottom()),
	snapPoints = [null, null, null, null, null, null, null, null],
	points = [pointA, pointB, pointC, pointD],
	radius = this.m_graphics.getPxSize(this.cornerRadius, Math.min(pointA.distanceTo(pointB), pointB.distanceTo(pointC))),
	placementType,
	point,
	index,
	attr,
    linePaletteItem,
    buffer,
    polyline;

	attr = {};
	if (this.fillColor !== null) {
	    attr.fillColor = this.fillColor;
	    attr.opacity = this.opacity;
	}
	if (this.lineColor !== null) {
	    attr.lineColor = this.borderColor;
	}
	attr.lineWidth = this.lineWidth;
	attr.lineType = this.lineType;

	linePaletteItem = new primitives.common.PaletteItem(attr);
	buffer = new primitives.common.PolylinesBuffer();
	polyline = buffer.getPolyline(linePaletteItem);

	if (snapPoint !== null) {
		placementType = (this.pointerPlacement === 0/*primitives.common.PlacementType.Auto*/) ? this._getPlacement(snapPoint, pointA, pointC) : this.pointerPlacement;
		if (placementType !== null) {
			snapPoints[placementType] = snapPoint;
		}
	}

	for (index = 0; index < points.length; index += 1) {
	    this._drawSegment(polyline, points[0], points[1], points[2], this.pointerWidth, radius, snapPoints[1], snapPoints[2]);
		point = points.shift();
		points.push(point);
		point = snapPoints.shift();
		snapPoints.push(point);
		point = snapPoints.shift();
		snapPoints.push(point);
	}

	this.m_graphics.polylinesBuffer(buffer);
};

primitives.common.Callout.prototype._getPlacement = function (point, point1, point2) {
	var row = null,
		column = null;
	if (point.x < point1.x) {
		row = 0;
	}
	else if (point.x > point2.x) {
		row = 2;
	}
	else {
		row = 1;
	}
	if (point.y < point1.y) {
		column = 0;
	}
	else if (point.y > point2.y) {
		column = 2;
	}
	else {
		column = 1;
	}
	return this.m_map[row][column];
};

primitives.common.Callout.prototype._drawSegment = function (polyline, pointA, pointB, pointC, base, radius, sideSnapPoint, cornerSnapPoint) {
	var pointA1 = this._offsetPoint(pointA, pointB, radius),
		pointB1 = this._offsetPoint(pointB, pointA, radius),
		pointB2 = this._offsetPoint(pointB, pointC, radius),
		pointS,
		pointS1,
		pointS2;

	base = this.m_graphics.getPxSize(base, pointA.distanceTo(pointB) / 2.0);

	if (polyline.length() == 0) {
	    polyline.addSegment(new primitives.common.MoveSegment(pointA1));
	}
	if (sideSnapPoint !== null) {
		pointS = this._betweenPoint(pointA, pointB);
		pointS1 = this._offsetPoint(pointS, pointA, base);
		pointS2 = this._offsetPoint(pointS, pointB, base);
		polyline.addSegment(new primitives.common.LineSegment(pointS1));
		polyline.addSegment(new primitives.common.LineSegment(sideSnapPoint));
		polyline.addSegment(new primitives.common.LineSegment(pointS2));
	}

	polyline.addSegment(new primitives.common.LineSegment(pointB1));
	if (cornerSnapPoint !== null) {
	    polyline.addSegment(new primitives.common.LineSegment(cornerSnapPoint));
	    polyline.addSegment(new primitives.common.LineSegment(pointB2));
	}
	else {
	    polyline.addSegment(new primitives.common.QuadraticArcSegment(pointB, pointB2));
	}
};
primitives.common.Connector = function (graphics) {
	this.m_graphics = graphics;
	this.transform = null;

	this.orientationType = 0/*primitives.common.OrientationType.Top*/;
	this.panelSize = null;
	this.connectorShapeType = 1/*primitives.common.ConnectorShapeType.TwoWay*/;
	this.offset = 0;
	this.lineWidth = 1;
	this.labelOffset = 4;
	this.labelSize = new primitives.common.Size(60, 30);
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
	this.color = "#000000"/*primitives.common.Colors.Black*/;
	this.hasLabel = false;
	this.labelTemplate = null;
	this.labelTemplateHashCode = null;
};

primitives.common.Connector.prototype = new primitives.common.BaseShape();

primitives.common.Connector.prototype.draw = function (fromRect, toRect, uiHash) {
    var fromPoint,
        toPoint,
        connectorRect,
        index, len,
        offsets, tempOffset,
        invertX, invertY,
        linesOffset = this.lineWidth * 6,
        labelSize,
        labelPlacement,
        fromLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
        toLabelPlacement = 0/*primitives.common.PlacementType.Auto*/,
        minimalGap,
        snapPoint,
        panelSize,
        linePaletteItem = new primitives.common.PaletteItem({
            lineColor: this.color,
            lineWidth: this.lineWidth,
            lineType: this.lineType
        }),
        buffer = new primitives.common.PolylinesBuffer(),
        polyline = buffer.getPolyline(linePaletteItem);

    fromRect = new primitives.common.Rect(fromRect).offset(this.offset);
    toRect = new primitives.common.Rect(toRect).offset(this.offset);
    offsets = [];
    switch (this.connectorShapeType) {
        case 1/*primitives.common.ConnectorShapeType.TwoWay*/:
            offsets = [- linesOffset / 2, linesOffset / 2];
            break;
        case 0/*primitives.common.ConnectorShapeType.OneWay*/:
            offsets = [0];
            break;
    }

    this.transform = new primitives.common.Transform();
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);

    /* from rectangle */
    this.transform.transformRect(fromRect.x, fromRect.y, fromRect.width, fromRect.height, false,
        this, function (x, y, width, height) {
            fromRect = new primitives.common.Rect(x, y, width, height);
    });

    /* to rectangle */
    this.transform.transformRect(toRect.x, toRect.y, toRect.width, toRect.height, false,
        this, function (x, y, width, height) {
            toRect = new primitives.common.Rect(x, y, width, height);
        });

    /* label size */
    this.transform.transformRect(0, 0, this.labelSize.width, this.labelSize.height, false,
    this, function (x, y, width, height) {
        labelSize = new primitives.common.Size(width, height);
    });

    /* panel size */
    this.transform.transformRect(0, 0, this.panelSize.width, this.panelSize.height, false,
    this, function (x, y, width, height) {
        panelSize = new primitives.common.Size(width, height);
    });

    minimalGap = Math.max(this.hasLabel ? labelSize.width : 0, linesOffset * 5);
    if (fromRect.right() + minimalGap < toRect.left() || fromRect.left() > toRect.right() + minimalGap) {
        if (fromRect.left() > toRect.right()) {
            fromPoint = new primitives.common.Point(fromRect.left(), fromRect.verticalCenter());
            toPoint = new primitives.common.Point(toRect.right(), toRect.verticalCenter());
            fromLabelPlacement = 7/*primitives.common.PlacementType.Left*/;
            toLabelPlacement = 3/*primitives.common.PlacementType.Right*/;
        } else {
            fromPoint = new primitives.common.Point(fromRect.right(), fromRect.verticalCenter());
            toPoint = new primitives.common.Point(toRect.left(), toRect.verticalCenter());
            fromLabelPlacement = 3/*primitives.common.PlacementType.Right*/;
            toLabelPlacement = 7/*primitives.common.PlacementType.Left*/;
        }
        connectorRect = new primitives.common.Rect(fromPoint, toPoint);
        invertY = (fromPoint.y <= toPoint.y);
        invertX = (fromPoint.x < toPoint.x);
        if (connectorRect.height < connectorRect.width) {
            /* horizontal single bended connector between boxes from right side to left side */
            if (connectorRect.height < linesOffset * 2) {
                connectorRect.offset(0, invertY ? linesOffset * 2 : 0, 0, invertY ? 0 : linesOffset * 2);
            }

            for (index = 0, len = offsets.length; index < len; index += 1) {
                tempOffset = offsets[index];
                buffer.addInverted(function (invertedBuffer) {
                    var polyline = invertedBuffer.getPolyline(linePaletteItem);
                    polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
                    polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
                        toPoint.x, toPoint.y + tempOffset));
                }, !index);//ignore jslint

                polyline.addArrow(this.lineWidth, function (polyline) {
                    polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                }); //ignore jslint
            }
            

            if (labelSize.width < connectorRect.width / 5 * 2) {
                snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()), toPoint.x, toPoint.y, 0.5);
            } else {
                snapPoint = new primitives.common.Point(fromPoint.x, invertY ? connectorRect.top() : connectorRect.bottom());
            }
            labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset : -labelSize.width - linesOffset), (invertY ? snapPoint.y - labelSize.height - linesOffset : snapPoint.y + linesOffset), labelSize.width, labelSize.height);
        } else {
            /* horizontal double bended connector between boxes from right side to left side */
            for (index = 0, len = offsets.length; index < len; index += 1) {
                tempOffset = offsets[index];
                buffer.addInverted(function (invertedBuffer) {
                    var polyline = invertedBuffer.getPolyline(linePaletteItem);
                    polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
                    polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
                        connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), connectorRect.verticalCenter() + tempOffset));
                    polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.bottom() : connectorRect.top()) + tempOffset,
                        toPoint.x, toPoint.y + tempOffset));
                }, !index);//ignore jslint

                polyline.addArrow(this.lineWidth, function (polyline) {
                    polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                }); //ignore jslint
            }
            labelPlacement = new primitives.common.Rect(connectorRect.horizontalCenter() + (invertY != invertX ? linesOffset : -(linesOffset + labelSize.width)),
                 connectorRect.verticalCenter() - labelSize.height / 2, labelSize.width, labelSize.height);
        }
    } else {
        if (fromRect.verticalCenter() < toRect.top() || fromRect.verticalCenter() > toRect.bottom()) {
            /* vertical single bended connector between boxes from right side to right side */
            invertX = fromRect.x < panelSize.width / 2;
            fromPoint = new primitives.common.Point(invertX ? fromRect.right() : fromRect.left(), fromRect.verticalCenter());
            toPoint = new primitives.common.Point(invertX ? toRect.right() : toRect.left(), toRect.verticalCenter());
            fromLabelPlacement = invertX ? 3/*primitives.common.PlacementType.Right*/ : 7/*primitives.common.PlacementType.Left*/;
            toLabelPlacement = fromLabelPlacement;
            connectorRect = new primitives.common.Rect(fromPoint, toPoint);
            connectorRect.offset(linesOffset * 10, 0, linesOffset * 10, 0);
            invertY = (fromPoint.y <= toPoint.y);
            for (index = 0, len = offsets.length; index < len; index += 1) {
                tempOffset = offsets[index];
                buffer.addInverted(function (invertedBuffer) {
                    var polyline = invertedBuffer.getPolyline(linePaletteItem);
                    polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
                    polyline.addSegment(new primitives.common.QuadraticArcSegment(invertX ? connectorRect.right() + tempOffset * (invertY ? -1 : 1) : connectorRect.left() - tempOffset * (invertY ? -1 : 1), connectorRect.verticalCenter(),
                        invertX ? toRect.right() : toRect.left(), toRect.verticalCenter() - tempOffset));
                }, !index);//ignore jslint

                polyline.addArrow(this.lineWidth, function (polyline) {
                    polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                });//ignore jslint
            }
            snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, (invertX ? connectorRect.right() : connectorRect.left()), connectorRect.verticalCenter(), toPoint.x, toPoint.y, 0.5);
            labelPlacement = new primitives.common.Rect(snapPoint.x + (invertX ? linesOffset / 2 : -linesOffset / 2 - labelSize.width), snapPoint.y - labelSize.height / 2, labelSize.width, labelSize.height);
        } else {
            fromPoint = new primitives.common.Point(fromRect.horizontalCenter(), fromRect.top());
            toPoint = new primitives.common.Point(toRect.horizontalCenter(), toRect.top());
            fromLabelPlacement = 1/*primitives.common.PlacementType.Top*/;
            toLabelPlacement = 1/*primitives.common.PlacementType.Top*/;
            connectorRect = new primitives.common.Rect(fromPoint, toPoint);
            connectorRect.offset(0, linesOffset * 7, 0, 0);
            invertX = (fromPoint.x < toPoint.x);
            for (index = 0, len = offsets.length; index < len; index += 1) {
                tempOffset = offsets[index];
                buffer.addInverted(function (invertedBuffer) {
                    var polyline = invertedBuffer.getPolyline(linePaletteItem);
                    polyline.addSegment(new primitives.common.MoveSegment(fromPoint.x + tempOffset, fromPoint.y));
                    polyline.addSegment(new primitives.common.QuadraticArcSegment(connectorRect.horizontalCenter(), connectorRect.top() - tempOffset * (invertX ? -1 : 1),
                        toRect.horizontalCenter() - tempOffset, toRect.top()));
                }, !index);//ignore jslint

                polyline.addArrow(this.lineWidth, function (polyline) {
                    polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                }); //ignore jslint
            }
            snapPoint = primitives.common.QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), connectorRect.top(), toPoint.x, toPoint.y, 0.5);
            labelPlacement = new primitives.common.Rect(snapPoint.x - labelSize.width / 2, snapPoint.y -(this.labelOffset + labelSize.height), labelSize.width, labelSize.height);
        }
    }

    buffer.transform(this.transform, true);
    this.m_graphics.polylinesBuffer(buffer);

    if (this.hasLabel) {

        switch (this.labelPlacementType) {
            case primitives.common.ConnectorLabelPlacementType.From:
                labelPlacement = this._getLabelPosition(fromRect.x, fromRect.y, fromRect.width, fromRect.height, labelPlacement.width, labelPlacement.height, this.labelOffset, fromLabelPlacement);
                break;
            case primitives.common.ConnectorLabelPlacementType.To:
                labelPlacement = this._getLabelPosition(toRect.x, toRect.y, toRect.width, toRect.height, labelPlacement.width, labelPlacement.height, this.labelOffset, toLabelPlacement);
                break;
            default:
                break;
        }

        this.transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
            this, function (x, y, width, height) {
                labelPlacement = new primitives.common.Rect(x, y, width, height);
            });

        this.m_graphics.template(
                labelPlacement.x
            , labelPlacement.y
            , 0
            , 0
            , 0
            , 0
            , labelPlacement.width
            , labelPlacement.height
            , this.labelTemplate
            , this.labelTemplateHashCode
            , "onAnnotationLabelTemplateRender"
            , uiHash
            , null
        );
    }
};


primitives.common.Marker = function () {

};

primitives.common.Marker.Markers = {};

primitives.common.Marker.DrawCircle = function (polyline, position) {
    var quarter = Math.min(position.width / 2.0, position.height / 2.0);
    position = new primitives.common.Rect(position.horizontalCenter() - quarter, position.verticalCenter() - quarter, quarter * 2.0, quarter * 2.0);
    primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawRectangle = function (polyline, position) {
    polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.x, position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawOval = function (polyline, position) {
    var cpX, cpY;
    cpX = (position.width / 2) * 0.5522848;
    cpY = (position.height / 2) * 0.5522848;
    polyline.addSegment(new primitives.common.MoveSegment(position.x, position.verticalCenter()));
    polyline.addSegment(new primitives.common.CubicArcSegment(position.x, position.verticalCenter() - cpY, position.horizontalCenter() - cpX, position.y, position.horizontalCenter(), position.y));
    polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() + cpX, position.y, position.right(), position.verticalCenter() - cpY, position.right(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.CubicArcSegment(position.right(), position.verticalCenter() + cpY, position.horizontalCenter() + cpX, position.bottom(), position.horizontalCenter(), position.bottom()));
    polyline.addSegment(new primitives.common.CubicArcSegment(position.horizontalCenter() - cpX, position.bottom(), position.x, position.verticalCenter() + cpY, position.x, position.verticalCenter()));
};

primitives.common.Marker.DrawTriangle = function (polyline, position) {
    polyline.addSegment(new primitives.common.MoveSegment(position.left(), position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawCrossOut = function (polyline, position) {
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.x, position.y));
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.bottom()));
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.left(), position.bottom()));
};

primitives.common.Marker.DrawRhombus = function (polyline, position) {
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.left(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.verticalCenter()));
    polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
};

primitives.common.Marker.DrawWedge = function (polyline, position) {
    polyline.addSegment(new primitives.common.MoveSegment(position.horizontalCenter(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.right(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.bottom()));
    polyline.addSegment(new primitives.common.LineSegment(position.left(), position.y));
    polyline.addSegment(new primitives.common.LineSegment(position.horizontalCenter(), position.y));
};

primitives.common.Marker.DrawFramedOval = function (polyline, position) {
    primitives.common.Marker.DrawRectangle(polyline, position);
    primitives.common.Marker.DrawOval(polyline, position);
};

primitives.common.Marker.DrawFramedTriangle = function (polyline, position) {
    primitives.common.Marker.DrawRectangle(polyline, position);
    primitives.common.Marker.DrawTriangle(polyline, position);
};

primitives.common.Marker.DrawFramedWedge = function (polyline, position) {
    primitives.common.Marker.DrawRectangle(polyline, position);
    primitives.common.Marker.DrawWedge(polyline, position);
};

primitives.common.Marker.DrawFramedRhombus = function (polyline, position) {
    primitives.common.Marker.DrawRectangle(polyline, position);
    primitives.common.Marker.DrawRhombus(polyline, position);
};

primitives.common.Marker.DrawNone = function (polyline, position) {

};

primitives.common.Marker.Markers[4/*primitives.common.ShapeType.Circle*/] = primitives.common.Marker.DrawCircle;
primitives.common.Marker.Markers[0/*primitives.common.ShapeType.Rectangle*/] = primitives.common.Marker.DrawRectangle;
primitives.common.Marker.Markers[1/*primitives.common.ShapeType.Oval*/] = primitives.common.Marker.DrawOval;
primitives.common.Marker.Markers[2/*primitives.common.ShapeType.Triangle*/] = primitives.common.Marker.DrawTriangle;
primitives.common.Marker.Markers[3/*primitives.common.ShapeType.CrossOut*/] = primitives.common.Marker.DrawCrossOut;
primitives.common.Marker.Markers[5/*primitives.common.ShapeType.Rhombus*/] = primitives.common.Marker.DrawRhombus;
primitives.common.Marker.Markers[7/*primitives.common.ShapeType.Wedge*/] = primitives.common.Marker.DrawWedge;
primitives.common.Marker.Markers[8/*primitives.common.ShapeType.FramedOval*/] = primitives.common.Marker.DrawFramedOval;
primitives.common.Marker.Markers[9/*primitives.common.ShapeType.FramedTriangle*/] = primitives.common.Marker.DrawFramedTriangle;
primitives.common.Marker.Markers[10/*primitives.common.ShapeType.FramedWedge*/] = primitives.common.Marker.DrawFramedWedge;
primitives.common.Marker.Markers[11/*primitives.common.ShapeType.FramedRhombus*/] = primitives.common.Marker.DrawFramedRhombus;
primitives.common.Marker.Markers[6/*primitives.common.ShapeType.None*/] = primitives.common.Marker.DrawNone;

primitives.common.Marker.prototype.draw = function (polylinesBuffer, shapeType, position, paletteItem) {
    var polyline;

    // If you need to create custom multi-color marker type
    // create color palette object for every fragment 
    // than request polyline of that that palette style 
    // add fragment into received polyline
    polyline = polylinesBuffer.getPolyline(paletteItem);
    primitives.common.Marker.Markers[shapeType](polyline, position);
};

primitives.common.Perimeter = function (graphics) {
	this.m_graphics = graphics;
	this.transform = null;

	this.lineWidth = 1;
	this.opacity = 1;
	this.fillColor = null;
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.borderColor = null;
};

primitives.common.Perimeter.prototype = new primitives.common.BaseShape();

primitives.common.Perimeter.prototype.draw = function (perimeter) {
    var paletteItem = new primitives.common.PaletteItem({
        lineColor: this.borderColor,
        lineWidth: this.lineWidth,
        fillColor: this.fillColor,
        lineType: this.lineType,
        opacity: this.opacity
    }),
    polyline = new primitives.common.Polyline(paletteItem),
    offset = this.lineWidth / 2,
    prevSegment = null,
    prevPoint = null,
    prevPointIsVertical = null,
    connectionHash = {}, connection,
    element;

    perimeter.segments.iterate(function (item) {
        var offsetX = 0,
            offsetY = 0,
            isVertical = false,
            newPoint,
            connection;

        if (offset > 0) {
            switch(item.orientationType) {
                case 3/*primitives.common.OrientationType.Right*/:
                    offsetX = -offset;
                    isVertical = false;
                    break;
                case 2/*primitives.common.OrientationType.Left*/:
                    offsetX = offset;
                    isVertical = false;
                    break;
                case 0/*primitives.common.OrientationType.Top*/:
                    offsetY = offset;
                    isVertical = true;
                    break;
                case 1/*primitives.common.OrientationType.Bottom*/:
                    offsetY = -offset;
                    isVertical = true;
                    break;
                default:
                    throw "Orientation is not defined!";
            }
        }
        if (polyline.length() == 0) {
            prevPoint = new primitives.common.MoveSegment(item.fromPoint);
            polyline.addSegment(prevPoint);

            connectionHash[perimeter.segments.endKey()] = {
                point: prevPoint,
                isVertical: isVertical
            };
        }
        newPoint = null;
        if (perimeter.segments.item(item.oppositeKey) != null) {
            newPoint = new primitives.common.MoveSegment(item.toPoint.x + offsetX, item.toPoint.y + offsetY);
        } else {
            newPoint = new primitives.common.LineSegment(item.toPoint.x + offsetX, item.toPoint.y + offsetY);
        }
        polyline.addSegment(newPoint);

        if (offset > 0) {
            /* align previous point and new point offset */
            if (isVertical) {
                prevPoint.y = newPoint.y;
            } else {
                prevPoint.x = newPoint.x;
            }

            if (prevSegment != null) {
                /* search for two sequential segments having and not having opposite segments */
                if (!perimeter.segments.item(prevSegment.oppositeKey)
                    && perimeter.segments.item(item.oppositeKey) != null) {
                    if (connectionHash.hasOwnProperty(item.oppositeKey)) {
                        connection = connectionHash[item.oppositeKey];
                        if (connection.isVertical) {
                            prevPoint.y = connection.point.y;
                        } else {
                            prevPoint.x = connection.point.x;
                        }
                        if (prevPointIsVertical) {
                            connection.point.y = prevPoint.y;
                        } else {
                            connection.point.x = prevPoint.x;
                        }
                    } else {
                        connectionHash[item.oppositeKey] = {
                            point: prevPoint,
                            isVertical: prevPointIsVertical
                        };
                    }
                } else if (perimeter.segments.item(prevSegment.oppositeKey) != null
                    && !perimeter.segments.item(item.oppositeKey)) {
                    if (connectionHash.hasOwnProperty(prevSegment.key)) {
                        connection = connectionHash[prevSegment.key];
                        if (connection.isVertical) {
                            prevPoint.y = connection.point.y;
                        } else {
                            prevPoint.x = connection.point.x;
                        }
                        if (prevPointIsVertical) {
                            connection.point.y = prevPoint.y;
                        } else {
                            connection.point.x = prevPoint.x;
                        }
                    } else {
                        connectionHash[prevSegment.key] = {
                            point: prevPoint,
                            isVertical: isVertical
                        };
                    }
                }
            }
            prevPointIsVertical = isVertical;
            prevSegment = item;
        }
        prevPoint = newPoint;
    });

    if (offset > 0) {
        if (!perimeter.segments.item(prevSegment.oppositeKey)) {
            connection = connectionHash[prevSegment.key];
            if (connection.isVertical) {
                prevPoint.y = connection.point.y;
            } else {
                prevPoint.x = connection.point.x;
            }
            if (prevPointIsVertical) {
                connection.point.y = prevPoint.y;
            } else {
                connection.point.x = prevPoint.x;
            }
        }
    }
    polyline.transform(this.transform, true);

	element = this.m_graphics.polyline(polyline);
};

primitives.common.Shape = function (graphics) {
	this.m_graphics = graphics;
	this.transform = null;

	this.orientationType = 0/*primitives.common.OrientationType.Top*/;
	this.panelSize = null;
	this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);
	this.lineWidth = 1;
	this.labelOffset = 4;
	this.cornerRadius = "10%";
	this.opacity = 1;
	this.fillColor = null;
	this.labelSize = new primitives.common.Size(60, 30);
	this.lineType = 0/*primitives.common.LineType.Solid*/;
	this.borderColor = null;
	this.hasLabel = false;
	this.labelTemplate = null;
	this.labelTemplateHashCode = null;
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;
};

primitives.common.Shape.prototype = new primitives.common.BaseShape();

primitives.common.Shape.prototype.draw = function (position, uiHash) {
    var labelPlacement,
        calloutShape,
        linePaletteItem,
        buffer,
        marker;

    position = new primitives.common.Rect(position).offset(this.offset);

    this.transform = new primitives.common.Transform();
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);

    /* label size */
    if (this.hasLabel) {
        labelPlacement = this._getLabelPosition(position.x, position.y, position.width, position.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement);
    }


    switch (this.shapeType) {
        case 0/*primitives.common.ShapeType.Rectangle*/:
            calloutShape = new primitives.common.Callout(this.m_graphics);
            calloutShape.cornerRadius = this.cornerRadius;
            calloutShape.opacity = this.opacity;
            calloutShape.lineWidth = this.lineWidth;
            calloutShape.lineType = this.lineType;
            calloutShape.borderColor = this.borderColor;
            calloutShape.fillColor = this.fillColor;
            calloutShape.draw(null, position);
            break;
        default:
            linePaletteItem = new primitives.common.PaletteItem({
                lineColor: this.borderColor,
                lineWidth: this.lineWidth,
                lineType: this.lineType,
                fillColor: this.fillColor,
                opacity: this.opacity
            });

            /* from rectangle */
            this.transform.transformRect(position.x, position.y, position.width, position.height, false,
                this, function (x, y, width, height) {
                    position = new primitives.common.Rect(x, y, width, height);
                });

            
            marker = new primitives.common.Marker();
            buffer = new primitives.common.PolylinesBuffer();
            marker.draw(buffer, this.shapeType, position, linePaletteItem);
            buffer.transform(this.transform, true);

            this.m_graphics.polylinesBuffer(buffer);
            break;
    }

    if (this.hasLabel) {
        this.m_graphics.template(
              labelPlacement.x
            , labelPlacement.y
            , 0
            , 0
            , 0
            , 0
            , labelPlacement.width
            , labelPlacement.height
            , this.labelTemplate
            , this.labelTemplateHashCode
            , "onAnnotationLabelTemplateRender"
            , uiHash
            , null
        );
    }
};

/*
    Class: primitives.common.Point
    Class represents pair of x and y coordinates that defines a point in 2D plane.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.	    
*/
primitives.common.Point = function (arg0, arg1) {
	/*
	Property: x
	    The x coordinate.
    */

	this.x = null;
	/*
	Property: y
	    The y coordinate.
    */

	this.y = null;

    /*
    Property: context
        This property holds reference to context object associated with this datapoint.
    */
	this.context = null;

	switch (arguments.length) {
		case 1:
			this.x = arg0.x;
			this.y = arg0.y;
			this.context = arg0.context;
			break;
		case 2:
			this.x = arg0;
			this.y = arg1;
			break;
		default:
			break;
	}
};

/*
    Method: distanceTo
        Returns distance to point.

	Parameters:
		point - <primitives.common.Point> object.

	Parameters:
		x - X coordinate of 2D point.
		y - Y coordinate of 2D point.
*/
primitives.common.Point.prototype.distanceTo = function (arg0, arg1) {
	var x2 = 0,
		y2 = 0,
		a,
		b;
	switch (arguments.length) {
		case 1:
			x2 = arg0.x;
			y2 = arg0.y;
			break;
		case 2:
			x2 = arg0;
			y2 = arg1;
			break;
		default:
			break;
	}
	a = this.x - x2;
	b = this.y - y2;
	return Math.sqrt(a * a + b * b);
};

primitives.common.Point.prototype.equalTo = function (point) {
    return this.x == point.x && this.y == point.y;
};

/*
    Method: swap
        Swaps values of two points.

	Parameters:
		point - <primitives.common.Point> object.
*/
primitives.common.Point.prototype.swap = function (point) {
    var x = point.x,
		y = point.y;

    point.x = this.x;
    point.y = this.y;

    this.x = x;
    this.y = y;
};

/*
    Method: clone
        Clones current point.
*/
primitives.common.Point.prototype.clone = function () {
    return new primitives.common.Point(this);
};

/*
    Method: toString
        Returns rectangle location in form of CSS style string.

    Parameters:
	    units - The string name of units. Uses "px" if not defined.

    Returns:
        CSS style string.
*/
primitives.common.Point.prototype.toString = function (units) {
	var result = "";

	units = (units !== undefined) ? units : "px";

	result += "left:" + this.x + units + ";";
	result += "top:" + this.y + units + ";";

	return result;
};
primitives.common.MoveSegment = function () {
	this.parent = primitives.common.Point.prototype;
	this.parent.constructor.apply(this, arguments);
	this.segmentType = 1/*primitives.common.SegmentType.Move*/;
};

primitives.common.MoveSegment.prototype = new primitives.common.Point();

primitives.common.MoveSegment.prototype.clone = function () {
    return new primitives.common.MoveSegment(this);
};

primitives.common.MoveSegment.prototype.loop = function (thisArg, onItem) {
    if (onItem != null) {
        onItem.call(thisArg, this.x, this.y, 0);
    }
};

primitives.common.MoveSegment.prototype.setPoint = function (point, index) {
    this.x = point.x;
    this.y = point.y;
};

primitives.common.MoveSegment.prototype.getEndPoint = function () {
    return this;
};

primitives.common.MoveSegment.prototype.invert = function (endPoint) {
    this.x = endPoint.x;
    this.y = endPoint.y;
};

primitives.common.MoveSegment.prototype.transform = function (transform, forward) {
    var self = this;
    transform.transformPoint(self.x, self.y, forward, self, function (x, y) {
        self.x = x;
        self.y = y;
    });//ignore jslint
};
primitives.common.CubicArcSegment = function (arg0, arg1, arg2, arg3, arg4, arg5) {
    this.parent = primitives.common.Point.prototype;

	this.x = null;
	this.y = null;

	this.cpX1 = null;
	this.cpY1 = null;

	this.cpX2 = null;
	this.cpY2 = null;

	switch (arguments.length) {
	    case 3:
	        this.parent.constructor.apply(this, [arg2.x, arg2.y]);
			this.cpX1 = arg0.x;
			this.cpY1 = arg0.y;
			this.cpX2 = arg1.x;
			this.cpY2 = arg1.y;
			break;
	    case 6:
	        this.parent.constructor.apply(this, [arg4, arg5]);
			this.cpX1 = arg0;
			this.cpY1 = arg1;
			this.cpX2 = arg2;
			this.cpY2 = arg3;
			break;
		default:
			break;
	}

	this.segmentType = 3/*primitives.common.SegmentType.CubicArc*/;
};

primitives.common.CubicArcSegment.prototype = new primitives.common.Point();

primitives.common.CubicArcSegment.prototype.clone = function () {
    return new primitives.common.CubicArcSegment(this.cpX1, this.cpY1, this.cpX2, this.cpY2, this.x, this.y);
};

primitives.common.CubicArcSegment.prototype.loop = function (thisArg, onItem) {
    if (onItem != null) {
        onItem.call(thisArg, this.cpX1, this.cpY1, 0);
        onItem.call(thisArg, this.cpX2, this.cpY2, 1);
        onItem.call(thisArg, this.x, this.y, 2);
    }
};

primitives.common.CubicArcSegment.prototype.setPoint = function (point, index) {
    switch (index) {
        case 0:
            this.cpX1 = point.x;
            this.cpY1 = point.y;
            break;
        case 1:
            this.cpX2 = point.x;
            this.cpY2 = point.y;
            break;
        case 2:
            this.x = point.x;
            this.y = point.y;
            break;
    }
};

primitives.common.CubicArcSegment.prototype.getEndPoint = function () {
    return this;
};

primitives.common.CubicArcSegment.prototype.invert = function (endPoint) {
    var tempX = this.cpX1, 
        tempY = this.cpY1;
    this.x = endPoint.x;
    this.y = endPoint.y;
    this.cpX1 = this.cpX2;
    this.cpY1 = this.cpY2;
    this.cpX2 = tempX;
    this.cpY2 = tempY;
};

primitives.common.CubicArcSegment.prototype.transform = function (transform, forward) {
    var self = this;
    transform.transform3Points(self.x, self.y, self.cpX1, self.cpY1, self.cpX2, self.cpY2, forward, self, function (x, y, cpX1, cpY1, cpX2, cpY2) {
        self.x = x;
        self.y = y;
        self.cpX1 = cpX1;
        self.cpY1 = cpY1;
        self.cpX2 = cpX2;
        self.cpY2 = cpY2;
    });//ignore jslint
};

primitives.common.CubicArcSegment.prototype.trim = function (prevEndPoint, offset) {
    var time = 0.5,
        endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time),
        time2 = 0.1,
        endPoint2 = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time2);

    time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
    endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time);

    this.x = endPoint.x;
    this.y = endPoint.y;

    return this;
};

primitives.common.CubicArcSegment.prototype.offsetPoint = function (x, y, cpX1, cpY1, cpX2, cpY2, x2, y2, time) {
    return new primitives.common.Point(
        (1 - time) * (1 - time) * (1 - time) * x + 3 * (1 - time) * (1 - time) * time * cpX1 + 3 * (1 - time) * time * time * cpX2 + time * time * time * x2,
        (1 - time) * (1 - time) * (1 - time) * y + 3 * (1 - time) * (1 - time) * time * cpY1 + 3 * (1 - time) * time * time * cpY2 + time * time * time * y2
        );
};
primitives.common.DotSegment = function (x, y, width, height, cornerRadius) {
	this.segmentType = 4/*primitives.common.SegmentType.Dot*/;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cornerRadius = cornerRadius;
};
primitives.common.Label = function () {
	this.text = null;
	this.position = null; // primitives.common.Rect
	this.weight = 0;

	this.isActive = true; 
	this.labelType = 0/*primitives.common.LabelType.Regular*/;

	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;
	this.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
	this.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
};
primitives.common.LineSegment = function () {
    this.parent = primitives.common.MoveSegment.prototype;
	this.parent.constructor.apply(this, arguments);

	this.segmentType = 0/*primitives.common.SegmentType.Line*/;
};

primitives.common.LineSegment.prototype = new primitives.common.MoveSegment();

primitives.common.LineSegment.prototype.clone = function () {
    return new primitives.common.LineSegment(this);
};

primitives.common.LineSegment.prototype.trim = function (prevEndPoint, offset) {
    var endPoint = this._offsetPoint(this, prevEndPoint, offset);
    this.x = endPoint.x;
    this.y = endPoint.y;

    return this;
};

primitives.common.LineSegment.prototype._offsetPoint = function (first, second, offset) {
    var result = null,
        distance = first.distanceTo(second);

    if (distance == 0 || offset == 0) {
        result = new primitives.common.Point(first);
    } else {
        result = new primitives.common.Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
    }
    return result;
};
/*
    Class: primitives.common.Matrix
    Class represents square matrix having 2 rows and 2 columns.

	Parameters:
		matrix - <primitives.common.Matrix> object.

	Parameters:
		a1 - top left.
		b1 - top right.
        a2 - bottom left
        b2 - bottom right
*/
primitives.common.Matrix = function (arg0, arg1, arg2, arg3) {

    this.a1 = null;
    this.b1 = null;
    this.a2 = null;
    this.b2 = null;

	switch (arguments.length) {
		case 1:
			this.a1 = arg0.a1;
			this.b1 = arg0.b1;
			this.a2 = arg0.a2;
			this.b2 = arg0.b2;
			break;
		case 4:
			this.a1 = arg0;
			this.b1 = arg1;
			this.a2 = arg2;
			this.b2 = arg3;
			break;
		default:
			break;
	}
};


primitives.common.Matrix.prototype.determinant = function () {
    return this.a1 * this.b2 - this.b1 * this.a2;
};
primitives.common.PaletteItem = function (options) {
    this.lineColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;
    this.lineWidth = 1;
    this.lineType = 0/*primitives.common.LineType.Solid*/;
    this.fillColor = null;
    this.opacity = null;

    this._key = "";

    var property, properties,
        index, len;

    properties = ['lineColor', 'lineWidth', 'lineType', 'fillColor', 'opacity'];

    for (index = 0, len = properties.length; index < len; index += 1) {
        property = properties[index];

        if(options != null && options.hasOwnProperty(property)) {
            this[property] = options[property];
        }
        this._key += (!primitives.common.isNullOrEmpty(this._key) ? ", " : "") + property + ":" + this[property];
    }
};

primitives.common.PaletteItem.prototype.toAttr = function () {
    var attr = {
        "lineWidth": this.lineWidth,
        "lineType": this.lineType
    };
    if (this.fillColor !== null) {
        attr.fillColor = this.fillColor;
    }
    if (this.opacity !== null) {
        attr.opacity = this.opacity;
    }
    if (this.lineColor !== null) {
        attr.borderColor = this.lineColor;
    }
    return attr;
};

primitives.common.PaletteItem.prototype.toString = function () {
    return this._key;
};
primitives.common.PaletteManager = function (options) {
    this.palette = [];
    this.cursor = 0;

    var index, len;

    /* pallete based connectors */
    if(options.linesPalette.length == 0) {
        /* draw all extra as regular */
        this.palette = [new primitives.common.PaletteItem({
            lineColor: options.linesColor,
            lineWidth: options.linesWidth,
            lineType: options.linesType
        })];
        this.paletteLength = this.palette.length;

        this.regularIndex = 0;
    } else {
        for (index = 0, len = options.linesPalette.length; index < len; index += 1) {
            this.palette.push(new primitives.common.PaletteItem(options.linesPalette[index]));
        }
        this.paletteLength = this.palette.length;

        /* regular */
        this.palette.push(new primitives.common.PaletteItem({
            lineColor: options.linesColor,
            lineWidth: options.linesWidth,
            lineType: options.linesType
        }));
        this.regularIndex = this.palette.length - 1;
    }
    
    /* highlight */
    this.palette.push(new primitives.common.PaletteItem({
        lineColor: options.highlightLinesColor,
        lineWidth: options.highlightLinesWidth,
        lineType: options.highlightLinesType
    }));
    this.highlightIndex = this.palette.length - 1;
};

primitives.common.PaletteManager.prototype.selectPalette = function (index) {
    this.cursor = index % this.paletteLength;
};

primitives.common.PaletteManager.prototype.getPalette = function (connectorStyleType) {
    var index = null;
    switch (connectorStyleType) {
        case 1/*primitives.common.ConnectorStyleType.Regular*/:
            index = this.regularIndex;
            break;
        case 2/*primitives.common.ConnectorStyleType.Highlight*/:
            index = this.highlightIndex;
            break;
        case 0/*primitives.common.ConnectorStyleType.Extra*/:
            index = this.cursor;
            break;
    }
    return this.palette[index];
};
primitives.common.Polyline = function (newPaletteItem) {
    var paletteItem = new primitives.common.PaletteItem(),
	    segments = [],
        self,
        arrowPaletteItem;

    switch (arguments.length) {
        case 1:
            paletteItem = newPaletteItem;
            break;
    }

    arrowPaletteItem = new primitives.common.PaletteItem({
        lineColor: paletteItem.lineColor,
        lineWidth: 0,
        fillColor: paletteItem.lineColor,
        opacity: 1
    });

	function addSegment(segment) {
	    segments.push(segment);
	}

	function addSegments(newSegments) {
	    segments = segments.concat(newSegments);
	}

	function mergeTo(polyline) {
	    polyline.addSegments(segments);
	}

	function length() {
	    return segments.length;
	}

	function loop(thisArg, onItem) {
	    var index, len,
            segment;
	    if (onItem != null) {
	        for (index = 0, len = segments.length; index < len; index += 1) {
	            segment = segments[index];
	            if (segment) {
	                if (onItem.call(thisArg, segment, index)) {
	                    break;
	                }
	            }
	        }
	    }
	}

	function loopReversed(thisArg, onItem) {
	    var index,
            segment;
	    if (onItem != null) {
	        for (index = segments.length - 1; index >= 0; index -= 1) {
	            segment = segments[index];
	            if (segment) {
	                if (onItem.call(thisArg, segment, index)) {
	                    break;
	                }
	            }
	        }
	    }
	}

	function transform(transformArg, forward) {
	    loop(this, function(segment){
	        if (segment.transform != null) {
	            segment.transform(transformArg, forward);
	        }
	    });
	}

	function isInvertable() {
	    return primitives.common.isNullOrEmpty(paletteItem.fillColor);
	}

	function addInverted(polyline) {
	    var hasMoved = false,
            stack = [];

	    if (isInvertable()) {
	        polyline.loopReversed(this, function(segment, index){
	            if(segment.segmentType != 4/*primitives.common.SegmentType.Dot*/) {
	                if (!hasMoved) {
	                    segments.push(new primitives.common.MoveSegment(segment.getEndPoint()));
	                    hasMoved = true;
	                }
	                stack.unshift(segment);

	                if(stack.length > 1) {
	                    stack[1].invert(stack[0].getEndPoint());
	                    segments.push(stack[1]);
	                    stack.length = 1;
	                }
	                    
	            }
	        });
	    } else {
	        polyline.mergeTo(self);
	    }
	}
    
	function _getArrow(fromX, fromY, toX, toY, length, width) {
	    var result = new primitives.common.Polyline(arrowPaletteItem),
            index, len,
            point, x, y,
            perimiter = [new primitives.common.Point(length, -width / 2),
                new primitives.common.Point(0, 0),
                new primitives.common.Point(length, width / 2),
                new primitives.common.Point(length / 4 * 3, 0)
            ],
            angle = Math.atan2((fromY - toY), (fromX - toX));

	    /* rotate and translate points */
	    for (index = 0, len = perimiter.length; index < len; index += 1) {
	        point = perimiter[index];
	        x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
	        y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
	        point.x = x + toX;
	        point.y = y + toY;
	    }

	    /* create arrow shape*/
	    result.addSegment(new primitives.common.MoveSegment(perimiter[0].x, perimiter[0].y));
	    result.addSegment(new primitives.common.LineSegment(perimiter[1].x, perimiter[1].y));
	    result.addSegment(new primitives.common.LineSegment(perimiter[2].x, perimiter[2].y));
	    result.addSegment(new primitives.common.QuadraticArcSegment(perimiter[3].x, perimiter[3].y, perimiter[0].x, perimiter[0].y));

	    return result;
	}

	function addArrow(lineWidth, onAddArrowSegments) {
	    var prevEndPoint,
            currentEndPoint,
            currentSegment,
            newEndPoint,
            polyline,
            len = segments.length,
            arrowTipLength = lineWidth * 3,
	        arrowTipWidth = lineWidth * 2;

	    switch (lineWidth) {
	        case 1:
	            arrowTipLength = 8;
                arrowTipWidth = 6;
	            break;
	        case 2:
	            arrowTipLength = 12;
                arrowTipWidth = 8;
	            break;
	        case 3:
	            arrowTipLength = 16;
                arrowTipWidth = 10;
	            break;
	    }

	    if (onAddArrowSegments != null && len > 1) {
	        prevEndPoint = segments[len - 2].getEndPoint();
	        currentSegment = segments[len - 1];
	        if (currentSegment.trim != null) {
	            currentEndPoint = new primitives.common.Point(currentSegment.getEndPoint());
	            newEndPoint = currentSegment.trim(prevEndPoint, arrowTipWidth);

	            polyline = _getArrow(newEndPoint.x, newEndPoint.y, currentEndPoint.x, currentEndPoint.y, arrowTipLength, arrowTipWidth);
	            onAddArrowSegments(polyline, newEndPoint);
	        }
	    }
	}

	function optimizeMoveSegments() {
	    var index, len,
            cursorIndex,
            key,
            optimizedSegments,
            segment, nextSegment,
            links = {},
            jumps = [],
            processed = [];
	    for (index = 0, len = segments.length; index < len - 1; index += 1) {
	        segment = segments[index];
	        nextSegment = segments[index + 1];
	        switch (segment.segmentType) {
	            case 0/*primitives.common.SegmentType.Line*/:
	            case 2/*primitives.common.SegmentType.QuadraticArc*/:
	            case 3/*primitives.common.SegmentType.CubicArc*/:
	                switch (nextSegment.segmentType) {
	                    case 1/*primitives.common.SegmentType.Move*/:
	                    case 4/*primitives.common.SegmentType.Dot*/:
	                        key = segment.x + "&" + segment.y;
	                        if (!links.hasOwnProperty(key)) {
	                            links[key] = index;
	                        }
	                        break;
	                    default:
	                        break;
	                }
	                break;
	            case 1/*primitives.common.SegmentType.Move*/:
	                key = segment.x + "&" + segment.y;
	                if (links.hasOwnProperty(key) && !jumps[links[key]]) {
	                    jumps[links[key]] = index + 1;
	                    processed[index] = true;
	                }
	                break;
	            default:
	                break;
	        }
	    }
	    optimizedSegments = [];
	    for (index = 0; index < len; index += 1) {
	        if (!processed[index]) {
	            segment = segments[index];
	            optimizedSegments.push(segment);
	            processed[index] = true;

	            if (jumps[index] > 0) {
	                cursorIndex = jumps[index];
	                while (cursorIndex < len && !processed[cursorIndex]) {
	                    segment = segments[cursorIndex];
	                    optimizedSegments.push(segment);
	                    processed[cursorIndex] = true;

	                    if (jumps[cursorIndex] > 0) {
	                        cursorIndex = jumps[cursorIndex];
	                    } else {
	                        cursorIndex += 1;
	                    }
	                }
	            }
	        }
	    }
	    segments = optimizedSegments;
	}

	function toString() {
	    return paletteItem.toString();
	}

    /* private classes */
	function Vertex(segment, pointIndex) {
	    this.segment = segment;
	    this.pointIndex = pointIndex;
	}

	Vertex.prototype.pushToSegment = function (point) {
	    this.segment.setPoint(point, this.pointIndex);
	};

	function _joinVectors(prev, current, offset, polyline, isLoop) {
	    var relationType = prev.relateTo(current),
            offset2 = isLoop ? 0 : offset,
            joinSegment,
            joinVector,
            newToPoint;
	    if (relationType == 2/*primitives.common.VectorRelationType.Collinear*/) {
	        /* Vectors are collinear vectors so we don't search for intersection */
	        current.offset(offset2);
	    } else {
	        if (relationType == 3/*primitives.common.VectorRelationType.Opposite*/ && current.from.context.pointIndex == 0) {
	            /* Vectors are opposite vectors which belong to 2 different segments
                  so we add an extra line segment in between of them                                           
                */
	            joinSegment = new primitives.common.LineSegment(current.from);
	            polyline.addSegment(joinSegment);

	            current.offset(offset2);

	            newToPoint = current.from.clone();
	            newToPoint.context = new Vertex(joinSegment, 0);

	            joinVector = new primitives.common.Vector(prev.to.clone(), newToPoint);
	            if (!isLoop) {
	                current.from = newToPoint.clone();
	            }

	            joinVector.offset(offset);
	            joinVector.intersect(prev);
	            joinVector.from.context.pushToSegment(joinVector.from);
	            current.intersect(joinVector);

	            if (isLoop) {
	                joinVector.to.context.pushToSegment(joinVector.to);
	            }
	        } else {
	            current.offset(offset2);
	            current.intersect(prev);
	        }
	    }
	    current.from.context.pushToSegment(current.from);
	}

	function _closeVector(vectorStack, startVectors, offset, polyline) {
	    var startVector,
	        prevVector = vectorStack[0],
	        closurePoint = prevVector.to.context.segment.getEndPoint().toString();
	    if (startVectors.hasOwnProperty(closurePoint)) {
	        startVector = startVectors[closurePoint];

	        _joinVectors(prevVector, startVector, offset, polyline, true);

	        delete startVectors[closurePoint];
	    }
	    prevVector.to.context.pushToSegment(prevVector.to);
	    vectorStack.length = 0;
	}

	function getOffsetPolyine(offset) {
	    var result = new primitives.common.Polyline(paletteItem),
	        startVectors = {},
	        pointStack = [],
	        vectorStack = [];

	    loop(this, function (segment) {
	        var newSegment = segment.clone(),
                newPoint;

	        switch (newSegment.segmentType) {
	            case 4/*primitives.common.SegmentType.Dot*/:
	            case 1/*primitives.common.SegmentType.Move*/:
	                if (vectorStack.length > 0) {
	                    _closeVector(vectorStack, startVectors, offset, result);
	                }
	                pointStack.length = 0;
	                if (newSegment.segmentType == 1/*primitives.common.SegmentType.Move*/) {
	                    newPoint = new primitives.common.Point(newSegment);
	                    newPoint.context = new Vertex(newSegment, 0);
	                    pointStack.push(newPoint);
	                }
	                break;
	            default:
	                newSegment.loop(this, function (x, y, index) {
	                    var newPoint = new primitives.common.Point(x, y),
                            current,
                            prev,
                            closurePoint;

	                    newPoint.context = new Vertex(newSegment, index);
	                    pointStack.unshift(newPoint);
	                    if (pointStack.length > 1) {
	                        vectorStack.unshift(new primitives.common.Vector(pointStack[1].clone(), pointStack[0].clone()));
	                        pointStack.length = 1;
	                    }

	                    switch (vectorStack.length) {
	                        case 1:
	                            /* first Vector in stack we add to start Vectors collection for possible join into perimiter*/
	                            current = vectorStack[0];
	                            closurePoint = current.from.toString();
	                            startVectors[closurePoint] = current;
	                            current.offset(offset);
	                            current.from.context.pushToSegment(current.from);
	                            break;
	                        case 2:
	                            prev = vectorStack[1];
	                            current = vectorStack[0];

	                            _joinVectors(prev, current, offset, result, false);

	                            vectorStack.length = 1;
	                            break;
	                        default:
	                            break;
	                    }
	                });
	                break;
	        }
	        result.addSegment(newSegment);
	    });
	    if (vectorStack.length > 0) {
	        _closeVector(vectorStack, startVectors, offset, result);
	    }
	    return result;
	}

	self = {
	    paletteItem: paletteItem,
	    arrowPaletteItem: arrowPaletteItem,
	    addSegment: addSegment,
	    addSegments: addSegments,
	    mergeTo: mergeTo,
	    length: length,
	    loop: loop,
	    loopReversed: loopReversed,
	    transform: transform,
	    isInvertable: isInvertable,
	    addInverted: addInverted,
	    addArrow: addArrow,
	    optimizeMoveSegments: optimizeMoveSegments,
	    getOffsetPolyine: getOffsetPolyine,
        toString: toString
	};

	return self;
};


primitives.common.PolylinesBuffer = function () {
    var polylines = {};

    function _getPolyline(polylines, paletteItem) {
        if (!polylines[paletteItem.toString()]) {
            polylines[paletteItem.toString()] = new primitives.common.Polyline(paletteItem);
        }
        return polylines[paletteItem.toString()];
    }

    function getPolyline(paletteItem) {
        return _getPolyline(polylines, paletteItem);
    }

    function loop(thisArg, onItem) {
        var key,
            polyline;
        if (onItem != null) {
            for (key in polylines) {
                if (polylines.hasOwnProperty(key)) {
                    polyline = polylines[key];
                    if (polyline) {
                        polyline.optimizeMoveSegments();

                        if (onItem.call(thisArg, polyline)) {
                            break;
                        }
                    }
                }
            }
        }
    }

    function addInverted(callbackFun, copyOnly) {
        var backupPolylines, backupPolyline;

        /* backup polylines */
        backupPolylines = polylines;
        polylines = {};

        if (callbackFun != null) {
            callbackFun(this);
        }

        /* add inverted polylines to backup collection */
        loop(this, function (polyline) {
            backupPolyline = _getPolyline(backupPolylines, polyline.paletteItem);

            if (!copyOnly) {
                backupPolyline.addInverted(polyline);
            } else {
                polyline.mergeTo(backupPolyline);
            }
        });

        /* restore polylines */
        polylines = backupPolylines;
    }

    function transform(transformArg, forward) {
        loop(this, function (polyline) {
            polyline.transform(transformArg, forward);
        });
    }

    return {
        getPolyline: getPolyline,
        loop: loop,
        addInverted: addInverted,
        transform: transform
    };
};
primitives.common.QuadraticArcSegment = function (arg0, arg1, arg2, arg3) {
	this.x = null;
	this.y = null;

	this.cpX = null;
	this.cpY = null;

	switch (arguments.length) {
		case 2:
			this.x = arg1.x;
			this.y = arg1.y;
			this.cpX = arg0.x;
			this.cpY = arg0.y;
			break;
		case 4:
			this.cpX = arg0;
			this.cpY = arg1;
			this.x = arg2;
			this.y = arg3;
			break;
		default:
			break;
	}

	this.segmentType = 2/*primitives.common.SegmentType.QuadraticArc*/;
};

primitives.common.QuadraticArcSegment.prototype.clone = function () {
    return new primitives.common.QuadraticArcSegment(this.cpX, this.cpY, this.x, this.y);
};

primitives.common.QuadraticArcSegment.prototype.loop = function (thisArg, onItem) {
    if (onItem != null) {
        onItem.call(thisArg, this.cpX, this.cpY, 0);
        onItem.call(thisArg, this.x, this.y, 1);
    }
};

primitives.common.QuadraticArcSegment.prototype.setPoint = function (point, index) {
    switch (index) {
        case 0:
            this.cpX = point.x;
            this.cpY = point.y;
            break;
        case 1:
            this.x = point.x;
            this.y = point.y;
            break;
    }
};

primitives.common.QuadraticArcSegment.prototype.getEndPoint = function () {
    return this;
};

primitives.common.QuadraticArcSegment.prototype.invert = function (endPoint) {
    this.x = endPoint.x;
    this.y = endPoint.y;
};

primitives.common.QuadraticArcSegment.prototype.transform = function (transform, forward) {
    var self = this;
    transform.transformPoints(self.x, self.y, self.cpX, self.cpY, forward, self, function (x, y, cpX, cpY) {
        self.x = x;
        self.y = y;
        self.cpX = cpX;
        self.cpY = cpY;
    });//ignore jslint
};

primitives.common.QuadraticArcSegment.prototype.trim = function (prevEndPoint, offset) {
    var time = 0.5,
    endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time),
    time2 = 0.1,
    endPoint2 = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time2);

    time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
    endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time);

    this.x = endPoint.x;
    this.y = endPoint.y;

    return this;
};

primitives.common.QuadraticArcSegment.prototype.offsetPoint = function (firstX, firstY, controlX, controlY, secondX, secondY, time) {
    return new primitives.common.Point((1 - time) * (1 - time) * firstX + 2 * (1 - time) * time * controlX + time * time * secondX,
         (1 - time) * (1 - time) * firstY + 2 * (1 - time) * time * controlY + time * time * secondY);
};
/*
    Class: primitives.common.Rect
    Class describes the width, height and location of rectangle.

	Parameters:
		rect - Copy constructor. It takes as a parameter copy of <primitives.common.Rect> object.

	Parameters:
		pointTopLeft - Top left point <primitives.common.Point> object.
		pointBottomRight - Bottom right point <primitives.common.Point> object.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect = function (arg0, arg1, arg2, arg3) {
	/*
	Property: x
	    The location x coordinate.
    */
	this.x = null;
	/*
	Property: y
	    The location y coordinate.
    */
	this.y = null;
	/*
	Property: width
	    The width of rectangle.
    */
	this.width = null;
	/*
	Property: height
	    The height of rectangle.
    */
	this.height = null;

	switch (arguments.length) {
		case 1:
			this.x = arg0.x;
			this.y = arg0.y;
			this.width = arg0.width;
			this.height = arg0.height;
			break;
		case 2:
			this.x = Math.min(arg0.x, arg1.x);
			this.y = Math.min(arg0.y, arg1.y);
			this.width = Math.abs(arg1.x - arg0.x);
			this.height = Math.abs(arg1.y - arg0.y);
			break;
		case 4:
			this.x = arg0;
			this.y = arg1;
			this.width = arg2;
			this.height = arg3;
			break;
		default:
			break;
	}
};

/*
    Method: left
        Gets the x-axis value of the left side of the rectangle.
*/
primitives.common.Rect.prototype.left = function () {
	return this.x;
};

/*
    Method: top
        Gets the y-axis value of the top side of the rectangle.
*/
primitives.common.Rect.prototype.top = function () {
	return this.y;
};

/*
    Method: right
        Gets the x-axis value of the right side of the rectangle.
*/
primitives.common.Rect.prototype.right = function () {
	return this.x + this.width;
};

/*
    Method: bottom
        Gets the y-axis value of the bottom of the rectangle.
*/
primitives.common.Rect.prototype.bottom = function () {
	return this.y + this.height;
};

/*
    Method: verticalCenter
        Gets the y-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.verticalCenter = function () {
	return this.y + this.height / 2.0;
};

/*
    Method: horizontalCenter
        Gets the x-axis value of the center point of the rectangle.
*/
primitives.common.Rect.prototype.horizontalCenter = function () {
	return this.x + this.width / 2.0;
};

/*
    Method: isEmpty
        Gets the value that indicates whether  the rectangle is the Empty rectangle.
*/
primitives.common.Rect.prototype.isEmpty = function () {
	return this.x === null || this.y === null || this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/*
    Method: offset
        Expands the rectangle by using specified value in all directions.

    Parameters:
	    value - The amount by which to expand or shrink the sides of the rectangle.

    Parameters:
	    left - The amount by which to expand or shrink the left side of the rectangle.	
	    top - The amount by which to expand or shrink the top side of the rectangle.		
	    right - The amount by which to expand or shrink the right side of the rectangle.		
	    bottom - The amount by which to expand or shrink the bottom side of the rectangle.		
*/
primitives.common.Rect.prototype.offset = function (arg0, arg1, arg2, arg3) {
	switch (arguments.length) {
	    case 1:
	        if (arg0 !== null && typeof arg0 == "object") {
	            this.x = this.x - arg0.left;
	            this.y = this.y - arg0.top;

	            this.width = this.width + arg0.left + arg0.right;
	            this.height = this.height + arg0.top + arg0.bottom;
	        } else {
	            this.x = this.x - arg0;
	            this.y = this.y - arg0;

	            this.width = this.width + arg0 * 2.0;
	            this.height = this.height + arg0 * 2.0;
	        }
			break;
		case 4:
			this.x = this.x - arg0;
			this.y = this.y - arg1;

			this.width = this.width + arg0 + arg2;
			this.height = this.height + arg1 + arg3;
			break;
	}
	return this;
};

/*
    Method: translate
        Moves the rectangle to by the specified horizontal and vertical amounts.

    Parameters:
	    x - The amount to move the rectangle horizontally.
	    y - The amount to move the rectangle vertically.
*/
primitives.common.Rect.prototype.translate = function (x, y) {
	this.x = this.x + x;
	this.y = this.y + y;

	return this;
};

/*
    Method: invert
        Inverts rectangle.
*/
primitives.common.Rect.prototype.invert = function () {
	var width = this.width,
		x = this.x;
	this.width = this.height;
	this.height = width;
	this.x = this.y;
	this.y = x;
	return this;
};

/*
    Method: contains
        Indicates whether the rectangle contains the specified point.

    Parameters:
	    point - The point to check.

    Parameters:	
	    x - The x coordinate of the point to check.
	    y - The y coordinate of the point to check.
	
    Returns:
        true if the rectangle contains the specified point; otherwise, false.	
*/
primitives.common.Rect.prototype.contains = function (arg0, arg1) {
	switch (arguments.length) {
		case 1:
			return this.x <= arg0.x && arg0.x <= this.x + this.width && this.y <= arg0.y && arg0.y <= this.y + this.height;
		case 2:
			return this.x <= arg0 && arg0 <= this.x + this.width && this.y <= arg1 && arg1 <= this.y + this.height;
		default:
			return false;
	}
};

/*
    Method: cropByRect
        Crops the rectangle by the boundaries of specified rectangle.

    Parameters:
	    rect - The rectangle to use as the crop boundaries.
*/
primitives.common.Rect.prototype.cropByRect = function (rect) {
	if (this.x < rect.x) {
		this.width -= (rect.x - this.x);
		this.x = rect.x;
	}

	if (this.right() > rect.right()) {
		this.width -= (this.right() - rect.right());
	}

	if (this.y < rect.y) {
		this.height -= (rect.y - this.y);
		this.y = rect.y;
	}

	if (this.bottom() > rect.bottom()) {
		this.height -= this.bottom() - rect.bottom();
	}

	if (this.isEmpty()) {
		this.x = null;
		this.y = null;
		this.width = null;
		this.height = null;
	}

	return this;
};

/*
    Method: overlaps
        Returns true if the rectangle overlaps specified rectangle.

    Parameters:
	    rect - The rectangle to use as overlaping rectangle.
*/
primitives.common.Rect.prototype.overlaps = function (rect) {
	var result = true;
	if (this.x + this.width < rect.x || rect.x + rect.width < this.x || this.y + this.height < rect.y || rect.y + rect.height < this.y) {
		result = false;
	}
	return result;
};

/*
    Method: addRect
        Expands the current rectangle to contain specified rectangle.

    Parameters:
	    rect - The rectangle to contain.

    Parameters:	
	    x - The x coordinate of the point to contain.
	    y - The y coordinate of the point to contain.

	Parameters:
		x - The x coordinate of top left corner.
		y - The y coordinate of top left corner.
		width - Rect width.
		height - Rect height.
*/
primitives.common.Rect.prototype.addRect = function (arg0, arg1, arg2, arg3) {
	var right,
		bottom;
	switch (arguments.length) {
		case 1:
			if (!arg0.isEmpty()) {
				if (this.isEmpty()) {
					this.x = arg0.x;
					this.y = arg0.y;
					this.width = arg0.width;
					this.height = arg0.height;
				}
				else {
					right = Math.max(this.right(), arg0.right());
					bottom = Math.max(this.bottom(), arg0.bottom());

					this.x = Math.min(this.x, arg0.x);
					this.y = Math.min(this.y, arg0.y);
					this.width = right - this.x;
					this.height = bottom - this.y;
				}
			}
			break;
		case 2:
			if (this.isEmpty()) {
				this.x = arg0;
				this.y = arg1;
				this.width = 0;
				this.height = 0;
			}
			else {
				right = Math.max(this.right(), arg0);
				bottom = Math.max(this.bottom(), arg1);

				this.x = Math.min(this.x, arg0);
				this.y = Math.min(this.y, arg1);
				this.width = right - this.x;
				this.height = bottom - this.y;
			}
			break;
		case 4:
			if (this.isEmpty()) {
				this.x = arg0;
				this.y = arg1;
				this.width = arg2;
				this.height = arg3;
			}
			else {
				right = Math.max(this.right(), arg0 + arg2);
				bottom = Math.max(this.bottom(), arg1 + arg3);

				this.x = Math.min(this.x, arg0);
				this.y = Math.min(this.y, arg1);
				this.width = right - this.x;
				this.height = bottom - this.y;
			}
			break;
	}

	return this;
};

/*
    Method: getCSS
        Returns rectangle location and size in form of CSS style object.

    Parameters:
	    units - The string name of units. Uses "px" if not defined.

    Returns:
        CSS style object.
*/
primitives.common.Rect.prototype.getCSS = function (units) {
	units = (units !== undefined) ? units : "px";

	var result = {
		left: this.x + units,
		top: this.y + units,
		width: this.width + units,
		height: this.height + units
	};
	return result;
};

/*
    Method: toString
        Returns rectangle location and size in form of CSS style string.

    Parameters:
	    units - The string name of units. Uses "px" if not defined.

    Returns:
        CSS style string.
*/
primitives.common.Rect.prototype.toString = function (units) {
	var result = "";

	units = (units !== undefined) ? units : "px";

	result += "left:" + this.x + units + ";";
	result += "top:" + this.y + units + ";";
	result += "width:" + this.width + units + ";";
	result += "height:" + this.height + units + ";";

	return result;
};
/*
    Class: primitives.common.Size
    Class describes the size of an object.

	Parameters:
		size - Copy constructor. It takes as a parameter copy of <primitives.common.Size> object.

	Parameters:
		width - The initial width of the instance.
		height - The initial height of the instance.
*/
primitives.common.Size = function (arg0, arg1) {
	/*
	Property: width
	    The value that specifies the width of the size class.
    */

	this.width = 0;

	/*
    Property: height
        The value that specifies the height of the size class.
    */

	this.height = 0;

	switch (arguments.length) {
		case 1:
			this.width = arg0.width;
			this.height = arg0.height;
			break;
		case 2:
			this.width = arg0;
			this.height = arg1;
			break;
		default:
			break;
	}
};

/*
    Method: invert
        Swaps width and height.
*/
primitives.common.Size.prototype.invert = function () {
	var width = this.width;
	this.width = this.height;
	this.height = width;
	return this;
};
/*
    Class: primitives.common.Thickness
    Class describes the thickness of a frame around rectangle.

	Parameters:
		left - The thickness for the left side of the rectangle.
		height - The thickness for the upper side of the rectangle.
        right - The thickness for the right side of the rectangle.
        bottom - The thickness for the bottom side of the rectangle.
*/
primitives.common.Thickness = function (left, top, right, bottom) {
	/*
	Property: left
	    The thickness for the left side of the rectangle.
    */

	this.left = left;

	/*
    Property: top
        The thickness for the upper side of the rectangle.
    */

	this.top = top;

	/*
    Property: right
        The thickness for the right side of the rectangle.
    */
	this.right = right;

	/*
    Property: bottom
        The thickness for the bottom side of the rectangle.
    */
	this.bottom = bottom;
};

/*
    Method: isEmpty
        Gets the value that indicates whether the thickness is the Empty.
*/

primitives.common.Thickness.prototype.isEmpty = function () {
	return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/*
    Method: toString
        Returns thickness in form of CSS style string. It is conversion to padding style string.

    Parameters:
	    units - The string name of units. Uses "px" if not defined.

    Returns:
        CSS style string.
*/

primitives.common.Thickness.prototype.toString = function (units) {
	units = (units !== undefined) ? units : "px";

	return this.left + units + ", " + this.top + units + ", " + this.right + units + ", " + this.bottom + units;
};
/*
    Class: primitives.common.Vector
    Class represents pair of points that defines a vector in 2D plane.

	Parameters:
		vector - <primitives.common.Vector> object.

	Parameters:
		from - From 2D point.
		to - To 2D point.	    
*/
primitives.common.Vector = function (arg0, arg1) {
	/*
	Property: from
	    The from point of vector.
    */

    this.from = null;

    /*
	Property: to
	    The to point of vector.
    */

    this.to = null;

	switch (arguments.length) {
		case 1:
			this.from = arg0.from;
			this.to = arg0.to;
			break;
		case 2:
			this.from = arg0;
			this.to = arg1;
			break;
		default:
			break;
	}
};

primitives.common.Vector.prototype.isNull = function () {
    return this.from.x == this.to && this.from.y == this.to.y;
};

/*
    Method: length
        Returns length of vector.

    Returns:
        Vector length.
*/
primitives.common.Vector.prototype.length = function () {
    return this.from.distanceTo(this.to);
};

primitives.common.Vector.prototype.equalTo = function (vector) {
    return this.from.equalTo(vector.from) && this.to.equalTo(vector.to);
};

primitives.common.Vector.prototype.relateTo = function (vector) {
    var result = 0/*primitives.common.VectorRelationType.None*/,
        x1 = this.to.x - this.from.x,
        y1 = this.to.y - this.from.y,
        x2 = vector.to.x - vector.from.x,
        y2 = vector.to.y - vector.from.y,
        key = (x1 ? 8 : 0) + (y1 ? 4 : 0) + (x2 ? 2 : 0) + (y2 ? 1 : 0);

    switch (key) {
        case 0: //0000
        case 1: //0001
        case 2: //0010
        case 3: //0011
        case 4: //0100
        case 8: //1000
        case 12://1100
            result = 1/*primitives.common.VectorRelationType.Null*/;
            break;
        case 5: //0101
            if (y1 * y2 > 0) {
                result = 2/*primitives.common.VectorRelationType.Collinear*/;
            } else {
                result = 3/*primitives.common.VectorRelationType.Opposite*/;
            }
            break;
        case 10://1010
            if (x1 * x2 > 0) {
                result = 2/*primitives.common.VectorRelationType.Collinear*/;
            } else {
                result = 3/*primitives.common.VectorRelationType.Opposite*/;
            }
            break;
        case 15://1111
            if (x1 / x2 == y1 / y2) {
                if (x1 / x2 > 0) {
                    result = 2/*primitives.common.VectorRelationType.Collinear*/;
                } else {
                    result = 3/*primitives.common.VectorRelationType.Opposite*/;
                }
            }
            break;
    }
    return result;
};

primitives.common.Vector.prototype.offset = function (offset) {
    var length = this.length(),
        /* in order to rotate right multiply vector on 3D vector (0, 0, -1)*/
        x = (this.to.y - this.from.y) * offset / length,
        y = - (this.to.x - this.from.x) * offset / length;

    this.from.x += x;
    this.from.y += y;
    this.to.x += x;
    this.to.y += y;
};

primitives.common.Vector.prototype.getLine = function () {
    var x1 = this.from.x,
        y1 = this.from.y,
        x2 = this.to.x,
        y2 = this.to.y,
        a = y2 - y1,
        b = x1 - x2,
        c = x1 * (y1 - y2) + y1 * (x2 - x1);

    return [a, b, c];
};

primitives.common.Vector.prototype.intersect = function (vector) {
    var v1 = this.getLine(),
        v2 = vector.getLine(),
        m = new primitives.common.Matrix(v1[0], v1[1], v2[0], v2[1]),
        d = m.determinant(),
        mx, my, dx, dy,
        x, y,
        result = false;

    if (d != 0) {
        mx = new primitives.common.Matrix(-v1[2], v1[1], -v2[2], v2[1]);
        dx = mx.determinant();
        my = new primitives.common.Matrix(v1[0], -v1[2], v2[0], -v2[2]);
        dy = my.determinant();
        x = dx / d;
        y = dy / d;

        vector.to.x = x;
        vector.to.y = y;

        this.from.x = x;
        this.from.y = y;

        result = true;
    }

    return result;
};
primitives.common.Graphics = function (widget) {
	this.m_widget = widget;

	this.m_placeholders = {};
	this.m_activePlaceholder = null;

	this.m_cache = new primitives.common.Cache();

	this.boxModel = jQuery.support.boxModel;
	this.graphicsType = null;
	this.hasGraphics = false;
	this.debug = false;
};

primitives.common.Graphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	this.m_cache.clear();

	this.m_cache = null;

	this.m_widget = null;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];

			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					layer.canvas.remove();
					layer.canvas = null;
				}
			}
			placeholder.layers.length = 0;
			placeholder.activeLayer = null;

			placeholder.size = null;
			placeholder.rect = null;
			placeholder.div = null;
		}
	}
	this.m_placeholders.length = 0;
	this.m_activePlaceholder = null;
};

primitives.common.Graphics.prototype.resize = function (name, width, height) {
	var placeholder = this.m_placeholders[name];
	if (placeholder != null) {
		this.resizePlaceholder(placeholder, width, height);
	}
};

primitives.common.Graphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer;

	placeholder.size = new primitives.common.Size(width, height);
	placeholder.rect = new primitives.common.Rect(0, 0, width, height);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.name !== -1) {
				layer.canvas.css({
					"position": "absolute"
					, "width": "0px"
					, "height": "0px"
				});
			}
		}
	}
};

primitives.common.Graphics.prototype.begin = function () {
	this.m_cache.begin();
};

primitives.common.Graphics.prototype.end = function () {
	this.m_cache.end();
};


primitives.common.Graphics.prototype.reset = function (arg0, arg1) {
	var placeholderName = "none",
		layerName = -1;
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				placeholderName = arg0;
			}
			else {
				layerName = arg0;
			}
			break;
		case 2:
			placeholderName = arg0;
			layerName = arg1;
			break;
	}
	this.m_cache.reset(placeholderName, layerName);
};

primitives.common.Graphics.prototype.activate = function (arg0, arg1) {
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				this._activatePlaceholder(arg0);
				this._activateLayer(-1);
			}
			else {
				this._activatePlaceholder("none");
				this._activateLayer(arg0);
			}
			break;
		case 2:
			this._activatePlaceholder(arg0);
			this._activateLayer(arg1);
			break;
	}
	return this.m_activePlaceholder;
};

primitives.common.Graphics.prototype._activatePlaceholder = function (placeholderName) {
	var placeholder = this.m_placeholders[placeholderName],
		div;
	if (placeholder === undefined) {
		div = null;
		if (placeholderName === "none") {
			div = this.m_widget.element;
		}
		else {
			div = this.m_widget.element.find("." + placeholderName);
		}

		placeholder = new primitives.common.Placeholder(placeholderName);
		placeholder.div = div;
		placeholder.size = new primitives.common.Size(div.innerWidth(), div.innerHeight());
		placeholder.rect = new primitives.common.Rect(0, 0, placeholder.size.width, placeholder.size.height);

		this.m_placeholders[placeholderName] = placeholder;
	}
	this.m_activePlaceholder = placeholder;
};

primitives.common.Graphics.prototype._activateLayer = function (layerName) {
	var layer = this.m_activePlaceholder.layers[layerName],
		placeholder,
		canvas,
		position,
		maximumLayer,
		layerKey;
	if (layer === undefined) {
		placeholder = this.m_activePlaceholder;
		if (layerName === -1) {
			layer = new primitives.common.Layer(layerName);
			layer.canvas = placeholder.div;
		}
		else {
			canvas = jQuery('<div></div>');
			canvas.addClass("Layer" + layerName);
			position = new primitives.common.Rect(placeholder.rect);

			canvas.css({
				"position": "absolute"
				, "width": "0px"
				, "height": "0px"
			});

			maximumLayer = null;
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.name < layerName) {
						maximumLayer = (maximumLayer !== null) ? Math.max(maximumLayer, layer.name) : layer.name;
					}
				}
			}

			layer = new primitives.common.Layer(layerName);
			layer.canvas = canvas;

			if (maximumLayer === null) {
				placeholder.div.prepend(layer.canvas[0]);
			} else {
				layer.canvas.insertAfter(placeholder.layers[maximumLayer].canvas);
			}
		}
		placeholder.layers[layerName] = layer;
	}
	this.m_activePlaceholder.activeLayer = layer;
};

primitives.common.Graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {
	var placeholder = this.m_activePlaceholder,
		style = {
			"position": "absolute",
			"padding": 0,
			"margin": 0,
			"text-align": this._getTextAlign(horizontalAlignment),
			"font-size": attr["font-size"],
			"font-family": attr["font-family"],
			"font-weight": attr["font-weight"],
			"font-style": attr["font-style"],
			"color": attr["font-color"],
			"line-height": attr["font-size"]
		},
		rotation = "",
		element,
		tdstyle;

	switch (orientation) {
		case 0/*primitives.text.TextOrientationType.Horizontal*/:
		case 3/*primitives.text.TextOrientationType.Auto*/:
			style.left = x;
			style.top = y;
			style.width = width;
			style.height = height;
			break;
		case 1/*primitives.text.TextOrientationType.RotateLeft*/:
			style.left = x + Math.round(width / 2.0 - height / 2.0);
			style.top = y + Math.round(height / 2.0 - width / 2.0);
			style.width = height;
			style.height = width;
			rotation = "rotate(-90deg)";
			break;
		case 2/*primitives.text.TextOrientationType.RotateRight*/:
			style.left = x + Math.round(width / 2.0 - height / 2.0);
			style.top = y + Math.round(height / 2.0 - width / 2.0);
			style.width = height;
			style.height = width;
			rotation = "rotate(90deg)";
			break;
	}

	style["-webkit-transform-origin"] = "center center";
	style["-moz-transform-origin"] = "center center";
	style["-o-transform-origin"] = "center center";
	style["-ms-transform-origin"] = "center center";


	style["-webkit-transform"] = rotation;
	style["-moz-transform"] = rotation;
	style["-o-transform"] = rotation;
	style["-ms-transform"] = rotation;
	style.transform = rotation;


	style["max-width"] = style.width;
	style["max-height"] = style.height;

	label = label.replace(new RegExp("\n", 'g'), "<br/>");
	switch (verticalAlignment) {
	    case 0/*primitives.common.VerticalAlignmentType.Top*/:
	        if (this.debug) {
	            style.border = "solid 1px black";
	        }
			element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "text");
			if (element === null) {
				element = jQuery("<div></div>");
				element.css(style);
				element.html(label);
				placeholder.activeLayer.canvas.append(element);
				this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "text", element);
			}
			else {
				element.css(style);
				element.html(label);
			}
			break;
		default:
			style["border-collapse"] = "collapse";
			tdstyle = {
				"vertical-align": this._getVerticalAlignment(verticalAlignment),
				"padding": 0
			};
			if (this.debug) {
			    tdstyle.border = "solid 1px black";
			}
			element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "textintable");
			if (element === null) {
				element = jQuery('<table><tbody><tr><td></td></tr></tbody></table>');
				primitives.common.css(element, style);
				element.find("td").css(tdstyle).html(label);
				placeholder.activeLayer.canvas.append(element);
				this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "textintable", element);
			}
			else {
				primitives.common.css(element, style);
				element.find("td").css(tdstyle).html(label);
			}
			break;
	}
};

primitives.common.Graphics.prototype._getTextAlign = function (alignment) {
	var result = null;
	switch (alignment) {
		case 0/*primitives.common.HorizontalAlignmentType.Center*/:
			result = "center";
			break;
		case 1/*primitives.common.HorizontalAlignmentType.Left*/:
			result = "left";
			break;
		case 2/*primitives.common.HorizontalAlignmentType.Right*/:
			result = "right";
			break;
	}
	return result;
};

primitives.common.Graphics.prototype._getVerticalAlignment = function (alignment) {
	var result = null;
	switch (alignment) {
		case 1/*primitives.common.VerticalAlignmentType.Middle*/:
			result = "middle";
			break;
		case 0/*primitives.common.VerticalAlignmentType.Top*/:
			result = "top";
			break;
		case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
			result = "bottom";
			break;
	}
	return result;
};

primitives.common.Graphics.prototype.polylinesBuffer = function (buffer) {
    buffer.loop(this, function (polyline) {
        if (polyline.length() > 0) {
            this.polyline(polyline);
        }
    });
};

primitives.common.Graphics.prototype.polyline = function (polylineData) {
	var fromX = null,
		fromY = null,
        attr = polylineData.paletteItem.toAttr();

	polylineData.loop(this, function (segment) {
		switch (segment.segmentType) {
			case 1/*primitives.common.SegmentType.Move*/:
				fromX = Math.round(segment.x) + 0.5;
				fromY = Math.round(segment.y) + 0.5;
				break;
			case 0/*primitives.common.SegmentType.Line*/:
			    this.rightAngleLine(fromX, fromY, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5, attr);
			    fromX = Math.round(segment.x) + 0.5;
			    fromY = Math.round(segment.y) + 0.5;
				break;
		    case 4/*primitives.common.SegmentType.Dot*/:
		        this.dot(segment.x, segment.y, segment.width, segment.height, segment.cornerRadius, attr);
		        break;
		}
	});
};

primitives.common.Graphics.prototype.dot = function (cx, cy, width, height, cornerRadius, attr) {
    var placeholder = this.m_activePlaceholder,
		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "dot"),
        hasBorder = (attr.lineWidth !== undefined && attr.borderColor !== undefined),
        style = {
            "position": "absolute",
            "width": (width - (hasBorder ? 1 : 0)),
            "top": Math.round(cy),
            "left": Math.round(cx),
            "padding": 0,
            "margin": 0,
            "line-height": "0px",
            "overflow": "hidden",
            "height": (height - (hasBorder ? 1 : 0)),
            "background": attr.fillColor,
            "-moz-border-radius": cornerRadius,
            "-webkit-border-radius": cornerRadius,
            "-khtml-border-radius": cornerRadius,
            "border-radius": cornerRadius,
            "font-size": "0px",
            "border-style": (hasBorder ? "Solid" : "None"),
            "border-width": (hasBorder ? "1px" : "0px"),
            "border-color": (hasBorder ? attr.borderColor : "")
        };

	if (element === null) {
		element = jQuery('<div></div>');
		primitives.common.css(element, style);
		placeholder.activeLayer.canvas.append(element);
		this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "dot", element);
	} else {
		primitives.common.css(element, style);
	}
};

primitives.common.Graphics.prototype.rightAngleLine = function (fromX, fromY, toX, toY, attr) {
    var placeholder = this.m_activePlaceholder,
		isVertical = Math.abs(toY - fromY) > Math.abs(toX - fromX),
		lineWidth = attr.lineWidth,
		style = {
			"position": "absolute",
			"top": Math.round(Math.min(fromY, toY) - ((isVertical) ? 0 : lineWidth / 2.0)),
			"left": Math.round(Math.min(fromX, toX) - ((isVertical) ? lineWidth / 2.0 : 0)),
			"padding": 0,
			"margin": 0,
			"opacity": 0.5,
			"line-height": "0px",
			"overflow": "hidden",
			"background": attr.borderColor,
			"font-size": "0px"
		},
		element;

		if (isVertical) {
			style.width = lineWidth;
			style.height = Math.abs(Math.round(toY - fromY));
		} else {
			style.width = Math.abs(Math.round(toX - fromX));
			style.height = lineWidth;
		}

		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "rect");
		if (element === null) {
			element = jQuery("<div></div>");
			primitives.common.css(element, style);
			placeholder.activeLayer.canvas.append(element);
			this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "rect", element);
		} else {
			primitives.common.css(element, style);
		}
};

primitives.common.Graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
	var placeholder = this.m_activePlaceholder,
		element,
        templateKey = "template" + ((hashCode !== null) ? hashCode : primitives.common.hashCode(template)),
		gap = 0,
		style;

		element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, templateKey);

		if (attr !== null) {
			if (attr["border-width"] !== undefined) {
				gap = this.boxModel ? this.getPxSize(attr["border-width"]) : 0;
			}
		}

		style = {
			"width": (contentWidth - gap) + "px",
			"height": (contentHeight - gap) + "px",
			"top": (y + contenty) + "px",
			"left": (x + contentx) + "px"
		};

		jQuery.extend(style, attr);

		if (uiHash == null) {
			uiHash = new primitives.common.RenderEventArgs();
		}
		if (element == null) {
			element = jQuery(template);
			jQuery.extend(style, {
				"position": "absolute",
				"padding": "0px",
				"margin": "0px"
			}, attr);
			primitives.common.css(element, style);

			uiHash.element = element;
			uiHash.renderingMode = 0/*primitives.common.RenderingMode.Create*/;

			if (onRenderTemplate !== null) {
				this.m_widget._trigger(onRenderTemplate, null, uiHash);
			}
			placeholder.activeLayer.canvas.append(element);
			this.m_cache.put(placeholder.name, placeholder.activeLayer.name, templateKey, element);
		} else {
			uiHash.element = element;
			uiHash.renderingMode = 1/*primitives.common.RenderingMode.Update*/;
			primitives.common.css(element, style);
			if (onRenderTemplate !== null) {
				this.m_widget._trigger(onRenderTemplate, null, uiHash);
			}
		}
	return element;
};

primitives.common.Graphics.prototype.getPxSize = function (value, base) {
	var result = value;
	if (typeof value === "string") {
		if (value.indexOf("pt") > 0) {
			result = parseInt(value, 10) * 96 / 72;
		}
		else if (value.indexOf("%") > 0) {
			result = parseFloat(value) / 100.0 * base;
		}
		else {
			result = parseInt(value, 10);
		}
	}
	return result;
};
primitives.common.Cache = function () {
	this.threshold = 20;

	this.m_visible = {};
	this.m_invisible = {};
};

primitives.common.Cache.prototype.begin = function () {
	var placeholder,
		type,
		index,
		control;

	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
						control = this.m_visible[placeholder][type][index];
						control.css({ "visibility": "hidden" });
						this.m_invisible[placeholder][type].push(control);
					}
					this.m_visible[placeholder][type].length = 0;
				}
			}
		}
    }
};

primitives.common.Cache.prototype.end = function () {
	var placeholder,
		type,
		control;
	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					control = null;
					if (this.m_invisible[placeholder][type].length > this.threshold) {
						while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
							control.remove();
						}
					}
				}
			}
		}
	}
};

primitives.common.Cache.prototype.reset = function (placeholder, layer) {
	placeholder = placeholder + "-" + layer;
	var control = null,
		type,
		index;
	for (type in this.m_visible[placeholder]) {
		if (this.m_visible[placeholder].hasOwnProperty(type)) {
			for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
				control = this.m_visible[placeholder][type][index];
				this.m_invisible[placeholder][type].push(control);
				control.css({ "visibility": "hidden" });
			}
			this.m_visible[placeholder][type].length = 0;
		}
	}
};

primitives.common.Cache.prototype.clear = function () {
	var placeholder,
		type,
		control;
	for (placeholder in this.m_visible) {
		if (this.m_visible.hasOwnProperty(placeholder)) {
			for (type in this.m_visible[placeholder]) {
				if (this.m_visible[placeholder].hasOwnProperty(type)) {
					control = null;
					while ((control = this.m_visible[placeholder][type].pop()) !== undefined) {
						control.remove();
					}
					while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
						control.remove();
					}
				}
			}
		}
	}
};

primitives.common.Cache.prototype.get = function (placeholder, layer, type) {
	placeholder = placeholder + "-" + layer;
	var result = null;
	if (this.m_visible[placeholder] === undefined) {
		this.m_visible[placeholder] = {};
		this.m_invisible[placeholder] = {};
	}
	if (this.m_visible[placeholder][type] === undefined) {
		this.m_visible[placeholder][type] = [];
		this.m_invisible[placeholder][type] = [];
	}
	result = this.m_invisible[placeholder][type].pop() || null;
	if (result !== null) {
		this.m_visible[placeholder][type].push(result);
		result.css({ "visibility": "inherit" });
	}
	return result;
};

primitives.common.Cache.prototype.put = function (placeholder, layer, type, control) {
	placeholder = placeholder + "-" + layer;
	this.m_visible[placeholder][type].push(control);
};
primitives.common.CanvasGraphics = function (widget) {
	this.parent = primitives.common.Graphics.prototype;

	this.parent.constructor.apply(this, arguments);

	this.graphicsType = 1/*primitives.common.GraphicsType.Canvas*/;
	this.m_maximum = 8000; // Search for maximum size of canvas element
};

primitives.common.CanvasGraphics.prototype = new primitives.common.Graphics();

primitives.common.CanvasGraphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.canvascanvas !== null) {
						layer.canvascanvas.remove();
						layer.canvascanvas = null;
					}
				}
			}
		}
	}
	this.parent.clean.apply(this, arguments);
};

primitives.common.CanvasGraphics.prototype._activatePlaceholder = function (placeholderName) {
	var placeholder,
		width,
		height;

	this.parent._activatePlaceholder.apply(this, arguments);

	placeholder = this.m_activePlaceholder;
	width = placeholder.size.width;
	height = placeholder.size.height;
	if (width > this.m_maximum || height > this.m_maximum) {
		placeholder.hasGraphics = false;
	}
	else {
		placeholder.hasGraphics = true;
	}
};

primitives.common.CanvasGraphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer;

	this.parent.resizePlaceholder.apply(this, arguments);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.canvascanvas !== null) {
				layer.canvascanvas.css({
					"position": "absolute",
					"width": width + "px",
					"height": height + "px"
				});
				layer.canvascanvas.attr({
					"width": width + "px",
					"height": height + "px"
				});
			}
		}
	}
};

primitives.common.CanvasGraphics.prototype.begin = function () {
	var key,
		placeholder,
		layerKey,
		layer,
		width,
		height;
	this.parent.begin.apply(this);

	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			width = placeholder.size.width;
			height = placeholder.size.height;
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];

					if (layer.canvascanvas !== null) {
						layer.canvascontext.clearRect(0, 0, width, height);
					}
				}
			}
		}
	}
};

primitives.common.Graphics.prototype._getContext = function (placeholder, layer) {
	var width = placeholder.size.width,
		height = placeholder.size.height;

	if (layer.canvascanvas === null) {
		layer.canvascanvas = jQuery('<canvas></canvas>');

		layer.canvascanvas.attr({
			"width": width + "px",
			"height": height + "px"
		});
		placeholder.activeLayer.canvas.prepend(layer.canvascanvas);
		layer.canvascontext = layer.canvascanvas[0].getContext('2d');
	}
	return layer.canvascontext;
};

primitives.common.CanvasGraphics.prototype.reset = function (arg0, arg1) {
	var placeholderName = "none",
		layerName = -1,
		placeholder,
		layer,
		width,
		height;
	switch (arguments.length) {
		case 1:
			if (typeof arg0 === "string") {
				placeholderName = arg0;
			}
			else {
				layerName = arg0;
			}
			break;
		case 2:
			placeholderName = arg0;
			layerName = arg1;
			break;
	}

	this.parent.reset.apply(this, arguments);

	placeholder = this.m_placeholders[placeholderName];
	if (placeholder !== undefined) {
		width = placeholder.size.width;
		height = placeholder.size.height;
		layer = placeholder.layers[layerName];
		if (layer !== undefined && layer.canvascanvas !== null) {
			layer.canvascontext.clearRect(0, 0, width, height);
		}
	}
};

primitives.common.CanvasGraphics.prototype.polyline = function (polylineData) {
	var placeholder = this.m_activePlaceholder,
		layer,
		context,
        attr = polylineData.paletteItem.toAttr(),
		dashes,
		step,
		cornerRadius;
	if (!placeholder.hasGraphics) {
		this.parent.polyline.apply(this, arguments);
	}
	else {
		layer = placeholder.activeLayer;
		context = this._getContext(placeholder, layer);
		context.save();

		if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
			context.strokeStyle = attr.borderColor;
			context.lineWidth = attr.lineWidth;
		}
		else {
			context.lineWidth = 0;
			context.strokeStyle = "Transparent";
		}

		if (attr.lineType != null) {
		    step = Math.round(attr.lineWidth) || 1;
		    switch (attr.lineType) {
		        case 0/*primitives.common.LineType.Solid*/:
		            dashes = [];
		            break;
		        case 1/*primitives.common.LineType.Dotted*/:
		            dashes = [step, step];
		            break;
		        case 2/*primitives.common.LineType.Dashed*/:
		            dashes = [step * 5, step * 3];
		            break;
		    }

		    if (context.setLineDash !== undefined) {
		        context.setLineDash(dashes);
		    } else if (context.webkitLineDash !== undefined) {
		        context.webkitLineDash = dashes;
		    } else if (context.mozDash !== undefined) {
		        context.mozDash = dashes;
		    }
		}

		context.beginPath();

		polylineData.loop(this, function (segment) {
		    switch (segment.segmentType) {
		        case 1/*primitives.common.SegmentType.Move*/:
		            context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
		            break;
		        case 0/*primitives.common.SegmentType.Line*/:
		            context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
		            break;
		        case 4/*primitives.common.SegmentType.Dot*/:
		            if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
		                // circle dot
		                context.moveTo(Math.round(segment.x) + segment.width + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5);
		                context.arc(Math.round(segment.x) + segment.width / 2.0 + 0.5, Math.round(segment.y) + segment.height / 2.0 + 0.5, Math.round(segment.width / 2.0), 0, 2 * Math.PI, false);
		            } else if (segment.cornerRadius == 0) {
		                // square
		                context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
		                context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y) + 0.5);
		                context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height) + 0.5);
		                context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + segment.height) + 0.5);
		                context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
		            } else {
		                // rounded corners rectangle
		                cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));

		                context.moveTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
		                context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI, -Math.PI / 2.0, false);

		                context.lineTo(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y) + 0.5);
		                context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + cornerRadius) + 0.5, Math.round(cornerRadius), -Math.PI / 2.0, 0, false);

		                context.lineTo(Math.round(segment.x + segment.width) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5);
		                context.arc(Math.round(segment.x + segment.width - cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), 0, Math.PI / 2.0, false);

		                context.lineTo(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height) + 0.5);
		                context.arc(Math.round(segment.x + cornerRadius) + 0.5, Math.round(segment.y + segment.height - cornerRadius) + 0.5, Math.round(cornerRadius), Math.PI / 2.0, Math.PI, false);

		                context.lineTo(Math.round(segment.x) + 0.5, Math.round(segment.y + cornerRadius) + 0.5);
		            }
		            break;
		        case 2/*primitives.common.SegmentType.QuadraticArc*/:
		            context.quadraticCurveTo(Math.round(segment.cpX) + 0.5, Math.round(segment.cpY) + 0.5, Math.round(segment.x) + 0.5, Math.round(segment.y) + 0.5);
		            break;
		        case 3/*primitives.common.SegmentType.CubicArc*/:
		            context.bezierCurveTo(Math.round(segment.cpX1) + 0.5,
						Math.round(segment.cpY1) + 0.5,
						Math.round(segment.cpX2) + 0.5,
						Math.round(segment.cpY2) + 0.5,
						Math.round(segment.x) + 0.5,
						Math.round(segment.y) + 0.5);
		            break;
		    }
		});

		if (attr.lineWidth !== undefined) {
			context.stroke();
		}
		if (attr.fillColor !== undefined) {
			context.fillStyle = attr.fillColor;
			context.globalAlpha = attr.opacity;
			context.fill();
		}
		context.restore();
	}
};
primitives.common.Element = function (arg0, arg1) {
	this.ns = null;
	this.name = null;
	this.attr = {};
	this.style = {};

	this.children = [];

	switch (arguments.length) {
		case 1:
			this.name = arg0;
			break;
		case 2:
			this.ns = arg0;
			this.name = arg1;
			break;
		default:
			break;
	}
};

primitives.common.Element.prototype.setAttribute = function (key, value) {
	this.attr[key] = value;
};

primitives.common.Element.prototype.appendChild = function (child) {
	this.children[this.children.length] = child;
};

primitives.common.Element.prototype.create = function (ie8mode) {
	var result = null,
		name,
		child,
		index;
	if (this.ns !== null) {
		result = document.createElementNS(this.ns, this.name);
	}
	else {
		result = document.createElement(this.name);
	}
	for (name in this.attr) {
		if (this.attr.hasOwnProperty(name)) {
		    if (ie8mode !== undefined) {
				result[name] = this.attr[name];
			}
			else {
				result.setAttribute(name, this.attr[name]);
			}
		}
	}
	for (name in this.style) {
		if (this.style.hasOwnProperty(name)) {
			result.style[name] = this.style[name];
		}
	}
	for (index = 0; index < this.children.length; index += 1) {
		child = this.children[index];
		if (typeof child === "string") {
			result.appendChild(document.createTextNode(child));
		}
		else {
			result.appendChild(child.create(ie8mode));
		}
	}
	return result;
};

primitives.common.Element.prototype.update = function (target, ie8mode) {
	var name,
		length,
		index,
		child,
		value;
	for (name in this.style) {
		if (this.style.hasOwnProperty(name)) {
			value = this.style[name];
			if (target.style[name] !== value) {
				target.style[name] = value;
			}
		}
	}
	for (name in this.attr) {
		if (this.attr.hasOwnProperty(name)) {
			value = this.attr[name];
			if (ie8mode !== undefined) {
			    /* if you see exception here, it may be result of following situations:
                    1. You moved chart from one DOM node to another manually, it invalidates VML graphics in IE6, IE7 modes
                    so it is impossable to reuse VML items in DOM anymore. You have to update chart with Recreate option instead of refresh.
                    2. You made changes in Polyline graphics primitive and added extra sub nodes to it, so number and type of children for shape 
                        have been changed, so sub nodes mismatch is a reason for this exception.
                */
				if (target[name] !== value) {
					target[name] = value;
				}
			}
			else {
				if (target.getAttribute(name) !== value) {
					target.setAttribute(name, value);
				}
			}
		}
	}
	length = this.children.length;
	for (index = 0; index < length; index += 1) {
		child = this.children[index];
		if (typeof child === "string") {
			if (target.innerHtml !== child) {
				target.innerHtml = child;
			}
		}
		else {
			this.children[index].update(target.children[index], ie8mode);
		}
	}
};
primitives.common.Layer = function (name) {
	this.name = name;

	this.canvas = null;

	this.canvascanvas = null;
	this.svgcanvas = null;
};
primitives.common.Placeholder = function (name) {
	this.name = name;

	this.layers = {};
	this.activeLayer = null;

	this.size = null;
	this.rect = null;

	this.div = null;

	this.hasGraphics = true;
};
primitives.common.SvgGraphics = function (widget) {
	this.parent = primitives.common.Graphics.prototype;

	this.parent.constructor.apply(this, arguments);

	this._svgxmlns = "http://www.w3.org/2000/svg";

	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	this.hasGraphics = true;
};

primitives.common.SvgGraphics.prototype = new primitives.common.Graphics();

primitives.common.SvgGraphics.prototype.clean = function () {
	var key,
		placeholder,
		layerKey,
		layer;
	for (key in this.m_placeholders) {
		if (this.m_placeholders.hasOwnProperty(key)) {
			placeholder = this.m_placeholders[key];
			for (layerKey in placeholder.layers) {
				if (placeholder.layers.hasOwnProperty(layerKey)) {
					layer = placeholder.layers[layerKey];
					if (layer.svgcanvas !== null) {
						layer.svgcanvas.remove();
						layer.svgcanvas = null;
					}
				}
			}
		}
	}
	this.parent.clean.apply(this, arguments);
};

primitives.common.SvgGraphics.prototype.resizePlaceholder = function (placeholder, width, height) {
	var layerKey,
		layer,
		position;

	this.parent.resizePlaceholder.apply(this, arguments);

	for (layerKey in placeholder.layers) {
		if (placeholder.layers.hasOwnProperty(layerKey)) {
			layer = placeholder.layers[layerKey];
			if (layer.svgcanvas !== null) {
				position = {
					"position": "absolute"
					, "width": width + "px"
					, "height": height + "px"
				};
				layer.svgcanvas.css(position);
				layer.svgcanvas.attr({
					"viewBox": "0 0 " + width + " " + height
				});
			}
		}
	}
};

primitives.common.SvgGraphics.prototype._getCanvas = function () {
	var placeholder = this.m_activePlaceholder,
		layer = placeholder.activeLayer,
		panelSize = placeholder.rect;
	if (layer.svgcanvas === null) {
		layer.svgcanvas = jQuery('<svg version = "1.1"></svg>');
		layer.svgcanvas.attr({
			"viewBox": panelSize.x + " " + panelSize.y + " " + panelSize.width + " " + panelSize.height
		});
		layer.svgcanvas.css({
			"width": panelSize.width + "px",
			"height": panelSize.height + "px"
		});
		placeholder.activeLayer.canvas.prepend(layer.svgcanvas);
	}

	return layer.svgcanvas;
};

primitives.common.SvgGraphics.prototype.polyline = function (polylineData) {
	var placeholder = this.m_activePlaceholder,
		polyline,
		data,
        attr = polylineData.paletteItem.toAttr(),
		element,
		svgcanvas,
		step,
        radius,
		cornerRadius;


	polyline = new primitives.common.Element(this._svgxmlns, "path");
	if (attr.fillColor !== undefined) {
		polyline.setAttribute("fill", attr.fillColor);
		polyline.setAttribute("fill-opacity", attr.opacity);
	}
	else {
		polyline.setAttribute("fill-opacity", 0);
	}

	if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
		polyline.setAttribute("stroke", attr.borderColor);
		polyline.setAttribute("stroke-width", attr.lineWidth);
	} else {
		polyline.setAttribute("stroke", "transparent");
		polyline.setAttribute("stroke-width", 0);
	}

	if (attr.lineType != null) {
	    step = Math.round(attr.lineWidth) || 1;
	    switch (attr.lineType) {
	        case 0/*primitives.common.LineType.Solid*/:
	            polyline.setAttribute("stroke-dasharray", "");
	            break;
	        case 1/*primitives.common.LineType.Dotted*/:
	            polyline.setAttribute("stroke-dasharray", step + "," + step);
	            break;
	        case 2/*primitives.common.LineType.Dashed*/:
	            polyline.setAttribute("stroke-dasharray", (step * 5) + "," + (step * 3));
	            break;
	    }
	}

	data = "";
	polylineData.loop(this, function (segment) {
		switch (segment.segmentType) {
			case 1/*primitives.common.SegmentType.Move*/:
				data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
			case 0/*primitives.common.SegmentType.Line*/:
				data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
			case 2/*primitives.common.SegmentType.QuadraticArc*/:
				data += "Q" + (Math.round(segment.cpX) + 0.5) + " " + (Math.round(segment.cpY) + 0.5) + " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
		    case 4/*primitives.common.SegmentType.Dot*/:
		        // A rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y
		        if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
		            // dot
		            radius = segment.width / 2.0;
		            data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
		            data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
		            data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
		        } else if (segment.cornerRadius == 0) {
                    // square
		            data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
		            data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + 0.5);
		            data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
		            data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
		            data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
		        } else {
		            cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
		            data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
		            data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
		            data += "L" + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
		            data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
		            data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
		            data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
		            data += "L" + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
		            data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
		            data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
		        }
		        break;
			case 3/*primitives.common.SegmentType.CubicArc*/:
				data += "C" + (Math.round(segment.cpX1) + 0.5) + " " + (Math.round(segment.cpY1) + 0.5) +
					" " + (Math.round(segment.cpX2) + 0.5) + " " + (Math.round(segment.cpY2) + 0.5) +
					" " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
				break;
		}
	});

	polyline.setAttribute("d", data);
	element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "path");
	if (element === null) {
		element = jQuery(polyline.create());
		svgcanvas = this._getCanvas();
		svgcanvas.append(element);
		this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "path", element);
	}
	else {
		polyline.update(element[0]);
	}
};
primitives.common.Transform = function () {
	this.invertArea = false;
	this.invertHorizontally = false;
	this.invertVertically = false;

	this.size = null;
};

primitives.common.Transform.prototype.setOrientation = function (orientationType) {
    switch (orientationType) {
        case 0/*primitives.common.OrientationType.Top*/:
            this.invertArea = false;
            this.invertHorizontally = false;
            this.invertVertically = false;
            break;
        case 1/*primitives.common.OrientationType.Bottom*/:
            this.invertArea = false;
            this.invertHorizontally = false;
            this.invertVertically = true;
            break;
        case 2/*primitives.common.OrientationType.Left*/:
            this.invertArea = true;
            this.invertHorizontally = false;
            this.invertVertically = false;
            break;
        case 3/*primitives.common.OrientationType.Right*/:
            this.invertArea = true;
            this.invertHorizontally = true;
            this.invertVertically = false;
            break;
    }
};

primitives.common.Transform.prototype.getOrientation = function (orientationType) {
    var result = orientationType;
    if (this.invertHorizontally) {
        switch (orientationType) {
            case 2/*primitives.common.OrientationType.Left*/:
                result = 3/*primitives.common.OrientationType.Right*/;
                break;
            case 3/*primitives.common.OrientationType.Right*/:
                result = 2/*primitives.common.OrientationType.Left*/;
                break;
        }
    }

    if (this.invertVertically) {
        switch (orientationType) {
            case 0/*primitives.common.OrientationType.Top*/:
                result = 1/*primitives.common.OrientationType.Bottom*/;
                break;
            case 1/*primitives.common.OrientationType.Bottom*/:
                result = 0/*primitives.common.OrientationType.Top*/;
                break;
        }
    }


    if (this.invertArea) {
        switch (result) {
            case 0/*primitives.common.OrientationType.Top*/:
                result = 2/*primitives.common.OrientationType.Left*/;
                break;
            case 1/*primitives.common.OrientationType.Bottom*/:
                result = 3/*primitives.common.OrientationType.Right*/;
                break;
            case 2/*primitives.common.OrientationType.Left*/:
                result = 0/*primitives.common.OrientationType.Top*/;
                break;
            case 3/*primitives.common.OrientationType.Right*/:
                result = 1/*primitives.common.OrientationType.Bottom*/;
                break;
        }
    }

    return result;
};

primitives.common.Transform.prototype.transformPoint = function (x, y, forward, self, func) {
	var value;

	if (forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	    }
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
	}
	if (this.invertVertically) {
		y = this.size.height - y;
	}

	if (!forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	    }
	}

	func.call(self, x, y);
};

primitives.common.Transform.prototype.transformPoints = function (x, y, x2, y2, forward, self, func) {
	var value;

	if (forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = x2;
	        x2 = y2;
	        y2 = value;
	    }
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
		x2 = this.size.width - x2;
	}

	if (this.invertVertically) {
		y = this.size.height - y;
		y2 = this.size.height - y2;
	}

	if (!forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = x2;
	        x2 = y2;
	        y2 = value;
	    }
	}

	func.call(self, x, y, x2, y2);
};

primitives.common.Transform.prototype.transform3Points = function (x, y, x2, y2, x3, y3, forward, self, func) {
	var value;

	if (forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = x2;
	        x2 = y2;
	        y2 = value;
	        value = x3;
	        x3 = y3;
	        y3 = value;
	    }
	}

	if (this.invertHorizontally) {
		x = this.size.width - x;
		x2 = this.size.width - x2;
		x3 = this.size.width - x3;
	}
	if (this.invertVertically) {
		y = this.size.height - y;
		y2 = this.size.height - y2;
		y3 = this.size.height - y3;
	}

	if (!forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = x2;
	        x2 = y2;
	        y2 = value;
	        value = x3;
	        x3 = y3;
	        y3 = value;
	    }
	}

	func.call(self, x, y, x2, y2, x3, y3);
};

primitives.common.Transform.prototype.transformRect = function (x, y, width, height, forward, self, func) {
	var value;

	if (forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = width;
	        width = height;
	        height = value;
	    }
	}

	if (this.invertHorizontally) {
		x = this.size.width - x - width;
	}
	if (this.invertVertically) {
		y = this.size.height - y - height;
	}

	if (!forward) {
	    if (this.invertArea) {
	        value = x;
	        x = y;
	        y = value;
	        value = width;
	        width = height;
	        height = value;
	    }
	}

	func.call(self, x, y, width, height);
};
primitives.common.VmlGraphics = function (widget) {
	var vmlStyle,
		names,
		index;
	this.parent = primitives.common.Graphics.prototype;
	this.parent.constructor.apply(this, arguments);


	this.prefix = "rvml";
	this.ie8mode = (document.documentMode && document.documentMode >= 8);

	try {
		/*ignore jslint start*/
		eval('document.namespaces');
		/*ignore jslint end*/
	}
	catch (ex) {

	}

	if (!document.namespaces[this.prefix]) {
		document.namespaces.add(this.prefix, 'urn:schemas-microsoft-com:vml');
	}

	if (!primitives.common.VmlGraphics.prototype.vmlStyle) {
		vmlStyle = primitives.common.VmlGraphics.prototype.vmlStyle = document.createStyleSheet();
		names = [" *", "fill", "shape", "path", "textpath", "stroke"];
		for (index = 0; index < names.length; index += 1) {
			vmlStyle.addRule(this.prefix + "\\:" + names[index], "behavior:url(#default#VML); position:absolute;");
		}
	}

	this.graphicsType = 2/*primitives.common.GraphicsType.VML*/;
	this.hasGraphics = true;
};

primitives.common.VmlGraphics.prototype = new primitives.common.Graphics();

primitives.common.VmlGraphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {
	var placeholder,
		rotateLeft,
		textRect,
		textRectCoordSize,
		line,
		path,
		lineHeight,
		textHeight,
		fromPoint,
		toPoint,
		textpath,
		element;

	switch (orientation) {
		case 0/*primitives.text.TextOrientationType.Horizontal*/:
		case 3/*primitives.text.TextOrientationType.Auto*/:
			this.parent.text.call(this, x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr);
			break;
		default:
			placeholder = this.m_activePlaceholder;

			rotateLeft = (orientation === 1/*primitives.text.TextOrientationType.RotateLeft*/);
			textRect = new primitives.common.Rect(x, y, width, height);
			textRectCoordSize = new primitives.common.Rect(0, 0, width * 10, height * 10);

			line = new primitives.common.Element(this.prefix + ":shape");
			line.setAttribute("CoordSize", textRectCoordSize.width + "," + textRectCoordSize.height);
			line.setAttribute("filled", true);
			line.setAttribute("stroked", false);
			line.setAttribute("fillcolor", attr["font-color"]);
			line.style.top = textRect.y + "px";
			line.style.left = textRect.x + "px";
			line.style.width = textRect.width + "px";
			line.style.height = textRect.height + "px";
			line.style['font-family'] = attr['font-family'];


			path = new primitives.common.Element(this.prefix + ":path");
			path.setAttribute("TextPathOk", true);

			lineHeight = 10 * Math.floor(this.getPxSize(attr['font-size'])) * 1.6 /* ~ line height*/;
			textHeight = lineHeight * Math.max(label.split('\n').length - 1, 1);
			fromPoint = null;
			toPoint = null;

			if (rotateLeft) {
				switch (verticalAlignment) {
					case 0/*primitives.common.VerticalAlignmentType.Top*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.x + textHeight / 2.0, textRectCoordSize.bottom());
						toPoint = new primitives.common.Point(textRectCoordSize.x + textHeight / 2.0, textRectCoordSize.y);
						break;
					case 1/*primitives.common.VerticalAlignmentType.Middle*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.horizontalCenter(), textRectCoordSize.bottom());
						toPoint = new primitives.common.Point(textRectCoordSize.horizontalCenter(), textRectCoordSize.y);
						break;
					case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.right() - textHeight / 2.0, textRectCoordSize.bottom());
						toPoint = new primitives.common.Point(textRectCoordSize.right() - textHeight / 2.0, textRectCoordSize.y);
						break;
				}
			}
			else {
				switch (verticalAlignment) {
					case 0/*primitives.common.VerticalAlignmentType.Top*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.right() - textHeight / 2.0, textRectCoordSize.y);
						toPoint = new primitives.common.Point(textRectCoordSize.right() - textHeight / 2.0, textRectCoordSize.bottom());
						break;
					case 1/*primitives.common.VerticalAlignmentType.Middle*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.horizontalCenter(), textRectCoordSize.y);
						toPoint = new primitives.common.Point(textRectCoordSize.horizontalCenter(), textRectCoordSize.bottom());
						break;
					case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
						fromPoint = new primitives.common.Point(textRectCoordSize.x + textHeight / 2.0, textRectCoordSize.y);
						toPoint = new primitives.common.Point(textRectCoordSize.x + textHeight / 2.0, textRectCoordSize.bottom());
						break;
				}
			}
			path.setAttribute("v", " m" + fromPoint.x + "," + fromPoint.y + " l" + toPoint.x + "," + toPoint.y + " e");

			textpath = new primitives.common.Element(this.prefix + ":textpath");
			textpath.setAttribute("on", true);
			textpath.setAttribute("string", label);
			textpath.style.trim = false;
			textpath.style['v-text-align'] = this._getTextAlign(horizontalAlignment);
			textpath.style['font'] = "normal normal normal " + attr['font-size'] + "pt " + attr['font-family']; //ignore jslint

			line.appendChild(path);
			line.appendChild(textpath);

			element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "vmltext");
			if (element === null) {
				element = jQuery(line.create(this.ie8mode));
				placeholder.activeLayer.canvas.append(element);
				this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "vmltext", element);
			}
			else {
				line.update(element[0], this.ie8mode);
			}
			break;
	}
};

primitives.common.VmlGraphics.prototype.polyline = function (polylineData) {
    var placeholder = this.m_activePlaceholder,
		rect = new primitives.common.Rect(placeholder.rect),
		rectCoordSize = new primitives.common.Rect(0, 0, rect.width * 10, rect.height * 10),
		shape = new primitives.common.Element(this.prefix + ":shape"),
		data,
		path,
        stroke,
		fill,
		element,
		x, y, x2, y2, value,
		signature,
        attr = polylineData.paletteItem.toAttr();

	if (attr.borderColor !== undefined && attr.lineWidth !== undefined) {
		shape.setAttribute("strokecolor", attr.borderColor);
		shape.setAttribute("strokeweight", attr.lineWidth);
		shape.setAttribute("stroked", true);
	}
	else {
		shape.setAttribute("stroked", false);
	}
	
	shape.setAttribute("CoordSize", rectCoordSize.width + "," + rectCoordSize.height);
	shape.style.top = rect.y + "px";
	shape.style.left = rect.x + "px";
	shape.style.width = rect.width + "px";
	shape.style.height = rect.height + "px";

	data = "";
	polylineData.loop(this, function (segment) {
	    switch (segment.segmentType) {
	        case 1/*primitives.common.SegmentType.Move*/:
	            data += " m" + (10 * Math.round(segment.x)) + "," + (10 * Math.round(segment.y));
	            break;
	        case 0/*primitives.common.SegmentType.Line*/:
	            data += " l" + (10 * Math.round(segment.x)) + "," + (10 * Math.round(segment.y));
	            break;
	        case 4/*primitives.common.SegmentType.Dot*/:
	            x = Math.round(segment.x);
	            y = Math.round(segment.y);
	            x2 = Math.round(segment.x + segment.width);
	            y2 = Math.round(segment.y + segment.height);
	            if (x > x2) {
	                value = x;
	                x = x2;
	                x2 = value;
	            }
	            if (y > y2) {
	                value = y;
	                y = y2;
	                y2 = value;
	            }
	            x = 10 * x + 5;
	            y = 10 * y + 5;
	            x2 = 10 * x2 - 5;
	            y2 = 10 * y2 - 5;
	            data += " m" + x + "," + y;
	            data += " l" + x2 + "," + y;
	            data += " l" + x2 + "," + y2;
	            data += " l" + x + "," + y2;
	            data += " l" + x + "," + y;
	            break;
	        case 2/*primitives.common.SegmentType.QuadraticArc*/:
	            data += " qb" + (10 * Math.round(segment.cpX)) + "," + (10 * Math.round(segment.cpY)) +
					" l" + (10 * Math.round(segment.x)) + "," + (10 * Math.round(segment.y));
	            break;
	        case 3/*primitives.common.SegmentType.CubicArc*/:
	            data += " c" + 10 * Math.round(segment.cpX1) + "," + 10 * Math.round(segment.cpY1) + "," + 10 * Math.round(segment.cpX2) + "," + 10 * Math.round(segment.cpY2) + "," + 10 * Math.round(segment.x) + "," + 10 * Math.round(segment.y); //ignore jslint
	            break;
	    }
	});
	data += " e";

	signature = "shapepath";
	path = new primitives.common.Element(this.prefix + ":path");
	path.setAttribute("v", data);
	shape.appendChild(path);

	if (attr.lineType != null) {
	    stroke = new primitives.common.Element(this.prefix + ":stroke");
	    switch (attr.lineType) {
	        case 0/*primitives.common.LineType.Solid*/:
	            stroke.setAttribute("dashstyle", "Solid");
	            break;
	        case 1/*primitives.common.LineType.Dotted*/:
	            stroke.setAttribute("dashstyle", "ShortDot");
	            break;
	        case 2/*primitives.common.LineType.Dashed*/:
	            stroke.setAttribute("dashstyle", "Dash");
	            break;
	    }
	    shape.appendChild(stroke);
	    signature += "stroke";
	}


	if (attr.fillColor !== null) {
		shape.setAttribute("filled", true);
		fill = new primitives.common.Element(this.prefix + ":fill");
		fill.setAttribute("opacity", attr.opacity);
		fill.setAttribute("color", attr.fillColor);
		shape.appendChild(fill);
		signature += "fill";
	}
	else {
		shape.setAttribute("filled", false);
	}

	element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, signature);
	if (element === null) {
		element = jQuery(shape.create(this.ie8mode));
		placeholder.activeLayer.canvas.append(element);
		this.m_cache.put(placeholder.name, placeholder.activeLayer.name, signature, element);
	}
	else {
		shape.update(element[0], this.ie8mode);
	}
};
/*
    Class: primitives.text.Config
	    Text options class.
	
*/
primitives.text.Config = function () {
	this.classPrefix = "bptext";

	/*
	    Property: graphicsType
			Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	/*
    Property: actualGraphicsType
        Actual graphics type.
    */
	this.actualGraphicsType = null;

	/*
	    Property: textDirection
			Direction style. 

		Default:
			<primitives.text.TextDirection.Auto>
    */
	this.orientation = 0/*primitives.text.TextOrientationType.Horizontal*/;

	/*
	    Property: text
			Text
    */
	this.text = "";


	/*
	    Property: verticalAlignment
			Vertical alignment. 

		Default:
			<primitives.common.VerticalAlignmentType.Center>
    */
	this.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

	/*
	    Property: horizontalAlignment
			Horizontal alignment. 

		Default:
			<primitives.common.HorizontalAlignmentType.Center>
    */
	this.horizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;

	/*
	    Property: fontSize
			Font size. 

		Default:
			15
    */
	this.fontSize = "16px";

	/*
	    Property: fontFamily
			Font family. 

		Default:
			"Arial"
    */
	this.fontFamily = "Arial";

	/*
	    Property: color
			Color. 

		Default:
			<primitives.common.Colors.Black>
    */
	this.color = "#000000"/*primitives.common.Colors.Black*/;

	/*
	    Property: Font weight.
			Font weight: normal | bold

		Default:
			"normal"
    */
	this.fontWeight = "normal";

	/*
    Property: Font style.
        Font style: normal | italic
        
    Default:
        "normal"
    */
	this.fontStyle = "normal";

	/*
	method: update
	    Makes full redraw of text widget contents reevaluating all options.
    */
};
primitives.text.Controller = function () {
	this.widgetEventPrefix = "bptext";

	this.options = new primitives.text.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;
};

primitives.text.Controller.prototype._create = function () {
	this.element
			.addClass("ui-widget");

	this._createLayout();

	this._redraw();
};

primitives.text.Controller.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.text.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
		

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);

	this.options.actualGraphicsType = this.m_graphics.graphicsType;
};

primitives.text.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.text.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.text.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.text.Controller.prototype._redraw = function () {
    var panel = this.m_graphics.activate("placeholder"),
		attr = {
		    "font-size": this.options.fontSize,
		    "font-family": this.options.fontFamily,
		    "font-style": this.options.fontStyle,
		    "font-weight": this.options.fontWeight,
		    "font-color": this.options.color
		};
		this.m_graphics.text(
          panel.rect.x
        , panel.rect.y
        , panel.rect.width
        , panel.rect.height
        , this.options.text
        , this.options.orientation
        , this.options.horizontalAlignment
        , this.options.verticalAlignment
        , attr
        );
};

primitives.text.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};

/*
 * jQuery UI Text
 *
 * Basic Primitives Text.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.bpText", new primitives.text.Controller());
}(jQuery));
primitives.orgdiagram.BaseController = function () {
	this.graphics = null;
	this.transform = null;

    // User API items defining organizationor family chart depending on implementation
	this._configs = null;  /* tree of primitives.orgdiagram.ItemConfig or family of primitives.famdiagram.ItemConfig */

    // Organizational chart definition 
	this._orgTree = null;  /* primitives.common.tree primitives.orgdiagram.OrgItem */

	this._orgPartners = {}; /* key: primitives.orgdiagram.OrgItem.id value: array of primitives.orgdiagram.OrgItem.id */

    // Visual tree definition
	this._visualTree = primitives.common.tree();  /* key: primitives.orgdiagram.TreeItem.id value:primitives.orgdiagram.TreeItem */
	this._treeItemCounter = 0; /* counter of primitives.orgdiagram.TreeItem.id*/
	this._treeItemsByUserId = {}; /* key: ItemConfig.id value:primitives.orgdiagram.TreeItem */

    this._treeLevels = []; /* array of primitives.orgdiagram.TreeLevel */
	this._leftMargins = {};
	this._rightMargins = {};

	this._templates = {};
	this._defaultTemplate = null;

	this._checkBoxTemplate = null;
	this._checkBoxTemplateHashCode = null;

	this._buttonsTemplate = null;
	this._buttonsTemplateHashCode = null;

	this._groupTitleTemplate = null;
	this._groupTitleTemplateHashCode = null;

	this._annotationLabelTemplate = null;
	this._annotationLabelTemplateHashCode = null;

	this._printPreviewTemplate = null;
	this._printPreviewTemplateHashCode = null;

	this._cursorTreeItem = null; /* primitives.orgdiagram.TreeItem */
	this._highlightTreeItem = null; /* primitives.orgdiagram.TreeItem */

	this.m_scrollPanel = null;
	this.m_scrollPanelRect = new primitives.common.Rect(0, 0, 0, 0);
	this.m_placeholder = null;
	this.m_placeholderRect = new primitives.common.Rect(0, 0, 0, 0);

	this.m_calloutPlaceholder = null;
	this.m_calloutShape = null;

	this.boxModel = jQuery.support.boxModel;

	this._cancelMouseClick = false;

	this._itemsInterval = [];

	this._scale = null; // on zoom start scale value
	this.scale = 1; // current scale value

	this.showInvisibleSubTrees = false;
	this.showElbowDots = false;

	this._debug = false;
};

primitives.orgdiagram.BaseController.prototype._create = function () {
	this.element
			.addClass("ui-widget");

	this._createLayout();

	this._virtualBind();

	this.graphics = null;
	this.transform = null;

	this._redraw();
};

primitives.orgdiagram.BaseController.prototype.destroy = function () {
    this._virtualUnbind();

	this._clean();

	this._cleanLayout();
};

primitives.orgdiagram.BaseController.prototype._clean = function () {
	if (this.graphics !== null) {
		this.graphics.clean();
	}
	this.graphics = null;
	this.transform = null;
};

primitives.orgdiagram.BaseController.prototype._cleanLayout = function () {
	if (this.options.enablePanning) {
		this._mouseDestroy();
	}

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.orgdiagram.BaseController.prototype._createLayout = function () {
	this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
	this.m_placeholderRect = new primitives.common.Rect(this.m_scrollPanelRect);

	var position = this.element.offset();

	this.m_scrollPanel = jQuery('<div tabindex="0"></div>');
	this.m_scrollPanel.css({
		"position": "relative",
		"overflow": "auto",
		"top": "0px",
		"left": "0px",
		"width": this.m_scrollPanelRect.width + "px",
		"height": this.m_scrollPanelRect.height + "px",
		"padding": "0px",
		"margin-bottom": "0px",
		"margin-right": "0px",
		"margin-top": (-position.top + Math.floor(position.top)) + "px", /* fixes div pixel alignment */
		"margin-left": (-position.left + Math.floor(position.left)) + "px",
		"-webkit-overflow-scrolling": "touch"
	});
	this.m_scrollPanel.addClass(this.widgetEventPrefix);

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		position: "absolute",
		overflow: "hidden",
		top: "0px",
		left: "0px"
	});
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);
	this.m_placeholder.css(this.m_placeholderRect.getCSS());
	this.m_scrollPanel.append(this.m_placeholder);

	this.m_calloutPlaceholder = jQuery('<div></div>');
	this.m_calloutPlaceholder.css({
		position: "absolute",
		overflow: "visible"
	});
	this.m_calloutPlaceholder.addClass("calloutplaceholder");
	this.m_calloutPlaceholder.addClass(this.widgetEventPrefix);
	this.m_calloutPlaceholder.css({
		top: "0px",
		left: "0px",
		width: "0px",
		height: "0px"
	});
	this.m_placeholder.append(this.m_calloutPlaceholder);

	this.element.append(this.m_scrollPanel);
	
	if (this.options.enablePanning) {
		this._mouseInit(this.m_placeholder);
	}
};

primitives.orgdiagram.BaseController.prototype._updateLayout = function () {
	var position = this.element.offset();
	this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
	this.m_scrollPanel.css({
		"top": "0px",
		"left": "0px",
		"width": this.m_scrollPanelRect.width + "px",
		"height": this.m_scrollPanelRect.height + "px",
		"margin-bottom": "0px",
		"margin-right": "0px",
		"margin-top": (-position.top + Math.floor(position.top)) + "px",
		"margin-left": (-position.left + Math.floor(position.left)) + "px"
	});
};

primitives.orgdiagram.BaseController.prototype._virtualBind = function () {
	var self = this;

	this.m_placeholder
		.mousemove(function (e) { self._onMouseMove(e); })
        .click(function (e) { self._onMouseClick(e); })
        .dblclick(function (e) { self._onMouseDblClick(e); });
    this.m_scrollPanel
        .keydown(function (e) { self._onKeyDown(e); });

	if ('ontouchstart' in document.documentElement) {//ignore jslint
		this.m_scrollPanel[0].addEventListener("gesturestart", self.onGestureStartHandler = function (event) { self.onGestureStart(event); }, false);
		this.m_scrollPanel[0].addEventListener("gesturechange", self.onGestureChangeHandler = function (event) { self.onGestureChange(event); }, false);
	}

	this.options.onDefaultTemplateRender = function (event, data) { self._onDefaultTemplateRender(event, data); };
	this.options.onCheckBoxTemplateRender = function (event, data) { self._onCheckBoxTemplateRender(event, data); };
	this.options.onGroupTitleTemplateRender = function (event, data) { self._onGroupTitleTemplateRender(event, data); };
	this.options.onButtonsTemplateRender = function (event, data) { self._onButtonsTemplateRender(event, data); };
	this.options.onAnnotationLabelTemplateRender = function (event, data) { self._onAnnotationLabelTemplateRender(event, data); };
};

primitives.orgdiagram.BaseController.prototype._virtualUnbind = function () {
	this.m_placeholder.unbind("mousemove");
	this.m_placeholder.unbind("click");
	this.m_placeholder.unbind("dblclick");
	this.m_scrollPanel.unbind("keydown");

	if ('ontouchstart' in document.documentElement) {//ignore jslint
		this.m_scrollPanel[0].removeEventListener("gesturestart", this.onGestureStartHandler, false);
		this.m_scrollPanel[0].removeEventListener("gesturechange", this.onGestureChangeHandler, false);
	}

	this.options.onDefaultTemplateRender = null;
	this.options.onCheckBoxTemplateRender = null;
	this.options.onGroupTitleTemplateRender = null;
	this.options.onButtonsTemplateRender = null;
	this.options.onAnnotationLabelTemplateRender = null;
};

primitives.orgdiagram.BaseController.prototype.update = function (updateMode) {
	switch (updateMode) {
		case 2/*primitives.common.UpdateMode.PositonHighlight*/:
			this._redrawHighlight();
			break;
		case 1/*primitives.common.UpdateMode.Refresh*/:
			this._refresh();
			break;
		default:
			this._redraw();
			break;
	}
};

primitives.orgdiagram.BaseController.prototype._mouseCapture = function (event) {
	this._dragStartPosition = new primitives.common.Point(this.m_scrollPanel.scrollLeft() + event.pageX, this.m_scrollPanel.scrollTop() + event.pageY);
    return true;
};

primitives.orgdiagram.BaseController.prototype._mouseDrag = function (event) {
    var position = new primitives.common.Point(event.pageX, event.pageY),
		left = - position.x + this._dragStartPosition.x,
		top = - position.y + this._dragStartPosition.y;
    this.m_scrollPanel.css('visibility', 'hidden');
    this.m_scrollPanel
        .scrollLeft(left)
        .scrollTop(top);
    this.m_scrollPanel.css('visibility', 'inherit');
    return false;
};

primitives.orgdiagram.BaseController.prototype._mouseStop = function (event) {//ignore jslint
	this._cancelMouseClick = true;
};

/* This is virtual method. It is overriten in orgDiagram & in famDiagram */
primitives.orgdiagram.BaseController.prototype._virtualGetEventArgs = function (oldTreeItem, newTreeItem, name) {
    return null;
};

primitives.orgdiagram.BaseController.prototype._onMouseMove = function (event) {
    var placeholderOffset = this.m_placeholder.offset(),
		m_placeholderLeft = placeholderOffset.left,
		m_placeholderTop = placeholderOffset.top,
		x = event.pageX - m_placeholderLeft,
		y = event.pageY - m_placeholderTop,
		newCursorItem;

	if (!this._mouseStarted) {
		this._cancelMouseClick = false;
		newCursorItem = this._getTreeItemForMousePosition(x, y);
		//if ('ontouchstart' in document.documentElement) {//ignore jslint
		//	this._highlightTreeItem = newCursorItem;
		//} else {
		    this._setHighlightItem(event, newCursorItem);
		//}
	}
};

primitives.orgdiagram.BaseController.prototype._onMouseClick = function (event) {
	var newCursorItem = this._highlightTreeItem,
		target,
		button,
		buttonname,
		eventArgs,
		position;

	if (newCursorItem !== null) {
		if (!this._cancelMouseClick) {
			target = jQuery(event.target);
			if (target.hasClass(this.widgetEventPrefix + "button") || target.parent("." + this.widgetEventPrefix + "button").length > 0) {
				button = target.hasClass(this.widgetEventPrefix + "button") ? target : target.parent("." + this.widgetEventPrefix + "button");
				buttonname = button.data("buttonname");

				eventArgs = this._virtualGetEventArgs(null, newCursorItem, buttonname);
				this._trigger("onButtonClick", event, eventArgs);
			}
			else if (target.attr("name") === "selectiontext") {
			}
			else if (target.attr("name") === "checkbox") {//ignore jslint
			    eventArgs = this._virtualGetEventArgs(null, newCursorItem, buttonname);
			    this._trigger("onSelectionChanging", event, eventArgs);

			    position = primitives.common.indexOf(this.options.selectedItems, newCursorItem.itemConfig.id);
				if (position >= 0) {
					this.options.selectedItems.splice(position, 1);
				}
				else {
					this.options.selectedItems.push(newCursorItem.itemConfig.id);
				}
				this._trigger("onSelectionChanged", event, eventArgs);
			}
			else {
			    eventArgs = this._virtualGetEventArgs(null, newCursorItem);

				this._trigger("onMouseClick", event, eventArgs);
				if (!eventArgs.cancel) {
				    this._setCursorItem(event, newCursorItem);

				    this.m_scrollPanel.focus();
				}
			}
		}
	}
	this._cancelMouseClick = false;
};

primitives.orgdiagram.BaseController.prototype._onMouseDblClick = function (event) {
    var eventArgs;

    if (this._highlightTreeItem !== null) {
        if (!this._cancelMouseClick) {
            eventArgs = this._virtualGetEventArgs(null, this._highlightTreeItem);

            this._trigger("onMouseDblClick", event, eventArgs);
        }
    }
    this._cancelMouseClick = false;
};

primitives.orgdiagram.BaseController.prototype._setHighlightItem = function (event, newHighlightItem) {
    var result = true,
        eventArgs;
    if (newHighlightItem !== null) {
        if (newHighlightItem.itemConfig.id !== this.options.highlightItem) {
            eventArgs = this._virtualGetEventArgs(this._highlightTreeItem, newHighlightItem);

            this._highlightTreeItem = newHighlightItem;
            this.options.highlightItem = newHighlightItem.itemConfig.id;

            this._trigger("onHighlightChanging", event, eventArgs);

            if (!eventArgs.cancel) {
                this._refreshHighlight();

                this._trigger("onHighlightChanged", event, eventArgs);
            } else {
                result = false;
            }
        }
    } else {
        if (this.options.highlightItem !== null) {
            eventArgs = this._virtualGetEventArgs(this._highlightTreeItem, null);

            this._highlightTreeItem = null;
            this.options.highlightItem = null;

            this._trigger("onHighlightChanging", event, eventArgs);

            if (!eventArgs.cancel) {
                this._refreshHighlight();

                this._trigger("onHighlightChanged", event, eventArgs);
            } else {
                result = false;
            }
        }    
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._setCursorItem = function (event, newCursorItem) {
    var eventArgs;
    if (newCursorItem.itemConfig.id !== this.options.cursorItem) {
        eventArgs = this._virtualGetEventArgs(this.options.cursorItem != null ? this._treeItemsByUserId[this.options.cursorItem] : null, newCursorItem);

        this.options.cursorItem = newCursorItem.itemConfig.id;

        this._trigger("onCursorChanging", event, eventArgs);

        if (!eventArgs.cancel) {
            this._refresh();

            this._trigger("onCursorChanged", event, eventArgs);
        }
    }
};

primitives.orgdiagram.BaseController.prototype._getNextLevelTreeItem = function (newHighlightItem, isBelow) {
    var horizontalCenter = newHighlightItem.actualPosition.horizontalCenter(),
        index, len,
        levelIndex, levelLen,
        bestTreeItem = null,
        bestDistance = null,
        distance,
        treeLevelItems, treeItem,
        nextLevels = isBelow ? this._treeLevels.slice(newHighlightItem.level + 1, this._treeLevels.length) : this._treeLevels.slice(0, newHighlightItem.level).reverse();
    for (levelIndex = 0, levelLen = nextLevels.length; levelIndex < levelLen; levelIndex += 1) {
        treeLevelItems = nextLevels[levelIndex].treeItems;
        for (index = 0, len = treeLevelItems.length; index < len; index += 1) {
            treeItem = this._visualTree.node(treeLevelItems[index]);
            if (treeItem.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
                distance = Math.abs(horizontalCenter - treeItem.actualPosition.horizontalCenter());
                if (distance < bestDistance || bestDistance == null) {
                    bestDistance = distance;
                    bestTreeItem = treeItem;
                } else {
                    break;
                }
            }
        }
        if (bestDistance != null) {
            break;
        }
    }
    return bestTreeItem;
};

primitives.orgdiagram.BaseController.prototype._onKeyDown = function (event) {
    var treeLevel,
        index, len,
        currentHilightItem = this._highlightTreeItem != null ?   this._highlightTreeItem : this._cursorTreeItem,
        treeItem,
        newHilightItem,
        direction = null,
        accepted;

    if (currentHilightItem != null) {
        switch (event.which) {
            case 13: /*Enter*/
                this._setCursorItem(event, currentHilightItem);
                event.preventDefault();
                this.m_scrollPanel.focus();
                break;
            case 40: /*Down*/
                direction = 1/*primitives.common.OrientationType.Bottom*/;
                break;
            case 38: /*Up*/
                direction = 0/*primitives.common.OrientationType.Top*/;
                break;
            case 37: /*Left*/
                direction = 2/*primitives.common.OrientationType.Left*/;
                break;
            case 39: /*Right*/
                direction = 3/*primitives.common.OrientationType.Right*/;
                break;
        }

        if (direction != null) {

            accepted = false;

            while (!accepted) {
                accepted = true;

                direction = this.transform.getOrientation(direction);
                
                switch (direction) {
                    case 0/*primitives.common.OrientationType.Top*/:
                        newHilightItem = this._getNextLevelTreeItem(currentHilightItem, false);
                        break;
                    case 1/*primitives.common.OrientationType.Bottom*/:
                        newHilightItem = this._getNextLevelTreeItem(currentHilightItem, true);
                        break;
                    case 2/*primitives.common.OrientationType.Left*/:
                        treeLevel = this._treeLevels[currentHilightItem.level];
                        for (index = currentHilightItem.levelPosition - 1; index >= 0; index -= 1) {
                            treeItem = this._visualTree.node(treeLevel.treeItems[index]);
                            if (treeItem.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
                                newHilightItem = treeItem;
                                break;
                            }
                        }
                        break;
                    case 3/*primitives.common.OrientationType.Right*/:
                        treeLevel = this._treeLevels[currentHilightItem.level];
                        for (index = currentHilightItem.levelPosition + 1, len = treeLevel.treeItems.length; index < len; index += 1) {
                            treeItem = this._visualTree.node(treeLevel.treeItems[index]);
                            if (treeItem.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
                                newHilightItem = treeItem;
                                break;
                            }
                        }
                        break;
                }

                
                if (newHilightItem != null) {
                    event.preventDefault();
                    this._centerOnCursor(newHilightItem, false);
                    accepted = this._setHighlightItem(event, newHilightItem);
                    if (!accepted) {
                        currentHilightItem = newHilightItem;
                    }
                }
            }
            this.m_scrollPanel.focus();
        }
    }
};

primitives.orgdiagram.BaseController.prototype.onGestureStart = function (e) {
	this._scale = this.scale;
	e.preventDefault();
};

primitives.orgdiagram.BaseController.prototype.onGestureChange = function (e) {
	var scale = Math.round(this._scale * e.scale * 10.0) / 10.0;
	if (scale > this.options.maximumScale) {
		scale = this.options.maximumScale;
	} else if (scale < this.options.minimumScale) {
		scale = this.options.minimumScale;
	}
	
	this.scale = scale;

	this._refresh();

	e.preventDefault();
};

primitives.orgdiagram.BaseController.prototype._updateScale = function () {
	var scaletext = "scale(" + this.scale + "," + this.scale + ")";

	this.m_placeholder.css({
		"transform-origin": "0 0",
		"transform": scaletext,
		"-ms-transform": scaletext, /* IE 9 */
		"-webkit-transform": scaletext, /* Safari and Chrome */
		"-o-transform": scaletext, /* Opera */
		"-moz-transform": scaletext /* Firefox */
	});
};

primitives.orgdiagram.BaseController.prototype._redraw = function () {
	this._clean();

	this.graphics = primitives.common.createGraphics(this.options.graphicsType, this);
	this.graphics.debug = this._debug;
	this.transform = new primitives.common.Transform();

	this.options.actualGraphicsType = this.graphics.graphicsType;

	this.m_calloutShape = new primitives.common.Callout(this.graphics);

	this._virtualReadTemplates();

	this._createCheckBoxTemplate();
	this._createButtonsTemplate();
	this._createGroupTitleTemplate();
	this._createAnnotationLabelTemplate();
	this._createPrintPreviewTemplate();

	this._refresh();
};

primitives.orgdiagram.BaseController.prototype._refresh = function () {
	this._updateLayout();

	this.m_scrollPanel.css({
		"display": "none",
		"-webkit-overflow-scrolling": "auto"
	});

	this._updateScale();

	this._setItemsIntervals();

    /*  this is vritual method it is overriden in org and family charts differently
        create _orgTree collection defining internal org chart tree 
        in case of org chart it is straight forward conversion of user items into org items
        in case of famaly chart procedure has multiple transformation steps
        see derivatives.
    */
	this._virtualCreateOrgTree();
    /* create _visualTree collection defining visual tree of the chart*/
	this._createVisualTree();
    /* position visual tree items */
	this._positionTreeItems();

	this.graphics.resize("placeholder", this.m_placeholderRect.width, this.m_placeholderRect.height);
	this.transform.size = new primitives.common.Size(this.m_placeholderRect.width, this.m_placeholderRect.height);
	this.graphics.begin();

	this._redrawTreeItems();
	this._tracePathAnnotations();
	this._redrawConnectors();
	this._drawPrintPreview();
	this._drawAnnotations();
	this._drawHighlight();
	this._hideHighlightAnnotation();
	this._drawCursor();


	this.graphics.end();

	this.m_scrollPanel.css({
		"display": "block"
	});
	this._centerOnCursor(this._cursorTreeItem, true);

	this.m_scrollPanel.css({
		"-webkit-overflow-scrolling": "touch"
	});
};

primitives.orgdiagram.BaseController.prototype._setItemsIntervals = function () {
	this._itemsInterval[1/*primitives.common.Visibility.Normal*/] = this.options.normalItemsInterval;
	this._itemsInterval[2/*primitives.common.Visibility.Dot*/] = this.options.dotItemsInterval;
	this._itemsInterval[3/*primitives.common.Visibility.Line*/] = this.options.lineItemsInterval;
	this._itemsInterval[4/*primitives.common.Visibility.Invisible*/] = this.options.lineItemsInterval;
};


primitives.orgdiagram.BaseController.prototype._redrawHighlight = function () {
	if (this._treeItemsByUserId[this.options.highlightItem] != null) {
	    this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem];
	}
	this._refreshHighlight();
};

primitives.orgdiagram.BaseController.prototype._refreshHighlight = function () {
	this.graphics.reset("placeholder", 3/*primitives.common.Layers.Highlight*/);
	this.graphics.reset("calloutplaceholder", 9/*primitives.common.Layers.Annotation*/);
	this._drawHighlight();
	this._drawHighlightAnnotation();
};

primitives.orgdiagram.BaseController.prototype._drawHighlight = function () {
	var panel,
		actualPosition,
		position,
		highlightPadding,
		uiHash,
		element;
	if (this._highlightTreeItem !== null) {
		panel = this.graphics.activate("placeholder", 3/*primitives.common.Layers.Highlight*/);

		actualPosition = this._highlightTreeItem.actualPosition;
		position = new primitives.common.Rect(0, 0, Math.round(this._highlightTreeItem.actualSize.width), Math.round(this._highlightTreeItem.actualSize.height));
		highlightPadding = this._highlightTreeItem.template.highlightPadding;
		position.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);

		uiHash = new primitives.common.RenderEventArgs();
		uiHash.context = this._highlightTreeItem.itemConfig;
		uiHash.isCursor = this._highlightTreeItem.isCursor;
		uiHash.isSelected = this._highlightTreeItem.isSelected;
		uiHash.templateName = this._highlightTreeItem.template.name;

		this.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
			this, function (x, y, width, height) {
			    if (this._highlightTreeItem.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
			        element = this.graphics.template(
                          x
                        , y
                        , width
                        , height
                        , position.x
                        , position.y
                        , position.width
                        , position.height
                        , this._highlightTreeItem.template.highlightTemplate
                        , this._highlightTreeItem.template.highlightTemplateHashCode
                        , this._highlightTreeItem.template.highlightTemplateRenderName
                        , uiHash
                        , null
                        );
			    } else {
			        element = this.graphics.template(
                          x
                        , y
                        , width
                        , height
                        , position.x
                        , position.y
                        , position.width - 1
                        , position.height - 1
                        , this._highlightTreeItem.template.dotHighlightTemplate
                        , this._highlightTreeItem.template.dotHighlightTemplateHashCode
                        , null
                        , uiHash
                        , null
                        );
			    }
			});
	}
};

primitives.orgdiagram.BaseController.prototype._drawCursor = function () {
	var panel,
		treeItem = this._cursorTreeItem,
		actualPosition,
		position,
		cursorPadding,
		uiHash,
		element;
	if (treeItem !== null && treeItem.actualVisibility == 1/*primitives.common.Visibility.Normal*/) {
		panel = this.graphics.activate("placeholder", 6/*primitives.common.Layers.Cursor*/);

		actualPosition = treeItem.actualPosition;
		position = new primitives.common.Rect(treeItem.contentPosition);
		cursorPadding = treeItem.template.cursorPadding;
		position.offset(cursorPadding.left, cursorPadding.top, cursorPadding.right, cursorPadding.bottom);

		uiHash = new primitives.common.RenderEventArgs();
		uiHash.context = treeItem.itemConfig;
		uiHash.isCursor = treeItem.isCursor;
		uiHash.isSelected = treeItem.isSelected;
		uiHash.templateName = treeItem.template.name;

		this.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
			this, function (x, y, width, height) {
				element = this.graphics.template(
					  x
					, y
					, width
					, height
					, position.x
					, position.y
					, position.width
					, position.height
					, treeItem.template.cursorTemplate
					, treeItem.template.cursorTemplateHashCode
					, treeItem.template.cursorTemplateRenderName
					, uiHash
					, { "border-width": treeItem.template.cursorBorderWidth }
					);
			});
	}
};

primitives.orgdiagram.BaseController.prototype._redrawTreeItems = function () {
	var treeLevel,
		uiHash,
		element,
		markers = new primitives.common.PolylinesBuffer(),
        paletteItems = {},
		polyline,
		index,
		len,
		label,
		marker = new primitives.common.Marker(),
		itemTitleColor,
        itemFillColor;

	this.transform.setOrientation(this.options.orientationType);

	for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
		treeLevel = this._treeLevels[index];
		treeLevel.labels = [];
		treeLevel.labelsRect = null;
		treeLevel.hasFixedLabels = false;
		treeLevel.showLabels = true;
	}

	this._visualTree.loop(this, function (treeItemId, treeItem) {
	    var orgItem = treeItem.orgItem,
	        treeLevel = this._treeLevels[treeItem.level];

	    treeItem.setActualPosition(treeLevel, this.options);

	    this.transform.transformRect(treeItem.actualPosition.x, treeItem.actualPosition.y, treeItem.actualPosition.width, treeItem.actualPosition.height, true,
            this, function (x, y, width, height) {

                switch (treeItem.actualVisibility) {
                    case 1/*primitives.common.Visibility.Normal*/:
                        uiHash = new primitives.common.RenderEventArgs();
                        uiHash.context = treeItem.itemConfig;
                        uiHash.isCursor = treeItem.isCursor;
                        uiHash.isSelected = treeItem.isSelected;
                        uiHash.templateName = treeItem.template.name;

                        this.graphics.activate("placeholder", 7/*primitives.common.Layers.Item*/);
                        element = this.graphics.template(
                                  x
                                , y
                                , width
                                , height
                                , treeItem.contentPosition.x
                                , treeItem.contentPosition.y
                                , treeItem.contentPosition.width
                                , treeItem.contentPosition.height
                                , treeItem.template.itemTemplate
                                , treeItem.template.itemTemplateHashCode
                                , treeItem.template.itemTemplateRenderName
                                , uiHash
                                , { "border-width": treeItem.template.itemBorderWidth }
                                );

                        if (treeItem.actualHasGroupTitle) {
                            element = this.graphics.template(
                                      x
                                    , y
                                    , width
                                    , height
                                    , 2
                                    , treeItem.contentPosition.y
                                    , this.options.groupTitlePanelSize - 4
                                    , treeItem.contentPosition.height + 2
                                    , this._groupTitleTemplate
                                    , this._groupTitleTemplateHashCode
                                    , "onGroupTitleTemplateRender"
                                    , treeItem
                                    , null
                                    );
                        }
                        if (treeItem.actualHasSelectorCheckbox) {
                            this.graphics.activate("placeholder", 10/*primitives.common.Layers.Controls*/);
                            element = this.graphics.template(
                                      x
                                    , y
                                    , width
                                    , height
                                    , treeItem.contentPosition.x
                                    , treeItem.actualSize.height - (this.options.checkBoxPanelSize - 4)
                                    , treeItem.contentPosition.width
                                    , this.options.checkBoxPanelSize - 4
                                    , this._checkBoxTemplate
                                    , this._checkBoxTemplateHashCode
                                    , "onCheckBoxTemplateRender"
                                    , treeItem
                                    , null
                                    );
                        }
                        if (treeItem.actualHasButtons) {
                            this.graphics.activate("placeholder", 10/*primitives.common.Layers.Controls*/);
                            element = this.graphics.template(
                                      x
                                    , y
                                    , width
                                    , height
                                    , treeItem.actualSize.width - (this.options.buttonsPanelSize - 4)
                                    , treeItem.contentPosition.y
                                    , this.options.buttonsPanelSize - 4
                                    , Math.max(treeItem.contentPosition.height, treeItem.actualSize.height - treeItem.contentPosition.y)
                                    , this._buttonsTemplate
                                    , treeItem.template.name + this._buttonsTemplateHashCode
                                    , "onButtonsTemplateRender"
                                    , treeItem
                                    , null
                                    );
                        }

                        if (this.options.showLabels == 0/*primitives.common.Enabled.Auto*/) {
                            // Don't allow dot's labels overlap normal items
                            label = new primitives.common.Label();
                            label.text = orgItem.title;
                            label.position = new primitives.common.Rect(x, y, width, height);
                            label.weight = 10000;
                            label.labelType = 1/*primitives.common.LabelType.Dummy*/;
                            treeLevel.labels.push(label);
                        }
                        break;
                    case 2/*primitives.common.Visibility.Dot*/:
                        itemTitleColor = treeItem.template.minimizedItemBorderColor || orgItem.itemTitleColor || "#000080"/*primitives.common.Colors.Navy*/;
                        itemFillColor = treeItem.template.minimizedItemFillColor || orgItem.itemTitleColor || "#000080"/*primitives.common.Colors.Navy*/;
                        var minimizedItemShapeType = orgItem.minimizedItemShapeType !== null ? orgItem.minimizedItemShapeType :
                            treeItem.template.minimizedItemShapeType !== null ? treeItem.template.minimizedItemShapeType : this.options.minimizedItemShapeType;

                        if (minimizedItemShapeType == null || minimizedItemShapeType == 6/*primitives.common.ShapeType.None*/) {
                            polyline = markers.getPolyline(new primitives.common.PaletteItem({
                                'lineColor': itemTitleColor, 
                                'lineWidth': treeItem.template.minimizedItemLineWidth,
                                'lineType': treeItem.template.minimizedItemLineType,
                                'fillColor': itemFillColor,
                                'opacity': treeItem.template.minimizedItemOpacity
                            }));
                            polyline.addSegment(new primitives.common.DotSegment(x, y, width, height, treeItem.template.minimizedItemCornerRadius));
                        } else {
                            marker.draw(markers, minimizedItemShapeType, new primitives.common.Rect(x, y, width, height),
                                new primitives.common.PaletteItem({
                                'lineColor': itemTitleColor,
                                'lineWidth': treeItem.template.minimizedItemLineWidth,
                                'lineType': treeItem.template.minimizedItemLineType,
                                'fillColor': itemFillColor,
                                'opacity': treeItem.template.minimizedItemOpacity
                                })
                           );
                        }

                        label = this._createLabel(x, y, width, height, treeItem);
                        if (label != null) {
                            treeLevel.labels.push(label);
                        }

                        break;
                    default:
                        if (this._debug) {
                            itemTitleColor = "#ff0000"/*primitives.common.Colors.Red*/;
                            if (!paletteItems.hasOwnProperty(itemTitleColor)) {
                                paletteItems[itemTitleColor] = new primitives.common.PaletteItem({
                                    'lineColor': itemTitleColor,
                                    'lineWidth': 1,
                                    'lineType': 0/*primitives.common.LineType.Solid*/,
                                    'fillColor': itemTitleColor,
                                    'opacity': 1
                                });
                            }
                            polyline = markers.getPolyline(paletteItems[itemTitleColor]);
                            polyline.addSegment(new primitives.common.DotSegment(x - 1, y - 1, 2, 2, 1));
                        }
                        break;
                }
            });//ignore jslint
	});


	this.graphics.activate("placeholder", 4/*primitives.common.Layers.Marker*/);
	this.graphics.polylinesBuffer(markers);

    this._redrawLabels();
};

primitives.orgdiagram.BaseController.prototype._redrawLabels = function () {
	var labels, label, label2,
		index, index2, len,
		levelIndex, levelsLen,
		attr,
		treeLevel, treeLevelFirst, treeLevelSecond;

	if (this.options.showLabels == 0/*primitives.common.Enabled.Auto*/) {
		// Calculate total labels space
		for (levelIndex = 0, levelsLen = this._treeLevels.length; levelIndex < levelsLen; levelIndex += 1) {
			treeLevel = this._treeLevels[levelIndex];
			labels = treeLevel.labels;

			for (index = 0, len = labels.length; index < len; index += 1) {
				label = labels[index];
				if (treeLevel.labelsRect == null) {
					treeLevel.labelsRect = new primitives.common.Rect(label.position);
				} else {
					treeLevel.labelsRect.addRect(label.position);
				}
				treeLevel.hasFixedLabels = treeLevel.hasFixedLabels || (label.labelType == 2/*primitives.common.LabelType.Fixed*/);
			}
		}

		// Hide overlapping rows
		for (levelIndex = this._treeLevels.length - 1; levelIndex > 0; levelIndex -= 1) {
			treeLevelFirst = this._treeLevels[levelIndex - 1];
			treeLevelSecond = this._treeLevels[levelIndex];

			if (treeLevelFirst.labelsRect != null && treeLevelSecond.labelsRect != null) {
				if (treeLevelFirst.labelsRect.overlaps(treeLevelSecond.labelsRect)) {
					treeLevelSecond.showLabels = false;
				}
			}
		}

		// Hide overlapping labels in non-hidden rows
		for (levelIndex = 0, levelsLen = this._treeLevels.length; levelIndex < levelsLen; levelIndex += 1) {
			treeLevel = this._treeLevels[levelIndex];
			labels = treeLevel.labels;

			if (treeLevel.showLabels) {
				for (index = 0, len = labels.length; index < len; index += 1) {
					label = labels[index];
					if (label.isActive) {
						for (index2 = index + 1; index2 < len; index2 += 1) {
							label2 = labels[index2];
							if (label2.isActive) {
								if (label.position.overlaps(label2.position)) {
									if (label.weight >= label2.weight) {
										if (label2.labelType == 0/*primitives.common.LabelType.Regular*/) {
											label2.isActive = false;
										}
									} else {
										if (label.labelType == 0/*primitives.common.LabelType.Regular*/) {
											label.isActive = false;
										}
										break;
									}
								} else {
									break;
								}
							}
						}
					}
				}
			}
		}
	}

	this.graphics.activate("placeholder", 5/*primitives.common.Layers.Label*/);
	attr = {
		"font-size": this.options.labelFontSize,
		"font-family": this.options.labelFontFamily,
		"font-style": this.options.labelFontStyle,
		"font-weight": this.options.labelFontWeight,
		"font-color": this.options.labelColor
	};
	for (levelIndex = 0, levelsLen = this._treeLevels.length; levelIndex < levelsLen; levelIndex += 1) {
		treeLevel = this._treeLevels[levelIndex];
		if (treeLevel.showLabels || treeLevel.hasFixedLabels) {
			labels = treeLevel.labels;
			for (index = 0, len = labels.length; index < len; index += 1) {
				label = labels[index];
				if (label.isActive) {
					switch (label.labelType) {
						case 0/*primitives.common.LabelType.Regular*/:
						case 2/*primitives.common.LabelType.Fixed*/:
							this.graphics.text(label.position.x, label.position.y, label.position.width, label.position.height, label.text,
								label.labelOrientation,
								label.horizontalAlignmentType,
								label.verticalAlignmentType,
								attr);
							break;
					}
				}
			}
		}
	}
};

primitives.orgdiagram.BaseController.prototype._createLabel = function (x, y, width, height, treeItem) {
	var labelWidth,
		labelHeight,
		result = null,
		labelOffset = this.options.labelOffset,
		labelSize,
		labelPlacement,
		orgItem = treeItem.orgItem;

	if (!primitives.common.isNullOrEmpty(orgItem.label)) {
	    switch (orgItem.showLabel) {
			case 0/*primitives.common.Enabled.Auto*/:
				switch(this.options.showLabels) {
					case 0/*primitives.common.Enabled.Auto*/:
						switch (treeItem.actualVisibility) {
							case 3/*primitives.common.Visibility.Line*/:
							case 2/*primitives.common.Visibility.Dot*/:
								result = new primitives.common.Label();
								result.labelType = 0/*primitives.common.LabelType.Regular*/;
								result.weight = treeItem.leftPadding + treeItem.rightPadding;
								break;
							default:
								break;
						}
						break;
					case 2/*primitives.common.Enabled.False*/:
						break;
					case 1/*primitives.common.Enabled.True*/:
						result = new primitives.common.Label();
						result.labelType = 2/*primitives.common.LabelType.Fixed*/;
						result.weight = 10000;
						break;
				}
				break;
			case 2/*primitives.common.Enabled.False*/:
				break;
			case 1/*primitives.common.Enabled.True*/:
				result = new primitives.common.Label();
				result.weight = 10000;
				result.labelType = 2/*primitives.common.LabelType.Fixed*/;
				break;
		}

		if (result != null) {
		    result.text = orgItem.label;
			
		    labelSize = (orgItem.labelSize != null) ? orgItem.labelSize : this.options.labelSize;
		    result.labelOrientation = (orgItem.labelOrientation != 3/*primitives.text.TextOrientationType.Auto*/) ? orgItem.labelOrientation :
				(this.options.labelOrientation != 3/*primitives.text.TextOrientationType.Auto*/) ? this.options.labelOrientation :
					0/*primitives.text.TextOrientationType.Horizontal*/;
		    labelPlacement = (orgItem.labelPlacement != 0/*primitives.common.PlacementType.Auto*/) ? orgItem.labelPlacement :
				(this.options.labelPlacement != 0/*primitives.common.PlacementType.Auto*/) ? this.options.labelPlacement :
				1/*primitives.common.PlacementType.Top*/;

			switch (result.labelOrientation) {
				case 0/*primitives.text.TextOrientationType.Horizontal*/:
					labelWidth = labelSize.width;
					labelHeight = labelSize.height;
					break;
				case 1/*primitives.text.TextOrientationType.RotateLeft*/:
				case 2/*primitives.text.TextOrientationType.RotateRight*/:
					labelHeight = labelSize.width;
					labelWidth = labelSize.height;
					break;
			}

			switch (labelPlacement) {
				case 0/*primitives.common.PlacementType.Auto*/:
				case 1/*primitives.common.PlacementType.Top*/:
					result.position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
					}
					break;
			    case 2/*primitives.common.PlacementType.TopRight*/:
			    case 11/*primitives.common.PlacementType.RightTop*/:
					result.position = new primitives.common.Rect(x + width + labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
					}
					break;
				case 3/*primitives.common.PlacementType.Right*/:
					result.position = new primitives.common.Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
					}
					break;
			    case 4/*primitives.common.PlacementType.BottomRight*/:
			    case 12/*primitives.common.PlacementType.RightBottom*/:
					result.position = new primitives.common.Rect(x + width + labelOffset, y + height + labelOffset, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
					}
					break;
				case 5/*primitives.common.PlacementType.Bottom*/:
					result.position = new primitives.common.Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
					}
					break;
			    case 6/*primitives.common.PlacementType.BottomLeft*/:
			    case 10/*primitives.common.PlacementType.LeftBottom*/:
					result.position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height + labelOffset, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
					}
					break;
				case 7/*primitives.common.PlacementType.Left*/:
					result.position = new primitives.common.Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 1/*primitives.common.VerticalAlignmentType.Middle*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 0/*primitives.common.HorizontalAlignmentType.Center*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
					}
					break;
			    case 8/*primitives.common.PlacementType.TopLeft*/:
			    case 9/*primitives.common.PlacementType.LeftTop*/:
					result.position = new primitives.common.Rect(x - labelWidth - labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
					switch (result.labelOrientation) {
						case 0/*primitives.text.TextOrientationType.Horizontal*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 1/*primitives.text.TextOrientationType.RotateLeft*/:
							result.horizontalAlignmentType = 1/*primitives.common.HorizontalAlignmentType.Left*/;
							result.verticalAlignmentType = 2/*primitives.common.VerticalAlignmentType.Bottom*/;
							break;
						case 2/*primitives.text.TextOrientationType.RotateRight*/:
							result.horizontalAlignmentType = 2/*primitives.common.HorizontalAlignmentType.Right*/;
							result.verticalAlignmentType = 0/*primitives.common.VerticalAlignmentType.Top*/;
							break;
					}
					break;
			}
		}
	}
	return result;
};

primitives.orgdiagram.BaseController.prototype._tracePathAnnotations = function () {
    var index, len,
        index2, len2,
        index3, len3,
        firstItem, nextItem,
        treeItem,
        graph,
        path,
        items,
        connection,
        annotationConfig;

    for (index = 0, len = this.options.annotations.length; index < len; index += 1) {
        annotationConfig = this.options.annotations[index];
        switch (annotationConfig.annotationType) {
            case 2/*primitives.common.AnnotationType.HighlightPath*/:
                if (graph == null) {
                    graph = this._getConnectionsGraph();
                }
                if (annotationConfig.items != null && annotationConfig.items.length > 0) {
                    items = annotationConfig.items.slice(0);
                    firstItem = this._treeItemsByUserId[items[0]];

                    if (firstItem != null) {
                        /* if annotation contains one single item we connect it to its logical parents*/
                        if (items.length == 1) {
                            this._navigationFamily.loopParents(this, firstItem.id, function (nextItemId, nextItem, level) {
                                if (nextItem.itemConfig != null) {
                                    items.push(nextItem.itemConfig.id);
                                }
                                return this._navigationFamily.SKIP;
                            });//ignore jslint
                        }

                        if (items.length > 1) {
                            for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
                                nextItem = this._treeItemsByUserId[items[index2]];

                                if (nextItem != null) {
                                    path = graph.getShortestPath(firstItem.id, nextItem.id, function (edge, fromItem, toItem) {
                                        return edge.getNear(toItem);
                                    });//ignore jslint

                                    for (index3 = 1, len3 = path.length; index3 < len3; index3 += 1) {
                                        connection = graph.edge([path[index3 - 1]], [path[index3]]);
                                        treeItem = this._visualTree.node(connection.highlightItemId);
                                        treeItem.highlightPath = 1;

                                        if (connection.hasOwnProperty("partnerid")) {
                                            treeItem = this._visualTree.node(connection.partnerid);
                                            treeItem.partnerHighlightPath = 1;
                                        }
                                    }

                                    firstItem = nextItem;
                                }
                            }
                        }
                    }
                }
                break;
        }
    }
};

primitives.orgdiagram.BaseController.prototype._getConnectionsGraph = function () {
    var treeLevel, index, len, index2, len2, index3, len3,
        id, treeItem, treeItemTo,
        treeItemWeight, treeItemToWeight,
        toItems, itemTo,
        result = primitives.common.graph(),
        parentTreeItem,
        edge;
    for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
        treeLevel = this._treeLevels[index];

        for (index2 = 0, len2 = treeLevel.treeItems.length; index2 < len2; index2+=1) {
            id = treeLevel.treeItems[index2];
            treeItem = this._visualTree.node(id);
            treeItemWeight = treeItem.actualIsActive ? 100 : 1;

            if (treeItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
                toItems = [treeLevel.treeItems[treeItem.levelPosition - 1]];
            } else if (treeItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
                toItems = [treeLevel.treeItems[treeItem.levelPosition + 1]];
            } else if (treeItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
                parentTreeItem = this._visualTree.parent(treeItem.id);
                if (parentTreeItem.partners.length > 1) {
                    toItems = parentTreeItem.partners.slice(0);
                } else {
                    toItems = [parentTreeItem.id];
                }
                if (parentTreeItem.extraPartners.length > 0) {
                    toItems = toItems.concat(parentTreeItem.extraPartners);
                }
            } else {
                toItems = [];
            }

            for (index3 = 0, len3 = toItems.length; index3 < len3; index3 += 1) {
                itemTo = toItems[index3];
                treeItemTo = this._visualTree.node(itemTo);
                treeItemToWeight = treeItemTo.actualIsActive ? 100 : 1;

                edge = new primitives.famdiagram.EdgeItem(treeItem.id, treeItemWeight, itemTo, treeItemToWeight);
                edge.highlightItemId = treeItem.id;
                if (len3 != 1) {
                    edge.partnerid = itemTo;
                }

                result.addEdge(treeItem.id, itemTo, edge);
            }
        }
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._drawPrintPreview = function () {
    var panel,
        layer = 1/*primitives.common.Layers.BackgroundAnnotations*/,
        size = this.options.printPreviewPageSize,
        x, y, element;

    if (this.options.pageFitMode == 4/*primitives.common.PageFitMode.PrintPreview*/) {
        panel = this.graphics.activate("placeholder", layer);
        x = 0;
        while ((x + 1) * size.width < this.m_placeholderRect.width) {
            y = 0;
            while ((y + 1) * size.height < this.m_placeholderRect.height) {
                element = this.graphics.template(
                    x * size.width
                    , y * size.height
                    , size.width
                    , size.height
                    , 0
                    , 0
                    , size.width
                    , size.height
                    , this._printPreviewTemplate
                    , this._printPreviewTemplateHashCode
                    , null
                    , null
                    , null
                );
                element.data({ "column": x, "row": y });
                y += 1;
            }
            x += 1;
        }
        

    }
};

primitives.orgdiagram.BaseController.prototype._drawAnnotations = function () {
    var panel,
        layer = 8/*primitives.common.Layers.ForegroundAnnotations*/,
        index, len,
        index2, len2,
        index3, len3,
        fromItem,
        toItem,
        shape,
        defaultConfig,
        items, itemsHash, item, position,
        properties, property,
        annotationConfig,
        uiHash,
        backgroundManager,
        perimeters, treeItem;

    for (index = 0, len = this.options.annotations.length; index < len; index += 1) {
        annotationConfig = this.options.annotations[index];

        switch (annotationConfig.annotationType) {
            case 0/*primitives.common.AnnotationType.Connector*/:
                if (annotationConfig.fromItem != null && annotationConfig.toItem != null) {
                    fromItem = this._treeItemsByUserId[annotationConfig.fromItem];
                    toItem = this._treeItemsByUserId[annotationConfig.toItem];
                    if (fromItem != null && toItem != null) {
                        defaultConfig = new primitives.orgdiagram.ConnectorAnnotationConfig();

                        shape = new primitives.common.Connector(this.graphics);
                        shape.orientationType = this.options.orientationType;
                        properties = ["connectorShapeType", "labelPlacementType", "offset", "lineWidth", "color", "lineType", "labelSize", "zOrderType"];
                        for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
                            property = properties[index3];
                            shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
                        }
                        shape.labelTemplate = this._annotationLabelTemplate;
                        shape.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
                        shape.hasLabel = !primitives.common.isNullOrEmpty(annotationConfig.label);

                        uiHash = new primitives.common.RenderEventArgs();
                        uiHash.context = annotationConfig;

                        switch (shape.zOrderType) {
                            case 1/*primitives.common.ZOrderType.Background*/://ignore jslint
                                layer = 1/*primitives.common.Layers.BackgroundAnnotations*/;
                                break;
                            case 0/*primitives.common.ZOrderType.Auto*/://ignore jslint
                            case 2/*primitives.common.ZOrderType.Foreground*/://ignore jslint
                            default://ignore jslint
                                layer = 8/*primitives.common.Layers.ForegroundAnnotations*/;
                                break;
                        }
                        panel = this.graphics.activate("placeholder", layer);
                        shape.panelSize = panel.size;

                        this.transform.transformRect(fromItem.actualPosition.x, fromItem.actualPosition.y, fromItem.actualPosition.width, fromItem.actualPosition.height, true,
                            this, function (x, y, width, height) {
                                var fromRect = new primitives.common.Rect(x, y, width, height);
                                this.transform.transformRect(toItem.actualPosition.x, toItem.actualPosition.y, toItem.actualPosition.width, toItem.actualPosition.height, true,
                                    this, function (x, y, width, height) {
                                        var toRect = new primitives.common.Rect(x, y, width, height);
                                        shape.draw(fromRect, toRect, uiHash);
                                    });
                            });//ignore jslint
                    }
                }
                break;
            case 1/*primitives.common.AnnotationType.Shape*/:
                if (annotationConfig.items != null && annotationConfig.items.length > 0) {
                    position = new primitives.common.Rect();
                    for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
                        item = this._treeItemsByUserId[annotationConfig.items[index2]];
                        if (item != null) {
                            position.addRect(item.actualPosition);
                        }
                    }

                    if (!position.isEmpty()) {
                        shape = new primitives.common.Shape(this.graphics);
                        defaultConfig = new primitives.orgdiagram.ShapeAnnotationConfig();
                        properties = ["opacity", "cornerRadius", "shapeType", "offset", "lineWidth", "borderColor", "fillColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "zOrderType"];
                        for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
                            property = properties[index3];
                            shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
                        }
                        switch (shape.zOrderType) {
                            case 2/*primitives.common.ZOrderType.Foreground*/:
                                layer = 8/*primitives.common.Layers.ForegroundAnnotations*/;
                                break;
                            case 1/*primitives.common.ZOrderType.Background*/:
                                layer = 1/*primitives.common.Layers.BackgroundAnnotations*/;
                                break;
                            case 0/*primitives.common.ZOrderType.Auto*/:
                            default://ignore jslint
                                switch (shape.shapeType) {
                                    case 3/*primitives.common.ShapeType.CrossOut*/:
                                    case 1/*primitives.common.ShapeType.Oval*/:
                                    case 2/*primitives.common.ShapeType.Triangle*/:
                                        layer = 8/*primitives.common.Layers.ForegroundAnnotations*/;
                                        break;
                                    default:
                                        layer = 1/*primitives.common.Layers.BackgroundAnnotations*/;
                                        break;
                                }
                                break;
                        }
                        panel = this.graphics.activate("placeholder", layer);

                        shape.position = position;
                        shape.orientationType = this.options.orientationType;
                        shape.panelSize = panel.size;
                        shape.labelTemplate = this._annotationLabelTemplate;
                        shape.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
                        shape.hasLabel = annotationConfig.templateName != null || annotationConfig.label != null;

                        uiHash = new primitives.common.RenderEventArgs();
                        uiHash.context = annotationConfig;
                        uiHash.templateName = shape.labelTemplate;

                        this.transform.transformRect(position.x, position.y, position.width, position.height, true,
                            this, function (x, y, width, height) {
                                var position = new primitives.common.Rect(x, y, width, height);
                                shape.draw(position, uiHash);
                            });//ignore jslint
                    }
                }
                break;
            case 4/*primitives.common.AnnotationType.Background*/:
                if (annotationConfig.items != null && annotationConfig.items.length > 0) {
                    if (!backgroundManager) {
                        backgroundManager = this._getBackgroundManager();
                    }
                    shape = new primitives.common.Perimeter(this.graphics);
                    shape.transform = this.transform;
                    defaultConfig = new primitives.orgdiagram.BackgroundAnnotationConfig();
                    properties = ["opacity", "lineWidth", "borderColor", "fillColor", "lineType", "zOrderType"];
                    for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
                        property = properties[index3];
                        shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
                    }
                    switch (shape.zOrderType) {
                        case 2/*primitives.common.ZOrderType.Foreground*/:
                            layer = 8/*primitives.common.Layers.ForegroundAnnotations*/;
                            break;
                        case 1/*primitives.common.ZOrderType.Background*/:
                            layer = 1/*primitives.common.Layers.BackgroundAnnotations*/;
                            break;
                        case 0/*primitives.common.ZOrderType.Auto*/:
                        default://ignore jslint
                            layer = 1/*primitives.common.Layers.BackgroundAnnotations*/;
                            break;
                    }
                    panel = this.graphics.activate("placeholder", layer);

                    items = [];
                    itemsHash = {};
                    if (annotationConfig.includeChildren) {
                        for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
                            item = annotationConfig.items[index2];
                            treeItem = this._treeItemsByUserId[item];
                            if (treeItem != null) {
                                itemsHash[treeItem.orgItem.id] = true;
                                items.push(treeItem.orgItem.id);

                                this._navigationFamily.loopChildren(this, treeItem.id, function (childItemId, childItem) {
                                    if (childItem.orgItem != null) {
                                        if (!itemsHash[childItem.orgItem.id]) {
                                            itemsHash[childItem.orgItem.id] = true;
                                            items.push(childItem.orgItem.id);
                                        }
                                    }
                                    
                                }); //ignore jslint
                            }
                        }
                    } else {
                        items = annotationConfig.items;
                    }

                    perimeters = backgroundManager.getMergedPerimeters(items);
                    for (index2 = 0; index2 < perimeters.length; index2 += 1) {
                        shape.draw(perimeters[index2]);
                    }
                }
                break;
        }
    }
};


primitives.orgdiagram.BaseController.prototype._getBackgroundManager = function () {
    var result = new primitives.common.perimeter.Manager(),
        index, len,
        index2, len2,
        mergedTreeLevelOffsetsHashs,
        prevLevelOffsets, offsetsHash,
        visibleLayers, treeLevelOffsets, mergedTreeLevelOffsets, merged,
        treeItems, prevTreeItem, treeItem, nextTreeItem,
        offsets, offset,
        prevTreeLevel, treeLevel, nextTreeLevel,
        perimeters;
    if (this._treeLevels.length > 0) {
        // collect tree item offsets for visible levels only
        visibleLayers = [];
        treeLevelOffsets = [];
        for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
            prevTreeItem = null;
            treeItem = null;
            treeLevel = this._treeLevels[index];
            if (treeLevel.actualVisibility != 4/*primitives.common.Visibility.Invisible*/) {
                visibleLayers.push(index);
                offsets = [];
                treeItems = treeLevel.treeItems;
                for (index2 = 0, len2 = treeItems.length; index2 < len2; index2 += 1) {
                    nextTreeItem = this._visualTree.node(treeItems[index2]);
                    if (nextTreeItem.actualVisibility != 4/*primitives.common.Visibility.Invisible*/) {
                        if (nextTreeItem.orgItem != null) {
                            if (treeItem != null) {
                                this._addOffset(offsets, prevTreeItem, treeItem, nextTreeItem);
                            }
                            prevTreeItem = treeItem;
                            treeItem = nextTreeItem;
                        }
                    }
                }
                if (treeItem != null) {
                    this._addOffset(offsets, prevTreeItem, treeItem, null);
                }
                treeLevelOffsets.push(offsets);
            }
        }

        if (treeLevelOffsets.length > 0) {

            // merge adjustent tree level offsets
            mergedTreeLevelOffsets = [];
            prevLevelOffsets = [];
            for (index = 0, len = treeLevelOffsets.length; index < len; index += 1) {
                merged = primitives.common.mergeSort([prevLevelOffsets, treeLevelOffsets[index]], null, true);
                mergedTreeLevelOffsets.push(merged);
                prevLevelOffsets = treeLevelOffsets[index];
            }
            mergedTreeLevelOffsets.push(primitives.common.mergeSort([treeLevelOffsets[index - 1]], null, true)); // we need extra level for last one

            // create offset hashs
            mergedTreeLevelOffsetsHashs = []; // array of hashes. Hash key = offset and hash value = offset index
            for (index = 0, len = mergedTreeLevelOffsets.length; index < len; index += 1) {
                offsetsHash = {};
                offsets = mergedTreeLevelOffsets[index];
                for (index2 = 0, len2 = offsets.length; index2 < len2; index2 += 1) {
                    offset = offsets[index2];
                    offsetsHash[offset] = index2;
                }
                mergedTreeLevelOffsetsHashs.push(offsetsHash);
            }

            // create perimeters for tree levels having visible items
            perimeters = [];
            prevTreeLevel = null;
            treeLevel = null;
            for (index = 0, len = visibleLayers.length; index < len; index += 1) {
                nextTreeLevel = this._treeLevels[visibleLayers[index]];

                if (treeLevel != null) {
                    this._addTreeLevelPerimeters(perimeters, index - 1, mergedTreeLevelOffsetsHashs, mergedTreeLevelOffsets, prevTreeLevel, treeLevel, nextTreeLevel);
                }
                prevTreeLevel = treeLevel;
                treeLevel = nextTreeLevel;
            }
            if (treeLevel != null) {
                this._addTreeLevelPerimeters(perimeters, index - 1, mergedTreeLevelOffsetsHashs, mergedTreeLevelOffsets, prevTreeLevel, treeLevel, null);
            }

            // Load perimeters into manager
            result.add(perimeters);
        }
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._addTreeLevelPerimeters = function (perimeters, index, hashes, offsets, prevLevel, level, nextLevel) {
    var interval = Math.floor(this.options.normalItemsInterval / 2),
        y = (prevLevel != null) ? Math.floor((prevLevel.shift + prevLevel.depth) * 3 / 7 + level.shift * 4 / 7) : level.shift - interval,
        y2 = (nextLevel != null) ? Math.floor((level.shift + level.depth) * 3 / 7 + nextLevel.shift * 4 / 7) : level.shift + level.depth + interval,
        prevTreeItem = null,
        treeItem = null,
        nextTreeItem,
        treeItems = level.treeItems,
        index2, len2;


    for (index2 = 0, len2 = treeItems.length; index2 < len2; index2 += 1) {
        nextTreeItem = this._visualTree.node(treeItems[index2]);
        if (nextTreeItem.actualVisibility != 4/*primitives.common.Visibility.Invisible*/) {
            if (nextTreeItem.orgItem != null) {
                if (treeItem != null) {
                    this._addPerimeter(perimeters, hashes[index], hashes[index + 1], offsets[index], offsets[index + 1], y, y2, prevTreeItem, treeItem, nextTreeItem);
                }
                prevTreeItem = treeItem;
                treeItem = nextTreeItem;
            }
        }
    }
    if (treeItem != null) {
        this._addPerimeter(perimeters, hashes[index], hashes[index + 1], offsets[index], offsets[index + 1], y, y2, prevTreeItem, treeItem, null);
    }
};

primitives.orgdiagram.BaseController.prototype._addOffset = function (offsets, prevItem, item, nextItem) {
    var interval = Math.floor(this.options.normalItemsInterval / 2),
        x = (prevItem != null) ? Math.floor((prevItem.offset + prevItem.actualSize.width) * 3 / 7 + item.offset * 4 / 7) : item.offset - interval,
        x2 = (nextItem != null) ? Math.floor((item.offset + item.actualSize.width) * 3 / 7 + nextItem.offset * 4 / 7) : item.offset + item.actualSize.width + interval;

    offsets.push(x);
    offsets.push(x2);
};

primitives.orgdiagram.BaseController.prototype._addPerimeter = function (perimeters, topHash, bottomHash, topOffsets, bottomOffsets, y, y2, prevItem, item, nextItem) {
    var segments = [],
        SegmentItem = primitives.common.perimeter.SegmentItem,
        interval = Math.floor(this.options.normalItemsInterval / 2),
        x = (prevItem != null) ? Math.floor((prevItem.offset + prevItem.actualSize.width) * 3 / 7 + item.offset * 4 / 7) : item.offset - interval,
        x2 = (nextItem != null) ? Math.floor((item.offset + item.actualSize.width) * 3 / 7 + nextItem.offset * 4 / 7) : item.offset + item.actualSize.width + interval,
        index;

    // left side
    segments.push(new SegmentItem(x, y, x, y2));

    // bottom side
    for (index = bottomHash[x] + 1; index <= bottomHash[x2]; index += 1) {
        segments.push(new SegmentItem(bottomOffsets[index - 1], y2, bottomOffsets[index], y2));
    }

    // right side
    segments.push(new SegmentItem(x2, y2, x2, y));

    // top side
    for (index = topHash[x2] - 1; index >= topHash[x]; index -= 1) {
        segments.push(new SegmentItem(topOffsets[index + 1], y, topOffsets[index], y));
    }

    perimeters.push(new primitives.common.perimeter.Item(item.orgItem.id, segments));
};

primitives.orgdiagram.BaseController.prototype._redrawConnectors = function () {
	var panel = this.graphics.activate("placeholder", 2/*primitives.common.Layers.Connector*/),
		treeItem, treeItems,
		treeLevel,
		paletteManager, buffer,
        index, len,
		levelIndex;

	if (this._visualTree.hasNodes()) {
	    paletteManager = new primitives.common.PaletteManager(this.options);
		buffer = new primitives.common.PolylinesBuffer();
		for (levelIndex = 0; levelIndex < this._treeLevels.length; levelIndex += 1) {
		    treeLevel = this._treeLevels[levelIndex];
		    treeItems = treeLevel.treeItems;
		    for (index = 0, len = treeItems.length; index < len; index += 1) {
		        treeItem = this._visualTree.node(treeItems[index]);
		        this._redrawConnector(panel.hasGraphics, buffer, paletteManager, treeItem, treeLevel);
		    }
		}

		this.graphics.polylinesBuffer(buffer);
	}
};

primitives.orgdiagram.BaseController.prototype._redrawConnector = function (hasGraphics, buffer, paletteManager, parentTreeItem, parentTreeLevel) {
    var self = this,
        hideConnectors,
		points, partnerPoints,
		children,
		treeItem,
		treeLevel,
		index,
		itemToLeft,
		itemToRight,
        isSquared,
        hasSquared,
		parentHorizontalCenter,
		partnersConnectorOffset,
        connectorStyleType = 0/*primitives.common.ConnectorStyleType.Extra*/,
        connectorPoint,
        connectorStep,
		chartHasSquaredConnectors = (this.options.connectorType == 0/*primitives.common.ConnectorType.Squared*/),
        paletteItem, polyline;

    
    /* Find offset of horizontal connector line between partners */
	if (parentTreeItem.partnerConnectorOffset > 0) {
	    partnersConnectorOffset = parentTreeLevel.shift + parentTreeLevel.connectorShift - parentTreeLevel.levelSpace / 2 * (parentTreeLevel.partnerConnectorOffset - parentTreeItem.partnerConnectorOffset + 1);
	} else {
	    if(parentTreeItem.connectorPlacement & 4/*primitives.common.SideFlag.Bottom*/) {
	        partnersConnectorOffset = parentTreeItem.actualPosition.bottom();
	    } else {
	        partnersConnectorOffset = parentTreeLevel.shift + parentTreeLevel.connectorShift;
	    }
	}

    /*draw every connector line with style from linesPalette, if linesPalette collection is empty then default style is used for all connectors
      seelcted style depends on children connector offset index
    */

    /* partners offsets starts from 1
        children offsets start from 0 */

	if (parentTreeItem.partnerConnectorOffset <= 1) {
	    paletteManager.selectPalette(0);
	} else {
	    if (parentTreeItem.partnerConnectorOffset > 1) {
	        paletteManager.selectPalette(parentTreeItem.partnerConnectorOffset - 1);
	    } else {
	        paletteManager.selectPalette(parentTreeLevel.partnerConnectorOffset);
	    }
	}

	if (this._visualTree.hasChildren(parentTreeItem.id)) {
	    hideConnectors = (parentTreeItem.actualVisibility === 4/*primitives.common.Visibility.Invisible*/) && (this._visualTree.parentid(parentTreeItem.id) == null);
        parentHorizontalCenter = parentTreeItem.actualPosition.horizontalCenter();
	}

    /* Draw connector line between parent and its partners, grouping of parents */
	partnerPoints = [];
	if (parentTreeItem.partners.length > 1 || parentTreeItem.extraPartners.length > 0) {
	    children = parentTreeItem.partners;
	    for (index = 0; index < children.length; index += 1) {
	        treeItem = this._visualTree.node(children[index]);

	        connectorPoint = new primitives.orgdiagram.ConnectorPoint(treeItem.actualPosition.horizontalCenter(), treeItem.actualPosition.bottom());
	        connectorPoint.isSquared = true;
	        connectorPoint.highlightPath = treeItem.partnerHighlightPath;
	        connectorPoint.connectorStyleType = treeItem.partnerHighlightPath ? 2/*primitives.common.ConnectorStyleType.Highlight*/ : 1/*primitives.common.ConnectorStyleType.Regular*/;
	        connectorPoint.visibility = treeItem.actualVisibility;
	        partnerPoints.push(connectorPoint);
	    }

	    children = parentTreeItem.extraPartners;
	    for (index = 0; index < children.length; index += 1) {
	        treeItem = this._visualTree.node(children[index]);

	        connectorPoint = new primitives.orgdiagram.ConnectorPoint(treeItem.actualPosition.horizontalCenter(), treeItem.actualPosition.bottom());
	        connectorPoint.isSquared = true;
	        connectorPoint.highlightPath = treeItem.partnerHighlightPath;
	        connectorPoint.connectorStyleType = treeItem.partnerHighlightPath ? 2/*primitives.common.ConnectorStyleType.Highlight*/ : 0/*primitives.common.ConnectorStyleType.Extra*/;
	        connectorPoint.visibility = treeItem.actualVisibility;
	        partnerPoints.push(connectorPoint);
	    }

	    if (partnerPoints.length > 0) {
	        partnerPoints.sort(function (a, b) { return a.x - b.x; });

	        if (!this._visualTree.hasChildren(parentTreeItem.id)) {
	            parentHorizontalCenter = (partnerPoints[0].x + partnerPoints[partnerPoints.length - 1].x) / 2.0;
	        }
	        buffer.addInverted(function (invertedBuffer) {
	            self._drawTopConnectors(invertedBuffer, paletteManager, parentHorizontalCenter, partnersConnectorOffset, partnerPoints, true, hasGraphics, self.options.arrowsDirection == 1/*primitives.common.GroupByType.Parents*/);
	        });
	    }
	}

    /* Draw connector lines between parent and its children */
	points = [];
	if (this._visualTree.hasChildren(parentTreeItem.id)) {
	    hasSquared = false;

	    this._visualTree.loopChildren(this, parentTreeItem.id, function (treeItemId, treeItem, level) {
	        treeLevel = this._treeLevels[treeItem.level];
	        paletteItem = paletteManager.getPalette(treeItem.highlightPath ? 2/*primitives.common.ConnectorStyleType.Highlight*/ : 1/*primitives.common.ConnectorStyleType.Regular*/);
	        polyline = buffer.getPolyline(paletteItem);

	        if (treeItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
	            itemToLeft = this._visualTree.node(treeLevel.treeItems[treeItem.levelPosition - 1]);
	            this.transform.transformPoints(treeItem.actualPosition.x, treeLevel.shift + treeLevel.horizontalConnectorsDepth,
                    itemToLeft.actualPosition.right(), treeLevel.shift + treeLevel.horizontalConnectorsDepth, true, this, function (fromX, fromY, toX, toY) {
                        self._drawLineWithArrow(fromX, fromY, toX, toY, buffer, polyline, treeItem.actualVisibility, itemToLeft.actualVisibility);
                    });//ignore jslint
	        } else if (treeItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
	            itemToRight = this._visualTree.node(treeLevel.treeItems[treeItem.levelPosition + 1]);
	            this.transform.transformPoints(treeItem.actualPosition.right(), treeLevel.shift + treeLevel.horizontalConnectorsDepth,
                    itemToRight.actualPosition.x, treeLevel.shift + treeLevel.horizontalConnectorsDepth, true, this, function (fromX, fromY, toX, toY) {
                        self._drawLineWithArrow(fromX, fromY, toX, toY, buffer, polyline, treeItem.actualVisibility, itemToRight.actualVisibility);
                    });//ignore jslint
	        } else if (treeItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
	            if (!hideConnectors) {
	                isSquared = true;
	                if (hasGraphics) {
	                    switch (treeItem.actualVisibility) {
	                        case 2/*primitives.common.Visibility.Dot*/:
	                        case 3/*primitives.common.Visibility.Line*/:
	                            isSquared = chartHasSquaredConnectors;
	                            break;
	                    }
	                }
	                connectorStep = 0;
	                connectorPoint = new primitives.orgdiagram.ConnectorPoint(treeItem.actualPosition.horizontalCenter() + connectorStep, treeItem.actualPosition.top());
	                connectorPoint.isSquared = isSquared;
	                connectorPoint.connectorStyleType = treeItem.highlightPath ? 2/*primitives.common.ConnectorStyleType.Highlight*/ : 1/*primitives.common.ConnectorStyleType.Regular*/;
	                connectorPoint.visibility = treeItem.actualVisibility;
	                points.push(connectorPoint);

	                connectorStyleType = Math.max(connectorStyleType, connectorPoint.connectorStyleType);

	                /* is true if any child point has squared connector */
	                hasSquared = hasSquared || connectorPoint.isSquared;
	            }
	        }
	    });


	    /* draw connector lines between regular children, grouping of children */
	    /* connectors are drawn from children up to the parent */
	    if (!hideConnectors && points.length > 0) {
	        /* Draw vertical line segment between parent and horizontal line connecting its children  */
	        this.transform.transformPoints(parentHorizontalCenter, partnersConnectorOffset,
                parentHorizontalCenter, parentTreeLevel.shift + parentTreeLevel.connectorShift,
                true, this, function (fromX, fromY, toX, toY) {
                    var elbowDotRadius = Math.round(self.options.elbowDotSize / 2),
                        paletteItem = paletteManager.getPalette(connectorStyleType),
                        polyline = buffer.getPolyline(paletteItem),
                        dotPolyline = buffer.getPolyline(polyline.arrowPaletteItem);

                    if (this.showElbowDots && this.options.elbowType != 0/*primitives.common.ElbowType.None*/ && parentTreeItem.partners.length > 0) {
                        dotPolyline.addSegment(new primitives.common.DotSegment(fromX - elbowDotRadius, fromY - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
                    }
                    buffer.addInverted(function (invertedBuffer) {
                        var polyline = invertedBuffer.getPolyline(paletteItem);
                        polyline.addSegment(new primitives.common.MoveSegment(toX, toY));
                        polyline.addSegment(new primitives.common.LineSegment(fromX, fromY));

                        if (self.options.arrowsDirection == 1/*primitives.common.GroupByType.Parents*/ && parentTreeItem.visibility != 4/*primitives.common.Visibility.Invisible*/ && partnerPoints.length <= 1) {
                            polyline.addArrow(self.options.linesWidth, function (polyline) {
                                polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                            }); //ignore jslint
                        }
                    });
                    if (this.showElbowDots && this.options.elbowType != 0/*primitives.common.ElbowType.None*/ && points.length > 1) {
				        dotPolyline.addSegment(new primitives.common.DotSegment(toX - elbowDotRadius, toY - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
                    }
                });
	        this._drawTopConnectors(buffer, paletteManager, parentHorizontalCenter, parentTreeLevel.shift + parentTreeLevel.connectorShift, points, hasSquared, hasGraphics, this.options.arrowsDirection == 2/*primitives.common.GroupByType.Children*/);
	    }
	}

};

primitives.orgdiagram.BaseController.prototype._drawLineWithArrow = function (fromX, fromY, toX, toY, buffer, polyline, fromVisibility, toVisibility) {
    var first = new primitives.common.Point(fromX, fromY),
        second = new primitives.common.Point(toX, toY),
        hasArrow = false;

    switch (this.options.arrowsDirection) {
        case 0/*primitives.common.GroupByType.None*/:
            break;
        case 1/*primitives.common.GroupByType.Parents*/:
            if (toVisibility != 4/*primitives.common.Visibility.Invisible*/) {
                hasArrow = true;
            }
            break;
        case 2/*primitives.common.GroupByType.Children*/:
            if (fromVisibility != 4/*primitives.common.Visibility.Invisible*/) {
                first.swap(second);
                hasArrow = true;
            }
            break;
    }
    polyline.addSegment(new primitives.common.MoveSegment(first));
    polyline.addSegment(new primitives.common.LineSegment(second));
    if (hasArrow) {
        polyline.addArrow(this.options.linesWidth, function (polyline) {
            polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
        }); //ignore jslint
    }
};

primitives.orgdiagram.BaseController.prototype._drawTopConnectors = function (buffer, paletteManager, parentX, parentY, points, hasSquared, hasGraphics, hasArrows) {
    var startIndex, endIndex, len,
        connectorPoint, curvedPoints = [],
        firstLast,
        startX, endX,
        index,
        paletteItem, polyline,
        left, right, styleType,
        leftPosition, rightPosition,
        bevelSize,
        self = this;

    if (hasSquared) {
        /* draw curved or angular lines on left side of pack */
        curvedPoints = [];
        for (startIndex = 0, len = points.length; startIndex < len; startIndex += 1) {
            connectorPoint = points[startIndex];
            if (connectorPoint.x < parentX && !connectorPoint.isSquared) {
                curvedPoints.push(connectorPoint);
            } else {
                break;
            }
        }
        len = curvedPoints.length;
        if (len > 0) {
            this._drawAngularConnectors(buffer, paletteManager, parentX, parentY, curvedPoints, false, hasArrows);
        }

        /* draw curved or angular lines on right side of pack */
        curvedPoints = [];
        for (endIndex = points.length - 1; endIndex >= startIndex; endIndex -= 1) {
            connectorPoint = points[endIndex];

            if (connectorPoint.x > parentX && !connectorPoint.isSquared) {
                curvedPoints.push(connectorPoint);
            } else {
                break;
            }
        }

        len = curvedPoints.length;
        if (len > 0) {
            this._drawAngularConnectors(buffer, paletteManager, parentX, parentY, curvedPoints, false, hasArrows);
        }

        left = {};
        right = {};
        for (styleType in primitives.common.ConnectorStyleType) {
            if (primitives.common.ConnectorStyleType.hasOwnProperty(styleType)) {
                left[primitives.common.ConnectorStyleType[styleType]] = parentX;
                right[primitives.common.ConnectorStyleType[styleType]] = parentX;
            }
        }

        /* calculate elbows of vertical connectors and draw dots */
        for (index = startIndex; index <= endIndex; index+= 1) {
            connectorPoint = points[index];

            paletteItem = paletteManager.getPalette(connectorPoint.connectorStyleType);
            polyline = buffer.getPolyline(paletteItem);

            bevelSize = this.options.dotItemsInterval / 2.0;
            if (bevelSize < 2) {
                bevelSize = 0;
            }
            if (hasGraphics) {
                switch (this.options.elbowType) {
                    case 2/*primitives.common.ElbowType.Bevel*/:
                    case 3/*primitives.common.ElbowType.Round*/:
                        if (bevelSize > 0 && Math.abs(parentX - connectorPoint.x) > bevelSize && Math.abs(parentY - connectorPoint.y) > bevelSize) {
                            connectorPoint.hasElbow = true;
                            connectorPoint.elbowPoint1 = new primitives.common.Point(connectorPoint.x, parentY + (parentY > connectorPoint.y ? -bevelSize : bevelSize));
                            connectorPoint.elbowPoint2 = new primitives.common.Point(connectorPoint.x + (parentX > connectorPoint.x ? bevelSize : -bevelSize), parentY);
                        }
                        break;
                    case 1/*primitives.common.ElbowType.Dot*/:
                        if (endIndex - startIndex > 0) {
                            this.transform.transformPoints(connectorPoint.x, parentY, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
                                var elbowDotRadius = Math.round(self.options.elbowDotSize / 2),
                                    dotPolyline = buffer.getPolyline(polyline.arrowPaletteItem);

                                dotPolyline.addSegment(new primitives.common.DotSegment(fromX - elbowDotRadius, fromY - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
                            });//ignore jslint
                        }
                        break;
                    default:
                        break;
                }
            }
            left[connectorPoint.connectorStyleType] = Math.min(left[connectorPoint.connectorStyleType], connectorPoint.hasElbow ? connectorPoint.elbowPoint2.x : connectorPoint.x);
            right[connectorPoint.connectorStyleType] = Math.max(right[connectorPoint.connectorStyleType], connectorPoint.hasElbow ? connectorPoint.elbowPoint2.x : connectorPoint.x);
        }

        /* calculate left/right margins of segments drawn from parent point to sides */
        firstLast = [Math.max(0, startIndex - 1), Math.min(endIndex + 1, points.length - 1)];
        for (index = 0; index < firstLast.length; index += 1) {
            connectorPoint = points[firstLast[index]];

            left[connectorPoint.connectorStyleType] = Math.min(left[connectorPoint.connectorStyleType], connectorPoint.hasElbow ? connectorPoint.elbowPoint2.x : connectorPoint.x);
            right[connectorPoint.connectorStyleType] = Math.max(right[connectorPoint.connectorStyleType], connectorPoint.hasElbow ? connectorPoint.elbowPoint2.x : connectorPoint.x);            
        }

        /* draw horizontal segments from parent connector to sides */
        leftPosition = parentX;
        rightPosition = parentX;
        for (index = 2/*primitives.common.ConnectorStyleType.Highlight*/; index >= 0/*primitives.common.ConnectorStyleType.Extra*/; index -= 1) {
            paletteItem = paletteManager.getPalette(index);
            polyline = buffer.getPolyline(paletteItem);

            startX = left[index];
            if (startX != null && startX < leftPosition) {
                this.transform.transformPoints(leftPosition, parentY, startX, parentY, true, this, function (startX, startY, endX, endY) {
                    polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
                    polyline.addSegment(new primitives.common.LineSegment(endX, endY));
                }); //ignore jslint

                leftPosition = startX;
            }

            endX = right[index];
            if (endX != null && endX > rightPosition) {
                this.transform.transformPoints(rightPosition, parentY, endX, parentY, true, this, function (startX, startY, endX, endY) {
                    polyline.addSegment(new primitives.common.MoveSegment(startX, startY));
                    polyline.addSegment(new primitives.common.LineSegment(endX, endY));
                }); //ignore jslint

                rightPosition = endX;
            }
        }

        /* draw vertical segments with/without elbows */
        for (index = startIndex; index <= endIndex; index += 1) {
            connectorPoint = points[index];

            paletteItem = paletteManager.getPalette(connectorPoint.connectorStyleType);
            polyline = buffer.getPolyline(paletteItem);

            if (connectorPoint.hasElbow) {
                this.transform.transform3Points(connectorPoint.elbowPoint2.x, connectorPoint.elbowPoint2.y,
                                                connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint2.y,
                                                connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, true, this,
                    function (fromX, fromY, toX, toY, toX2, toY2) {
                        switch (this.options.elbowType) {
                            case 2/*primitives.common.ElbowType.Bevel*/:
                                polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
                                polyline.addSegment(new primitives.common.LineSegment(toX2, toY2));
                                break;
                            case 3/*primitives.common.ElbowType.Round*/:
                                polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
                                polyline.addSegment(new primitives.common.CubicArcSegment(fromX, fromY, toX, toY, toX2, toY2));
                                break;
                        }
                    });//ignore jslint

                this.transform.transformPoints(connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
                    polyline.addSegment(new primitives.common.LineSegment(toX, toY));
                }); //ignore jslint
            } else {
                this.transform.transformPoints(connectorPoint.x, parentY, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
                    polyline.addSegment(new primitives.common.MoveSegment(fromX, fromY));
                    polyline.addSegment(new primitives.common.LineSegment(toX, toY));
                }); //ignore jslint
            }
            if (hasGraphics && hasArrows && connectorPoint.visibility != 4/*primitives.common.Visibility.Invisible*/) {
                polyline.addArrow(this.options.linesWidth, function (polyline) {
                    polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
                }); //ignore jslint
            }
        }
    } else {
        /* all lines are angular or curved */
        this._drawAngularConnectors(buffer, paletteManager, parentX, parentY, points, true, hasArrows);
    }
};

primitives.orgdiagram.BaseController.prototype._drawAngularConnectors = function (buffer, paletteManager, parentX, parentY, points, drawToParent, hasArrows) {
    var joinPointX = null,
		index,
        len = points.length,
		rect,
        parentPoint, point,
        paletteItem, polyline;

	if (drawToParent) {
	    joinPointX = parentX;
	} else {
	    joinPointX = points[len - 1].x;
	}

	parentPoint = new primitives.common.Point(joinPointX, parentY);

	for (index = 0; index < len; index += 1) {
	    point = points[index];

	    paletteItem = paletteManager.getPalette(point.connectorStyleType);
	    polyline = buffer.getPolyline(paletteItem);

	    this.transform.transformPoint(joinPointX, parentY, true, this, function (x, y) {
	        polyline.addSegment(new primitives.common.MoveSegment(x, y));
		});//ignore jslint
		switch (this.options.connectorType) {
		    case 1/*primitives.common.ConnectorType.Angular*/:
		        this.transform.transformPoint(point.x, point.y, true, this, function (x, y) {
		            polyline.addSegment(new primitives.common.LineSegment(x, y));
		            
		        });//ignore jslint
		        break;
		    case 2/*primitives.common.ConnectorType.Curved*/:
		        rect = new primitives.common.Rect(parentPoint, point);

		        if (drawToParent) {
		            if (joinPointX > rect.x) {
		                this.transform.transform3Points(rect.right(), rect.verticalCenter(), rect.x, rect.verticalCenter(), rect.x, rect.bottom(), true,
							this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
							    polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
							});//ignore jslint
		            }
		            else {
		                this.transform.transform3Points(rect.x, rect.verticalCenter(), rect.right(), rect.verticalCenter(), rect.right(), rect.bottom(), true,
							this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
							    polyline.addSegment(new primitives.common.CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
							});//ignore jslint
		            }
		        } else {
		            if (joinPointX > rect.x) {
		                this.transform.transformPoints(rect.x, rect.y, rect.x, rect.bottom(), true,
							this, function (cpX, cpY, x, y) {
							    polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
							});//ignore jslint
		            } else {
		                this.transform.transformPoints(rect.right(), rect.y, rect.right(), rect.bottom(), true,
							this, function (cpX, cpY, x, y) {
							    polyline.addSegment(new primitives.common.QuadraticArcSegment(cpX, cpY, x, y));
							});//ignore jslint
		            }
		        }
		        break;
	    }
		if (hasArrows && point.visibility != 4/*primitives.common.Visibility.Invisible*/) {
		    polyline.addArrow(this.options.linesWidth, function (polyline, endPoint) {
		        var dotPolyline;

		        polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));

		        if (this._debug) {
		            dotPolyline = buffer.getPolyline({
		                fillColor: "#ff0000"/*primitives.common.Colors.Red*/
		            });
		            dotPolyline.addSegment(new primitives.common.DotSegment(endPoint.x - 1, endPoint.y - 1, 2, 2, 1));
		        }
		    }); //ignore jslint
		}
	}
};

primitives.orgdiagram.BaseController.prototype._centerOnCursor = function (treeItem, isForced) {
    var panel,
        snapRect;
	if (treeItem !== null) {
	    panel = this.graphics.activate("placeholder", 7/*primitives.common.Layers.Item*/);
	    snapRect = this._getTransformedItemPosition(treeItem);

	    if (isForced || this._isAnnotationNeeded(treeItem, this._getPanelPosition())) {
	        this.m_scrollPanel.scrollLeft(snapRect.horizontalCenter() - this.m_scrollPanelRect.horizontalCenter());
	        this.m_scrollPanel.scrollTop(snapRect.verticalCenter() - this.m_scrollPanelRect.verticalCenter());
	    }
	}
};

primitives.orgdiagram.BaseController.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};

primitives.orgdiagram.BaseController.prototype._getTreeItemForMousePosition = function (x, y) {
    var result = null,
        self = this,
		index,
		len,
		treeLevel;

    this.graphics.activate("placeholder", 7/*primitives.common.Layers.Item*/);
	x = x / this.scale;
	y = y / this.scale;

	this.transform.transformPoint(x, y, false, this, function (x, y) {
		for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
			treeLevel = self._treeLevels[index];

			if (treeLevel.activeTreeItems.length > 0) {
			    if (y > (treeLevel.shift + treeLevel.topConnectorShift) && y <= (treeLevel.shift + treeLevel.connectorShift)) {
			        result = self._visualTree.node(primitives.common.binarySearch(treeLevel.activeTreeItems, function (itemId) {
			            var treeItem = self._visualTree.node(itemId);
			            switch (treeItem.actualVisibility) {
			                case 1/*primitives.common.Visibility.Normal*/:
			                    if (treeItem.actualPosition.contains(x, y)) {
			                        return 0;
			                    }
			                case 2/*primitives.common.Visibility.Dot*/://ignore jslint
			                case 3/*primitives.common.Visibility.Line*/:
			                    return x - treeItem.actualPosition.horizontalCenter();
			                case 4/*primitives.common.Visibility.Invisible*/:
			                    if (self._debug) {
			                        throw "Clickable items collection should contain only visible items.";
			                    }
			                    break;
			            }

			        }));//ignore jslint
			        return;
			    }
			}
		}
		return;
	});
	return result;
};

primitives.orgdiagram.BaseController.prototype._drawHighlightAnnotation = function () {
	var common = primitives.common,
		panel,
		treeItem,
		orgItem,
		panelPosition,
		calloutPanelPosition,
		snapRect,
		snapPoint,
		position,
		uiHash,
		element,
		calloutTemplateName,
		calloutTemplate,
		showCallout = true,
		style;
	if (this._highlightTreeItem !== null) {
		switch (this._highlightTreeItem.actualVisibility) {
			case 2/*primitives.common.Visibility.Dot*/:
			case 3/*primitives.common.Visibility.Line*/:
			case 1/*primitives.common.Visibility.Normal*/:
				treeItem = this._highlightTreeItem;
				orgItem = treeItem.orgItem;

				switch (orgItem.showCallout) {
				    case 2/*primitives.common.Enabled.False*/:
				        showCallout = false;
				        break;
				    case 1/*primitives.common.Enabled.True*/:
				        showCallout = false;
				        break;
					default:
						showCallout = this.options.showCallout;
						break;
				}

				if (showCallout) {
					panel = this.graphics.activate("placeholder", 7/*primitives.common.Layers.Item*/);

					snapRect = this._getTransformedItemPosition(treeItem);
					snapPoint = new common.Point(snapRect.horizontalCenter(), snapRect.verticalCenter());

					panelPosition = this._getPanelPosition();

					if(this._isAnnotationNeeded(treeItem, panelPosition)) {
                        calloutTemplateName = !common.isNullOrEmpty(orgItem.calloutTemplateName) ? orgItem.calloutTemplateName :
							!common.isNullOrEmpty(orgItem.templateName) ? orgItem.templateName :
							!common.isNullOrEmpty(this.options.defaultCalloutTemplateName) ? this.options.defaultCalloutTemplateName :
							this.options.defaultTemplateName;
						calloutTemplate = this._templates[calloutTemplateName];
						if (calloutTemplate == null) {
							calloutTemplate = this._defaultTemplate;
						}
						position = this._getAnnotationPosition(snapPoint, panelPosition, calloutTemplate.itemSize);

						/* position callout div placeholder */
						calloutPanelPosition = new common.Rect(position);
						calloutPanelPosition.addRect(snapPoint.x, snapPoint.y);
						calloutPanelPosition.offset(50);
						style = calloutPanelPosition.getCSS();
						style.display = "inherit";
						style.visibility = "inherit";
						this.m_calloutPlaceholder.css(style);

						/* recalculate geometries */
						snapPoint.x -= calloutPanelPosition.x;
						snapPoint.y -= calloutPanelPosition.y;
						position.x -= calloutPanelPosition.x;
						position.y -= calloutPanelPosition.y;

						uiHash = new common.RenderEventArgs();
						uiHash.context = treeItem.itemConfig;
						uiHash.isCursor = treeItem.isCursor;
						uiHash.isSelected = treeItem.isSelected;
						uiHash.templateName = calloutTemplate.name;


						this.graphics.resize("calloutplaceholder", calloutPanelPosition.width, calloutPanelPosition.height);
						panel = this.graphics.activate("calloutplaceholder", 9/*primitives.common.Layers.Annotation*/);
						element = this.graphics.template(
								    position.x
								, position.y
								, position.width
								, position.height
								, 0
								, 0
								, position.width
								, position.height
								, calloutTemplate.itemTemplate
								, calloutTemplate.itemTemplateHashCode
								, calloutTemplate.itemTemplateRenderName
								, uiHash
								, null
								);

						this.pointerPlacement = 0/*primitives.common.PlacementType.Auto*/;
						this.m_calloutShape.cornerRadius = this.options.calloutCornerRadius;
						this.m_calloutShape.offset = this.options.calloutOffset;
						this.m_calloutShape.opacity = this.options.calloutOpacity;
						this.m_calloutShape.lineWidth = this.options.calloutLineWidth;
						this.m_calloutShape.pointerWidth = this.options.calloutPointerWidth;
						this.m_calloutShape.borderColor = this.options.calloutBorderColor;
						this.m_calloutShape.fillColor = this.options.calloutfillColor;
						this.m_calloutShape.draw(snapPoint, position);
					} else {
						this.m_calloutPlaceholder.css({ "display": "none", "visibility": "hidden" });
					}
				} else {
					this.m_calloutPlaceholder.css({ "display": "none", "visibility": "hidden" });
				}
				break;
			case 4/*primitives.common.Visibility.Invisible*/:
				this.m_calloutPlaceholder.css({"display" : "none", "visibility": "hidden"});
				break;
		}
	}
};

primitives.orgdiagram.BaseController.prototype._hideHighlightAnnotation = function () {
	this.m_calloutPlaceholder.css({ "display": "none", "visibility": "hidden" });
};

primitives.orgdiagram.BaseController.prototype._getPanelPosition = function () {
    return new primitives.common.Rect(
                        this.m_scrollPanel.scrollLeft(),
                        this.m_scrollPanel.scrollTop(),
                        Math.min(this.m_scrollPanelRect.width - 25, this.m_placeholderRect.width),
                        Math.min(this.m_scrollPanelRect.height - 25, this.m_placeholderRect.height)
                    );
};

primitives.orgdiagram.BaseController.prototype._getTransformedItemPosition = function (treeItem) {
    var result = false;

    this.transform.transformRect(treeItem.actualPosition.x * this.scale, treeItem.actualPosition.y * this.scale, treeItem.actualPosition.width * this.scale, treeItem.actualPosition.height * this.scale, true,
        this, function (x, y, width, height) {
            result = new primitives.common.Rect(x, y, width, height);
        }
    );
    return result;
};

primitives.orgdiagram.BaseController.prototype._isAnnotationNeeded = function (treeItem, panelPosition) {
    var result = false,
        snapRect = this._getTransformedItemPosition(treeItem);
    if (treeItem.actualVisibility != 1/*primitives.common.Visibility.Normal*/ || !panelPosition.overlaps(snapRect)) {
        result = true;
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._getAnnotationPosition = function (snapPoint, panelRect, itemSize) {
	var result = new primitives.common.Rect(snapPoint.x, snapPoint.y, itemSize.width, itemSize.height);

	if (snapPoint.y > panelRect.bottom() - panelRect.height / 4.0) {
		result.y -= (itemSize.height / 2.0);
		if (snapPoint.x < panelRect.horizontalCenter()) {
			result.x += itemSize.width / 4.0;
		}
		else {
			result.x -= (itemSize.width / 4.0 + itemSize.width);
		}
	}
	else {
		result.y += (itemSize.height / 4.0);
		result.x -= (itemSize.width / 2.0);
	}

	// If annotation clipped then move it back into view port
	if (result.x < panelRect.x) {
		result.x = panelRect.x + 5;
	}
	else if (result.right() > panelRect.right()) {
		result.x -= (result.right() - panelRect.right() + 5);
	}

	if (result.y < panelRect.y) {
		result.y = panelRect.y + 5;
	}
	else if (result.bottom() > panelRect.bottom()) {
		result.y -= (result.bottom() - panelRect.bottom() + 5);
	}

	return result;
};
primitives.orgdiagram.BaseController.prototype._positionTreeItems = function () {
	var panelSize = new primitives.common.Rect(0, 0, (this.m_scrollPanelRect.width - 25) / this.scale, (this.m_scrollPanelRect.height - 25) / this.scale),
		placeholderSize = new primitives.common.Rect(0, 0, 0, 0),
		levelVisibilities,
		visibilities,
		level,
		index,
		minimalPlaceholderSize,
		leftMargin,
		rightMargin,
		cursorIndex,
		pageSize;

	switch (this.options.orientationType) {
		case 2/*primitives.common.OrientationType.Left*/:
		case 3/*primitives.common.OrientationType.Right*/:
			panelSize.invert();
			break;
	}

	if (this._treeLevels.length > 0) {
	    switch (this.options.pageFitMode) {
	        case 0/*primitives.common.PageFitMode.None*/:
	        case 4/*primitives.common.PageFitMode.PrintPreview*/:
	        case 5/*primitives.common.PageFitMode.AutoSize*/:
	            levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];
	            placeholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
	            break;
	        default:
	            levelVisibilities = [new primitives.orgdiagram.LevelVisibility(0, 1/*primitives.common.Visibility.Normal*/)];
	            visibilities = [];
	            switch (this.options.minimalVisibility) {
	                case 1/*primitives.common.Visibility.Normal*/:
	                    break;
	                case 2/*primitives.common.Visibility.Dot*/:
	                    visibilities.push(2/*primitives.common.Visibility.Dot*/);
	                    break;
	                case 0/*primitives.common.Visibility.Auto*/:
	                case 3/*primitives.common.Visibility.Line*/:
	                case 4/*primitives.common.Visibility.Invisible*/:
	                    visibilities.push(2/*primitives.common.Visibility.Dot*/);
	                    visibilities.push(3/*primitives.common.Visibility.Line*/);
	                    break;
	            }

	            for (level = this._treeLevels.length - 1; level >= 0; level -= 1) {
	                for (index = 0; index < visibilities.length; index += 1) {
	                    levelVisibilities.push(new primitives.orgdiagram.LevelVisibility(level, visibilities[index]));
	                }
	            }

	            // Find minimal placeholder size to hold completly folded diagram
	            minimalPlaceholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
	            minimalPlaceholderSize.addRect(panelSize);
	            minimalPlaceholderSize.offset(0, 0, 5, 5);

	            leftMargin = null;
	            rightMargin = null;
	            cursorIndex = null;
	            // Maximized
	            placeholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, 0);
	            if (!this._checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
	                leftMargin = 0;

	                // Minimized
	                placeholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, levelVisibilities.length - 1);
	                if (this._checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
	                    rightMargin = levelVisibilities.length - 1;

	                    cursorIndex = rightMargin;
	                    while (rightMargin - leftMargin > 1) {
	                        cursorIndex = Math.floor((rightMargin + leftMargin) / 2.0);

	                        placeholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, cursorIndex);
	                        if (this._checkDiagramSize(placeholderSize, minimalPlaceholderSize)) {
	                            rightMargin = cursorIndex;
	                        }
	                        else {
	                            leftMargin = cursorIndex;
	                        }
	                    }
	                    if (rightMargin !== cursorIndex) {
	                        placeholderSize = this._setTreeLevelsVisibilityAndPositionTreeItems(levelVisibilities, rightMargin);
	                    }
	                }
	            }
	            break;
	    }

	    switch (this.options.pageFitMode) {
	        case 4/*primitives.common.PageFitMode.PrintPreview*/:
	            pageSize = this._stretchToAvoidPageMargins();
	            placeholderSize.width = pageSize.width;
	            placeholderSize.height = pageSize.height;
	            break;
	        case 5/*primitives.common.PageFitMode.AutoSize*/:
	            break;
	        default:
	            if (placeholderSize.width < panelSize.width) {
	                this._stretchToWidth(placeholderSize.width, panelSize.width);
	                placeholderSize.width = panelSize.width;
	            }
	            if (placeholderSize.height < panelSize.height) {
	                placeholderSize.height = panelSize.height;
	            }
	            break;
	    }

		switch (this.options.orientationType) {
			case 2/*primitives.common.OrientationType.Left*/:
			case 3/*primitives.common.OrientationType.Right*/:
				placeholderSize.invert();
				break;
		}
		this.m_placeholder.css(placeholderSize.getCSS());
		this.m_placeholderRect = new primitives.common.Rect(placeholderSize);

		switch (this.options.pageFitMode) {
		    case 5/*primitives.common.PageFitMode.AutoSize*/://ignore jslint
		        placeholderSize.cropByRect(new primitives.common.Rect(0, 0, this.options.autoSizeMaximum.width, this.options.autoSizeMaximum.height));
		        placeholderSize.addRect(new primitives.common.Rect(0, 0, this.options.autoSizeMinimum.width, this.options.autoSizeMinimum.height));
		    case 4/*primitives.common.PageFitMode.PrintPreview*/://ignore jslint
		        this.element.css({
		            "width": placeholderSize.width + "px",
		            "height": placeholderSize.height + "px"
		        });
		        this._updateLayout();
		        break;
		}
	}
};

primitives.orgdiagram.BaseController.prototype._stretchToAvoidPageMargins = function (diagramSize, panelSize) {
    var pageSize = new primitives.common.Size(this.options.printPreviewPageSize),
        self = this,
        treeLevelsItems, sortedItems,
        index, len,
        globalOffset, pageRightMargin, pageBottomMargin,
        item, treeLevel;
    switch (this.options.orientationType) {
        case 2/*primitives.common.OrientationType.Left*/:
        case 3/*primitives.common.OrientationType.Right*/:
            pageSize.invert();
            break;
    }
    treeLevelsItems = [];
    for (index = 0, len= this._treeLevels.length; index < len; index += 1) {
        treeLevelsItems.push(this._treeLevels[index].treeItems);
    }
    sortedItems = primitives.common.mergeSort(treeLevelsItems, function (item) { return self._visualTree.node(item).offset; });

    globalOffset = 0;
    pageRightMargin = pageSize.width;
    for (index = 0, len = sortedItems.length; index < len; index += 1) {
        item = self._visualTree.node(sortedItems[index]);

        if ((item.offset + globalOffset) < pageRightMargin && (item.offset + item.actualSize.width + globalOffset) > pageRightMargin) {
            globalOffset += (pageRightMargin - item.offset - globalOffset) + this.options.normalItemsInterval / 2.0;
        }

        item.offset += globalOffset;

        if (item.offset > pageRightMargin) {
            pageRightMargin += pageSize.width;
        }
    }

    globalOffset = 0;
    pageBottomMargin = pageSize.height;
    for (index = 0; index < this._treeLevels.length; index += 1) {
        treeLevel = this._treeLevels[index];

        if ((treeLevel.shift + globalOffset) < pageBottomMargin && (treeLevel.shift + treeLevel.depth + globalOffset) > pageBottomMargin) {
            globalOffset += (pageBottomMargin - treeLevel.shift - globalOffset) + this.options.normalLevelShift / 2.0;
        }

        treeLevel.shiftDown(globalOffset);

        if (treeLevel.shift > pageBottomMargin) {
            pageBottomMargin += pageSize.height;
        }
    }

    return new primitives.common.Size(pageRightMargin + 1, pageBottomMargin + 1);
};

primitives.orgdiagram.BaseController.prototype._checkDiagramSize = function (diagramSize, panelSize) {
	var result = false;
	switch (this.options.pageFitMode) {
		case 1/*primitives.common.PageFitMode.PageWidth*/:
			if (panelSize.width >= diagramSize.width) {
				result = true;
			}
			break;
		case 2/*primitives.common.PageFitMode.PageHeight*/:
			if (panelSize.height >= diagramSize.height) {
				result = true;
			}
			break;
		case 3/*primitives.common.PageFitMode.FitToPage*/:
			if (panelSize.height >= diagramSize.height && panelSize.width >= diagramSize.width) {
				result = true;
			}
			break;
	}
	return result;
};

primitives.orgdiagram.BaseController.prototype._setTreeLevelsVisibilityAndPositionTreeItems = function (levelVisibilities, cursorIndex) {
	var index,
		levelVisibility;
	for (index = 0; index < this._treeLevels.length; index += 1) {
		this._treeLevels[index].currentvisibility = 1/*primitives.common.Visibility.Normal*/;
	}
	for (index = 0; index <= cursorIndex; index += 1) {
		levelVisibility = levelVisibilities[index];

		this._treeLevels[levelVisibility.level].currentvisibility = levelVisibility.currentvisibility;
	}
	this._recalcItemsSize();
	this._setOffsets();
	this._recalcLevelsDepth();
	this._shiftLevels();

	return new primitives.common.Rect(0, 0, Math.round(this._getDiagramWidth()), Math.round(this._getDiagramHeight()));
};

primitives.orgdiagram.BaseController.prototype._getDiagramHeight = function () {
    var treeLevel = this._treeLevels[this._treeLevels.length - 1];
    return treeLevel.shift + treeLevel.nextLevelShift;
};

primitives.orgdiagram.BaseController.prototype._getDiagramWidth = function () {
	var result = 0,
		index,
		len;
	for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
		result = Math.max(result, this._treeLevels[index].currentOffset);
	}
	result += this.options.normalItemsInterval;
	return result;
};

primitives.orgdiagram.BaseController.prototype._setOffsets = function () {
	var index,
		len;
	for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
		this._treeLevels[index].currentOffset = 0.0;
	}
	if (this._visualTree.hasNodes()) {
	    this._setOffset(this._visualTree.node(this._treeLevels[0].treeItems[0]));
	}
};

primitives.orgdiagram.BaseController.prototype._setOffset = function (treeItem) {
    var treeLevel = this._treeLevels[treeItem.level],
		treeItemPadding = this._itemsInterval[treeItem.visibility === 0/*primitives.common.Visibility.Auto*/ ? treeLevel.currentvisibility : treeItem.visibility] / 2.0,
		index,
		len,
		offset,
		siblings,
		gaps,
		gap,
		leftMargin,
		parentItem,
		groups,
		items,
		item1,
		item2,
		groupIndex,
		groupOffset,
		group,
		sibling,
		cousinsInterval = treeLevel.currentOffset > 0 ? treeItemPadding * (treeItem.relationDegree) * this.options.cousinsIntervalMultiplier : 0,
		arrowTipLength = this.options.linesWidth * 8;
    treeItem.leftPadding = treeItemPadding + cousinsInterval;
    treeItem.rightPadding = treeItemPadding;
    if (this.options.arrowsDirection != 0/*primitives.common.GroupByType.None*/) {
        if (treeItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
            treeItem.leftPadding += arrowTipLength;
        }
        if (treeItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
            treeItem.rightPadding += arrowTipLength;
        }
    }
	treeItem.offset = treeLevel.currentOffset + treeItem.leftPadding;
	treeLevel.currentOffset = treeItem.offset + treeItem.actualSize.width + treeItem.rightPadding;

	if (this._visualTree.hasChildren(treeItem.id)) {

	    this._visualTree.loopChildren(this, treeItem.id, function (treeItemId, treeItem, level) {
	        this._setOffset(treeItem);
	    });
		offset = this._getChildrenOffset(treeItem);
		if (offset > 0) {
			this._offsetItemChildren(treeItem, offset);
		}
		else if (offset < 0) {
			offset = -offset;
			this._offsetItem(treeItem, offset);

			siblings = null;
			gaps = {};
			leftMargin = null;
			parentItem = this._visualTree.parent(treeItem.id);
			if (parentItem !== null) {
			    this._visualTree.loopChildrenReversed(this, parentItem.id, function (childItemId, childItem, index) {
			        if (childItem === treeItem) {
			            siblings = [];
			        }
			        else if (siblings !== null) {
			            gap = this._getGapBetweenSiblings(childItem, treeItem);
			            gaps[childItem.id] = gap;
			            if (gap > 0) {
			                siblings.splice(0, 0, childItem);
			            }
			            else {
			                leftMargin = childItem;
			                return true;
			            }
			        }			        
			    });

				if (siblings.length > 0) {
					groups = null;
					if (leftMargin !== null) {
						items = [leftMargin];
						items = items.concat(siblings);
						items.push(treeItem);

						groups = [[leftMargin]];
						for (index = 1, len = items.length; index < len; index += 1) {
							item1 = items[index - 1];
							item2 = items[index];
							if (item1.gravity == 2/*primitives.common.HorizontalAlignmentType.Right*/ || item2.gravity == 1/*primitives.common.HorizontalAlignmentType.Left*/) {
							    groups[groups.length - 1].push(item2);
							}
							else {
							    groups.push([item2]);
							}
						}
					}
					else {
						groups = [siblings.slice(0)];
						groups[groups.length - 1].push(treeItem);
					}

					// align items to the right
					if (groups.length > 0) {
						siblings = groups[groups.length - 1];
						for (index = siblings.length - 2; index >= 0; index -= 1) {
							sibling = siblings[index];
							gap = gaps[sibling.id];
							offset = Math.min(gap, offset);

							this._offsetItem(sibling, offset);
							this._offsetItemChildren(sibling, offset);
						}
					}

					// spread items proportionally
					groupOffset = offset / (groups.length - 1);
					for (groupIndex = groups.length - 2; groupIndex > 0; groupIndex -= 1) {
						group = groups[groupIndex];
						for (index = group.length - 1; index >= 0; index -= 1) {
							sibling = group[index];
							gap = gaps[sibling.id];
							offset = Math.min(groupIndex * groupOffset, Math.min(gap, offset));

							this._offsetItem(sibling, offset);
							this._offsetItemChildren(sibling, offset);
						}
					}
				}
			}
		}
	}
};

primitives.orgdiagram.BaseController.prototype._getGapBetweenSiblings = function (leftItem, rightItem) {
	var result = null,
		rightMargins = this._getRightMargins(leftItem),
		leftMargins = this._getLeftMargins(rightItem),
		depth = Math.min(rightMargins.length, leftMargins.length),
		index,
		gap;

	for (index = 0; index < depth; index += 1) {
		gap = leftMargins[index] - rightMargins[index];
		result = (result !== null) ? Math.min(result, gap) : gap;

		if (gap <= 0) {
			break;
		}
	}

	return Math.floor(result);
};

primitives.orgdiagram.BaseController.prototype._getRightMargins = function (treeItem) {
	var result = [],
		rightMargins,
		index,
		len,
		marginItem;

	rightMargins = this._rightMargins[treeItem];
	if (rightMargins === undefined) {
		rightMargins = [];
	}
	rightMargins = rightMargins.slice();
	rightMargins.splice(0, 0, treeItem.id);
	for (index = 0, len = rightMargins.length; index < len; index += 1) {
	    marginItem = this._visualTree.node(rightMargins[index]);
		result[index] = marginItem.offset + marginItem.actualSize.width + marginItem.rightPadding;
	}

	return result;
};

primitives.orgdiagram.BaseController.prototype._getLeftMargins = function (treeItem) {
	var result = [],
		leftMargins,
		index,
		len,
		marginItem;

	leftMargins = this._leftMargins[treeItem];
	if (leftMargins === undefined) {
		leftMargins = [];
	}
	leftMargins = leftMargins.slice();
	leftMargins.splice(0, 0, treeItem.id);
	for (index = 0, len = leftMargins.length; index < len; index += 1) {
	    marginItem = this._visualTree.node(leftMargins[index]);
		result[index] = marginItem.offset - marginItem.leftPadding;
	}

	return result;
};

primitives.orgdiagram.BaseController.prototype._getChildrenOffset = function (treeItem) {
	var treeItemCenterOffset = treeItem.offset + treeItem.actualSize.width / 2.0,
		childrenCenterOffset = null,
		firstItem,
		lastItem,
		visualAggregator;
	if (treeItem.visualAggregatorId === null) {
		firstItem = null;
		this._visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
		    firstItem = childItem;
		    if (firstItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
		        return true;
		    }
		});
		lastItem = null;
		this._visualTree.loopChildrenReversed(this, treeItem.id, function (childItemId, childItem, index) {
		    lastItem = childItem;
		    if (lastItem.connectorPlacement & 1/*primitives.common.SideFlag.Top*/) {
		        return true;
		    }
		});
		switch (this.options.horizontalAlignment) {
			case 1/*primitives.common.HorizontalAlignmentType.Left*/:
				childrenCenterOffset = firstItem.offset + firstItem.actualSize.width / 2.0;
				break;
			case 2/*primitives.common.HorizontalAlignmentType.Right*/:
				childrenCenterOffset = lastItem.offset + lastItem.actualSize.width / 2.0;
				break;
			case 0/*primitives.common.HorizontalAlignmentType.Center*/:
				childrenCenterOffset = (firstItem.offset + lastItem.offset + lastItem.actualSize.width) / 2.0;
				break;
		}
	}
	else {
	    visualAggregator = this._visualTree.node(treeItem.visualAggregatorId);
		childrenCenterOffset = visualAggregator.offset + visualAggregator.actualSize.width / 2.0;
	}
	return treeItemCenterOffset - childrenCenterOffset;
};

primitives.orgdiagram.BaseController.prototype._offsetItem = function (treeItem, offset) {
	treeItem.offset += offset;

	var treeLevel = this._treeLevels[treeItem.level];
	treeLevel.currentOffset = Math.max(treeLevel.currentOffset, treeItem.offset + treeItem.actualSize.width);
};

primitives.orgdiagram.BaseController.prototype._offsetItemChildren = function (treeItem, offset) {
	var childTreeItem,
		treeLevel;

	if (this._visualTree.hasChildren(treeItem.id)) {
	    this._visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
	        childTreeItem = childItem;

	        childTreeItem.offset += offset;
	        this._offsetItemChildren(childTreeItem, offset);
	    });
        treeLevel = this._treeLevels[childTreeItem.level];
        treeLevel.currentOffset = Math.max(treeLevel.currentOffset, childTreeItem.offset + childTreeItem.actualSize.width);
	}
};

primitives.orgdiagram.BaseController.prototype._stretchToWidth = function (treeWidth, panelWidth) {
	var offset;
	switch (this.options.horizontalAlignment) {
		case 1/*primitives.common.HorizontalAlignmentType.Left*/:
			offset = 0;
			break;
		case 2/*primitives.common.HorizontalAlignmentType.Right*/:
			offset = panelWidth - treeWidth;
			break;
		case 0/*primitives.common.HorizontalAlignmentType.Center*/:
			offset = (panelWidth - treeWidth) / 2.0;
			break;
	}
	if (offset > 0) {
	    this._visualTree.loop(this, function (treeItemId, treeItem) {
	        treeItem.offset += offset;
	    });
	}
};

primitives.orgdiagram.BaseController.prototype._recalcItemsSize = function () {
    var index, len,
        index2, len2,
        treeItem,
		treeLevel,
        treeItems;
    for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
        treeLevel = this._treeLevels[index];
        treeItems = treeLevel.treeItems;

        for (index2 = 0, len2 = treeItems.length; index2 < len2; index2 += 1) {
            treeItem = this._visualTree.node(treeItems[index2]);

            treeItem.setActualSize(treeLevel, this.options);
        }
    }
};

primitives.orgdiagram.BaseController.prototype._recalcLevelsDepth = function () {
    var index, len,
        index2, len2,
        index3, len3,
		treeItem,
		treeLevel,
        treeItems,
		itemsPositions,
		itemPosition,
		treeItemsHavingPartners,
        treeItemsGroup,
		partners, partner,
		levelOffset,
        minimalDepth,
        dotsDepth;

    itemsPositions = {};
    for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
        treeLevel = this._treeLevels[index];
        treeItems = treeLevel.treeItems;

        for (index2 = 0, len2 = treeItems.length; index2 < len2; index2 += 1) {
            itemsPositions[treeItems[index2]] = index2;
        }
    }


    for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
        treeLevel = this._treeLevels[index];
        treeLevel.shift = 0.0;
        treeLevel.depth = 0.0;
        treeLevel.partnerConnectorOffset = 0;
        treeLevel.actualVisibility = 4/*primitives.common.Visibility.Invisible*/;

        treeItems = treeLevel.treeItems;
        treeItemsHavingPartners = [];

        minimalDepth = null; /* minimum  height of non-dot items in level */
        dotsDepth = null; /* maximum dots height */

        for (index2 = 0, len2 = treeItems.length; index2 < len2; index2 += 1) {
            treeItem = this._visualTree.node(treeItems[index2]);

            treeLevel.depth = Math.max(treeLevel.depth, treeItem.actualSize.height);
            switch (treeItem.actualVisibility) {
                case 2/*primitives.common.Visibility.Dot*/:
                case 3/*primitives.common.Visibility.Line*/:
                case 4/*primitives.common.Visibility.Invisible*/:
                    dotsDepth = !dotsDepth ? treeItem.actualSize.height : Math.min(dotsDepth, treeItem.actualSize.height);
                    break;
                default:
                    minimalDepth = !minimalDepth ? treeItem.actualSize.height : Math.min(minimalDepth, treeItem.actualSize.height);
                    break;
            }
            
            treeLevel.actualVisibility = Math.min(treeLevel.actualVisibility, treeItem.actualVisibility);

            if (treeItem.partners.length > 0 || treeItem.extraPartners.length > 0) {
                treeItemsHavingPartners.push(new primitives.common.StackSegment(treeItem));
            }
        }
        if (minimalDepth == null) {
            minimalDepth = treeLevel.depth;
        }
        if (dotsDepth != null && dotsDepth > minimalDepth) {
            minimalDepth = dotsDepth;
        }

        switch (this.options.verticalAlignment) {
            case 0/*primitives.common.VerticalAlignmentType.Top*/:
                treeLevel.horizontalConnectorsDepth = minimalDepth / 2.0;
                break;
            case 1/*primitives.common.VerticalAlignmentType.Middle*/:
                treeLevel.horizontalConnectorsDepth = treeLevel.depth / 2.0;
                break;
            case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
                treeLevel.horizontalConnectorsDepth = treeLevel.depth - minimalDepth / 2.0;
                break;
        }
        
        if (treeItemsHavingPartners.length > 0) {
            levelOffset = 0;
            /* find minimum and maximum partner index at level */
            for (index2 = 0, len2 = treeItemsHavingPartners.length; index2 < len2; index2 += 1) {
                treeItemsGroup = treeItemsHavingPartners[index2];
                partners = treeItemsGroup.context.partners.slice(0).concat(treeItemsGroup.context.extraPartners);

                for (index3 = 0, len3 = partners.length; index3 < len3; index3 += 1) {
                    partner = this._visualTree.node(partners[index3]);
                    itemPosition = partner.offset + partner.actualSize.width / 2;
                    treeItemsGroup.startIndex = (treeItemsGroup.startIndex != null) ? Math.min(treeItemsGroup.startIndex, itemPosition) : itemPosition;
                    treeItemsGroup.endIndex = (treeItemsGroup.endIndex != null) ? Math.max(treeItemsGroup.endIndex, itemPosition) : itemPosition;
                }
            }

            treeLevel.partnerConnectorOffset = primitives.common.stackSegments(treeItemsHavingPartners, function (item, offset) {
                item.context.partnerConnectorOffset = offset;
            });//ignore jslint
        }
    }
};

primitives.orgdiagram.BaseController.prototype._shiftLevels = function () {
    var shift = this.options.lineLevelShift,
		index,
		len,
		treeLevel,
		childrenSpace = 0,
		parentsSpace = 0,
        arrowTipLength = this.options.linesWidth * 8;

	switch(this.options.arrowsDirection) {
	    case 1/*primitives.common.GroupByType.Parents*/:
	        childrenSpace = arrowTipLength;
	        parentsSpace = 0;
	        break;
	    case 2/*primitives.common.GroupByType.Children*/:
	        childrenSpace = 0;
	        parentsSpace = arrowTipLength;
	        break;
	}

	for (index = 0, len = this._treeLevels.length; index < len; index += 1) {
	    treeLevel = this._treeLevels[index];

	    shift += treeLevel.setShift(shift, this._getLevelSpace(treeLevel.actualVisibility), parentsSpace, childrenSpace);
    }
};

primitives.orgdiagram.BaseController.prototype._getLevelSpace = function (visibility) {
	var result = 0.0;

	switch (visibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			result = this.options.normalLevelShift;
			break;
		case 2/*primitives.common.Visibility.Dot*/:
			result = this.options.dotLevelShift;
			break;
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			result = this.options.lineLevelShift;
			break;
	}
	return result;
};
primitives.orgdiagram.BaseController.prototype._virtualReadTemplates = function () {
    var index,
        defaultTemplateConfig = new primitives.orgdiagram.TemplateConfig(),
		templateConfig,
		template,
		defaultTemplate;

	this._templates = {};

	defaultTemplate = new primitives.orgdiagram.Template(defaultTemplateConfig, defaultTemplateConfig);
	defaultTemplate.name = this.widgetEventPrefix + "Template";
	defaultTemplate.createDefaultTemplates();

	this._templates[defaultTemplate.name] = defaultTemplate;

	for (index = 0; index < this.options.templates.length; index += 1) {
		templateConfig = this.options.templates[index];

		template = new primitives.orgdiagram.Template(templateConfig, defaultTemplateConfig);
		template.createDefaultTemplates();

		this._templates[template.name] = template;
	}
};

primitives.orgdiagram.BaseController.prototype._onDefaultTemplateRender = function (event, data) {//ignore jslint
    var itemConfig = data.context,
        itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : "#4169e1"/*primitives.common.Colors.RoyalBlue*/,
		color = primitives.common.highestContrast(itemTitleColor, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
    data.element.find("[name=titleBackground]").css({ "background": itemTitleColor });
	data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
	data.element.find("[name=title]").css({ "color": color }).text(itemConfig.title);
	data.element.find("[name=description]").text(itemConfig.description);
};

primitives.orgdiagram.BaseController.prototype._createCheckBoxTemplate = function () {
	var template = jQuery('<div></div>');
	template.addClass("bp-item bp-selectioncheckbox-frame");

	template.append(jQuery('<label><nobr><input type="checkbox" name="checkbox" class="bp-selectioncheckbox" />&nbsp;<span name="selectiontext" class="bp-selectiontext">'
		+ this.options.selectCheckBoxLabel + '</span></nobr></label>'));

	this._checkBoxTemplate = template.wrap('<div>').parent().html();
	this._checkBoxTemplateHashCode = primitives.common.hashCode(this._checkBoxTemplate);
};

primitives.orgdiagram.BaseController.prototype._onCheckBoxTemplateRender = function (event, data) {//ignore jslint
	var checkBox = data.element.find("[name=checkbox]");
	checkBox.prop("checked", data.isSelected);
};

primitives.orgdiagram.BaseController.prototype._createGroupTitleTemplate = function () {
	var template = jQuery('<div></div>');
	template.addClass("bp-item bp-corner-all bp-grouptitle-frame");

	this._groupTitleTemplate = template.wrap('<div>').parent().html();
	this._groupTitleTemplateHashCode = primitives.common.hashCode(this._groupTitleTemplate);
};

primitives.orgdiagram.BaseController.prototype._onGroupTitleTemplateRender = function (event, data) {//ignore jslint
    var config = new primitives.text.Config(),
        groupTitleColor = (data.itemConfig.groupTitleColor != null ? data.itemConfig.groupTitleColor : "#4169e1"/*primitives.common.Colors.RoyalBlue*/);

	config.orientation = 2/*primitives.text.TextOrientationType.RotateRight*/;
	config.horizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;
	config.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;
	config.text = data.itemConfig.groupTitle;
	config.fontSize = "12px";
	config.color = primitives.common.highestContrast(groupTitleColor, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
	config.fontFamily = "Arial";
	switch (data.renderingMode) {
		case 0/*primitives.common.RenderingMode.Create*/:
			data.element.bpText(config);
			break;
		case 1/*primitives.common.RenderingMode.Update*/:
			data.element.bpText("option", config);
			data.element.bpText("update");
			break;
	}
	primitives.common.css(data.element, { "background": groupTitleColor });
};

primitives.orgdiagram.BaseController.prototype._createButtonsTemplate = function () {
	var template = jQuery("<ul></ul>");

	template.css({
		position: "absolute"
	}).addClass("ui-widget ui-helper-clearfix");

	this._buttonsTemplate = template.wrap('<div>').parent().html();
	this._buttonsTemplateHashCode = primitives.common.hashCode(this._buttonsTemplate);
};

primitives.orgdiagram.BaseController.prototype._onButtonsTemplateRender = function (event, data) {//ignore jslint
	var topOffset = 0,
		buttonsInterval = 10,
		buttonConfig,
		button, buttons,
		index;

	switch (data.renderingMode) {
	    case 0/*primitives.common.RenderingMode.Create*/:
	        buttons = data.template.buttons != null ? data.template.buttons : this.options.buttons;
			for (index = 0; index < buttons.length; index += 1) {
				buttonConfig = buttons[index];
				button = jQuery('<li data-buttonname="' + buttonConfig.name + '"></li>')
					.css({
						position: "absolute",
						top: topOffset + "px",
						left: "0px",
						width: buttonConfig.size.width + "px",
						height: buttonConfig.size.height + "px",
						padding: "3px"
					})
					.addClass(this.widgetEventPrefix + "button");
				data.element.append(button);
				button.button({
					icons: { primary: buttonConfig.icon },
					text: buttonConfig.text,
					label: buttonConfig.label
				});

				if (!primitives.common.isNullOrEmpty(buttonConfig.tooltip)) {
				    if (button.tooltip != null) {
				        button.tooltip({ content: buttonConfig.tooltip });
				    }
				}
				topOffset += buttonsInterval + buttonConfig.size.height;
			}
			break;
		case 1/*primitives.common.RenderingMode.Update*/:
			break;
	}
};

primitives.orgdiagram.BaseController.prototype._createAnnotationLabelTemplate = function () {
    var template = jQuery('<div></div>');
    template.addClass("bp-item bp-corner-all bp-connector-label");

    this._annotationLabelTemplate = template.wrap('<div>').parent().html();
    this._annotationLabelTemplateHashCode = primitives.common.hashCode(this._annotationLabelTemplate);
};

primitives.orgdiagram.BaseController.prototype._onAnnotationLabelTemplateRender = function (event, data) {//ignore jslint
    var annotationConfig = data.context;
    data.element.html(annotationConfig.label);
};

primitives.orgdiagram.BaseController.prototype._createPrintPreviewTemplate = function () {
    var template = jQuery('<div></div>');
    template.addClass("bp-item bp-printpreview");

    this._printPreviewTemplate = template.wrap('<div>').parent().html();
    this._printPreviewTemplateHashCode = primitives.common.hashCode(this._printPreviewTemplate);
};
/* this method create org tree strcuture. It is control specific and its implementation is different for org and fam charts 
    derivatives should populate 
        _orgTree
    family chart optionally populates 
        _orgPartners - When we extract families we store links to parents in other branches having the same children of
*/
primitives.orgdiagram.BaseController.prototype._virtualCreateOrgTree = function () {

};

/* this method uses structures created in _virtualCreateOrgTree to create visual tree used to render charts
    it populates _visualTree structure with TreeItem-s
    
    1. Create invisble visual root item, so all orphants added to it, but since it is invisible, no connections are going to be drawn betwen them
    2. Loop _orgTree nodes and populate visual tree hierarchy: _visualTree
    3. Update visual tree items and add 
        _orgPartners to extraPartners collection
        These two collections used to draw connectors between items in organizational chart
    4. Read visual tree
        populate _treeLevels array of type TreeLevel
            TreeLevel object contains ordered list of all its items 
            plus when items added to that collection we store level & levelPosition in item
        create leftMargins &
               rightMargins collections for every tree item in visual hierarchy
               they are used to for horizontal alignment of visual tree items
*/
primitives.orgdiagram.BaseController.prototype._createVisualTree = function () {
    this._cursorTreeItem = null;
    this._highlightTreeItem = null;

    this._defaultTemplate = null;
    this._defaultTemplate = this._templates[this.options.defaultTemplateName];
    if (this._defaultTemplate === undefined) {
        this._defaultTemplate = this._templates[this.widgetEventPrefix + "Template"];
    }

    /* Visual tree */
    this._visualTree = primitives.common.tree();
    this._treeItemCounter = 0; /* visual tree items counter */
    this._treeItemsByUserId = {};

    /* parent/children relations between tree items used for navigation */
    this._navigationFamily = primitives.common.family(); /* family structure where key: TreeItem.id and value: TreeItem */

    this._treeLevels = [];
    this._leftMargins = {};
    this._rightMargins = {};

    if(this._orgTree.hasNodes()) {
        this._createVisualTreeItems();

        /* select cursor item */
        if (this._treeItemsByUserId.hasOwnProperty(this.options.cursorItem)) {
            this._cursorTreeItem = this._treeItemsByUserId[this.options.cursorItem];
            this._cursorTreeItem.isCursor = true;
        }
        /* select highlight item */
        if (this._treeItemsByUserId.hasOwnProperty(this.options.highlightItem)) {
            this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem];
        }

        /* distribute visual tree into levels for horisontal alignment */
        this._readVisualTree();
        this._updateVisualTreeMargins();
        this._addExtraConnections();

        this._showSelectedItems();
        this._virtualShowCursorNeighbours();

        if (this._debug) {
            if (!this._navigationFamily.validate()) {
                throw "Family tree is broken. Logical child does not reference logical parent.";
            }
        }
    }
};

primitives.orgdiagram.BaseController.prototype._addExtraConnections = function () {
    var orgItemId,
        orgPartnerId, orgPartners,
        index, len,
        orgTreeItem,
        orgPartnerTreeItem;


    /*extraPartners - this is correction for family chart, we add here extraPartners which belong to different branch of organizational chart 
    but logically are partners to this item in family tree*/
    for (orgItemId in this._orgPartners) {
        if (this._orgPartners.hasOwnProperty(orgItemId)) {
            if (this._orgPartners[orgItemId] != null) {
                orgPartners = this._orgPartners[orgItemId];

                orgTreeItem = this._treeItemsByUserId[orgItemId];

                if (orgTreeItem.partnerAggregatorId != null) {
                    orgTreeItem = this._visualTree.node(orgTreeItem.partnerAggregatorId);
                }
                for (index = 0, len = orgPartners.length; index < len; index += 1) {
                    orgPartnerId = orgPartners[index];

                    if (orgTreeItem.partners.length == 0) {
                        orgTreeItem.partners.push(orgTreeItem.id);
                    }

                    orgPartnerTreeItem = this._treeItemsByUserId[orgPartnerId];
                    if (!orgPartnerTreeItem) {
                        throw "Item does not exists!";
                    }
                    orgTreeItem.extraPartners.push(orgPartnerTreeItem.id);
                }
            }
        }
    }
};

primitives.orgdiagram.BaseController.prototype._getNewTreeItem = function (options) {
    var result = new primitives.orgdiagram.TreeItem(this._treeItemCounter),
		optionKey,
        orgItem,
		template;
    for (optionKey in options) {
        if (options.hasOwnProperty(optionKey)) {
            result[optionKey] = options[optionKey];
        }
    }
    this._treeItemCounter += 1;

    orgItem = options.orgItem;
    if (orgItem != null) {
        this._treeItemsByUserId[orgItem.id] = result; /* TreeItem reference by user Id ItemConfig.id */

        template = this._templates[orgItem.templateName];
        result.template = (template !== undefined) ? template : this._defaultTemplate;

        result.actualHasSelectorCheckbox = this._getSelectionVisibility(this.options.cursorItem == orgItem.id, orgItem.hasSelectorCheckbox, this.options.hasSelectorCheckbox);
        result.actualHasButtons = (this.options.buttons.length > 0 || (result.template.buttons != null && result.template.buttons.length > 0)) && this._getSelectionVisibility(this.options.cursorItem == orgItem.id, orgItem.hasButtons, this.options.hasButtons);

        result.actualIsActive = orgItem.isActive && result.template.isActive;
    }

    return result;
};

primitives.orgdiagram.BaseController.prototype._createVisualTreeItems = function () {
    var treeItem,
		visualParent,
		visualAggregator,
		leftSiblingIndex,
		rightSiblingIndex,
		index, len,
		childIndex,
		childrenLen,
		depth,
		rowDepths,
		rowDepth,
		rowAggregators = {},
		rowAggregator,
		rowChildren = {},
		children,
		leftSiblingOffset,
		rightSiblingOffset,
		partners = {}, tempPartners;


    /* org tree item has visible children */
    this._orgTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
        node.hasVisibleChildren = node.isVisible || node.hasVisibleChildren;
        if (parent != null) {
            parent.hasVisibleChildren = parent.hasVisibleChildren || node.hasVisibleChildren;
        }
    });

    this._orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
        var logicalParentItem,
            regularChildren,
            shiftParent;
        if (!this.showInvisibleSubTrees && !parentOrgItem.hasVisibleChildren) {
            return this._orgTree.SKIP;
        }

        logicalParentItem = this._treeItemsByUserId[parentOrgItemId];
        if (!logicalParentItem) {
            logicalParentItem = this._getNewTreeItem({
                visibility: 4/*primitives.common.Visibility.Invisible*/,
                connectorPlacement: 0,
                parentId: null,
                orgItem: parentOrgItem,
                itemConfig: null,
                actualItemType: 0/*primitives.orgdiagram.ItemType.Regular*/
            });
            this._visualTree.add(null, logicalParentItem.id, logicalParentItem);
        }

        /* find left and right siblings margins of logical parent item
           they are needed to properly place GeneralPartner & LimitedPartner nodes. */
        leftSiblingOffset = 0;
        rightSiblingOffset = 0;
        if ((index = this._visualTree.indexOf(logicalParentItem.id)) != null) {
            leftSiblingOffset = index;
            rightSiblingOffset = this._visualTree.countSiblings(logicalParentItem.id) - index - 1;
        }

        /* populate children */
        regularChildren = []; /* children added after all other custom item types */
        this._orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
            if (this.showInvisibleSubTrees || orgItem.hasVisibleChildren) {
                treeItem = this._getNewTreeItem({
                    orgItem: orgItem,
                    itemConfig: orgItem.context,
                    parentId: logicalParentItem.id,
                    actualItemType: orgItem.itemType
                });

                treeItem.visibility = !treeItem.orgItem.isVisible ? 4/*primitives.common.Visibility.Invisible*/ : 0/*primitives.common.Visibility.Auto*/;

                switch (logicalParentItem.actualItemType) {
                    case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
                    case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
                    case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                        switch (treeItem.actualItemType) {
                            case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
                            case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
                            case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                                /* Don't support partner of partner */
                                treeItem.actualItemType = 2/*primitives.orgdiagram.ItemType.Adviser*/;
                                break;
                            case 0/*primitives.orgdiagram.ItemType.Regular*/:
                                /* Don't support regular children of partner */
                                treeItem.actualItemType = 1/*primitives.orgdiagram.ItemType.Assistant*/;
                                break;
                        }
                        break;
                }

                switch (treeItem.actualItemType) {
                    case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
                        this._defineNavigationParent(logicalParentItem, treeItem);
                        treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
                        shiftParent = this._getNewTreeItem({ visibility: 4/*primitives.common.Visibility.Invisible*/ });
                        this._visualTree.add(shiftParent.id, treeItem.id, treeItem);
                        treeItem = shiftParent;
                    case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/://ignore jslint
                    case 2/*primitives.orgdiagram.ItemType.Adviser*/://ignore jslint
                        visualParent = this._visualTree.parent(logicalParentItem.id);
                        if (logicalParentItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
                            leftSiblingIndex = this._findLeftSiblingIndex(logicalParentItem);
                            this._visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingIndex + 1);
                            treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
                            treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                        } else if (logicalParentItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
                            rightSiblingIndex = this._findRightSiblingIndex(logicalParentItem);
                            this._visualTree.add(visualParent.id, treeItem.id, treeItem, rightSiblingIndex);
                            treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
                            treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                        } else {
                            switch (orgItem.adviserPlacementType) {
                                case 2/*primitives.common.AdviserPlacementType.Left*/:
                                    leftSiblingIndex = this._findLeftSiblingIndex(logicalParentItem);
                                    this._visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingIndex + 1);
                                    treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
                                    treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                                    break;
                                default:
                                    rightSiblingIndex = this._findRightSiblingIndex(logicalParentItem);
                                    this._visualTree.add(visualParent.id, treeItem.id, treeItem, rightSiblingIndex);
                                    treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
                                    treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                                    break;
                            }
                        }

                        switch (treeItem.actualItemType) {
                            case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
                                break;
                            case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
                                if (logicalParentItem.parentId != null) {
                                    this._defineNavigationParent(this._visualTree.node(logicalParentItem.parentId), treeItem);
                                } else {
                                    this._defineNavigationParent(logicalParentItem, treeItem, true);
                                }
                                break;
                            case 2/*primitives.orgdiagram.ItemType.Adviser*/:
                                this._defineNavigationParent(logicalParentItem, treeItem);
                                break;
                        }
                        break;
                    case 4/*primitives.orgdiagram.ItemType.SubAssistant*/:
                        this._defineNavigationParent(logicalParentItem, treeItem);
                        treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
                        shiftParent = this._getNewTreeItem({ visibility: 4/*primitives.common.Visibility.Invisible*/ });
                        this._visualTree.add(shiftParent.id, treeItem.id, treeItem);
                        treeItem = shiftParent;
                    case 1/*primitives.orgdiagram.ItemType.Assistant*/://ignore jslint
                        if (logicalParentItem.visualAggregatorId === null) {
                            this._createNewVisualAggregator(logicalParentItem, false);
                        }
                        switch (orgItem.adviserPlacementType) {
                            case 2/*primitives.common.AdviserPlacementType.Left*/:
                                this._visualTree.add(logicalParentItem.id, treeItem.id, treeItem, 0);
                                treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
                                treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                                break;
                            default:
                                this._visualTree.add(logicalParentItem.id, treeItem.id, treeItem);
                                treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
                                treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                                break;
                        }
                        if (treeItem.actualItemType == 1/*primitives.orgdiagram.ItemType.Assistant*/) {
                            this._defineNavigationParent(logicalParentItem, treeItem);
                        }
                        break;
                    case 0/*primitives.orgdiagram.ItemType.Regular*/:
                        regularChildren.push(treeItem);
                        this._defineNavigationParent(logicalParentItem, treeItem);
                        break;
                    case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
                    case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                        visualParent = this._visualTree.parent(logicalParentItem.id);
                        if (logicalParentItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
                            this._visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingOffset);
                            treeItem.connectorPlacement = 2/*primitives.common.SideFlag.Right*/ | 4/*primitives.common.SideFlag.Bottom*/;
                            treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                        } else if (logicalParentItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
                            this._visualTree.add(visualParent.id, treeItem.id, treeItem, this._visualTree.countChildren(visualParent.id) - rightSiblingOffset);
                            treeItem.connectorPlacement = 8/*primitives.common.SideFlag.Left*/ | 4/*primitives.common.SideFlag.Bottom*/;
                            treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                        } else {
                            switch (orgItem.adviserPlacementType) {
                                case 2/*primitives.common.AdviserPlacementType.Left*/:
                                    this._visualTree.add(visualParent.id, treeItem.id, treeItem, leftSiblingOffset);
                                    treeItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                                    break;
                                default:
                                    this._visualTree.add(visualParent.id, treeItem.id, treeItem, this._visualTree.countChildren(visualParent.id) - rightSiblingOffset);
                                    treeItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                                    break;
                            }
                            switch (treeItem.actualItemType) {
                                case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                                    treeItem.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
                                    break;
                                case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
                                    treeItem.connectorPlacement = 4/*primitives.common.SideFlag.Bottom*/;
                                    break;
                            }
                        }
                        if (logicalParentItem.parentId != null) {
                            this._defineNavigationParent(this._visualTree.node(logicalParentItem.parentId), treeItem);
                        } else {
                            this._defineNavigationParent(logicalParentItem, treeItem, true);
                        }
                        break;
                }
            }
        });

        /* collect partners, add logicalParentItem into partners collection */
        switch (logicalParentItem.actualItemType) {
            case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
            case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
            case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                break;
            default:
                tempPartners = [];
                if ((visualParent = this._visualTree.parent(logicalParentItem.id)) != null) {
                    this._visualTree.loopChildrenRange(this, visualParent.id, leftSiblingOffset, this._visualTree.countChildren(visualParent.id) - rightSiblingOffset, function (childItemId, childItem, index) {
                        if (childItem.id == logicalParentItem.id) {
                            tempPartners.push(childItem);
                        } else {
                            switch (childItem.actualItemType) {
                                case 7/*primitives.orgdiagram.ItemType.LimitedPartner*/:
                                case 8/*primitives.orgdiagram.ItemType.AdviserPartner*/:
                                case 6/*primitives.orgdiagram.ItemType.GeneralPartner*/:
                                    if (this._orgTree.parentid(childItem.orgItem.id) == logicalParentItem.orgItem.id) {
                                        tempPartners.push(childItem);
                                    }
                                    break;
                            }
                        }
                    });
                }
                if (tempPartners.length > 1) {
                    partners[logicalParentItem.id] = tempPartners;
                }
                break;
        }

        /* add children */
        rowAggregators[logicalParentItem.id] = [];
        rowChildren[logicalParentItem.id] = [];
        this._layoutChildren(logicalParentItem, regularChildren, logicalParentItem.orgItem.childrenPlacementType, rowAggregators[logicalParentItem.id], rowChildren[logicalParentItem.id]);
    });


    /* transform tree to place children sub branches inside of hierarchy */
    this._orgTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
        var logicalParentItem = this._treeItemsByUserId[nodeid],
            itemRowChildren,
            itemRowAggregators,
            hasChildren;
        if (logicalParentItem != null) {
            itemRowChildren = rowChildren[logicalParentItem.id];
            itemRowAggregators = rowAggregators[logicalParentItem.id];

            /* Move assistants children inside */
            depth = this._getAssitantsDepth(logicalParentItem);
            if (depth > 0) {
                logicalParentItem.visualDepth = depth + 1;
                if (logicalParentItem.visualAggregatorId !== null) {
                    visualAggregator = this._visualTree.node(logicalParentItem.visualAggregatorId);
                    hasChildren = this._visualTree.hasChildren(visualAggregator.id);
                    for (index = 0; index < depth - 1; index += 1) {
                        visualAggregator = this._createNewVisualAggregator(visualAggregator, !hasChildren);
                    }
                }
            }

            /* Move advisers children inside */
            depth = this._getAdvisersDepth(logicalParentItem);
            if (depth > 1) {
                logicalParentItem.visualDepth += (depth - 1);
                hasChildren = this._visualTree.hasChildren(logicalParentItem.id);
                visualAggregator = logicalParentItem;
                for (index = 0; index < depth - 1; index += 1) {
                    visualAggregator = this._createNewVisualAggregator(visualAggregator, !hasChildren);
                }
            }

            /* Move children of children inside */
            rowDepths = [];
            for (index = 0, len = itemRowChildren.length; index < len; index += 1) {
                children = itemRowChildren[index];
                rowDepths[index] = 0;
                for (childIndex = 0, childrenLen = children.length; childIndex < childrenLen; childIndex += 1) {
                    rowDepths[index] = Math.max(rowDepths[index], this._getItemDepth(children[childIndex]));
                }
            }

            for (index = 0, len = rowDepths.length; index < len; index += 1) {
                rowDepth = rowDepths[index];
                if (rowDepth > 1) {
                    for (childIndex = 0, childrenLen = itemRowAggregators[index].length; childIndex < childrenLen; childIndex += 1) {
                        rowAggregator = itemRowAggregators[index][childIndex];
                        if (this._visualTree.hasChildren(rowAggregator.id)) {
                            depth = rowDepth;
                            while (depth > 1) {
                                rowAggregator = this._createNewVisualAggregator(rowAggregator, false);
                                depth -= 1;
                            }
                        }
                    }
                }
            }

            /* Align heights of partner branches in order to draw connector lines between them and logical parent children */
            if (partners[logicalParentItem.id] != null) {
                /* partners collection includes treeItem so we should have at least 2 items */
                this._layoutPartners(logicalParentItem, partners[logicalParentItem.id]);
            }
        }
    });
};

primitives.orgdiagram.BaseController.prototype._layoutPartners = function (treeItem, partners) {
    var partner,
		index, len,
        depth,
        maxDepth = 0,
		visualPartners = [],
        visualPartner,
		visualParent,
        visualAggregator,
        leftSiblingIndex,
        gravity;

    /* Find maximum depth required to enclose partners branches */
    for (index = 0, len = partners.length; index < len; index += 1) {
        partner = partners[index];
        maxDepth = Math.max(maxDepth, partner.visualDepth);
    }

    /* Extend visual aggregators lines and ensure that connector lines are visible */
    for (index = 0, len = partners.length; index < len; index += 1) {
        partner = partners[index];
        visualPartner = this._getLastVisualAggregator(partner);
        depth = 1;
        visualAggregator = partner;
        while (visualAggregator.visualAggregatorId != null) {
            visualAggregator = this._visualTree.node(visualAggregator.visualAggregatorId);
            visualAggregator.connectorPlacement = 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/;
            depth += 1;
        }
        while (depth < maxDepth) {
            visualPartner = this._createNewVisualAggregator(visualPartner, false);
            depth += 1;
        }
        visualPartners.push(this._getLastVisualAggregator(visualPartner).id);
    }


    visualAggregator = this._getLastVisualAggregator(treeItem);
    if (this._visualTree.hasChildren(visualAggregator.id)) {
        /* Select middle partner */
        visualPartner = partners[Math.floor(partners.length / 2)];
        if (partners.length > 1 && partners.length % 2 == 0) {
            /* insert invisble partner for alignemnt */
            visualParent = this._visualTree.parent(visualPartner.id);
            leftSiblingIndex = this._findLeftSiblingIndex(visualPartner);

            gravity = this._visualTree.getChild(visualParent.id, leftSiblingIndex).gravity
                || this._visualTree.getChild(visualParent.id, leftSiblingIndex + 1).gravity;

            // visualParent.id,
            visualPartner = this._getNewTreeItem({
                visibility: 4/*primitives.common.Visibility.Invisible*/,
                connectorPlacement: visualPartner.connectorPlacement & (8/*primitives.common.SideFlag.Left*/ | 2/*primitives.common.SideFlag.Right*/),
                gravity: gravity
            });

            this._visualTree.add(visualParent.id, visualPartner.id, visualPartner, leftSiblingIndex + 1);

            depth = 1;
            while (depth < maxDepth) {
                visualPartner = this._createNewVisualAggregator(visualPartner, false);
                visualPartner.connectorPlacement = 0;
                depth += 1;
            }
        }

        /* every child logically belongs to every partner */
        for (index = 0, len = partners.length; index < len; index += 1) {
            partner = partners[index];
            /* select all parents up to the root */
            this._navigationFamily.loopChildren(this, treeItem.id, function (childItemId, childItem, level) {
                switch (childItem.actualItemType) {
                    case 5/*primitives.orgdiagram.ItemType.SubAdviser*/:
                    case 2/*primitives.orgdiagram.ItemType.Adviser*/:
                    case 4/*primitives.orgdiagram.ItemType.SubAssistant*/:
                    case 1/*primitives.orgdiagram.ItemType.Assistant*/:
                        break;
                    default:
                        /* partners share only regular items */
                        if (treeItem.id != partner.id) {
                            this._defineNavigationParent(partner, childItem);
                        }
                        break;
                }
                return this._navigationFamily.SKIP;
            }); //ignore jslint
        }

        /* Move children to new visual partner node */
        visualPartner = this._getLastVisualAggregator(visualPartner);
        this._visualTree.moveChildren(visualAggregator.id, visualPartner.id);
    }

    /* Store collection of visual partners to draw connector lines*/
    visualPartner.partners = visualPartners;
    treeItem.partnerAggregatorId = visualPartner.id;
};

primitives.orgdiagram.BaseController.prototype._defineNavigationParent = function (logicalParentItem, treeItem) {

};


primitives.orgdiagram.BaseController.prototype._getLastVisualAggregator = function (treeItem) {
    var result = treeItem;

    while (result.visualAggregatorId != null) {
        result = this._visualTree.node(result.visualAggregatorId);
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._getAdvisersDepth = function (treeItem) {
    var result = 0,
		parentItem = this._visualTree.parent(treeItem.id),
		treeItemIndex,
		position,
		childItem;
    if (parentItem !== null) {
        treeItemIndex = this._visualTree.indexOf(treeItem.id);

        position = 1;
        while ((childItem = this._visualTree.getChild(parentItem.id, treeItemIndex + position)) != null) {
            if (childItem.connectorPlacement & 8/*primitives.common.SideFlag.Left*/) {
                result = Math.max(result, this._getItemDepth(childItem));
                position += 1;
            }
            else {
                break;
            }
        }
        position = 1;
        while ((childItem = this._visualTree.getChild(parentItem.id, treeItemIndex - position)) != null) {
            if (childItem.connectorPlacement & 2/*primitives.common.SideFlag.Right*/) {
                result = Math.max(result, this._getItemDepth(childItem));
                position += 1;
            }
            else {
                break;
            }
        }
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._getAssitantsDepth = function (treeItem) {
    var result = 0;
    if (treeItem.visualAggregatorId != null) {
        this._visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, level) {
            if (treeItem.visualAggregatorId == childItemId) {
                return this._visualTree.SKIP;
            }
            result = level + 1;
        });
    }
    return result;
};

primitives.orgdiagram.BaseController.prototype._getItemDepth = function (treeItem) {
    var result = 0;
    this._visualTree.loopLevels(this, treeItem.id, function (childid, child, level) {
        result = level + 1;
    });
    return result + 1;
};

primitives.orgdiagram.BaseController.prototype._layoutChildren = function (treeItem, regularChildren, childrenPlacementType, rowAggregators, rowChildren) {
    var visualParent,
		currentVisualParent,
		leftChildItem,
		rightChildItem,
		newAggregatorItem,
		childItem,
		width,
		height,
		twinColumns,
		column,
		row,
		index, len,
		singleItemPlacement,
		hideParentConnector = (treeItem.visibility == 4/*primitives.common.Visibility.Invisible*/) && (treeItem.connectorPlacement == 0);

    switch (this.options.horizontalAlignment) {
        case 0/*primitives.common.HorizontalAlignmentType.Center*/:
        case 1/*primitives.common.HorizontalAlignmentType.Left*/:
            singleItemPlacement = 3/*primitives.common.AdviserPlacementType.Right*/;
            break;
        case 2/*primitives.common.HorizontalAlignmentType.Right*/:
            singleItemPlacement = 2/*primitives.common.AdviserPlacementType.Left*/;
            break;
    }

    if (childrenPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) {
        if (this._hasRegularLeavesOnly(this._orgTree, treeItem)) {
            childrenPlacementType = (this.options.leavesPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) ?
				3/*primitives.common.ChildrenPlacementType.Matrix*/ : this.options.leavesPlacementType;
        }
        else {
            childrenPlacementType = (this.options.childrenPlacementType === 0/*primitives.common.ChildrenPlacementType.Auto*/) ?
				2/*primitives.common.ChildrenPlacementType.Horizontal*/ : this.options.childrenPlacementType;
        }
    }

    visualParent = treeItem;
    /* if node has assitants then it has visual aggregator child node */
    if (treeItem.visualAggregatorId !== null) {
        visualParent = this._visualTree.node(treeItem.visualAggregatorId);
    }

    if (childrenPlacementType == 3/*primitives.common.ChildrenPlacementType.Matrix*/ && regularChildren.length < 3) {
        childrenPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;
    }

    switch (childrenPlacementType) {
        case 2/*primitives.common.ChildrenPlacementType.Horizontal*/:
            for (index = 0, len = regularChildren.length; index < len; index += 1) {
                childItem = regularChildren[index];
                this._visualTree.add(visualParent.id, childItem.id, childItem);
                childItem.connectorPlacement = (childItem.orgItem.hideParentConnection ? 0 : 1/*primitives.common.SideFlag.Top*/) | (childItem.orgItem.hideChildrenConnection ? 0 : 4/*primitives.common.SideFlag.Bottom*/);

                if (index == 0) {
                    childItem.relationDegree = 1;
                }
            }
            break;
        case 3/*primitives.common.ChildrenPlacementType.Matrix*/:
            width = Math.min(this.options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
            height = Math.ceil(regularChildren.length / width);
            twinColumns = Math.ceil(width / 2.0);
            for (column = 0; column < twinColumns; column += 1) {
                currentVisualParent = visualParent;
                for (row = 0; row < height; row += 1) {
                    leftChildItem = this._getMatrixItem(regularChildren, column * 2, row, width);
                    rightChildItem = this._getMatrixItem(regularChildren, column * 2 + 1, row, width);
                    if (rowAggregators[row] === undefined) {
                        rowAggregators[row] = [];
                        rowChildren[row] = [];
                    }
                    if (leftChildItem !== null) {
                        if (column == 0) {
                            leftChildItem.relationDegree = 1;
                        }
                        this._visualTree.add(currentVisualParent.id, leftChildItem.id, leftChildItem);
                        leftChildItem.connectorPlacement = (hideParentConnector ? 0 : 2/*primitives.common.SideFlag.Right*/) | 4/*primitives.common.SideFlag.Bottom*/;
                        leftChildItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;

                        rowChildren[row].push(leftChildItem);
                    }
                    if (leftChildItem !== null || rightChildItem !== null) {
                        // currentVisualParent.id,
                        newAggregatorItem = this._getNewTreeItem({
                            visibility: 4/*primitives.common.Visibility.Invisible*/,
                            connectorPlacement: hideParentConnector ? 0 : 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/
                        });
                        this._visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
                        rowAggregators[row].push(newAggregatorItem);
                    }
                    if (rightChildItem !== null) {
                        this._visualTree.add(currentVisualParent.id, rightChildItem.id, rightChildItem);
                        rightChildItem.connectorPlacement = (hideParentConnector ? 0 : 8/*primitives.common.SideFlag.Left*/) | 4/*primitives.common.SideFlag.Bottom*/;
                        rightChildItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;

                        rowChildren[row].push(rightChildItem);
                    }

                    currentVisualParent = newAggregatorItem;
                }
            }
            if (width > 2) {
                // No center alignment to aggregator required
                visualParent.visualAggregatorId = null;
            }
            break;
        case 1/*primitives.common.ChildrenPlacementType.Vertical*/:
            for (index = 0, len = regularChildren.length; index < len; index += 1) {
                childItem = regularChildren[index];

                // visualParent.id,
                newAggregatorItem = this._getNewTreeItem({
                    visibility: 4/*primitives.common.Visibility.Invisible*/,
                    connectorPlacement: hideParentConnector ? 0 : 1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/
                });

                visualParent.visualAggregatorId = newAggregatorItem.id;

                switch (singleItemPlacement) {
                    case 2/*primitives.common.AdviserPlacementType.Left*/:
                        this._visualTree.add(visualParent.id, childItem.id, childItem);
                        this._visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
                        childItem.connectorPlacement = (hideParentConnector ? 0 : 2/*primitives.common.SideFlag.Right*/) | 4/*primitives.common.SideFlag.Bottom*/;
                        childItem.gravity = 2/*primitives.common.HorizontalAlignmentType.Right*/;
                        break;
                    case 3/*primitives.common.AdviserPlacementType.Right*/:
                        this._visualTree.add(visualParent.id, newAggregatorItem.id, newAggregatorItem);
                        this._visualTree.add(visualParent.id, childItem.id, childItem);
                        childItem.connectorPlacement = (hideParentConnector ? 0 : 8/*primitives.common.SideFlag.Left*/) | 4/*primitives.common.SideFlag.Bottom*/;
                        childItem.gravity = 1/*primitives.common.HorizontalAlignmentType.Left*/;
                        break;
                }

                rowAggregators[index] = [newAggregatorItem];
                rowChildren[index] = [childItem];

                visualParent = newAggregatorItem;
            }
            break;
        default:
            break;
    }
};

primitives.orgdiagram.BaseController.prototype._getMatrixItem = function (items, x, y, width) {
    var result,
		isOdd = (width % 2 > 0),
		index;

    if (isOdd) {
        if (x === width - 1) {
            x = items.length;
        }
        else if (x === width) {
            x = width - 1;
        }
    }
    index = y * width + x;

    result = (index > items.length - 1) ? null : items[index];

    return result;
};

primitives.orgdiagram.BaseController.prototype._hasRegularLeavesOnly = function (orgTree, treeItem) {
    var hasChildren = false,
        hasLeavesOnly = true;

    if (treeItem.orgItem !== null) {
        orgTree.loopChildren(this, treeItem.orgItem.id, function (nodeid, node, index) {
            hasChildren = true;
            if (node.itemType === 0/*primitives.orgdiagram.ItemType.Regular*/
                && orgTree.hasChildren(nodeid)) {
                    hasLeavesOnly = false;
                    return true; // break
            }
        });
    }
    return hasChildren && hasLeavesOnly;
};

/* Sibling is the first item which does not belongs to items logical hierarchy */
primitives.orgdiagram.BaseController.prototype._findLeftSiblingIndex = function (treeItem) {
    var result = null,
		ignore = {},
        visualParent = this._visualTree.parent(treeItem.id);

    this._visualTree.loopChildrenReversed(this, visualParent.id, function (childItemId, childItem, index) {
        if (result === null) {
            if (childItemId == treeItem.id) {
                result = -1;
                ignore[treeItem.id] = true;
                this._navigationFamily.loopChildren(this, treeItem.id, function (childid, child, level) {
                    if (level > 0) {
                        return this._navigationFamily.BREAK;
                    }
                    ignore[childid] = true;
                });
            }
        }
        else {
            if (!ignore.hasOwnProperty(childItemId)) {
                result = index;
                return true; //ignore jslint
            } else {
                this._navigationFamily.loopChildren(this, childItem.id, function (childid, child, level) {
                    if (level > 0) {
                        return this._navigationFamily.BREAK;
                    }
                    ignore[childid] = true;
                });
            }
        }
    });

    return result;
};

/* Sibling is the first item which does not belongs to items logical hierarchy */
primitives.orgdiagram.BaseController.prototype._findRightSiblingIndex = function (treeItem) {
    var result = null,
		ignore = {},
        visualParent = this._visualTree.parent(treeItem.id);

    this._visualTree.loopChildren(this, visualParent.id, function (childItemId, childItem, index, lastIndex) {
        if (result === null) {
            if (childItemId == treeItem.id) {
                result = lastIndex + 1;
                ignore[treeItem.id] = true;
                this._navigationFamily.loopChildren(this, treeItem.id, function (childid, child, level) {
                    if (level > 0) {
                        return this._navigationFamily.BREAK;
                    }
                    ignore[childid] = true;
                });
            }
        }
        else {
            if (!ignore.hasOwnProperty(childItemId)) {
                result = index;
                return true; //ignore jslint
            } else {
                this._navigationFamily.loopChildren(this, childItemId, function (childid, child, level) {
                    if (level > 0) {
                        return this._navigationFamily.BREAK;
                    }
                    ignore[childid] = true;
                });
            }
        }
    });
    return result;
};

primitives.orgdiagram.BaseController.prototype._createNewVisualAggregator = function (treeItem, hideChildrenConnector) {
    var newAggregatorItem,
		hideParentConnector = ((treeItem.visibility == 4/*primitives.common.Visibility.Invisible*/) && (treeItem.connectorPlacement == 0)) || hideChildrenConnector;

    newAggregatorItem = this._getNewTreeItem({
		visibility: 4/*primitives.common.Visibility.Invisible*/,
		visualAggregatorId: treeItem.visualAggregatorId,
		connectorPlacement: hideParentConnector ? 0 : (1/*primitives.common.SideFlag.Top*/ | 4/*primitives.common.SideFlag.Bottom*/)
    });

    this._visualTree.insert(treeItem.id, newAggregatorItem.id, newAggregatorItem);

    treeItem.visualAggregatorId = newAggregatorItem.id;
	return newAggregatorItem;
};

primitives.orgdiagram.BaseController.prototype._readVisualTree = function () {

    this._visualTree.loopLevels(this, function (treeItemId, treeItem, level) {
        var treeLevel = this._treeLevels[level];

        if (treeLevel === undefined) {
            treeLevel = this._treeLevels[level] = new primitives.orgdiagram.TreeLevel(level);
        }

        treeLevel.treeItems.push(treeItemId);
        if (treeItem.actualIsActive && treeItem.visibility != 4/*primitives.common.Visibility.Invisible*/) {
            treeLevel.activeTreeItems.push(treeItemId);
        }
        treeItem.level = level;
        treeItem.levelPosition = treeLevel.treeItems.length - 1;
    });
};

primitives.orgdiagram.BaseController.prototype._updateVisualTreeMargins = function () {
    this._leftMargins = {};
    this._rightMargins = {};

    this._visualTree.loop(this, function(nodeid, node){
        this._leftMargins[nodeid] = [];
        this._rightMargins[nodeid] = [];
    });

    this._visualTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
        var parentLeftMargins = this._leftMargins[parentid],
            parentRightMargins = this._rightMargins[parentid],
            nodeLeftMargins = this._leftMargins[nodeid],
            nodeRightMargins = this._rightMargins[nodeid],
            index, len;

        if(parentid != null) {
            /* update parent left margins */
            if(!parentLeftMargins[0]) {
                parentLeftMargins[0] = node;
            }

            for (index = 0, len = nodeLeftMargins.length; index < len; index += 1) {
                if (!parentLeftMargins[index + 1]) {
                    parentLeftMargins[index + 1] = nodeLeftMargins[index];
                }
            }

            /* update parent rights margins */
            parentRightMargins[0] = node;

            for (index = 0, len = nodeRightMargins.length; index < len; index += 1) {
                parentRightMargins[index + 1] = nodeRightMargins[index];
            }
        }
    });
};


primitives.orgdiagram.BaseController.prototype._showSelectedItems = function () {
    var treeItem,
        index, len,
        selectedItems = [],
        processed = {},
		annotationConfig;
    
    /* show annotated items full size*/
	for (index = 0, len = this.options.annotations.length; index < len; index += 1) {
	    annotationConfig = this.options.annotations[index];
	    if (annotationConfig.selectItems) {
	        if (annotationConfig.fromItem != null) {
	            selectedItems.push(annotationConfig.fromItem);
	        }
	        if (annotationConfig.toItem != null) {
	            selectedItems.push(annotationConfig.toItem);
	        }
	        if (annotationConfig.items != null && annotationConfig.items.length > 0) {
	            selectedItems = selectedItems.concat(annotationConfig.items);
	        }
	    }
	}

	for (index = 0, len = selectedItems.length; index < len; index += 1) {
	    treeItem = this._treeItemsByUserId[selectedItems[index]];
	    if (treeItem != null) {
	        if (treeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
	            treeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
	        }
	    }
	}

	for (index = 0, len = this.options.selectedItems.length; index < len; index += 1) {
	    treeItem = this._treeItemsByUserId[this.options.selectedItems[index]];
	    if (treeItem != null) {
	        treeItem.isSelected = true;

	        if (!processed[treeItem.id]) {
	            if (treeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
	                treeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
	            }

	            switch (this.options.selectionPathMode) {
	                case 0/*primitives.common.SelectionPathMode.None*/:
	                    break;
	                case 1/*primitives.common.SelectionPathMode.FullStack*/:
	                    /* select all parents up to the root */
	                    this._navigationFamily.loopParents(this, treeItem.id, function (parentItemId, parentItem) {
	                        if (processed[parentItemId] != null) {
	                            return this._navigationFamily.SKIP;
	                        }
	                        processed[parentItemId] = true;
	                        if (parentItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
	                            parentItem.visibility = 1/*primitives.common.Visibility.Normal*/;
	                        }
	                    }); //ignore jslint
	                    break;
	            }
	        }
	    }
	}
};

primitives.orgdiagram.BaseController.prototype._virtualShowCursorNeighbours = function () {

};

primitives.orgdiagram.BaseController.prototype._getSelectionVisibility = function (isCursor, itemState, widgetState) {
	var result = false;
	switch (itemState) {
		case 0/*primitives.common.Enabled.Auto*/:
			switch (widgetState) {
				case 0/*primitives.common.Enabled.Auto*/:
					result = isCursor;
					break;
				case 1/*primitives.common.Enabled.True*/:
					result = true;
					break;
				case 2/*primitives.common.Enabled.False*/:
					result = false;
					break;
			}
			break;
		case 1/*primitives.common.Enabled.True*/:
			result = true;
			break;
		case 2/*primitives.common.Enabled.False*/:
			result = false;
			break;
	}
	return result;
};
/*
    Class: primitives.common.StackSegment
	    Class used to pass collection of segments to <primitives.common.stackSegments> function.
*/
primitives.common.StackSegment = function (context, startIndex, endIndex) {
    /*
    Property: context
    Segment context value
    */
    this.context = context;
    /*
    Property: startIndex
    Segment start
    */
    this.startIndex = startIndex;
    /*
    Property: endIndex
    Segment end
    */
    this.endIndex = endIndex;
};

primitives.common.StackSegment.prototype.toString = function () {
    return "[" + Math.round(this.startIndex) + " - " + Math.round(this.endIndex) + "]";
};
primitives.common.perimeter.Item = function (id, segments) {
    var index, len,
        segment;

    this.id = id;

    this.segments = new primitives.common.LinkedHashItems();

    if (segments != null) {
        for (index = 0, len = segments.length; index < len; index += 1) {
            segment = segments[index];
            this.segments.add(segment.key, segment);
        }
    }
};

primitives.common.perimeter.Manager = function (perimeterItems) {
    var perimetersHash = {}, // hash of permiter items by id
        perimetersBySegmentKey = {}; // hash of permiter items by segment id

    function add(perimeterItems) {
        var index, len,
            perimeterItem;

        for (index = 0, len = perimeterItems.length; index < len; index += 1) {
            perimeterItem = perimeterItems[index];

            perimetersHash[perimeterItem.id] = perimeterItem;

            perimeterItem.segments.iterate(function (item) {
                perimetersBySegmentKey[item.key] = perimeterItem;
            }); //ignore jslint
        }
    }

    function _moveCursor(segments, cursorSegment) {
        var result = segments.nextKey(cursorSegment.key),
            nextKey;

        while (cursorSegment != null && cursorSegment.oppositeKey == (nextKey = (result || segments.startKey()))) {

            if (result != null) {
                result = segments.nextKey(result);
            }

            segments.remove(cursorSegment.key);
            segments.remove(nextKey);

            cursorSegment = segments.item(result != null ? segments.prevKey(result) : segments.endKey());
        }

        return result;
    }

    function getMergedPerimeters(items) {
        var result = [], // array of merged Perimeter Items
            itemsToMerge = {}, // hash contains PerimeterItem.id merged into output array of Perimeter Items
            index, len,
            item,
            targetPerimeter, perimeter, cursor,
            cursorSegment, adjadjacentPerimeter;

        for (index = 0, len = items.length; index < len; index += 1) {
            item = items[index];
            itemsToMerge[item] = !perimetersHash.hasOwnProperty(item);
        }

        for (index = 0, len = items.length; index < len; index += 1) {
            item = items[index];

            if (!itemsToMerge[item]) {
                itemsToMerge[item] = true;

                targetPerimeter = new primitives.common.perimeter.Item(item);

                // Copy first perimeter to target
                perimeter = perimetersHash[item];
                perimeter.segments.iterate(function (segment) {
                    targetPerimeter.segments.add(segment.key, segment);
                }); //ignore jslint

                result.push(targetPerimeter);


                // Create cursor and scan target perimeter segments
                cursor = targetPerimeter.segments.startKey();
                while (cursor != null) {
                    cursorSegment = targetPerimeter.segments.item(cursor);

                    if (perimetersBySegmentKey.hasOwnProperty(cursorSegment.oppositeKey)) {
                        adjadjacentPerimeter = perimetersBySegmentKey[cursorSegment.oppositeKey];

                        if (itemsToMerge.hasOwnProperty(adjadjacentPerimeter.id) && !itemsToMerge[adjadjacentPerimeter.id]) {
                            itemsToMerge[adjadjacentPerimeter.id] = true;

                            adjadjacentPerimeter.segments.iterateBack(function (segment) {
                                if (segment.key != cursorSegment.oppositeKey) {
                                    targetPerimeter.segments.insertAfter(cursor, segment.key, segment);
                                }
                            }, cursorSegment.oppositeKey, null); //ignore jslint

                            adjadjacentPerimeter.segments.iterateBack(function (segment) {
                                targetPerimeter.segments.insertAfter(cursor, segment.key, segment);
                            }, null, cursorSegment.oppositeKey); //ignore jslint
                        }
                    }
                    cursor = _moveCursor(targetPerimeter.segments, cursorSegment);
                }
            }
        }
        return result;
    }

    if (perimeterItems != null) {
        add(perimeterItems);
    }

    return {
        add: add,
        getMergedPerimeters: getMergedPerimeters
    };
};

primitives.common.perimeter.SegmentItem = function (arg0, arg1, arg2, arg3) {
    this.fromPoint = null;
    this.toPoint = null;

    switch (arguments.length) {
        case 2:
            this.fromPoint = arg0;
            this.toPoint = arg1;
            break;
        case 4:
            this.fromPoint = new primitives.common.Point(arg0, arg1);
            this.toPoint = new primitives.common.Point(arg2, arg3);
            break;
        default:
            break;
    }

    var fromKey = this.fromPoint.toString(),
        toKey = this.toPoint.toString();

    if (fromKey == toKey) {
        throw "Null length segment!";
    }

    this.key = fromKey + ' - ' + toKey;
    this.oppositeKey = toKey + ' - ' + fromKey;

    this.orientationType = null;
    if (this.fromPoint.y > this.toPoint.y) {
        this.orientationType = 3/*primitives.common.OrientationType.Right*/;
    } else if (this.fromPoint.y < this.toPoint.y) {
        this.orientationType = 2/*primitives.common.OrientationType.Left*/;
    } else if (this.fromPoint.x > this.toPoint.x) {
        this.orientationType = 0/*primitives.common.OrientationType.Top*/;
    } else {
        this.orientationType = 1/*primitives.common.OrientationType.Bottom*/;
    }
};

/*
    Function: primitives.common.mergeSort
        Merges array of sorted arrays into one using call back function for comparison.
    
    Parameters:
	    arrays - Array of sorted arrays of objects.
        getItemWeight - Call back function used to get items weight. 
        ignoreDuplicates - return distinct items only.

    Returns: 
	    Array of merged sorted items. 
*/
primitives.common.mergeSort = function (arrays, getItemWeight, ignoreDuplicates) {
    var result = null,
        firstArray, secondArray, mergedArray, arrayIndex,
        firstIndex, secondIndex, firstLen, secondLen, firstItem, secondItem,
        firstItemWeight, secondItemWeight,
        currentValue;

    switch (arrays.length) {
        case 0:
            result = [];
            break;
        default:
            firstArray = [];
            for (arrayIndex = 0; arrayIndex < arrays.length; arrayIndex += 1) {
                secondArray = arrays[arrayIndex];
                mergedArray = [];

                firstLen = firstArray.length;
                secondLen = secondArray.length;

                firstIndex = 0;
                secondIndex = 0;

                firstItem = null;
                firstItemWeight = null;
                secondItem = null;
                secondItemWeight = null;

                if (firstLen > 0) {
                    firstItem = firstArray[firstIndex];
                    firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
                }

                if (secondLen > 0) {
                    secondItem = secondArray[secondIndex];
                    secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
                }
                currentValue = null;
                while (firstIndex < firstLen || secondIndex < secondLen) {

                    if (firstIndex >= firstLen) {
                        if (!ignoreDuplicates || currentValue != secondItem) {
                            mergedArray.push(secondItem);
                            currentValue = secondItem;
                        }
                        secondIndex += 1;

                        
                        if (secondIndex < secondLen) {
                            secondItem = secondArray[secondIndex];
                            secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
                        }
                    } else {
                        if (secondIndex >= secondLen) {
                            if (!ignoreDuplicates || currentValue != firstItem) {
                                mergedArray.push(firstItem);
                                currentValue = firstItem;
                            }
                            firstIndex += 1;

                            
                            if (firstIndex < firstLen) {
                                firstItem = firstArray[firstIndex];
                                firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
                            }
                        } else {
                            if (firstItemWeight < secondItemWeight) {
                                if (!ignoreDuplicates || currentValue != firstItem) {
                                    mergedArray.push(firstItem);
                                    currentValue = firstItem;
                                }
                                firstIndex += 1;

                                if (firstIndex < firstLen) {
                                    firstItem = firstArray[firstIndex];
                                    firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
                                }
                            } else {
                                if (!ignoreDuplicates || currentValue != secondItem) {
                                    mergedArray.push(secondItem);
                                    currentValue = secondItem;
                                }
                                secondIndex += 1;
                                
                                if (secondIndex < secondLen) {
                                    secondItem = secondArray[secondIndex];
                                    secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
                                }
                            }
                        }
                    }
                }
                firstArray = mergedArray;
            }
            result = firstArray;
            break;
    }
    return result;
};

/*
    Function: primitives.common.stackSegments
        Sorts and stack segments on top of each other so they occupy minimum space.
    
    Parameters:
	    items - Array of primitives.common.StackSegment elements.
        onItemStacked - Call back function used to set segment offset. 

    Returns: 
	    Hight of stacked segments.

    See Also:
	    <primitives.common.StackSegment>
*/
primitives.common.stackSegments = function (items, onItemStacked) {
    var result = 0,
        maxOffset,
        prevOffset,
        treeItemsGroup,
        index2, len2,
        index3, len3,
        points = [],
        newPoints, point,
        startPoint, endPoint,
        startPointAdded,
        endPointAdded,
        offsets = {};

    /* sort items so we place segments having minimal distance between start and end in the beggining  */
    items.sort(function (a, b) {
        return (a.endIndex - a.startIndex) - (b.endIndex - b.startIndex);
    });

    /* now we stack segments so we can calculate offset */
    for (index2 = 0, len2 = items.length; index2 < len2; index2 += 1) {
        treeItemsGroup = items[index2];
        maxOffset = 0;
        prevOffset = 0;

        startPoint = treeItemsGroup.startIndex;
        offsets[startPoint] = maxOffset + 1; /* it is later redefined */
        endPoint = treeItemsGroup.endIndex;
        offsets[endPoint] = prevOffset;

        len3 = points.length;
        if (len3 > 0) {
            newPoints = [];
            startPointAdded = false;
            endPointAdded = false;
            for (index3 = 0; index3 < len3; index3 += 1) {
                point = points[index3];

                if (point < startPoint) {
                    newPoints.push(point);

                    maxOffset = offsets[point];
                    prevOffset = offsets[point];
                } else if (point < endPoint) {
                    if (!startPointAdded) {
                        newPoints.push(startPoint);
                        startPointAdded = true;
                    }

                    maxOffset = Math.max(maxOffset, offsets[point]);
                    prevOffset = offsets[point];
                } else {
                    if (!startPointAdded) {
                        newPoints.push(startPoint);
                        startPointAdded = true;
                    }
                    if (!endPointAdded) {
                        newPoints.push(endPoint);
                        endPointAdded = true;

                        offsets[startPoint] = maxOffset + 1;
                        offsets[endPoint] = prevOffset;
                    }

                    newPoints.push(point);
                }
            }
            if (!startPointAdded) {
                newPoints.push(startPoint);
                startPointAdded = true;
            }
            if (!endPointAdded) {
                newPoints.push(endPoint);
                endPointAdded = true;

                offsets[startPoint] = maxOffset + 1;
                offsets[endPoint] = prevOffset;
            }

            points = newPoints;
        } else {
            points = [startPoint, endPoint];
        }

        onItemStacked(treeItemsGroup, offsets[startPoint]);
        result = Math.max(result, offsets[startPoint]);
    }
    return result;
};

/*
    Function: primitives.common.binarySearch
        Search sorted list of elements for nearest item.
    
    Parameters:
	    items - Array of elements.
        funcDistance - Call back function used to get ditance for current item. 

    Returns: 
	    Nearest item.
*/
primitives.common.binarySearch = function (items, funcDistance) {
    var result = null,
        distance,
        bestDistance,
        minimum = 0,
        maximum = items.length - 1,
        middle,
        item;

    if (items.length > 0) {
        result = items[minimum];
        distance = funcDistance(result);
        if (distance > 0) {
            bestDistance = Math.abs(distance);

            item = items[maximum];
            distance = funcDistance(item);
            if (distance >= 0) {
                result = item;
            } else {
                distance = Math.abs(distance);
                if (bestDistance > distance) {
                    bestDistance = distance;
                    result = item;
                }
                while (minimum + 1 < maximum) {
                    middle = Math.round((minimum + maximum) / 2.0);
                    item = items[middle];
                    distance = funcDistance(item);
                    if (distance == 0) {
                        result = item;
                        break;
                    } else {
                        if (distance > 0) {
                            minimum = middle;
                        } else {
                            maximum = middle;
                        }
                        distance = Math.abs(distance);
                        if (bestDistance > distance) {
                            bestDistance = distance;
                            result = item;
                        }
                    }
                }
            }
        }
    }
    return result;
};
primitives.common.family = function () {
    var _roots = {},     // children hash of orphant parent id
        _rootsCount = {},
		_children = {},  // children hash by node id
        _childrenCount = {},
		_parents = {},   // parents hash by node id
        _parentsCount = {},
		_nodes = {},     // nodes by node id
        BREAK = 1,
        SKIP = 2;

    function _loop(thisArg, collection, itemid, onItem) {
        var item, items;
        if (onItem != null) {
            items = collection[itemid];
            if (items != null) {
                for (item in items) {
                    if (items.hasOwnProperty(item)) {
                        if (onItem.call(thisArg, item)) {
                            break;
                        }
                    }
                }
            }
        }
    }

    function add(parents, nodeid, node) {
        var index, len,
            parentid,
			processed = {};

        if (!parents || parents.length == 0) {
            parents = [null];
        }

        if (_nodes[nodeid] == null && node != null) {
            _nodes[nodeid] = node;
            for (index = 0, len = parents.length; index < len; index += 1) {
                parentid = parents[index];


                if (processed[parentid] == null && parentid != nodeid) {
                    processed[parentid] = true;
                    if (_nodes[parentid] != null) {
                        if (_parents[nodeid] == null) {
                            _parents[nodeid] = {};
                            _parentsCount[nodeid] = 0;
                        }
                        if (!_parents[nodeid][parentid]) {
                            _parents[nodeid][parentid] = true;
                            _parentsCount[nodeid] += 1;
                        }

                        if (_children[parentid] == null) {
                            _children[parentid] = {};
                            _childrenCount[parentid] = 0;
                        }
                        if (!_children[parentid][nodeid]) {
                            _children[parentid][nodeid] = true;
                            _childrenCount[parentid] += 1;
                        }
                    } else {
                        if (_roots[parentid] == null) {
                            _roots[parentid] = {};
                            _rootsCount[parentid] = 0;
                        }
                        if (!_roots[parentid][nodeid]) {
                            _roots[parentid][nodeid] = true;
                            _rootsCount[parentid] += 1;
                        }
                    }
                }
            }
            if (_roots[nodeid] != null) {
                _children[nodeid] = _roots[nodeid];
                _childrenCount[nodeid] = _rootsCount[nodeid];
                delete _roots[nodeid];
                delete _rootsCount[nodeid];
                _loop(this, _children, nodeid, function (itemid) {
                    if (_parents[itemid] == null) {
                        _parents[itemid] = {};
                        _parentsCount[itemid] = 0;
                    }
                    if (!_parents[itemid][nodeid]) {
                        _parents[itemid][nodeid] = true;
                        _parentsCount[itemid] += 1;
                    }
                });
            }
        }
    }

    function node(nodeid) {
        return _nodes[nodeid];
    }

    function adopt(parents, nodeid) {
        var index, len,
            parentid;
        if (_nodes[nodeid] != null) {
            for (index = 0, len = parents.length; index < len; index += 1) {
                parentid = parents[index];

                if (_parents[nodeid] == null) {
                    _parents[nodeid] = {};
                    _parentsCount[nodeid] = 0;
                }

                if (parentid != nodeid && _nodes[parentid] != null) {
                    if (!_parents[nodeid][parentid]) {
                        _parents[nodeid][parentid] = true;
                        _parentsCount[nodeid] += 1;
                    }

                    if (_children[parentid] == null) {
                        _children[parentid] = {};
                        _childrenCount[parentid] = 0;
                    }
                    if (!_children[parentid][nodeid]) {
                        _children[parentid][nodeid] = true;
                        _childrenCount[parentid] += 1;
                    }
                } else {
                    throw "Item cannot be parent of itself and parent should exist in the structure!";
                }
            }
        } else {
            throw "Child should be in hierarchy!";
        }
    }

    function removeNode(nodeid) {
        if (_nodes[nodeid] != null) {
            _loop(this, _children, nodeid, function (itemid) {
                delete _parents[itemid][nodeid];
                _parentsCount[itemid] -= 1;

                if (!_parentsCount[itemid]) {
                    delete _parents[itemid];
                    delete _parentsCount[itemid];

                    if (_roots[null] == null) {
                        _roots[null] = {};
                        _rootsCount[null] = 0;
                    }
                    if (!_roots[null][itemid]) {
                        _roots[null][itemid] = true;
                        _rootsCount[null] += 1;
                    }
                }
            });
            _loop(this, _parents, nodeid, function (itemid) {
                delete _children[itemid][nodeid];
                _childrenCount[itemid] -= 1;
                if (!_childrenCount[itemid]) {
                    delete _children[itemid];
                    delete _childrenCount[itemid];
                }
            });
            if (_roots[null] != null && _roots[null][nodeid] != null) {
                delete _roots[null][nodeid];
                _rootsCount[null] -= 1;

                if (!_rootsCount[null]) {
                    delete _roots[null];
                    delete _rootsCount[null];
                }
            }
            delete _children[nodeid];
            delete _childrenCount[nodeid];
            delete _parents[nodeid];
            delete _parentsCount[nodeid];
            delete _nodes[nodeid];
        }
    }

    function _removeChildReference(parentid, childid) {
        var result = false;
        if (_children[parentid] != null && _children[parentid][childid] != null) {
            delete _children[parentid][childid];
            _childrenCount[parentid] -= 1;

            delete _parents[childid][parentid];
            _parentsCount[childid] -= 1;

            if (!_childrenCount[parentid]) {
                delete _children[parentid];
                delete _childrenCount[parentid];
            }

            if (!_parents[childid]) {
                delete _parents[childid];
                delete _parentsCount[childid];

                if (_roots[null] == null) {
                    _roots[null] = {};
                    _rootsCount[null] = 0;
                }
                _roots[null][childid] = true;
                _rootsCount[null] += 1;
            }
            result = true;
        }
        return result;
    }

    function removeRelation(fromid, toid) {
        var result = false;
        if (_nodes[fromid] != null && _nodes[toid] != null) {
            result = _removeChildReference(fromid, toid) || _removeChildReference(toid, fromid);
        }
        return result;
    }

    function hasNodes() {
        return !primitives.common.isEmptyObject(_nodes);
    }

    function loop(thisArg, onItem) {
        var item;
        if (onItem != null) {
            for (item in _nodes) {
                if (_nodes.hasOwnProperty(item)) {
                    if (onItem.call(thisArg, item, _nodes[item])) {
                        break;
                    }
                }
            }
        }
    }

    function _loopItems(thisArg, collection, items, onItem) { // onItem(itemid, item, levelIndex)
        var newItems, itemid,
			processed = {},
			levelIndex = 0,
			hasItems = true;


        while (hasItems) {
            newItems = {};
            hasItems = false;

            for (itemid in items) {
                if (items.hasOwnProperty(itemid)) {
                    if (!processed[itemid]) {
                        processed[itemid] = true;

                        switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
                            case BREAK:
                                newItems = {};
                                hasItems = false;
                                break;
                            case SKIP:
                                break;
                            default:
                                _loop(this, collection, itemid, function (newItemId) {
                                    if (!processed[newItemId]) {
                                        newItems[newItemId] = true;
                                        hasItems = true;
                                    }
                                }); //ignore jslint
                                break;
                        }
                    }
                }
            }
            items = newItems;
            levelIndex += 1;
        }
    }

    function loopChildren(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
        if (onItem != null) {
            if (nodeid != null && _nodes[nodeid] != null && _children[nodeid] != null) {
                _loopItems(thisArg, _children, _children[nodeid], onItem);
            }
        }
    }

    function loopParents(thisArg, nodeid, onItem) { // onItem(itemid, item, levelIndex)
        if (onItem != null) {
            if (nodeid != null && _nodes[nodeid] != null && _parents[nodeid] != null) {
                _loopItems(thisArg, _parents, _parents[nodeid], onItem);
            }
        }
    }

    function _loopTopo(thisArg, backwardCol, backwardCount, forwardCol, forwardCount, onItem) { // onItem(itemid, item, position)
        var index, len, nodeid, references,
            queue, newQueue, position;

        if (onItem != null) {
            /* count parents for every node */
            queue = [];
            references = {};
            for (nodeid in _nodes) {
                if (_nodes.hasOwnProperty(nodeid)) {
                    references[nodeid] = (backwardCount[nodeid] || 0);

                    if (!references[nodeid]) {
                        queue.push(nodeid);
                    }
                }
            }

            /* itterate queue and reduce reference counts via children */
            position = 0;
            while (queue.length > 0) {
                newQueue = [];

                for (index = 0, len = queue.length; index < len; index += 1) {
                    nodeid = queue[index];

                    if (onItem.call(thisArg, nodeid, _nodes[nodeid], position)) {
                        newQueue = [];
                        break;
                    }

                    position += 1;

                    _loop(this, forwardCol, nodeid, function (itemid) {
                        references[itemid] -= 1;
                        if (references[itemid] == 0) {
                            newQueue.push(itemid);
                        }
                    }); //ignore jslint
                }
                queue = newQueue;
            }
        }
    }

    function loopTopo(thisArg, onItem) { // onItem(itemid, item, position)
        _loopTopo(thisArg, _parents, _parentsCount, _children, _childrenCount, onItem);
    }

    function loopTopoReversed(thisArg, onItem) { // onItem(itemid, item, position)
        _loopTopo(thisArg, _children, _childrenCount, _parents, _parentsCount, onItem);
    }


    /* argument parentAligned set to true alignes nodes to top otherwise to bottom */
    function loopLevels(thisArg, parentAligned, onItem) { // onItem(itemid, item, levelIndex)
        var topoSorted = [],
            topoSortedPositions = {},
            processed = {},
            margin = [],
            /* result items distribution by levels */
            levels = {}, levelIndex,
            groups = {}, hasGroups, newGroups, groupIndex, group,
            itemsAtLevel, itemid,
            minimumLevel = null,
            loopFunc = parentAligned ? loopTopo : loopTopoReversed,
            index, len,
            mIndex, mLen, mItem, mLevel,
            topoSortedItem,
            bestPosition, bestItem, bestLevel, bestIsParent,
            newMargin, hasNeighbours;

        function Group() {
            this.items = {};
            this.minimumLevel = null;
        }

        Group.prototype.addItemToLevel = function (itemid, level) {
            var items = this.items[level];
            if (!items) {
                items = [itemid];
                this.items[level] = items;
            } else {
                items.push(itemid);
            }
            this.minimumLevel = this.minimumLevel == null ? level : Math.min(this.minimumLevel, level);
        };

        function addItemToLevel(itemid, index, level) {
            var group = groups[index];
            if (!group) {
                group = new Group();
                groups[index] = group;
            }

            group.addItemToLevel(itemid, level);

            minimumLevel = minimumLevel == null ? level : Math.min(minimumLevel, level);

            levels[itemid] = level;
            processed[itemid] = true;
        }


        if (onItem != null) {
            /* sort items topologically */
            loopFunc(this, function (itemid, item, position) {
                topoSorted.push(itemid);
                topoSortedPositions[itemid] = position;
            });

            /* search for the first available non processed item in topological order */
            for (index = 0, len = topoSorted.length; index < len; index += 1) {
                topoSortedItem = topoSorted[index];
                if (processed[topoSortedItem] == null) {
                    margin.push(topoSortedItem);

                    addItemToLevel(topoSortedItem, index, 0);

                    /* use regular graph breadth first search */
                    while (margin.length > 0) {
                        bestPosition = null;
                        bestItem = null;
                        bestLevel = null;
                        bestIsParent = !parentAligned;
                        newMargin = [];
                        for (mIndex = 0, mLen = margin.length; mIndex < mLen; mIndex += 1) {
                            mItem = margin[mIndex];
                            mLevel = levels[mItem];
                            hasNeighbours = false;

                            if (parentAligned) {
                                _loop(this, _parents, mItem, function (parentid) {
                                    var topoSortedPosition;
                                    if (!processed[parentid]) {
                                        hasNeighbours = true;
                                        topoSortedPosition = topoSortedPositions[parentid];
                                        if (bestPosition == null || !bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)) {
                                            bestPosition = topoSortedPosition;
                                            bestItem = parentid;
                                            bestLevel = mLevel - 1;
                                            bestIsParent = true;
                                        }
                                    }
                                }); //ignore jslint
                                _loop(this, _children, mItem, function (childid) {
                                    var topoSortedPosition;
                                    if (!processed[childid]) {
                                        hasNeighbours = true;
                                        topoSortedPosition = topoSortedPositions[childid];
                                        if (bestPosition == null || (!bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)))) {
                                            bestPosition = topoSortedPosition;
                                            bestItem = childid;
                                            bestLevel = mLevel + 1;
                                            bestIsParent = false;
                                        }
                                    }
                                }); //ignore jslint
                            } else {
                                _loop(this, _children, mItem, function (childid) {
                                    var topoSortedPosition;
                                    if (!processed[childid]) {
                                        hasNeighbours = true;
                                        topoSortedPosition = topoSortedPositions[childid];
                                        if (bestPosition == null || bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)) {
                                            bestPosition = topoSortedPosition;
                                            bestItem = childid;
                                            bestLevel = mLevel + 1;
                                            bestIsParent = false;
                                        }
                                    }
                                }); //ignore jslint
                                _loop(this, _parents, mItem, function (parentid) {
                                    var topoSortedPosition;
                                    if (!processed[parentid]) {
                                        hasNeighbours = true;
                                        topoSortedPosition = topoSortedPositions[parentid];
                                        if (bestPosition == null || (bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)))) {
                                            bestPosition = topoSortedPosition;
                                            bestItem = parentid;
                                            bestLevel = mLevel - 1;
                                            bestIsParent = true;
                                        }
                                    }
                                }); //ignore jslint
                            }
                            if (hasNeighbours) {
                                newMargin.push(mItem);
                            }
                        }
                        if (bestItem != null) {
                            newMargin.push(bestItem);

                            addItemToLevel(bestItem, index, bestLevel);
                        }
                        margin = newMargin;
                    }
                }
            }

            hasGroups = true;
            levelIndex = minimumLevel;
            while (hasGroups) {
                newGroups = {};
                hasGroups = false;
                for (groupIndex in groups) {
                    if (groups.hasOwnProperty(groupIndex)) {
                        group = groups[groupIndex];
                        itemsAtLevel = group.items[(group.minimumLevel - minimumLevel) + levelIndex];
                        if (itemsAtLevel != null) {
                            newGroups[groupIndex] = group;
                            hasGroups = true;

                            for (index = 0, len = itemsAtLevel.length; index < len; index += 1) {
                                itemid = itemsAtLevel[index];
                                if (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex - minimumLevel)) {
                                    hasGroups = false;
                                    return true;
                                }
                            }
                        }
                    }
                }
                groups = newGroups;
                levelIndex += 1;
            }
        }
    }

    function loopRoots(thisArg, onItem) { // onItem(itemid, item)
        var result = null,
            minimum, counter = 0,
            famMembers = {},
            famCount = {},
            isRoot,
            roots = {},
            processed = {},
            famItemId, member, members, rootid,
            membersRoots, memberRoots, memberRoot,
            index, len;

        loopTopoReversed(this, function (famItemId, famItem, position) {
            /* every node has at least itself in members */
            if (!famMembers.hasOwnProperty(famItemId)) {
                famMembers[famItemId] = {};
                famCount[famItemId] = 0;
            }
            famMembers[famItemId][famItemId] = true;
            famCount[famItemId] += 1;

            isRoot = true;
            loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
                var items, itemid;
                isRoot = false;
                if (!famMembers.hasOwnProperty(parentid)) {
                    famMembers[parentid] = {};
                    famCount[parentid] = 0;
                }
                /* push famItem members to parent members collection */
                if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
                    famMembers[parentid] = famMembers[famItemId];
                    famCount[parentid] = famCount[famItemId];
                } else {
                    items = famMembers[famItemId];
                    for (itemid in items) {
                        if (items.hasOwnProperty(itemid)) {
                            if (!famMembers[parentid][itemid]) {
                                famMembers[parentid][itemid] = true;
                                famCount[parentid] += 1;
                            }
                        }
                    }
                }
                return SKIP;
            });
            if (isRoot) {
                roots[famItemId] = true;
                counter += 1;


            }
        });

        /* create collection of roots per member */
        membersRoots = {};
        for (rootid in roots) {
            if (roots.hasOwnProperty(rootid)) {
                members = famMembers[rootid];

                for (member in members) {
                    if (members.hasOwnProperty(member)) {

                        if (!membersRoots[member]) {
                            membersRoots[member] = [];
                        }
                        membersRoots[member].push(rootid.toString());
                    }
                }
            }
        }

        /* loop minimal sub tree roots */
        while (counter > 0) {
            minimum = null;
            for (famItemId in roots) {
                if (roots.hasOwnProperty(famItemId)) {
                    if (!minimum || famCount[famItemId] < minimum) {
                        minimum = famCount[famItemId];
                        result = famItemId;
                    }
                }
            }
            if (result != null) {
                if (onItem != null) {
                    onItem.call(thisArg, result, _nodes[result]);
                }
                members = famMembers[result];

                for (member in members) {
                    if (members.hasOwnProperty(member)) {
                        if (!processed[member]) {
                            memberRoots = membersRoots[member];
                            for (index = 0, len = memberRoots.length; index < len; index += 1) {
                                memberRoot = memberRoots[index];
                                famCount[memberRoot] -= 1;
                            }
                            processed[member] = true;
                        }
                    }
                }

                delete roots[result];
                counter -= 1;
            }
        }
    }

    function findLargestRoot() {
        var result = null,
            maximum,
            famMembers = {},
            famCount = {},
            isRoot;

        maximum = null;

        loopTopoReversed(this, function (famItemId, famItem, position) {
            /* every node has at least itself in members */
            if (!famMembers.hasOwnProperty(famItemId)) {
                famMembers[famItemId] = {};
                famCount[famItemId] = 0;
            }
            famMembers[famItemId][famItemId] = true;
            famCount[famItemId] += 1;

            isRoot = true;
            loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
                var items, itemid;
                isRoot = false;
                if (!famMembers.hasOwnProperty(parentid)) {
                    famMembers[parentid] = {};
                    famCount[parentid] = 0;
                }
                /* push famItem members to parent members collection */
                if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
                    famMembers[parentid] = famMembers[famItemId];
                    famCount[parentid] = famCount[famItemId];
                } else {
                    items = famMembers[famItemId];
                    for (itemid in items) {
                        if (items.hasOwnProperty(itemid)) {
                            famMembers[parentid][itemid] = true;
                            famCount[parentid] += 1;
                        }
                    }
                }
                return SKIP;
            });
            if (isRoot && (!maximum || famCount[famItemId] > maximum)) {
                maximum = famCount[famItemId];
                result = famItemId;
            }

        });

        return result;
    }

    /* common child should belong only to the given collection of parents, */
    /* if child's parents don't match given parents, it is not considered as common child */
    function hasCommonChild(parents) {
        var result = false,
            parentsHash, childrenHash,
            parentsCount,
            pIndex, pLen,
            parent, child;

        /* convert parents collection to hash, remove duplicates and ignore non-existing items */
        parentsHash = {};
        parentsCount = 0;
        for (pIndex = 0, pLen = parents.length; pIndex < pLen; pIndex += 1) {
            parent = parents[pIndex];
            if (_nodes[parent] != null && !parentsHash[parent]) {
                parentsHash[parent] = true;
                parentsCount += 1;
            }
        }

        /* collect number of parents referencing each child */
        childrenHash = {};
        for (parent in parentsHash) {
            if (parentsHash.hasOwnProperty(parent)) {
                _loop(this, _children, parent, function (child) {
                    if (!childrenHash[child]) {
                        childrenHash[child] = 1;
                    } else {
                        childrenHash[child] += 1;
                    }
                }); //ignore jslint
            }
        }

        /* find common child having number of references equal to number of existing parents */
        for (child in childrenHash) {
            if (childrenHash.hasOwnProperty(child)) {
                if (_parents[child] != null && (_parentsCount[child] || 0) == childrenHash[child] && childrenHash[child] == parentsCount) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    function _bundleNodes(fromItem, items, bundleItemId, bundleItem, backwardCol, backwardCount, forwardCol, forwardCount, checkChildren) {
        var isValid = false,
            index, len,
            child;

        if (_nodes[fromItem] != null && forwardCol[fromItem] != null) {
            /* validate target items */
            isValid = true;
            if (checkChildren) {
                /* if we add new bundle all items should present */
                for (index = 0, len = items.length; index < len; index += 1) {
                    child = items[index];
                    if (_nodes[child] == null || forwardCol[fromItem][child] == null) {
                        isValid = false;
                    }
                }
            }
            if (isValid) {
                if (bundleItem != null) {
                    /* add bundle node */
                    _nodes[bundleItemId] = bundleItem;
                }

                if (_nodes[bundleItemId] != null) {
                    /* update references */
                    if (!backwardCol[bundleItemId]) {
                        backwardCol[bundleItemId] = {};
                        backwardCount[bundleItemId] = 0;
                    }
                    if (!forwardCol[bundleItemId]) {
                        forwardCol[bundleItemId] = {};
                        forwardCount[bundleItemId] = 0;
                    }

                    if (!backwardCol[bundleItemId][fromItem]) {
                        backwardCol[bundleItemId][fromItem] = true;
                        backwardCount[bundleItemId] += 1;
                    }

                    if (!forwardCol[fromItem][bundleItemId]) {
                        forwardCol[fromItem][bundleItemId] = true;
                        forwardCount[fromItem] += 1;
                    }

                    for (index = 0, len = items.length; index < len; index += 1) {
                        child = items[index];

                        if (bundleItemId != child) {
                            if (forwardCol[fromItem][child] != null) {
                                delete forwardCol[fromItem][child];
                                forwardCount[fromItem] -= 1;
                            }

                            if (backwardCol[child][fromItem] != null) {
                                delete backwardCol[child][fromItem];
                                backwardCount[child] -= 1;
                            }

                            if (!backwardCol[child][bundleItemId]) {
                                backwardCol[child][bundleItemId] = true;
                                backwardCount[child] += 1;
                            }

                            if (!forwardCol[bundleItemId][child]) {
                                forwardCol[bundleItemId][child] = true;
                                forwardCount[bundleItemId] += 1;
                            }
                        }
                    }
                }
            }
        }
        return isValid;
    }

    function bundleChildren(parent, children, bundleItemId, bundleItem) {
        return _bundleNodes(parent, children, bundleItemId, bundleItem, _parents, _parentsCount, _children, _childrenCount, true);
    }

    function bundleParents(child, parents, bundleItemId, bundleItem) {
        return _bundleNodes(child, parents, bundleItemId, bundleItem, _children, _childrenCount, _parents, _parentsCount, true);
    }

    function ReferenceItem() {
        this.id = "";
        this.key = "";
        this.children = [];
        this.childrenHash = {};
        this.processed = false;
    }

    function ReferencesEdge(arg0) {
        this.items = [];
        this.weight = 0;
        this.difference = 0;

        if (arguments.length > 0) {
            this.difference = arg0;
        }
    }

    function _getReferencesGraph(currentItems) {
        var result = primitives.common.graph(),
            item, parents,
            index1, index2, len,
            from, to, difference,
            processed = {};

        for (item in currentItems) {
            if (currentItems.hasOwnProperty(item)) {

                _loop(this, _children, item, function (child) {
                    if (!processed.hasOwnProperty(child)) {
                        processed[child] = true;
                        /* create array of parents from hash references */
                        parents = [];
                        _loop(this, _parents, child, function (parent) {
                            parents.push(parent);
                        });

                        /* create all possible combinations between items */
                        for (index1 = 0, len = parents.length; index1 < len - 1; index1 += 1) {
                            from = parents[index1];
                            if (currentItems.hasOwnProperty(from)) {

                                for (index2 = index1 + 1; index2 < len; index2 += 1) {
                                    to = parents[index2];
                                    if (currentItems.hasOwnProperty(to)) {
                                        difference = Math.abs(currentItems[from].children.length - currentItems[to].children.length);

                                        var edge = result.edge(from, to);
                                        if (edge == null) {
                                            edge = new ReferencesEdge(difference);
                                            result.addEdge(from, to, edge);
                                        }
                                        edge.items.push(child);
                                        edge.weight += 1;
                                    }
                                }
                            }
                        }
                    }
                }); //ignore jslint
            }
        }
        return result;
    }

    function optimizeReferences(onNewBundleItem) {
        var sharedItemsByKey = {},
            sharedItemsById = {},
            currentItems = {},
            nodeid, newReferenceItem,
            nextItems, graph, node,
            maximumTree;

        if (onNewBundleItem != null) {
            for (nodeid in _nodes) {
                if (_nodes.hasOwnProperty(nodeid)) {
                    newReferenceItem = new ReferenceItem();

                    _loop(this, _children, nodeid, function (child) {
                        newReferenceItem.children.push(child);
                        newReferenceItem.childrenHash[child] = true;
                    }); //ignore jslint

                    newReferenceItem.children.sort();
                    newReferenceItem.id = nodeid;
                    newReferenceItem.key = newReferenceItem.children.join(",");

                    currentItems[newReferenceItem.id] = newReferenceItem;
                }
            }

            while (!primitives.common.isEmptyObject(currentItems)) {
                nextItems = {};

                graph = _getReferencesGraph(currentItems);

                for (nodeid in currentItems) {
                    if (currentItems.hasOwnProperty(nodeid)) {
                        node = currentItems[nodeid];

                        if (!node.processed) {

                            maximumTree = graph.getSpanningTree(nodeid, function (a, b) {
                                if (a.weight > b.weight) {
                                    return 1;
                                } if (a.weight == b.weight) {
                                    return b.difference - a.difference; //ignore jslint
                                } else {
                                    return -1; //ignore jslint
                                }
                            }); //ignore jslint

                            maximumTree.loopLevels(this, function (treeKey, treeKeyNode, levelid) {
                                currentItems[treeKey].processed = true;

                                maximumTree.loopChildren(this, treeKey, function (child, childNode) {
                                    var relation = graph.edge(treeKey, child),
                                        nextBundleItem = null, newItem,
                                        key, index, len,
                                        childrenToBind, isSharedItem;

                                    currentItems[child].processed = true;

                                    if (relation.weight > 1) {
                                        key = relation.items.join(',');
                                        if (!sharedItemsByKey.hasOwnProperty(key)) {
                                            newItem = onNewBundleItem();
                                            _nodes[newItem.id] = newItem; /* add new bundle node to the family */

                                            nextBundleItem = new ReferenceItem();
                                            nextBundleItem.id = newItem.id;
                                            nextBundleItem.key = key;
                                            for (index = 0, len = relation.items.length; index < len; index+=1) {
                                                nextBundleItem.children.push(relation.items[index]);
                                                nextBundleItem.childrenHash[relation.items[index]] = true;
                                            }
                                            nextBundleItem.children.sort();

                                            sharedItemsByKey[nextBundleItem.key] = nextBundleItem;
                                            sharedItemsById[nextBundleItem.id] = nextBundleItem;
                                            nextItems[nextBundleItem.id] = nextBundleItem;

                                            childrenToBind = nextBundleItem.children.slice(0);
                                            loopChildren(this, treeKeyNode.replacementItem || treeKey, function (childid, child, level) {
                                                if (sharedItemsById[childid] != null && !nextBundleItem.childrenHash[childid]) {

                                                    isSharedItem = true;
                                                    loopChildren(this, childid, function (childid, child, level) {
                                                        if (!nextBundleItem.childrenHash[childid]) {
                                                            isSharedItem = false;
                                                            return BREAK;
                                                        }
                                                        return SKIP;
                                                    });
                                                    if (isSharedItem) {
                                                        childrenToBind.push(childid);
                                                    }
                                                }
                                                return SKIP;
                                            });

                                            _bundleNodes(treeKeyNode.replacementItem || treeKey, childrenToBind, nextBundleItem.id, newItem, _parents, _parentsCount, _children, _childrenCount, false);

                                            if ((_childrenCount[treeKey] || 0) <= 1) {
                                                treeKeyNode.replacementItem = nextBundleItem.id;
                                            }
                                        } else {
                                            nextBundleItem = sharedItemsByKey[key];
                                        }

                                        /* don't add shared item to itself on next items loop*/
                                        if (nextBundleItem.id != child) {

                                            childrenToBind = nextBundleItem.children.slice(0);
                                            loopChildren(this, childNode.replacementItem || child, function (childid, child, level) {
                                                if (sharedItemsById[childid] != null && !nextBundleItem.childrenHash[childid]) {

                                                    isSharedItem = true;
                                                    loopChildren(this, childid, function (childid, child, level) {
                                                        if (!nextBundleItem.childrenHash[childid]) {
                                                            isSharedItem = false;
                                                            return BREAK;
                                                        }
                                                        return SKIP;
                                                    });
                                                    if (isSharedItem) {
                                                        childrenToBind.push(childid);
                                                    }
                                                }
                                                return SKIP;
                                            });


                                            _bundleNodes(childNode.replacementItem || child, childrenToBind, nextBundleItem.id, null, _parents, _parentsCount, _children, _childrenCount, false);

                                            /* if all items bundled then use bundle item for following transformations of references instead of original item if references graph*/
                                            if ((_childrenCount[child] || 0) <= 1) {
                                                childNode.replacementItem = nextBundleItem.id;
                                            }
                                        }
                                    }
                                });
                            }); //ignore jslint
                        }
                    }
                }
                currentItems = nextItems;
            }
        }
    }

    function eliminateManyToMany(onNewBundleItem) {
        var parent, bundleNode;

        for (parent in _children) {
            if (_children.hasOwnProperty(parent)) {

                if ((_childrenCount[parent] || 0) > 1) {
                    _loop(this, _children, parent, function (child) {
                        if ((_parentsCount[child] || 0) > 1) {
                            bundleNode = onNewBundleItem();
                            bundleChildren(parent, [child], bundleNode.id, bundleNode);
                        }
                    }); //ignore jslint
                }
            }
        }
    }

    function countChildren(parent) {
        return _childrenCount[parent] || 0;
    }

    function countParents(child) {
        return _parentsCount[child] || 0;
    }

    function firstChild(parent) {
        var result = null,
            children = _children[parent] || {};
        for (result in children) {
            if (children.hasOwnProperty(result)) {
                return result; //ignore jslint
            }
        }
        return null;
    }

    function firstParent(child) {
        var result = null,
            parents = _parents[child] || {};
        for (result in parents) {
            if (parents.hasOwnProperty(result)) {
                return result; //ignore jslint
            }
        }
        return null;
    }

    function loopNeighbours(thisArg, itemid, onItem) {
        var processed = {};

        if (onItem != null) {
            loopChildren(this, itemid, function (childid, child, childLevel) {
                if (!processed.hasOwnProperty(childid)) {
                    processed[childid] = null;

                    if (onItem.call(thisArg, childid, child, 1)) {
                        processed[childid] = SKIP;

                        loopParents(this, childid, function (parentid, parent, parentLevel) {
                            if (!processed.hasOwnProperty(parentid)) {
                                processed[parentid] = null;

                                if (onItem.call(thisArg, parentid, parent, 2)) {
                                    processed[parentid] = SKIP;
                                }
                            }
                            return processed[parentid];
                        });
                    }
                }
                return processed[childid];
            });

            loopParents(this, itemid, function (parentid, parent, parentLevel) {
                if (!processed.hasOwnProperty(parentid)) {
                    processed[parentid] = null;

                    if (onItem.call(thisArg, parentid, parent, 1)) {
                        processed[parentid] = SKIP;

                        loopChildren(this, parentid, function (childid, child, childLevel) {
                            if (!processed.hasOwnProperty(childid)) {
                                processed[childid] = true;

                                if (onItem.call(thisArg, childid, child, 2)) {
                                    processed[childid] = SKIP;
                                }
                            }
                            return processed[childid];
                        });
                    }
                }
                return processed[parentid];
            });
        }
    }

    function validate(info) {
        var parent, child;

        function _count(items) {
            var result = 0, key;
            if (items != null) {
                for (key in items) {
                    if (items.hasOwnProperty(key)) {
                        result += 1;
                    }
                }
            }
            return result;
        }

        loop(this, function (nodeId, node) {
            _loop(this, _children, nodeId, function (child) {
                if (!_parents.hasOwnProperty(child) || !_parents[child].hasOwnProperty(nodeId)) {
                    if (info != null) {
                        info.message = "Child #" + child + " does not reference parent #" + nodeId;
                    }
                    return false;
                }
            });
            _loop(this, _parents, nodeId, function (parent) {
                if (!_children.hasOwnProperty(parent) || !_children[parent].hasOwnProperty(nodeId)) {
                    if (info != null) {
                        info.message = "Parent #" + parent + " does not reference child #" + nodeId;
                    }
                    return false;
                }
            });
        });

        for (parent in _parents) {
            if (_parents.hasOwnProperty(parent)) {
                if ((_parentsCount[parent] || 0) != _count(_parents[parent])) {
                    if (info != null) {
                        info.message = "Parents count for item #" + parent + " missmatch.";
                    }
                    return false;
                }
                if (_parents.hasOwnProperty(parent) && !_nodes.hasOwnProperty(parent)) {
                    if (info != null) {
                        info.message = "Orphant parents for item #" + parent;
                    }
                    return false;
                }
            }
        }

        for (child in _children) {
            if (_children.hasOwnProperty(child)) {
                if ((_childrenCount[child] || 0) != _count(_children[child])) {
                    if (info != null) {
                        info.message = "Children count for item " + child + " missmatch.";
                    }
                    return false;
                }
                if (_children.hasOwnProperty(child) && !_nodes.hasOwnProperty(child)) {
                    if (info != null) {
                        info.message = "Orphant children of item " + child;
                    }
                    return false;
                }
            }
        }

        for (child in _roots) {
            if (_roots.hasOwnProperty(child)) {
                if ((_rootsCount[child] || 0) != _count(_roots[child])) {
                    if (info != null) {
                        info.message = "Root children count for item @" + child + " missmatch.";
                    }
                    return false;
                }
                _loop(this, _roots, child, function (nodeid) {
                    if (!_nodes.hasOwnProperty(nodeid)) {
                        if (info != null) {
                            info.message = "Child #" + nodeid + "of root #" + child + " does not exists.";
                        }
                        return false;
                    }
                }); //ignore jslint
            }
        }
        
        return true;
    }

    function clone() {
        var result = primitives.common.family();

        loop(this, function (itemid, item) {
            var parents = [];
            loopParents(this, itemid, function (parentid, parent, level) {
                parents.push(parentid);
                return SKIP;
            }); //ignore jslint
            result.add(parents, itemid, item);
        }); //ignore jslint

        return result;
    }

    /* Private objects */

    return {
        /* family structure modification */
        add: add,
        adopt: adopt,
        bundleChildren: bundleChildren,
        bundleParents: bundleParents,
        optimizeReferences: optimizeReferences,
        eliminateManyToMany: eliminateManyToMany,

        removeNode: removeNode,
        removeRelation: removeRelation,

        /* referencing and looping */
        node: node,
        loop: loop,
        loopLevels: loopLevels,
        loopTopo: loopTopo,
        loopTopoReversed: loopTopoReversed,
        loopChildren: loopChildren,
        loopParents: loopParents,
        findLargestRoot: findLargestRoot,
        loopRoots: loopRoots,
        hasNodes: hasNodes,
        hasCommonChild: hasCommonChild,
        loopNeighbours: loopNeighbours,
        countChildren: countChildren,
        countParents: countParents,
        firstParent: firstParent,
        firstChild: firstChild,

        /* force validation */
        validate: validate,
        clone: clone,

        // callback return codes
        BREAK: BREAK, // break loop immidiatly
        SKIP: SKIP // skip loop of current node children 
    };
};
primitives.common.graph = function () {
    var _edges = {};

    function addEdge(from, to, edge) {
        if ((_edges[from] == null || _edges[from][to] == null)  && edge != null) {

            if(_edges[from] == null) {
                _edges[from] = {};
            }
            _edges[from][to] = edge;

            if (_edges[to] == null) {
                _edges[to] = {};
            }
            _edges[to][from] = edge;
        }
    }

    function edge(from, to) {
        var result = null;
        if (_edges[from] != null && _edges[from][to]) {
            result = _edges[from][to];
        }
        return result;
    }

    /*
        Function: primitives.common.graph.getSpanningTree
            Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is nessasary.
    
        Parameters:
        startNode - The node to start searching for maximum spanning tree. Graph is not nessasary connected
        compareFunc - Call back function to compare weight of two graph edges. function(edge1, edge2)

        Returns: 
	        primitives.common.tree structure
    */
    function getSpanningTree(startNode, compareFunc) {
        /* Graph */
        var result = primitives.common.tree(),
            margin = {}, marginKey,
            itemsToRemove = [], /* if margin item has no neighbours to expand we remove it from margin*/
            hasNeighbours,
            parents = {}, /* if parent for item is set then it was laready visited */
            marginLength = 0, /* curent margin length */
            nextMarginKey,
            nextMarginWeight,
            nextMarginParent,
            neighbours, neighbourKey, neighbourWeight,
            index, len;

        /* add start node to margin */
        margin[startNode] = true;
        marginLength += 1;

        /* add startNode to result tree */
        parents[startNode] = null;
        result.add(null, startNode.toString(), {});

        /* search graph */
        while (marginLength > 0) {
            itemsToRemove = [];
            nextMarginKey = null;
            nextMarginWeight = null;
            nextMarginParent = null;
            /* itterate neighbours of every node on margin */
            for (marginKey in margin) {
                if (margin.hasOwnProperty(marginKey)) {
                    neighbours = _edges[marginKey];
                    hasNeighbours = false;

                    for (neighbourKey in neighbours) {
                        if (neighbours.hasOwnProperty(neighbourKey) && !parents.hasOwnProperty(neighbourKey)) {
                            neighbourWeight = neighbours[neighbourKey];
                            hasNeighbours = true;

                            if (!nextMarginWeight || compareFunc(neighbourWeight, nextMarginWeight) >= 0) {
                                nextMarginKey = neighbourKey;
                                nextMarginWeight = neighbourWeight;
                                nextMarginParent = marginKey;
                            }
                        }
                    }

                    if (!hasNeighbours) {
                        itemsToRemove.push(marginKey);
                    }
                }
            }

            if (nextMarginKey == null) {
                /* no items to expand to exit*/
                break;
            } else {
                margin[nextMarginKey] = true;
                marginLength += 1;
                parents[nextMarginKey] = nextMarginParent;

                /* add next margin item to resul tree */
                result.add(nextMarginParent, nextMarginKey, {});
            }

            for (index = 0, len = itemsToRemove.length; index < len; index += 1) {
                /* delete visited node from margin */
                delete margin[itemsToRemove[index]];
                marginLength -= 1;
            }
        }

        return result;
    }

    function _findStartNode(onEdgeWeight) {
        var result = null,
            fromItem, toItems, toItem,
            weight = 0,
            maxWeight = null;

        for (fromItem in _edges) {
            if (_edges.hasOwnProperty(fromItem)) {
                toItems = _edges[fromItem];

                weight = 0;
                for (toItem in toItems) {
                    if (toItems.hasOwnProperty(toItem)) {
                        weight += onEdgeWeight(toItems[toItem]);
                    }
                }
                if (weight > maxWeight || maxWeight == null) {
                    result = fromItem;
                    maxWeight = weight;
                }
            }
        }
        return result;
    }

    /*
        Function: primitives.common.graph.getGrowthSequence
            Get graph growth sequence. The sequence of spanning tree growth.
    
        Parameters:
            onEdgeWeight - Call back function to weight edge of graph. function(edge)

        Returns: 
	        Array of items. 
    */
    function getGrowthSequence(onEdgeWeight) {
        var result = [], /* [] array of id-s */
            startNode,
            margin = {}, marginKey,
            itemsToRemove = [], /* if margin item has no neighbours to expand we remove it from margin*/
            hasNeighbours,
            processed = {}, /* if item is set then it was already visited */
            marginLength = 0, /* curent margin length */
            nextMarginKey,
            nextMarginWeight,
            bestWeight,
            neighbours, neighbourKey, neighbourWeight,
            index, len;

        if (onEdgeWeight != null) {
            startNode = _findStartNode(onEdgeWeight);

            if (startNode != null) {
                result.push(startNode);

                /* add start node to margin */
                margin[startNode] = true;
                marginLength += 1;

                /* add startNode to result tree */
                processed[startNode] = null;

                /* search graph */
                while (marginLength > 0) {
                    itemsToRemove = [];
                    nextMarginKey = null;
                    nextMarginWeight = null;
                    bestWeight = {};
                    /* itterate neighbours of every node on margin */
                    for (marginKey in margin) {
                        if (margin.hasOwnProperty(marginKey)) {
                            neighbours = _edges[marginKey];
                            hasNeighbours = false;

                            for (neighbourKey in neighbours) {
                                if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
                                    neighbourWeight = onEdgeWeight(neighbours[neighbourKey]);
                                    hasNeighbours = true;

                                    if (bestWeight[neighbourKey] == null) {
                                        bestWeight[neighbourKey] = 0;
                                    }
                                    bestWeight[neighbourKey] += neighbourWeight;

                                    if (!nextMarginWeight || bestWeight[neighbourKey] > nextMarginWeight) {
                                        nextMarginKey = neighbourKey;
                                        nextMarginWeight = bestWeight[neighbourKey];
                                    }
                                }
                            }

                            if (!hasNeighbours) {
                                itemsToRemove.push(marginKey);
                            }
                        }
                    }

                    if (nextMarginKey == null) {
                        /* no items to expand to exit*/
                        break;
                    } else {
                        margin[nextMarginKey] = true;
                        marginLength += 1;
                        processed[nextMarginKey] = true;

                        /* add next margin item to result sequence */
                        result.push(nextMarginKey);
                    }

                    for (index = 0, len = itemsToRemove.length; index < len; index += 1) {
                        /* delete visited node from margin */
                        delete margin[itemsToRemove[index]];
                        marginLength -= 1;
                    }
                }
            }
        }
        return result;
    }

    /*
        Function: primitives.common.graph.getShortestPath
        Get shortest path between two nodes in graph. Start and end nodes supposed to have connection path. All connections have the same weight.
    
        Parameters:
        startNode - The node to start.
        endNode - The end node.
        getWeightFunc - Call back function to weight edge of graph. function(edge, fromItem, toItem)
    
        Returns: 
	        Array containing nodes names of connection path.
    */
    function getShortestPath(startNode, endNode, getWeightFunc) {
        var margin = {},
            distance = {},
            breadcramps = {},
            marginLength = 0,
            bestNodeOnMargin,
            bestDistanceToNode,
            key,
            children,
            newDistance,
            path,
            currentNode;

        /* add start node to margin */
        margin[startNode] = true;
        marginLength += 1;
        distance[startNode] = 0;

        /* search graph */
        while (marginLength > 0) {
            /* search for the best node on margin */
            bestNodeOnMargin = null;
            bestDistanceToNode = null;
            for (key in margin) {
                if (margin.hasOwnProperty(key)) {
                    if (bestDistanceToNode == null) {
                        bestNodeOnMargin = key;
                        bestDistanceToNode = distance[key];
                    } else if (bestDistanceToNode > distance[key]) {
                        bestNodeOnMargin = key;
                        bestDistanceToNode = distance[key];
                    }
                }
            }

            /* itterate neighbours of selected node on margin */
            children = _edges[bestNodeOnMargin];
            for (key in children) {
                if (children.hasOwnProperty(key)) {
                    newDistance = bestDistanceToNode + (getWeightFunc != null ? getWeightFunc(children[key], bestNodeOnMargin, key) : 1);
                    if (distance.hasOwnProperty(key)) {
                        if (distance[key] > newDistance) {
                            if (margin.hasOwnProperty(key)) {
                                /* improve current distance to node on margin */
                                distance[key] = newDistance;
                                breadcramps[key] = bestNodeOnMargin;
                            }
                        }
                    } else {
                        distance[key] = newDistance;
                        breadcramps[key] = bestNodeOnMargin;
                        /* add new node to margin */
                        margin[key] = true;
                        marginLength += 1;
                    }
                }
            }

            if (bestNodeOnMargin == endNode) {
                /* if destination node found then break */
                break;
            } else {

                /* delete visited node from margin */
                delete margin[bestNodeOnMargin];
                marginLength -= 1;
            }
        }

        /* trace path */
        path = [];
        currentNode = endNode;
        while (currentNode != null) {
            path.push(currentNode);
            currentNode = breadcramps[currentNode];
        }
        return path;
    }

    return {
        addEdge: addEdge,
        edge: edge,
        getSpanningTree: getSpanningTree,
        getGrowthSequence: getGrowthSequence,
        getShortestPath: getShortestPath
    };
};
primitives.common.LinkedHashItems = function () {
    var segmentsHash = {},
    nextKeys = {},
    prevKeys = {},
    startSegmentKey = null,
    endSegmentKey = null;

    function add(key, item) {
        if (segmentsHash.hasOwnProperty(key)) {
            throw "Duplicate segments are not supported!";
        }
        segmentsHash[key] = item;
        nextKeys[key] = null;
        if (endSegmentKey == null) {
            startSegmentKey = key;
            prevKeys[key] = null;
        } else {
            nextKeys[endSegmentKey] = key;
            prevKeys[key] = endSegmentKey;
        }
        endSegmentKey = key;
    }

    function item(key) {
        return segmentsHash[key];
    }

    function nextKey(key) {
        return nextKeys[key];
    }

    function prevKey(key) {
        return prevKeys[key];
    }

    function  startKey() {
        return startSegmentKey;
    }

    function endKey() {
        return endSegmentKey;
    }

    function unshift(key, item) {
        if (segmentsHash.hasOwnProperty(key)) {
            throw "Duplicate segments are not supported!";
        }
        segmentsHash[key] = item;
        prevKeys[key] = null;
        if (startSegmentKey == null) {
            endSegmentKey = key;
            nextKeys[key] = null;
        } else {
            prevKeys[startSegmentKey] = key;
            nextKeys[key] = startSegmentKey;
        }
        startSegmentKey = key;
    }

    function insertAfter(afterKey, key, item) {
        if (segmentsHash.hasOwnProperty(key)) {
            throw "Duplicate segments are not supported!";
        }

        if (afterKey == null) {
            unshift(key, item);
        } else {
            var nextKey = nextKeys[afterKey];
            if (nextKey == null) {
                add(key, item);
            } else {
                segmentsHash[key] = item;
                nextKeys[afterKey] = key;
                nextKeys[key] = nextKey;
                prevKeys[nextKey] = key;
                prevKeys[key] = afterKey;
            }
        }
    }

    function remove(key) {
        var prevKey = prevKeys[key],
            nextKey = nextKeys[key];

        if (prevKey != null) {
            nextKeys[prevKey] = nextKey;
        } else {
            startSegmentKey = nextKey;
        }

        if (nextKey != null) {
            prevKeys[nextKey] = prevKey;
        } else {
            endSegmentKey = prevKey;
        }

        delete segmentsHash[key];
        delete nextKeys[key];
        delete prevKeys[key];
    }

    function empty() {
        segmentsHash = {};
        nextKeys = {};
        prevKeys = {};
        startSegmentKey = null;
        endSegmentKey = null;
    }

    function _iterate(forward, onItem, startKey, endKey) {
        var key = startKey,
            segment;

        if (key == null) {
            key = forward ? startSegmentKey : endSegmentKey;
        }

        if (onItem != null) {
            while (key != null) {
                segment = segmentsHash[key];
                if (segment != null) {
                    onItem(segment);
                }

                if (key == endKey) {
                    key = null;
                } else {
                    key = forward ? nextKeys[key] : prevKeys[key];
                }
            }
        }
    }

    function iterate(onItem, startKey, endKey) {
        _iterate(true, onItem, startKey, endKey);
    }

    function iterateBack(onItem, startKey, endKey) {
        _iterate(false, onItem, startKey, endKey);
    }

    function validate(info) {
        var key, prevKey, nextKey;
        for (key in segmentsHash) {
            if (segmentsHash.hasOwnProperty(key)) {
                if (!nextKeys.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
                    if (info != null) {
                        info.message = "Orphant key found!";
                    }
                    return false;
                }
            }
        }
        if (!segmentsHash.hasOwnProperty(startSegmentKey) || !segmentsHash.hasOwnProperty(endSegmentKey)) {
            if (info != null) {
                info.message = "Start or end values are missing!";
            }
            return false;
        }
        for (key in nextKeys) {
            if (nextKeys.hasOwnProperty(key)) {
                if (!segmentsHash.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
                    if (info != null) {
                        info.message = "Orphant key found!";
                    }
                    return false;
                }
                nextKey = nextKeys[key];
                if (nextKey && !nextKeys.hasOwnProperty(nextKey)) {
                    if (info != null) {
                        info.message = "Next key not found!";
                    }
                    return false;
                }
            }
        }
        for (key in prevKeys) {
            if (prevKeys.hasOwnProperty(key)) {
                if (!segmentsHash.hasOwnProperty(key) || !nextKeys.hasOwnProperty(key)) {
                    if (info != null) {
                        info.message = "Orphant key found!";
                    }
                    return false;
                }
                prevKey = prevKeys[key];
                if (prevKey && !prevKeys.hasOwnProperty(prevKey)) {
                    if (info != null) {
                        info.message = "Prev key not found!";
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function toArray() {
        var result = [];

        iterate(function (item) {
            result.push(item);
        });

        return result;
    }

    return {
        add: add,
        item: item,
        nextKey: nextKey,
        prevKey: prevKey,
        startKey: startKey,
        endKey: endKey,
        unshift:unshift,
        insertAfter:insertAfter,
        remove: remove,

        iterate: iterate,
        iterateBack: iterateBack,
        empty: empty,
        toArray: toArray,
        validate: validate
    };
};

primitives.common.tree = function () {
    var _nodes = {},        // objects attached to nodes
        _parents = {},      // parent node id for every node id. Both of them should exists in the tree.
        _children = {},     // children node ids for every node id. All children and node itself should be in the tree.
        _roots = {},        // id of non existing parent. If parent does not exists in the tree this hash contains its id.
        _rootChildren = {}, // children of non existing parent. If parent id does not exists in the tree this collection contains it existing children.
        BREAK = 1,
        SKIP = 2;

    function loop(thisArg, onItem) {
        var item;
        if (onItem != null) {
            for (item in _nodes) {
                if (_nodes.hasOwnProperty(item)) {
                    if (onItem.call(thisArg, item, _nodes[item])) {
                        break;
                    }
                }
            }
        }
    }

    function loopLevels(thisArg, arg0, arg1) { // onItem(nodeid, node, levelid) if function returns true loop is continued on item's children 
        var levelIndex = 0,
            items = [],
            itemid,
            onItem,
            newItems,
            key,
            index, len;

        switch (arguments.length) {
            case 2:
                onItem = arg0;
                break;
            case 3:
                itemid = arg0;
                onItem = arg1;
                break;
        }

        if (onItem != null) {

            if (itemid == null) {
                for (key in _rootChildren) {
                    if (_rootChildren.hasOwnProperty(key)) {
                        items = items.concat(_rootChildren[key]);
                    }
                }
            } else {
                if (_children[itemid] != null) {
                    items = items.concat(_children[itemid]);
                }
            }

            while (items.length > 0) {
                newItems = [];

                for (index = 0, len = items.length; index < len; index += 1) {
                    itemid = items[index];
                    switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
                        case BREAK:
                            newItems = [];
                            break;
                        case SKIP:
                            break;
                        default:
                            if (_children[itemid] != null) {
                                newItems = newItems.concat(_children[itemid]);
                            }
                            break;
                    }
                }

                items = newItems;
                levelIndex += 1;
            }
        }
    }

    /* children first - parent last */
    function loopPostOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
        var stack = [], nodeid,
            key,
            index,
            prevParent,
            children;

        if (onItem != null) {

            for (key in _rootChildren) {
                if (_rootChildren.hasOwnProperty(key)) {
                    stack = stack.concat(_rootChildren[key]);
                }
            }

            while (stack.length > 0) {
                nodeid = stack[stack.length - 1];
                if (nodeid != prevParent && (children = _children[nodeid]) != null) {
                    for (index = children.length - 1; index >= 0; index -= 1) {
                        stack.push(children[index]);
                    }
                } else {
                    stack.pop();
                    prevParent = _parents[nodeid];

                    if (onItem.call(thisArg, nodeid, _nodes[nodeid], prevParent, _nodes[prevParent])) {
                        break;
                    }
                }
            }
        }
    }

    /* parent first - children next */
    function loopPreOrder(thisArg, onItem) { // onItem(nodeid, node, parentid, parent) if function returns true loop exits
        var stack = [], nodeid,
            key,
            index,
            prevParent,
            children;

        if (onItem != null) {

            for (key in _rootChildren) {
                if (_rootChildren.hasOwnProperty(key)) {
                    stack = stack.concat(_rootChildren[key]);
                }
            }

            while (stack.length > 0) {
                nodeid = stack[stack.length - 1];
                if (nodeid != prevParent) {
                    if (onItem.call(thisArg, nodeid, _nodes[nodeid], prevParent, _nodes[prevParent])) {
                        break;
                    }
                }
                if (nodeid != prevParent && (children = _children[nodeid]) != null) {
                    for (index = children.length - 1; index >= 0; index -= 1) {
                        stack.push(children[index]);
                    }
                } else {
                    stack.pop();
                    prevParent = _parents[nodeid];
                }
            }
        }
    }

    function zipUp(thisArg, firstNodeId, secondNodeid, onZip) { // onZip(firstNodeId, firstParentId, secondNodeid, secondParentId)
        var firstParentId,
            secondParentId;

        if (onZip != null) {
            while (firstNodeId != null && secondNodeid != null && firstNodeId != secondNodeid) {
                firstParentId = _parents[firstNodeId];
                secondParentId = _parents[secondNodeid];
                if (onZip.call(thisArg, firstNodeId, firstParentId, secondNodeid, secondParentId)) {
                    break;
                }
                firstNodeId = firstParentId;
                secondNodeid = secondParentId;
            }
        }
    }

    function loopParents(thisArg, nodeid, onItem) { // onItem(nodeid, node)
        var parentid = nodeid;
        if (_nodes[parentid] != null) {
            if (onItem != null) {
                while ((parentid = _parents[parentid]) != null) {
                    if (onItem.call(thisArg, parentid, _nodes[parentid])) {
                        break;
                    }
                }
            }
        }
    }

    function loopChildren(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
        var items,
            itemid,
            index, len;
        if (_nodes[nodeid] != null) {
            items = _children[nodeid];
            if (items != null) {
                for (index = 0, len = items.length; index < len; index += 1) {
                    itemid = items[index];
                    if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                        break;
                    }
                }
            }
        }
    }

    function loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem) { // onItem(nodeid, node, index)
        var items,
            itemid,
            index, len;
        if (_nodes[nodeid] != null) {
            items = _children[nodeid];
            if (items != null) {
                if (fromIndex < toIndex) {
                    fromIndex = Math.max(fromIndex, 0);
                    toIndex = Math.min(toIndex, items.length - 1);
                    for (index = fromIndex; index <= toIndex; index += 1) {
                        itemid = items[index];
                        if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                            break;
                        }
                    }
                } else {
                    fromIndex = Math.min(fromIndex, items.length - 1);
                    toIndex = Math.max(0, toIndex);
                    for (index = fromIndex; index >= toIndex; index -= 1) {
                        itemid = items[index];
                        if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                            break;
                        }
                    }
                }
            }
        }
    }

    function loopChildrenReversed(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
        var items,
            itemid,
            index, lastIndex;
        if (_nodes[nodeid] != null) {
            items = _children[nodeid];
            lastIndex = items.length - 1;
            if (items != null) {
                for (index = lastIndex; index >= 0; index -= 1) {
                    itemid = items[index];
                    if (onItem.call(thisArg, itemid, _nodes[itemid], index, lastIndex)) {
                        break;
                    }
                }
            }
        }
    }

    function arrangeChildren(nodeid, children) {
        var childid,
            index, len;

        children = children.slice(0);
        if (_nodes[nodeid] != null) {
            if (_children[nodeid] != null) {
                if (_children[nodeid].length == children.length) {
                    for (index = 0, len = children.length; index < len; index += 1) {
                        childid = children[index];
                        if (_parents[childid] != nodeid) {
                            throw "Child " + childid + " does not belong to given node!";
                        }
                    }
                    _children[nodeid] = children;
                } else {
                    throw "Collections of children don't match each other!";
                }
            } else {
                if (children.length > 0) {
                    throw "Collections of children don't match each other!";
                }
            }
        }
    }

    function add(parentid, nodeid, node, position) {
        var index, len, children, childid;
        if (nodeid != null && node != null && _nodes[nodeid] == null) {

            if (_nodes[parentid] != null) {
                _parents[nodeid] = parentid;

                // existing parent
                if (_children[parentid] != null) {
                    if (position == null) {
                        _children[parentid].push(nodeid);
                    } else {
                        _children[parentid].splice(position, 0, nodeid);
                    }
                } else {
                    _children[parentid] = [nodeid];
                }
            } else {
                _roots[nodeid] = parentid;

                // missing parent
                if (_rootChildren[parentid] != null) {
                    if (position == null) {
                        _rootChildren[parentid].push(nodeid);
                    } else {
                        _rootChildren[parentid].splice(position, 0, nodeid);
                    }
                } else {
                    _rootChildren[parentid] = [nodeid];
                }
            }

            _nodes[nodeid] = node;

            if (_rootChildren[nodeid] != null) {
                _children[nodeid] = _rootChildren[nodeid];
                delete _rootChildren[nodeid];

                children = _children[nodeid];
                for (index = 0, len = children.length; index < len; index += 1) {
                    childid = children[index];

                    delete _roots[childid];

                    _parents[childid] = nodeid;
                }
                
            }

        }
    }

    function insert(nodeid, bundleid, bundle) {
        if (_nodes[nodeid] != null && bundleid != null && _nodes[bundleid] == null && bundle != null) {

            _nodes[bundleid] = bundle;

            if (_children[nodeid] != null) {
                _children[bundleid] = _children[nodeid];
            }
            _children[nodeid] = [bundleid];

            loopChildren(this, bundleid, function (childid, node, index) {
                _parents[childid] = bundleid;
            });
            _parents[bundleid] = nodeid;
        }
    }

    function moveChildren(fromNodeid, toNodeId) {
        if (_nodes[fromNodeid] != null && _nodes[toNodeId] != null && fromNodeid != toNodeId) {

            if (_children[fromNodeid] != null) {

                loopChildren(this, fromNodeid, function (childid, node, index) {
                    _parents[childid] = toNodeId;
                });

                if (_children[toNodeId] != null) {
                    _children[toNodeId] = _children[toNodeId].concat(_children[fromNodeid]);
                } else {
                    _children[toNodeId] = _children[fromNodeid];
                }
                delete _children[fromNodeid];
            }
        }
    }

    function hasNodes() {
        return !primitives.common.isEmptyObject(_rootChildren);
    }

    function parentid(nodeid) {
        var result = null;

        if (_parents[nodeid] != null) {
            result = _parents[nodeid];
        }

        return result;
    }

    function parent(nodeid) {
        var result = null;

        if (_parents[nodeid] != null) {
            result = _nodes[_parents[nodeid]];
        }

        return result;
    }

    function hasChildren(nodeid) {
        return _children[nodeid] != null;
    }

    function countChildren(nodeid) {
        return _children[nodeid] != null ? _children[nodeid].length : 0;
    }

    function countSiblings(nodeid) {
        var parent = parentid(nodeid);
        return parent != null ? _children[parent].length : 0;
    }

    function indexOf(nodeid) {
        var parent = parentid(nodeid);
        return parent != null ? primitives.common.indexOf(_children[parent], nodeid) : null;
    }

    function getChild(parentid, index) {
        var result = null,
            children;
        if ((children = _children[parentid]) != null) {
            result = _nodes[children[index]];
        }
        return result;
    }

    function _splice(collection, nodeid) {
        var index, len = collection.length;
        for (index = 0; index < len; index += 1) {
            if(collection[index] == nodeid) {
                collection.splice(index, 1);
                return len - 1;
            }
        }
        return len;
    }

    function adopt(parentid, nodeid) {
        if (_nodes[parentid] != null && _nodes[nodeid] != null) {
            if (parentid != nodeid) {
                if (_roots.hasOwnProperty(nodeid)) {
                    if (!_splice(_rootChildren[_roots[nodeid]], nodeid)) {
                        delete _rootChildren[_roots[nodeid]];
                    }
                    delete _roots[nodeid];
                }

                if (_parents.hasOwnProperty(nodeid)) {
                    if (!_splice(_children[_parents[nodeid]], nodeid)) {
                        delete _children[_parents[nodeid]];
                    }
                }

                _parents[nodeid] = parentid;
                if (_children[parentid] != null) {
                    _children[parentid].push(nodeid);
                } else {
                    _children[parentid] = [nodeid];
                }
            }
            else {
                throw "Item cannot be parent of itself!";
            }
        } else {
            throw "Both parent and child should be in hierarchy!";
        }
    }

    function node(nodeid) {
        return _nodes[nodeid];
    }

    function validate() {
        var result = true,
            key;

        for (key in _roots) {
            if (_roots.hasOwnProperty(key)) {
                if (_roots[key] != null) {
                    result = false;
                    break;
                }
            }
        }

        return result;
    }
    
    return {
        loop: loop,
        loopLevels: loopLevels,
        loopParents: loopParents,
        loopChildren: loopChildren,
        loopChildrenRange: loopChildrenRange,
        loopChildrenReversed: loopChildrenReversed,
        loopPostOrder: loopPostOrder, /* children first - parent last */
        loopPreOrder: loopPreOrder, /* parent first - children next */
        zipUp: zipUp,
        parentid: parentid,
        parent: parent,
        adopt: adopt,
        moveChildren: moveChildren,
        node: node,
        add: add,
        insert: insert,
        hasNodes: hasNodes,
        hasChildren: hasChildren,
        countChildren: countChildren,
        countSiblings: countSiblings,
        indexOf: indexOf,
        getChild: getChild,
        arrangeChildren: arrangeChildren,
        validate: validate,
        // callback return codes
        BREAK: BREAK, // break loop immidiatly
        SKIP: SKIP // skip loop of current node children 
    };
};
/*
    Class: primitives.callout.Config
	    Callout options class.
	
*/
primitives.callout.Config = function () {
	this.classPrefix = "bpcallout";

	/*
	    Property: graphicsType
            Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 1/*primitives.common.GraphicsType.Canvas*/;

	/*
    Property: actualGraphicsType
        Actual graphics type.
    */
	this.actualGraphicsType = null;

	/*
	    Property: pointerPlacement
			Defines pointer connection side or corner.

		Default:
			<primitives.common.PlacementType.Auto>
    */
	this.pointerPlacement = 0/*primitives.common.PlacementType.Auto*/;

	/*
	Property: position
	    Defines callout body position. 
        
    Type:
        <primitives.common.Rect>.
    */
	this.position = null;

	/*
	Property: snapPoint
	    Callout snap point. 
        
    Type:
        <primitives.common.Point>.
    */
	this.snapPoint = null;

	/*
	Property: cornerRadius
	    Body corner radius in percents or pixels. 
    */
	this.cornerRadius = "10%";

	/*
    Property: offset
        Body rectangle offset. 
    */
	this.offset = 0;

	/*
    Property: opacity
        Background color opacity. 
    */
	this.opacity = 1;

	/*
    Property: lineWidth
        Border line width. 
    */
	this.lineWidth = 1;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.lineType = 0/*primitives.common.LineType.Solid*/;

	/*
    Property: pointerWidth
        Pointer base width in percents or pixels. 
    */
	this.pointerWidth = "10%";

	/*
    Property: borderColor
        Border Color. 
    
    Default:
        <primitives.common.Colors.Black>
    */
	this.borderColor = "#000000"/*primitives.common.Colors.Black*/;

	/*
    Property: fillColor
        Fill Color. 
        
    Default:
        <primitives.common.Colors.Gray>
    */
	this.fillColor = "#d3d3d3"/*primitives.common.Colors.LightGray*/;

	/*
	method: update
	    Makes full redraw of callout widget contents reevaluating all options.
    */
};
primitives.callout.Controller = function () {
	this.widgetEventPrefix = "bpcallout";

	this.options = new primitives.callout.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;

	this.m_shape = null;
};

primitives.callout.Controller.prototype._create = function () {
	this.element
			.addClass("ui-widget");

	this._createLayout();

	this._redraw();
};

primitives.callout.Controller.prototype.destroy = function () {
	this._cleanLayout();
};

primitives.callout.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);

	this.options.actualGraphicsType = this.m_graphics.graphicsType;

	this.m_shape = new primitives.common.Callout(this.m_graphics);
};

primitives.callout.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.callout.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.callout.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.callout.Controller.prototype._redraw = function () {
	var names = ["pointerPlacement", "cornerRadius", "offset", "opacity", "lineWidth", "lineType", "pointerWidth", "borderColor", "fillColor"],
		index,
		name;
	this.m_graphics.activate("placeholder");
	for (index = 0; index < names.length; index += 1) {
		name = names[index];
		this.m_shape[name] = this.options[name];
	}
	this.m_shape.draw(this.options.snapPoint, this.options.position);
};

primitives.callout.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};
/*
 * jQuery UI Callout
 *
 * Basic Primitives Callout.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.bpCallout", new primitives.callout.Controller());
}(jQuery));
/*
    Class: primitives.connector.Config
	    Connector options class.
	
*/
primitives.connector.Config = function () {
    this.classPrefix = "bpconnector";

	/*
	    Property: graphicsType
            Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 1/*primitives.common.GraphicsType.Canvas*/;

	/*
    Property: actualGraphicsType
        Actual graphics type.
    */
	this.actualGraphicsType = null;

    /*
		Property: orientationType
			Diagram orientation. 

		Default:
			<primitives.common.OrientationType.Top>
    */
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

    /*
		Property: connectorShapeType
			Connector shape type. 

		Default:
			<primitives.common.ConnectorShapeType.OneWay>
    */
	this.connectorShapeType = 0/*primitives.common.ConnectorShapeType.OneWay*/;

	/*
	Property: position
	    Defines connectors starting rectangle position. 
        
    Type:
        <primitives.common.Rect>.
    */
	this.fromRectangle = null;

    /*
	Property: position
	    Defines connectors ending rectangle position. 
        
    Type:
        <primitives.common.Rect>.
    */
	this.toRectangle = null;


	/*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
    Property: lineWidth
        Border line width. 
    */
	this.lineWidth = 3;

	/*
    Property: color
        Connector's color.
    
    Default:
        <primitives.common.Colors.Black>
    */
	this.color = "#000000"/*primitives.common.Colors.Black*/;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.lineType = 0/*primitives.common.LineType.Solid*/;


    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
	this.label = null;

    /*
	Property: labelSize
		Defines label size. It is needed to preserve space for label without overlapping connected items.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

    /*
	Property: labelPlacementType
		Defines conector label placement. Label can be placed between rectangles along connector line or close to one of them.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

	/*
	method: update
	    Makes full redraw of connector widget contents reevaluating all options.
    */
};
primitives.connector.Controller = function () {
	this.widgetEventPrefix = "bpconnector";

	this.options = new primitives.connector.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;

	this.m_shape = null;

	this._labelTemplate = null;
	this._labelTemplateHashCode = null;
};

primitives.connector.Controller.prototype._create = function () {
    var self = this;

	this.element
			.addClass("ui-widget");

	this._createLabelTemplate();
	this._createLayout();

	this.options.onAnnotationLabelTemplateRender = function (event, data) { self._onAnnotationLabelTemplateRender(event, data); };

	this._redraw();
};

primitives.connector.Controller.prototype.destroy = function () {
    this._cleanLayout();

    this.options.onLabelTemplateRender = null;
};

primitives.connector.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);

	this.options.actualGraphicsType = this.m_graphics.graphicsType;

	this.m_shape = new primitives.common.Connector(this.m_graphics);
};

primitives.connector.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.connector.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.connector.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.connector.Controller.prototype._createLabelTemplate = function () {
    var template = jQuery('<div></div>');
    template.addClass("bp-item bp-corner-all bp-connector-label");

    this._labelTemplate = template.wrap('<div>').parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate);
};

primitives.connector.Controller.prototype._onAnnotationLabelTemplateRender = function (event, data) {//ignore jslint
    var label = data.element.html(this.options.label);
};

primitives.connector.Controller.prototype._redraw = function () {
    var names = ["orientationType", "connectorShapeType", "offset", "lineWidth", "color", "lineType", "labelSize"],
		index,
		name;
	this.m_graphics.activate("placeholder");
	for (index = 0; index < names.length; index += 1) {
	    name = names[index];
	    if (this.options[name] != null) {
	        this.m_shape[name] = this.options[name];
	    }
	}
	this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
	this.m_shape.labelPlacementType = this.options.labelPlacementType;
	this.m_shape.labelTemplate = this._labelTemplate;
	this.m_shape.labelTemplateHashCode = this._labelTemplateHashCode;
	this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
	this.m_shape.draw(this.options.fromRectangle, this.options.toRectangle);
};

primitives.connector.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};
/*
 * jQuery UI Connector
 *
 * Basic Primitives Connector.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.bpConnector", new primitives.connector.Controller());
}(jQuery));
/*
    Class: primitives.famdiagram.EventArgs
	    Event details class.
*/
primitives.famdiagram.EventArgs = function () {
	/*
	Property: oldContext
	    Reference to associated previous item in hierarchy.
    */
	this.oldContext = null;

	/*
	Property: context
	    Reference to associated new item in hierarchy.
    */
	this.context = null;

	/*
    Property: parentItems
        Collection of immidiate parent items of item in context.
    */
	this.parentItems = [];

	/*
	Property: position
	    Absolute item position on diagram.

	See also:
	    <primitives.common.Rect>
    */
	this.position = null;

	/*
    Property: name
        Relative object name.

    */
	this.name = null;

	/*
	Property: cancel
	    Allows cancelation of coupled event processing. This option allows to cancel layout update 
        and subsequent <primitives.famdiagram.Config.onCursorChanged> event 
        in handler of <primitives.famdiagram.Config.onCursorChanging> event.
    */
	this.cancel = false;
};
/*
    Class: primitives.famdiagram.TemplateConfig
        User defines item template class. It may optionaly define template for item, 
		custom cursor and highlight. If template is null then default template is used.

    See Also:
		<primitives.famdiagram.Config.templates>
*/
primitives.famdiagram.TemplateConfig = function () {
	/*
	Property: name
		Every template should have unique name. It is used as reference when 
		custom template is defined in <primitives.famdiagram.ItemConfig.templateName>.
    */
	this.name = null;

    /*
    Property: isActive
        If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

    True - Item is clickable.
    False - Item is inactive and user cannot set cursor item or highlight.

    Default:
        true
    */
	this.isActive = true;

	/*
	Property: itemSize
	This is item size of type <primitives.common.Size>, templates should have 
	fixed size, so famDiagram uses this value in order to layout items properly.
    */
	this.itemSize = new primitives.common.Size(120, 100);

	/*
    Property: itemBorderWidth
        Item template border width.
    */
	this.itemBorderWidth = 1;

	/*
	Property: itemTemplate
	Item template, if it is null then default item template is used. It supposed 
	to be div html element containing named elements inside for setting them 
	in <primitives.famdiagram.Config.onItemRender> event.
    */
	this.itemTemplate = null;

    /*
        Property: minimizedItemShapeType
            Defines minimized item shape. The border line width is set with <primitives.famdiagram.TemplateConfig.minimizedItemBorderWidth>
            By default minimized item is rounded rectangle filled with item title color.


        See also:
            <primitives.famdiagram.TemplateConfig.minimizedItemCornerRadius>
            <primitives.famdiagram.ItemConfig.itemTitleColor>
            <primitives.famdiagram.ItemConfig.minimizedItemShapeType>

        Default:
            null
    */
	this.minimizedItemShapeType = null;

	/*
	Property: minimizedItemSize
	This is size dot used to display item in minimized form, type of <primitives.common.Size>.
    */
	this.minimizedItemSize = new primitives.common.Size(4, 4);

    /*
    Property: minimizedItemCornerRadius
    Set corner radias for dots in order to display them as squares having rounded corners.
    By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares.
    */
	this.minimizedItemCornerRadius = null;

    /*
    Property: minimizedItemLineWidth
        Minimized item shape border width.
    */
	this.minimizedItemLineWidth = 1;

    /*
    Property: minimizedItemBorderColor
        Minimized item line color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
    */
	this.minimizedItemBorderColor = null;

    /*
    Property: minimizedItemLineType
        Minimized item shape border line type.
    */
	this.minimizedItemLineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: minimizedItemFillColor
        Minimized item fill color. By default it is the same as <primitives.famdiagram.ItemConfig.itemTitleColor>
    */
	this.minimizedItemFillColor = null;

    /*
    Property: minimizedItemOpacity
        Minimized item fill color opacity.
    */
	this.minimizedItemOpacity = 1;

	/*
	Property: highlightPadding
	This padding around item defines relative size of highlight object, 
	ts type is <primitives.common.Thickness>.
    */
	this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

	/*
    Property: highlightBorderWidth
        Highlight border width.
    */
	this.highlightBorderWidth = 1;

	/*
	Property: highlightTemplate
	Highlight template, if it is null then default highlight template is used. 
	It supposed to be div html element containing named elements inside for 
	setting them in <primitives.famdiagram.Config.onHighlightRender> event.
    */
	this.highlightTemplate = null;

	/*
    Property: cursorPadding
    This padding around item defines relative size of cursor object, 
	its type is <primitives.common.Thickness>.
    */
	this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);

	/*
    Property: cursorBorderWidth
        Cursor border width.
    */
	this.cursorBorderWidth = 2;

	/*
	Property: cursorTemplate
	Cursor template, if it is null then default cursor template is used. 
	It supposed to be div html element containing named elements inside 
	for setting them in <primitives.famdiagram.Config.onCursorRender> event.
    */
	this.cursorTemplate = null;

    /*
    Property: buttons
        Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every template. 
    
    See also:
        <primitives.famdiagram.ButtonConfig>
    */
	this.buttons = null;
};
/*
    Class: primitives.famdiagram.BackgroundAnnotationConfig
	    Options class. Populate annotation collection with instances of this object to draw background area around items.
        Shape is drawn as eclosed area with perimiter line around. If items cannot share one annotation then it draws as many areas as needed to show backgorund for every item.
        It does not overlap neighboring items. If line width is set then it draws perimiter line as well.
    See Also:
	    <primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.BackgroundAnnotationConfig = function (arg0) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Background>

    See Also:
	    <primitives.famdiagram.Config.annotations>
        <primitives.famdiagram.ConnectorAnnotationConfig>
        <primitives.famdiagram.ShapeAnnotationConfig>
        <primitives.famdiagram.LabelAnnotationConfig>
        <primitives.famdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 4/*primitives.common.AnnotationType.Background*/;

    /*
	Property: items 
	    Array of items ids in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.items = [];

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Auto>
    */
    this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;


    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: opacity
        Background color opacity. For applicable shapes only.
    */
    this.opacity = 1;

    /*
    Property: borderColor
        Shape border line color.
    
    Default:
        null
    */
    this.borderColor = null;

    /*
    Property: fillColor
        Fill Color. 

    Default:
        null
    */
    this.fillColor = null;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.famdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
/*
    Class: primitives.famdiagram.ButtonConfig
	    Options class. Custom user button options class. 
        Buttons displayed on the right side of items. 
        See jQuery UI Button options description for details.
	    In order to receive button click event make binding 
        to <primitives.famdiagram.Config.onButtonClick>.
    
    See Also:
	    <primitives.famdiagram.Config.buttons>
*/
primitives.famdiagram.ButtonConfig = function (name, icon, tooltip) {
    /*
	Property: name 
	    It should be unique string name of the button. 
        It is needed to distinguish click events from different butons.
    */
    this.name = name;

    /*
	Property: icon
	Name of icon used in jQuery UI.
    */
    this.icon = icon;
    /*
	Property: text
	Whether to show any text -when set to false (display no text), 
    icon must be enabled, otherwise it'll be ignored.
    */
    this.text = false;
    /*
	Property: label
	Text to show on the button.
    */
    this.label = null;
	/*
	Property: tooltip
	Button tooltip content.
	*/
    this.tooltip = tooltip;
    /*
	Property: size
	Size of the button of type <primitives.common.Size>.
    */
    this.size = new primitives.common.Size(16, 16);
};
/*
    Class: primitives.famdiagram.Config
	    jQuery famDiagram Widget options class. Multi-parent hierarchical chart configuration.
	
*/
primitives.famdiagram.Config = function (name) {
	this.name = (name !== undefined) ? name : "FamDiagram";
	this.classPrefix = "famdiagram";

	/*
	    Property: graphicsType
			Preferable graphics type. If preferred graphics type 
            is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	/*
	    Property: actualGraphicsType
			Actual graphics type.
    */
	this.actualGraphicsType = null;

	/*
	    Property: pageFitMode
            Defines the way diagram is fit into page. By default chart minimize items when it has not enough space to fit all of them into screen. 
            Chart has its maximum size when all items shown in full size and  its minimal size when all items shown as dots. 
            It is equivalent of full zoom out of the chart items, dot size items are not readable, but such presentation of them 
            gives possibility to overview chart layout. So chart tryes to combine both presenation modes and keep chart as small 
            as possible in order to give user possibility to see big picture. Collapsed items provide ideal way for analitical reiew of 
            diagram. If chart shown in its maximum size when all items are unfolded, it becomes impossible 
            to navigate betwen parents close to the root item. In such mode chart is usable only at bottom levels when children are close to their parents.
            If we try to navigate up to the root of hierarchy, gaps between parents sometimes as big as screen size. So in order to solve these 
            issues chart partially collapses hierarchy into dots and lines depending on this option.

        See also:
            <primitives.famdiagram.Config.minimalVisibility>
            <primitives.famdiagram.Config.printPreviewPageSize>

		Default:
			<primitives.common.PageFitMode.FitToPage>
    */
	this.pageFitMode = 3/*primitives.common.PageFitMode.FitToPage*/;

    /*
        Property: minimalVisibility
            Defines minimal allowed item form size for page fit mode. See description for pageFitMode.
    
        See also:
            <primitives.famdiagram.Config.pageFitMode>

        Default:
            <primitives.common.Visibility.Dot>
    */
	this.minimalVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
            Rotation to the right side is equivalent to left side placement 
            in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
    */
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

    /*
    Property: verticalAlignment
        Defines items vertical alignment relative to each other within one level of hierarchy. 
        It does not affect levels having same size items.
    
    Default:
        <primitives.common.VerticalAlignmentType.Middle>
    */
	this.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

    /*
        Property: arrowsDirection
            Sets direction of connector lines arrows.

        Default:
            <primitives.common.GroupByType.None>
    */
	this.arrowsDirection = 0/*primitives.common.GroupByType.None*/;

    /*
        Property: groupByType
           Defines the way item gravitates to parent or child layout having big vertical gap between levels.

        Default:
            <primitives.common.GroupByType.Children>
    */
	this.groupByType = 2/*primitives.common.GroupByType.Children*/;

    /*
        Property: elbowType
           Style squared connectors with custom elbows.
       
        Default:
            <primitives.common.ElbowType.None>
    */
	this.elbowType = 3/*primitives.common.ElbowType.Round*/;

    /*
        Property: elbowDotSize
            Size of elbow dot.
            
        Default:
            4
    */
	this.elbowDotSize = 4;

	/*
	Property: emptyDiagramMessage
	    Empty message in order to avoid blank screen. This option is supposed to say user that chart is empty when no data inside.
    */
	this.emptyDiagramMessage = "Diagram is empty.";

    /*
    Property: items
        This is chart items collection. It is regular array of items of type ItemConfig. Items reference each other via parents collection property. 
        So every item may have multiple parents in chart. If parents collection is empty or set to null then item supposed to be root parent.
        If items loop each other they are ignored as well. It is applications responsiblity to avoid such issues.

	See Also:
        <primitives.famdiagram.ItemConfig>
	    <primitives.famdiagram.ItemConfig.id>
        <primitives.famdiagram.ItemConfig.parents>
    */
	this.items = [];

    /*
    Property: annotations
        Defines array of annotaions objects. Chart supports several types of annotations. They are drawn on top of chart and they may block view of some of them.
        So chart's layout mechanism does not account available annotations. Don't over use this feature. 
        The design assumes only few of them being displayed simultanuosly. This is especially true for connectors.

    See also:
        <primitives.famdiagram.ConnectorAnnotationConfig>
        <primitives.famdiagram.ShapeAnnotationConfig>
        <primitives.famdiagram.LabelAnnotationConfig>
        <primitives.famdiagram.BackgroundAnnotationConfig>
        <primitives.famdiagram.HighlightPathAnnotationConfig>
    */
	this.annotations = [];

    /*
    Property: cursorItem
        Cursor item id - it is single item selection mode, user selects new cursor item on mouse click. 
        Cursor defines current local zoom placement or in other words current navigation item in the chart,
        all items relative to cursor always shoun in full size. So user can see all possible items around cursor in full size 
        and can continue navigation around chart. So when user navigates from one item to another clicking on thems and changing cursor item
        in chart, chart minimizes items going out of cursor scope and shows in full size items relative to new cursor position.
        If it is null then no cursor shown on diagram.

	See Also:
	    <primitives.famdiagram.ItemConfig.id>
        <primitives.famdiagram.Config.onCursorChanging>
        <primitives.famdiagram.Config.onCursorChanged>
    */
	this.cursorItem = null;

	/*
	Property: highlightItem
	    Highlighted item id. Highlight is mouse over affect, but using this option applicatin can set highlight at any item 
        in the chart programmatically. It can be used for chart syncronization with other controls on UI having mouse over effect. 
        See primitives.famdiagram.Config.update method arguments description for fast chart update.
        If it is null then no highlight shown on diagram.

	See Also:
	    <primitives.famdiagram.ItemConfig.id>
        <primitives.famdiagram.Config.onHighlightChanging>
        <primitives.famdiagram.Config.onHighlightChanged>
    */
	this.highligtItem = null;


	/*
	Property: selectedItems
	    Defines array of selected item ids. Chart allows to select items via checking checkboxes under items. Checkboxes are 
        shown only for full size items. So when item is selected it is always shown in full size, so check box always visible for selcted items.
        User can navigate around large diagram and check intrested items in order to keep them opened. So that way chart provides 
        means to show several items on large diagram and fit everything into minimal space ideally into available screen space.
        Application can select items programmatically using this array or receive notifications from chart about user selections with following events.

	See Also:
	    <primitives.famdiagram.ItemConfig.id>
        <primitives.famdiagram.Config.onSelectionChanging>
        <primitives.famdiagram.Config.onSelectionChanged>
    */
	this.selectedItems = [];

	/*
    Property: hasSelectorCheckbox
        This option controls selection check boxes visibility. 

    Auto - Checkbox shown only for current cursor item only.
    True - Every full size item has selection check box.
    False - No check boxes. Application can still programmatically select some items in the chart. 
    Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
    it is auto used as default selection check box.

    Default:
        <primitives.common.Enabled.Auto>

	See Also:
        <primitives.famdiagram.ItemConfig.hasSelectorCheckbox>
        <primitives.famdiagram.Config.onSelectionChanging>
        <primitives.famdiagram.Config.onSelectionChanged>
    */
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

    /*
        Property: selectCheckBoxLabel
            Select check box label.
    */
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
	    Defines the way items between root item and selectedItems displayed in diagram. Chart always shows all items between cursor item and its root in full size.
        But if cursor positioned on root item, then chart shows in full size only selected items in the chart. So this option controls items size between 
        selected items and root item of the chart. By default all items betwen root and selected items shown in full size.
	    
	Default:
	    <primitives.common.SelectionPathMode.FullStack>
    */
	this.selectionPathMode = 1/*primitives.common.SelectionPathMode.FullStack*/;

	/*
	Property: templates
	    Custom user templates collection. TemplateConfig is complex object providing options to customize item's content template, 
        cursor tempate and highlight template. Every template config should have unique name property, which is used by chart and its item configs 
        to reference them. Chart's defaultTemplateName allows to make template default for all items in the chart. On other hand user may define templates
        to individual items in the chart by templateName property of item config.

	See also:
	    <primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.defaultTemplateName>
		<primitives.famdiagram.ItemConfig.templateName>
    */
	this.templates = [];

	/*
	    Property: defaultTemplateName
		    This is template name used to render items having no <primitives.famdiagram.ItemConfig.templateName> defined.


		See Also:
			<primitives.famdiagram.TemplateConfig>
			<primitives.famdiagram.TemplateConfig.name>
			<primitives.famdiagram.Config.templates>
	*/
	this.defaultTemplateName = null;

    /*
        Property: defaulLabelAnnotationTemplate
            This is name of template used to render label annotations having no <primitives.famdiagram.LabelAnnotationConfig.templateName> defined.
            Label annotations are labels placed inside diagram layout. They occupy space and digram gurantees no overlapping of them.

        See Also:
            <primitives.famdiagram.LabelAnnotationConfig>
            <primitives.famdiagram.TemplateConfig>
            <primitives.famdiagram.TemplateConfig.name>
            <primitives.famdiagram.Config.templates>
    */
	this.defaulLabelAnnotationTemplate = null;

	/*
    Property: hasButtons
        This option controls user buttons visibility. 

    Auto - Buttons visible only for cursor item.
    True - Every normal item has buttons visible.
    False - No buttons.

    Default:
		<primitives.common.Enabled.Auto>
    */
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: buttons
	    Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every item. 
        The only limitation, they are all the same. So if you need to have unique buttons for every item, then you have to 
        customize cursor templates and manually create custom buttons inside of them.
	    
	See also:
	    <primitives.famdiagram.ButtonConfig>
    */
	this.buttons = [];

	/*
    Event: onHighlightChanging
        Notifies about changing highlight item <primitives.famdiagram.Config.highlightItem> in diagram.
        This coupled event with <primitives.famdiagram.Config.onHighlightChanged>, it is fired before highlight update.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onHighlightChanging = null;

	/*
	Event: onHighlightChanged
	    Notifies about changed highlight item <primitives.famdiagram.Config.highlightItem> in diagram.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onHighlightChanged = null;

	/*
    Event: onCursorChanging
        Notifies about changing cursor item <primitives.famdiagram.Config.cursorItem> in diagram.
        This coupled event with <primitives.famdiagram.Config.onCursorChanged>, it is fired before layout update.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onCursorChanging = null;

	/*
	Event: onCursorChanged
	    Notifies about changed cursor item <primitives.famdiagram.Config.cursorItem> in diagram .

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onCursorChanged = null;

	/*
	Event: onSelectionChanging
	    Notifies about changing selected items collection of <primitives.famdiagram.Config.selectedItems>.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onSelectionChanging = null;

	/*
	Event: onSelectionChanged
	    Notifies about changes in collection of <primitives.famdiagram.Config.selectedItems>.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onSelectionChanged = null;

	/*
	Event: onButtonClick
	    Notifies about click of custom user button defined in colelction of <primitives.famdiagram.Config.buttons>.

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onButtonClick = null;

	/*
	Event: onMouseClick
	    On mouse click event. 

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onMouseClick = null;

    /*
    Event: onMouseDblClick
        On mouse double click event. 

    See also:
        <primitives.famdiagram.EventArgs>
    */
	this.onMouseDblClick = null;

	/*
	Event: onItemRender
	    Item templates don't provide means to bind data of items into templates. So this event handler gives application such possibility.
        If application uses custom templates then this method is called to populate template with items properties.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.famdiagram.TemplateConfig>
        <primitives.famdiagram.Config.templates>
    */
	this.onItemRender = null;

	/*
	Event: onHighlightRender
	    If user defined custom highlight template for item template 
		then this method is called to populate it with context data.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.famdiagram.TemplateConfig>
        <primitives.famdiagram.Config.templates>
    */
	this.onHighlightRender = null;
	/*
	Event: onCursorRender
	    If user defined custom cursor template for item template 
		then this method is called to populate it with context data.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.famdiagram.TemplateConfig>
        <primitives.famdiagram.Config.templates>
    */
	this.onCursorRender = null;
	/*
	Property: normalLevelShift
	    Defines interval after level of items in  diagram having items in normal state.
    */
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
	    Defines interval after level of items in  diagram having all items in dot state.
    */
	this.dotLevelShift = 20;
	/*
	Property: lineLevelShift
	    Defines interval after level of items in  diagram having items in line state.
    */
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
	    Defines interval between items at the same level in  diagram having items in normal state.
    */
	this.normalItemsInterval = 10;
	/*
	Property: dotItemsInterval
	    Defines interval between items at the same level in  diagram having items in dot state.
    */
	this.dotItemsInterval = 1;
	/*
	Property: lineItemsInterval
	    Defines interval between items at the same level in  diagram having items in line state.
    */
	this.lineItemsInterval = 2;

	/*
	Property: cousinsIntervalMultiplier
        Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
        So children belonging to different parents have extra gap between them.
		
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	method: update
	    Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update widget contents.
	
	Parameters:
	    updateMode: This parameter defines severaty of update <primitives.common.UpdateMode>. 
	    For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.

    See also:
        <primitives.common.UpdateMode>

    Default:
        <primitives.common.UpdateMode.Recreate>
    */

	/*
    Property: itemTitleFirstFontColor
    This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.famdiagram.Config.itemTitleSecondFontColor>.

    See Also:
		<primitives.famdiagram.ItemConfig.itemTitleColor>
		<primitives.famdiagram.Config.itemTitleSecondFontColor>
		<primitives.common.highestContrast>

    */
	this.itemTitleFirstFontColor = "#ffffff"/*primitives.common.Colors.White*/;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
    */
	this.itemTitleSecondFontColor = "#000080"/*primitives.common.Colors.Navy*/;

    /*
        Property: minimizedItemShapeType
            Defines minimized item shape. The border line width is set with <primitives.famdiagram.TemplateConfig.minimizedItemBorderWidth>
            By default minimized item is rounded rectangle filled with item title color.


        See also:
            <primitives.famdiagram.TemplateConfig.minimizedItemCornerRadius>
            <primitives.famdiagram.ItemConfig.itemTitleColor>
            <primitives.famdiagram.ItemConfig.minimizedItemShapeType>

        Default:
            <primitives.common.ShapeType.None>
    */
	this.minimizedItemShapeType = 6/*primitives.common.ShapeType.None*/;

	/*
    Property: linesColor
        Connectors lines color. Connectors are basic connections betwen chart items 
        defining their logical relationships, don't mix with connector annotations. 
    */
	this.linesColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

	/*
    Property: linesWidth
        Connectors lines width.
    */
	this.linesWidth = 1;

    /*
    Property: linesType
        Connectors line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.linesType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: linesPalette
        This collection contains elements of type PaletteItemConfig. It is used to draw connector lines between families in different styles. 
        It is similar concept to regular line chart having lines intersections. 
        If this collection is empty then default linesColor, linesWidth and linesType are used for all connector lines.
    
    See Also:
        <primitives.famdiagram.PaletteItemConfig>
    */
	this.linesPalette = [];

	/*
	Property: showCallout
		This option controls callout visibility for dotted items. 

	Default:
	    true
	*/
	this.showCallout = true;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.famdiagram.Config.templates> collection property.

	Default:
	    null
	*/
	this.defaultCalloutTemplateName = null;

	/*
    Property: calloutfillColor
        Annotation callout fill color.
    */
	this.calloutfillColor = "#000000";

	/*
    Property: calloutBorderColor
        Annotation callout border color.
    */
	this.calloutBorderColor = null;

	/*
    Property: calloutOffset
        Annotation callout offset.
    */
	this.calloutOffset = 4;

	/*
    Property: calloutCornerRadius
        Annotation callout corner radius.
    */
	this.calloutCornerRadius = 4;

	/*
    Property: calloutPointerWidth
        Annotation callout pointer base width.
    */
	this.calloutPointerWidth = "10%";

	/*
    Property: calloutLineWidth
        Annotation callout border line width.
    */
	this.calloutLineWidth = 1;

	/*
    Property: calloutOpacity
        Annotation callout opacity.
    */
	this.calloutOpacity = 0.2;

	/*
    Property: buttonsPanelSize
        User buttons panel size.
    */
	this.buttonsPanelSize = 28;

	/*
    Property: groupTitlePanelSize
        Group title panel size.
    */
	this.groupTitlePanelSize = 24;

	/*
    Property: checkBoxPanelSize
        Selection check box panel size.
    */
	this.checkBoxPanelSize = 24;

	this.distance = 3;

	/*
	Property: minimumScale
		Minimum CSS3 scale transform. Available on mobile safary only.
	*/
	this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform. Available on mobile safary only.
	*/
	this.maximumScale = 1;

	/*
	Property: showLabels
		This option controls labels visibility for minimized items. If you need to show labels outside of borders of regular items then use item template for customization.
        Labels placed inside HTML DIV element and long strings are wrapped inside. 
		User can control labels position relative to its item. Chart does not meassure labels and does reserve space for them, 
		so if label overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.
    
	Auto - depends on available space.
    True - always shown.
    False - hidden.

    See Also:
		<primitives.famdiagram.ItemConfig.label>
		<primitives.famdiagram.Config.labelSize>
		<primitives.famdiagram.Config.normalItemsInterval>
		<primitives.famdiagram.Config.dotItemsInterval>
		<primitives.famdiagram.Config.lineItemsInterval>
		<primitives.famdiagram.Config.normalLevelShift>
		<primitives.famdiagram.Config.dotLevelShift>
		<primitives.famdiagram.Config.lineLevelShift>

	Default:
	    <primitives.common.Enabled.Auto>
	*/
	this.showLabels = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(80, 24);
	*/
	this.labelSize = new primitives.common.Size(80, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

    See Also:
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = 1/*primitives.common.PlacementType.Top*/;

	/*
	Property: labelFontSize
		Label font size. 

	Default:
		10px
*/
	this.labelFontSize = "10px";

	/*
	    Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
    */
	this.labelFontFamily = "Arial";

	/*
	    Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
    */
	this.labelColor = "#000000"/*primitives.common.Colors.Black*/;

	/*
	    Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
    */
	this.labelFontWeight = "normal";

	/*
    Property: labelFontStyle
        Font style: normal | italic
        
    Default:
        "normal"
    */
	this.labelFontStyle = "normal";

	/*
	Property: enablePanning
		Enable chart panning with mouse drag & drop for desktop browsers.
        Disable it if you need to support items Drag & Drop.

	Default:
		true
	*/
	this.enablePanning = true;

    /*
    Property: printPreviewPageSize
        Defines print preview page size in pixels. 

    Default:
        new <primitives.common.Size>(612, 792);
    */
	this.printPreviewPageSize = new primitives.common.Size(612, 792);

    /*
    Property: autoSizeMinimum
        Defines minimum diagram size in autosize mode. If diagram has no elements, it is going to be of this size on the page.  
    Default:
        new <primitives.common.Size>(800, 600);
    */
	this.autoSizeMinimum = new primitives.common.Size(800, 600);

    /*
    Property: autoSizeMaximum
        Defines maximum diagram size in autosize mode.
    Default:
        new <primitives.common.Size>(1024, 768);
    */
	this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};
/*
    Class: primitives.famdiagram.ConnectorAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw connector between two items.
    
    See Also:
	    <primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.ConnectorAnnotationConfig = function (arg0, arg1) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Connector>

    See Also:
	    <primitives.famdiagram.Config.annotations>
        <primitives.famdiagram.ShapeAnnotationConfig>
        <primitives.famdiagram.LabelAnnotationConfig>
        <primitives.famdiagram.BackgroundAnnotationConfig>
        <primitives.famdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 0/*primitives.common.AnnotationType.Connector*/;

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Foreground>
    */
    this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

    /*
	Property: fromItem 
	    Reference to from item in hierarchy.
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.fromItem = null;

    /*
    Property: toItem 
        Reference to from item in hierarchy.
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.toItem = null;

    /*
    Property: connectorShapeType
        Connector shape type. 

    Default:
        <primitives.common.ConnectorShapeType.OneWay>
    */
    this.connectorShapeType = 0/*primitives.common.ConnectorShapeType.OneWay*/;

    /*
    Property: labelPlacementType
        Label placement type along connection line(s). 

    Default:
        <primitives.common.ConnectorLabelPlacementType.Between>
    */
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

    /*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);

    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: color
        Connector's color.
    
    Default:
        <primitives.common.Colors.Black>
    */
    this.color = "#000000"/*primitives.common.Colors.Black*/;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.famdiagram.Config.selectedItems>
    */
    this.selectItems = true;

    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
    this.label = null;

    /*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
    this.labelSize = new primitives.common.Size(60, 30);

    switch (arguments.length) {
        case 1:
            for (property in arg0) {
                if (arg0.hasOwnProperty(property)) {
                    this[property] = arg0[property];
                }
            }
            break;
        case 2:
            this.fromItem = arg0;
            this.toItem = arg1;
            break;
    }
};
/*
    Class: primitives.famdiagram.HighlightPathAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw path between items.
        Path is drawn along base connection lines displaying relationships between item of the chart.
    See Also:
	    <primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.HighlightPathAnnotationConfig = function (arg0) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.HighlightPath>

    See Also:
	    <primitives.famdiagram.Config.annotations>
        <primitives.famdiagram.ConnectorAnnotationConfig>
        <primitives.famdiagram.ShapeAnnotationConfig>
        <primitives.famdiagram.LabelAnnotationConfig>
        <primitives.famdiagram.BackgroundAnnotationConfig>
    */
    this.annotationType = 2/*primitives.common.AnnotationType.HighlightPath*/;

    /*
	Property: items 
	    Array of item ids in hierarchy.
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.items = [];


    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.famdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
/*
    Class: primitives.famdiagram.ItemConfig
		Defines item in family chart hierarchy. 
		User is supposed to create hierarchy of this items and assign it to <primitives.famdiagram.Config.items> collection property.
		Widget contains some generic properties used in default item template, 
		but user can add as many custom properties to this class as needed. 
		Just be careful and avoid widget malfunction.

    See Also:
		<primitives.famdiagram.Config.items>
*/
primitives.famdiagram.ItemConfig = function (arg0, arg1, arg2, arg3, arg4) {
    var property;
    /*
	Property: id
	Unique item id.
    */
    this.id = null;

    /*
    Property: parents
    Collection of parent id's. If parents collection is empty [] then item placed as a root item.
    */
    this.parents = [];

    /*
	Property: spouses
	Collection of spouses id's. Items in this collection share common connector line whether they have common children or not.
    */
    this.spouses = [];

    /*
	Property: title
	Default template title property.
    */
	this.title = null;

	/*
	Property: description
	Default template description element.
    */
	this.description = null;

	/*
	Property: image
	Url to image. This property is used in default template.
    */
	this.image = null;

    /*
    Property: context
    User context object.
    */
	this.context = null;

	/*
	Property: itemTitleColor
	Default template title background color. The same color is used to draw minimized/dotted item.
    */
	this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

    /*
    Property: minimizedItemShapeType
        Defines minimized/dotted item shape type. By default it is set by ItemTemplate.minimizedItemShapeType property.
        Use this property to set marker type individually per item.

	See Also:
        <primitives.common.ShapeType>
    */
	this.minimizedItemShapeType = null;

	/*
    Property: groupTitle
    Auxiliary group title property. Displayed vertically on the side of item.
    */
	this.groupTitle = null;

	/*
    Property: groupTitleColor
    Group title background color.
    */
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

    /*
    Property: isActive
        If it is true then item is selectable in hierarchy and it has mouse over highlight. 

    True - Item is clickable.
    False - Item is inactive and user cannot set cursor item or highlight.

    Default:
        true
    */
	this.isActive = true;

	/*
    Property: hasSelectorCheckbox
        If it is true then selection check box is shown for the item. 
		Selected items are always shown in normal form, so if item is 
		selected then its selection check box is visible and checked.

    Auto - Depends on <primitives.famdiagram.Config.hasSelectorCheckbox> setting.
    True - Selection check box is visible.
    False - No selection check box.

    Default:
    <primitives.common.Enabled.Auto>
    */
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
    Property: hasButtons
        This option controls buttons panel visibility. 

    Auto - Depends on <primitives.famdiagram.Config.hasButtons> setting.
    True - Has buttons panel.
    False - No buttons panel.

    Default:
    <primitives.common.Enabled.Auto>
    */
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.famdiagram.TemplateConfig>
		<primitives.famdiagram.Config.templates> collection property.
    */
	this.templateName = null;

	/*
	Property: showCallout
		This option controls items callout visibility.

	Auto - depends on <primitives.famdiagram.Config.showCallout> option
	True - shown
	False - hidden

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showCallout = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: calloutTemplateName
		This is template name used to render callout for dotted item. 
		Actual callout template name is defined by following sequence:
		<primitives.famdiagram.ItemConfig.calloutTemplateName> 
		<primitives.famdiagram.ItemConfig.templateName>
		<primitives.famdiagram.Config.defaultCalloutTemplateName>
		<primitives.famdiagram.Config.defaultTemplateName>

	See Also:
		<primitives.famdiagram.Config.templates> collection property.
	Default:
		null
	*/
	this.calloutTemplateName = null;

	/*
	Property: label
	Items label text.
	*/
	this.label = null;

	/*
	Property: showLabel
		This option controls items label visibility. Label is displayed in form of div having text inside, long string is wrapped inside of it. 
		User can control labels position relative to its item. Chart does not preserve space for label.

	Auto - depends on <primitives.famdiagram.Config.labelOrientation> setting.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.famdiagram.ItemConfig.label>
	<primitives.famdiagram.Config.labelSize>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabel = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width. 
		By default it is equal to charts <primitives.famdiagram.Config.labelSize>.

	See Also:
		<primitives.common.Size>
	Default:
		null;
	*/
	this.labelSize = null;

	/*
	Property: labelOrientation
		Defines label orientation. 
		In default <primitives.text.TextOrientationType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelOrientation> setting.

    See Also:
	<primitives.famdiagram.Config.labelOrientation>
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Auto>
	*/
	this.labelOrientation = 3/*primitives.text.TextOrientationType.Auto*/;

	/*
	Property: labelPlacement
		Defines label placement relative to the item. 
		In default <primitives.common.PlacementType.Auto> mode it depends on chart <primitives.famdiagram.Config.labelPlacement> setting.

	See Also:
		<primitives.famdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	switch (arguments.length) {
	    case 1:
	        for (property in arg0) {
	            if (arg0.hasOwnProperty(property)) {
	                this[property] = arg0[property];
	            }
	        }
	        break;
	    case 5:
	        this.id = arg0;
	        this.parent = arg1;
			this.title = arg2;
			this.description = arg3;
			this.image = arg4;
			break;
	}
};
/*
    Class: primitives.famdiagram.LabelAnnotationConfig
	    Options class. Populate annotation collection with instances of this object to draw labels between items in diagram layout.
        This label annotation is created over connection line going from item to its children or parents.
        It is required that label annotation references subset of item's parents or children.
        If you need to create cross chart reference then use connector annotation.
    
    See Also:
	    <primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.LabelAnnotationConfig = function (arg0, arg1) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Label>

    See Also:
	    <primitives.famdiagram.Config.annotations>
        <primitives.famdiagram.ConnectorAnnotationConfig>
        <primitives.famdiagram.ShapeAnnotationConfig>
        <primitives.famdiagram.BackgroundAnnotationConfig>
        <primitives.famdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 3/*primitives.common.AnnotationType.Label*/;

    /*
	Property: fromItem 
	    This is the item you are creating annotation for.
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.fromItem = null;

    /*
    Property: toItems 
        This collection should contain only child or parent items of annotated item.
        You cannot add child and parent items at the same time.
        It may contain sub set of child or parent items. In that case existing annotation labels are drawn as a cascade.
        
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.toItems = [];

    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
    this.title = null;

    /*
    Property: itemTitleColor
    Default template title background color.
    */
    this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

    /*
    Property: templateName
        This is template name used to render this label.

        See Also:
        <primitives.famdiagram.TemplateConfig>
        <primitives.famdiagram.Config.templates>
        <primitives.famdiagram.Config.onItemRender>
    */
    this.templateName = null;

    switch (arguments.length) {
        case 1:
            for (property in arg0) {
                if (arg0.hasOwnProperty(property)) {
                    this[property] = arg0[property];
                }
            }
            break;
        case 2:
            this.fromItem = arg0;
            this.toItem = arg1;
            break;
    }
};
/*
    Class: primitives.famdiagram.PaletteItemConfig
		This class is used to define cross family connectors styles. 
        Multi-parent charts are supposed to have multiple cross hierarchy connectors, so in order to trace them more easely on chart
        every connector may have separate style. It is the same strategy as for visualization of regular line charts.

    See Also:
		<primitives.famdiagram.Config.linesPalette>
*/
primitives.famdiagram.PaletteItemConfig = function (arg0, arg1, arg2) {
    var property;

    /*
    Property: lineColor
        Line color.

    Default:
        <primitives.common.Colors.Silver>
    */
    this.lineColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

    /*
    Property: lineWidth
        Line width.
    Default:
        1
    */
    this.lineWidth = 1;

    /*
    Property: lineType
        Line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

	switch (arguments.length) {
	    case 1:
	        for (property in arg0) {
	            if (arg0.hasOwnProperty(property)) {
	                this[property] = arg0[property];
	            }
	        }
	        break;
	    case 3:
	        this.lineColor = arg0;
	        this.lineWidth = arg1;
	        this.lineType = arg2;
			break;
	}
};
/*
    Class: primitives.famdiagram.ShapeAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw shape benith or on top of several items.
        Shape is drawn as rectangular area.
    See Also:
	    <primitives.famdiagram.Config.annotations>
*/
primitives.famdiagram.ShapeAnnotationConfig = function (arg0) {
    var property;
    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotation collection property of <primitives.famdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Shape>

    See Also:
	    <primitives.famdiagram.Config.annotations>
        <primitives.famdiagram.ConnectorAnnotationConfig>
        <primitives.famdiagram.LabelAnnotationConfig>
        <primitives.famdiagram.BackgroundAnnotationConfig>
        <primitives.famdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 1/*primitives.common.AnnotationType.Shape*/;

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Auto>
    */
    this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;

    /*
	Property: items 
	    Array of items ids in hierarchy.
	See Also:
	    <primitives.famdiagram.ItemConfig.id>
    */
    this.items = [];

    /*
    Property: shapeType
        Shape type. 

    Default:
        <primitives.common.ShapeType.Rectangle>
    */
    this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;

    /*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);

    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: cornerRadius
        Body corner radius in percents or pixels. For applicable shapes only.
    */
    this.cornerRadius = "10%";

    /*
    Property: opacity
        Background color opacity. For applicable shapes only.
    */
    this.opacity = 1;

    /*
    Property: borderColor
        Shape border line color.
    
    Default:
        null
    */
    this.borderColor = null;

    /*
    Property: fillColor
        Fill Color. 

    Default:
        null
    */
    this.fillColor = null;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.famdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
    this.label = null;

    /*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
    this.labelSize = new primitives.common.Size(60, 30);

    /*
    Property: labelPlacement
        Defines label placement relative to the shape. 

    See Also:
        <primitives.famdiagram.Config.labelPlacement>
        <primitives.common.PlacementType>

    Default:
        <primitives.common.PlacementType.Auto>
    */
    this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

    /*
    Property: labelOffset
        Defines label offset from shape in pixels.

    Default:
        4;
    */
    this.labelOffset = 4;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
primitives.famdiagram.Controller = function () {
    this.widgetEventPrefix = "famdiagram";

    this.parent = primitives.orgdiagram.BaseController.prototype;
    this.parent.constructor.apply(this, arguments);

	this.options = new primitives.famdiagram.Config();

    /* base diagram is supposed to work for both orgDiagram & famDiagram widgets so following propertyies set to its default values and used in orgDiagram only */
	this.options.childrenPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;
	this.options.leavesPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;
	this.options.horizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;
	this.options.connectorType = 0/*primitives.common.ConnectorType.Squared*/;
	this.options.maximumColumnsInMatrix = 6;
	this.options.highlightLinesColor = "#ff0000"/*primitives.common.Colors.Red*/;
	this.options.highlightLinesWidth = 1;
	this.options.highlightLinesType = 0/*primitives.common.LineType.Solid*/;

	this._defaultLabelAnnotationTemplateName = null;
};

primitives.famdiagram.Controller.prototype = new primitives.orgdiagram.BaseController();

primitives.famdiagram.Controller.prototype._virtualBind = function () {
    var self = this;

    this.parent._virtualBind.apply(this, arguments);

    this.options.onLabelAnnotationTemplateRender = function (event, data) { self._onDefaulLabelAnnotationTemplateRender(event, data); };
};

primitives.famdiagram.Controller.prototype._virtualUnbind = function () {
    this.parent._virtualUnbind.apply(this, arguments);

    this.options.onLabelAnnotationTemplateRender = null;
};

primitives.famdiagram.Controller.prototype._virtualGetEventArgs = function (oldTreeItem, newTreeItem, name) {
    var result = new primitives.famdiagram.EventArgs(),
        offset,
        placeholderOffset;

    if (oldTreeItem != null && oldTreeItem.itemConfig && oldTreeItem.itemConfig.id != null) {
        result.oldContext = this._configs.node(oldTreeItem.itemConfig.id);
    }

    if (newTreeItem != null && newTreeItem.itemConfig && newTreeItem.itemConfig.id != null) {
        result.context = this._configs.node(newTreeItem.itemConfig.id);

        this._configs.loopParents(this, newTreeItem.itemConfig.id, function (itemid, item, levelIndex) {
            if (levelIndex > 0) {
                return this._configs.BREAK;
            }
            result.parentItems.push(item);
        });

        placeholderOffset = this.m_placeholder.offset();
        offset = this.element.offset();
        result.position = new primitives.common.Rect(newTreeItem.actualPosition)
                .translate(placeholderOffset.left, placeholderOffset.top)
                .translate(-offset.left, -offset.top);
    }

    if (name != null) {
        result.name = name;
    }

    return result;
};
primitives.famdiagram.Controller.prototype._virtualReadTemplates = function () {
    var defaultTemplateConfig = new primitives.orgdiagram.TemplateConfig(),
		template;

    this.parent._virtualReadTemplates.apply(this, arguments);


    template = new primitives.orgdiagram.Template({
        name: this.widgetEventPrefix + "DefaultLabelAnnotationTemplate",
        itemTemplate: this._getDefaultLabelAnnotationTemplate(),
        itemSize: new primitives.common.Size(100, 20)
    }, defaultTemplateConfig);

    template.itemTemplateRenderName = "onLabelAnnotationTemplateRender";
    template.createDefaultTemplates();

    this._templates[template.name] = template;
};

primitives.famdiagram.Controller.prototype._onDefaulLabelAnnotationTemplateRender = function (event, data) {//ignore jslint
    var itemConfig = data.context;
    data.element.text(itemConfig.title);
};

primitives.famdiagram.Controller.prototype._getDefaultLabelAnnotationTemplate = function () {
    var template = jQuery('<div class="bp-label-annotation"></div>');
    template.addClass("bp-item");

    return template.wrap('<div>').parent().html();
};

/*global _comma_separated_list_of_variables_*/
/*  Here is a list of major steps family chart makes in order to create organizational chart hiararchy 
    it creates couple of extra collections for cross hierarchy connections
    1. Scan options and populate user configs family structure: _configs where key = ItemConfig.id and node = ItemConfig
            populate _logicalFamily structure with FamilyItem-s
    3. Topologically sort _logicalFamily items and assign levels.
    5. Fill in missed items between levels. So that way we have invisible items between parent/child family items if they have gap between levels.
        Such invisible family items have isVisible option set to false.
    6. Extract families into _families array of type FamilyItem. Family is sub tree of items _logicalFamily. 
        In order to extract families out of _logicalFamily we count from bottom to roots total number of descendants for eevry item and then extract 
        sub hierarchy having maximum number of them. This process is repeated till all items are extracted into separate families.
            _orgPartners - When we extract families we store links to parents in other branches having the same children of 
            some already extracted item as partner in _orgPartners hash
        This hash table is used to create links collections between families

        The _orgTree collection is used to define final org hierarchy used to render org chart in base chart controller.
            
    7. Use links in families to build family graph
    8. Find maximum spanning tree of family graph
    9. Since spanning tree is the tree we calculate number of descendants in every branch. So when we join families into one 
        org chart we sort them taking first child family having maximum number of links to its parent family
        sortedFamilies collection
    10. Using sortedFamilies collection we merge roots of families back to primary org chart. The rule of that backword merging is 
        to find ancestor in target tree having level less then root item of merged family.
        this is done without extra collection creation via making changes in 
            _orgTree
        If family has no links it is added to root of _orgTree
    11. Balance organizational chart in order to place items having extra connections close to each other. 
        Assign every extra link to every pair of parent nodes up to the root.
    12. Scan _orgTree hierarchy from root to bottom and balance children using extra links collected from children
        So at the top most level we know number of links between children, so we sort them, then number of overlappings between branches should be minimal
        Balancing algorithms finds maximum spanning tree in connections between children and groups them from bottom of that tree up to the root
        In the way when groups having maximum mutual links placed close to each other.
*/
primitives.famdiagram.Controller.prototype._virtualCreateOrgTree = function () {
    var index, len, index2, len2,
        famItem,
        familiesGraph, /* primitives.common.graph */
        link, links,
        fromFamily,
        toFamily,
        sortedFamilies = [], sortedFamiliesHash,
        attachedFamilies,
        userItem,
        familyId,
        family,
        familyRootItem,
        fromItem,
        toItem,
        rootItem, rootItems, bestRootItem, bestReference,
        spanningTree,
        extraGravities, grandChildren,
        self = this,
        parsedId,
        itemsHavingSpouses, spouses,
        orgItemRoot,
        famItemsExtracted,
        families2;

    this._defaultLabelAnnotationTemplateName = this.widgetEventPrefix + "DefaultLabelAnnotationTemplate";
    if (!primitives.common.isNullOrEmpty(this.options.defaulLabelAnnotationTemplate)) {
        this._defaultLabelAnnotationTemplateName = this.options.defaulLabelAnnotationTemplate;
    }

    this.showInvisibleSubTrees = true; /* in regular org diagram we hide branch if it contains only invisible nodes, 
        in the family chart we use invisible items to draw connectors across multiple levels */

    this.showElbowDots = true; /* in regular org chart we don;t have situations when connector lines cross, but we have such situations in 
        family tree so we need extra visual attribute to distinguish intersections betwen connectors */

    // User ItemConfigs
    this._configs = primitives.common.family(); /* key: ItemConfig.id and value: primitives.famdiagram.ItemConfig*/

    // Family Chart definition - this is source of chart
    this._logicalFamily = primitives.common.family(); /* family structure where key: FamilyItem.id and value: FamilyItem */

    this.itemByChildrenKey = {};

    this._orgPartners = {}; /* this is items which share the same children with this item */

    this._families = [];

    // Organizational chart definition, this is output of this procedure
    this._orgTree = primitives.common.tree(); /*tree primitives.orgdiagram.OrgItem */

    this.maximumFamItemId = 0;
    this.minimumLevel = null;
    this.maximumLevel = null;
    
    if (this.options.items.length > 0) {
        itemsHavingSpouses = [];

        /* Create TreeItem's hash */
        for (index = 0, len = this.options.items.length; index < len; index+=1) {
            userItem = this.options.items[index];

            if (userItem != null) {
                this._configs.add(userItem.parents, userItem.id, userItem);

                famItem = new primitives.famdiagram.FamilyItem({
                    id: userItem.id,
                    itemConfig: userItem,
                    isActive: (userItem.hasOwnProperty('isActive') ? userItem.isActive : true)
                });

                this._logicalFamily.add(userItem.parents, famItem.id, famItem);

                spouses = famItem.itemConfig.spouses;
                if (spouses != null && spouses.length > 0) {
                    itemsHavingSpouses.push(famItem);
                }

                parsedId = parseInt(userItem.id, 10);
                this.maximumFamItemId = Math.max(isNaN(parsedId) ? 0 : parsedId, this.maximumFamItemId);
            }
        }

        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* Add labels annotations to family structure. */
        this._addLabelAnnotations(this._logicalFamily, this.options.annotations);
        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* create fake parents and children to reverse loops in family, do it in original user sequence */
        this._removeLoops(this._logicalFamily);
        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* create fake children to keep spouses connected together */
        this._addFakeChildrenForSpouses(this._logicalFamily, itemsHavingSpouses);
        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* Distribute FamilyItem-s by levels. Item levels aligned to bottom. */
        this._logicalFamily.loopLevels(this, this.options.groupByType == 1/*primitives.common.GroupByType.Parents*/, function (itemid, item, levelIndex) {
            item.level = levelIndex;
        });

        /* Optimize family references. Bundle connectors where it is possible */
        this._logicalFamily.optimizeReferences(function () {
            self.maximumFamItemId += 1;

            return new primitives.famdiagram.FamilyItem({
                id: self.maximumFamItemId,
                isVisible: self._debug,
                isActive: false,
                itemConfig: { title: "bundle #" + self.maximumFamItemId, description: " This item was created by references optimizer." },
                levelGravity: 2/*primitives.common.GroupByType.Children*/
            });
        }); //ignore jslint

        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* eliminate many to many connections in chart, every connection should be ether child or parent relation. */
        this._logicalFamily.eliminateManyToMany(function () {
                self.maximumFamItemId += 1;

                return new primitives.famdiagram.FamilyItem({
                    id: self.maximumFamItemId,
                    isVisible: self._debug,
                    isActive: false,
                    itemConfig: { title: "dummy #" + self.maximumFamItemId, description: "This is item used to eliminate M:M relations." },
                    levelGravity: 2/*primitives.common.GroupByType.Children*/
                });
            } //ignore jslint
        );

        if (this._debug && !this._logicalFamily.validate()) {
            throw "References are broken in family structure!";
        }

        /* Distribute FamilyItem-s by levels. The original family items visible to user should keep their levels after all transformations */
        this._resortItemsBylevels(this._logicalFamily);

        if (this._debug) {
            this._validate(this._logicalFamily, false);
        }
     
        /* Fill in items between parent/child relations having gaps in levels */
        this._fillInItems(this._logicalFamily,
            function () {
                var result;

                self.maximumFamItemId += 1;

                result = new primitives.famdiagram.FamilyItem({
                    id: self.maximumFamItemId,
                    levelGravity: 2/*primitives.common.GroupByType.Children*/,
                    isVisible: self._debug,
                    isActive: false,
                    itemConfig: { title: "extension #" + self.maximumFamItemId, description: "This is item used to fill gaps in levels." }
                });
                
                
                return result;
            } //ignore jslint
        );

        if (this._debug) {
            this._validate(this._logicalFamily, true);
        }

        /* create hash of extracted family items */
        famItemsExtracted = {};

        /* Extract families */
        this.properties = [
            'title', 'description', 'image',
            'itemTitleColor', 'groupTitle', 'groupTitleColor',
            'isActive', 'hasSelectorCheckbox', 'hasButtons',
            'templateName', 'showCallout', 'calloutTemplateName',
            'label', 'showLabel', 'labelSize', 'labelOrientation', 'labelPlacement',
            'minimizedItemShapeType'
        ];
        this.defaultItemConfig = new primitives.famdiagram.ItemConfig();


        familyId = 0;
        families2 = [];
        this._logicalFamily.loopRoots(this, function (grandParentId, grandParent) {
            //ignore jslint
            family = new primitives.famdiagram.Family(familyId);
            /* _extractOrgChart method extracts hiearchy of family members starting from grandParent and takes only non extracted family items 
             * For every extracted item it assigns its familyId, it is used for building families relations graph and finding cross family links
            */
            this._extractOrgChart(grandParentId, this._logicalFamily, famItemsExtracted, family);
            this._families.push(family);
            families2.push(family);
            familyId += 1;
        });

        families2.sort(function (a, b) {
            /* sort families by root item level ASC and size DESC */
            var aLevel = a.items[0].level,
                bLevel = b.items[0].level;

            return aLevel != bLevel ? (aLevel - bLevel) : (b.items.length - a.items.length);
        });

        sortedFamilies = [];
        sortedFamiliesHash = {};
        if (this._families.length > 0) {

            /* Build families graph */
            familiesGraph = primitives.common.graph();
            for (index = 0, len = this._families.length; index < len; index += 1) {
                family = this._families[index];

                for (index2 = 0, len2 = family.links.length; index2 < len2; index2 += 1) {
                    link = family.links[index2];

                    fromFamily = this._logicalFamily.node(link.fromItem).familyId;
                    toFamily = this._logicalFamily.node(link.toItem).familyId;

                    if (fromFamily != toFamily) {
                        familiesGraph.addEdge(fromFamily, toFamily, { weight: 0 });
                        familiesGraph.edge(fromFamily, toFamily).weight += 1;
                    }

                    this._families[toFamily].backLinks.push(new primitives.famdiagram.FamLink(link.toItem, link.fromItem));
                }
            }

            /* Flatten families graph into array for merging */
            while (sortedFamilies.length < this._families.length) {
                for (index = 0, len = families2.length; index < len; index += 1) {
                    family = families2[index];

                    if (!sortedFamiliesHash.hasOwnProperty(family.id)) {

                        /* find maximum spanning tree of families graph*/
                        spanningTree = familiesGraph.getSpanningTree(family.id, function (a, b) {
                            return a.weight - b.weight;
                        }); //ignore jslint

                        if (spanningTree.node(family.id) != null) {

                            /* count number of sub families for every family in spanning tree and sorts child families desc*/
                            spanningTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
                                var family = this._families[nodeid],
                                    parentFamily = this._families[parentid],
                                    children = [],
                                    self = this;

                                if (parentid != null) {
                                    parentFamily.familyPriority = parentFamily.familyPriority + family.familyPriority;
                                }

                                children = [];
                                spanningTree.loopChildren(this, nodeid, function (childid, child, index) {
                                    children.push(childid);
                                });
                                
                                children.sort(function (a, b) { return self._families[a].familyPriority - self._families[b].familyPriority; });
                                spanningTree.arrangeChildren(nodeid, children);
                            }); //ignore jslint

                            /* merge tree items in pre order sequence */
                            spanningTree.loopPreOrder(this, function (familyid, node) {
                                sortedFamilies.push(familyid);
                                sortedFamiliesHash[familyid] = true;
                            }); //ignore jslint

                        } else {
                            /* family has no links to any other family so we add it as orphant */
                            sortedFamilies.push(family.id);
                            sortedFamiliesHash[family.id] = true;
                        }
                    }
                }
            }
        }
        
        /* create chart root */
        this.maximumFamItemId += 1;
        orgItemRoot = this._createOrgItem(this.maximumFamItemId, null /*parent id*/, null, this.minimumLevel - 1, null /* userItem */);
        orgItemRoot.hideParentConnection = true;
        orgItemRoot.hideChildrenConnection = true;
        orgItemRoot.title = "internal root";
        orgItemRoot.isVisible = false;
        orgItemRoot.isActive = false;
        orgItemRoot.childIndex = 0;


        /* Place family roots to organizational chart */
        attachedFamilies = {};
        for (index = 0, len = sortedFamilies.length; index < len; index+=1) {
            family = this._families[sortedFamilies[index]];

            rootItems = {}; // Hash where key = rootItem.id and value is number of references
            bestRootItem = orgItemRoot;
            bestReference = 0;
            links = family.links.concat(family.backLinks);
            for (index2 = 0; index2 < links.length; index2+=1) {
                link = links[index2];

                toItem = this._orgTree.node(link.toItem);
                fromItem = this._orgTree.node(link.fromItem);

                if (attachedFamilies[toItem.familyId] == true) {
                    familyRootItem = family.items[0];
                    rootItem = toItem;

                    if (rootItem.level >= familyRootItem.level) {
                        this._orgTree.loopParents(this, rootItem.id, function (nodeid, node) {
                            rootItem = node;
                            if (node.level < familyRootItem.level) {
                                return true;
                            }
                        });//ignore jslint
                    }

                    if (rootItems.hasOwnProperty(rootItem.id)) {
                        rootItems[rootItem.id] += 1;
                    } else {
                        rootItems[rootItem.id] = 1;
                    }
                    /* family may be nested to multiple places, so we select root item having maximum connections with our new sub family */
                    if (bestReference < rootItems[rootItem.id]) {
                        bestRootItem = rootItem;
                        bestReference = rootItems[rootItem.id];
                    }
                }

                
            }

            this._attachFamilyToOrgChart(bestRootItem, family);

            attachedFamilies[family.id] = true;
        }

        /* balance organizational chart in order to place items having extra connections close to each other */
        extraGravities = this._getExtraGravity();

        /* count number of vertical connections for every item */
        grandChildren = this._getGrandChildren();

        /* scan _orgTree hierarchy from root to bottom and balance its children */
        this._balanceOrgTree(this._orgTree, extraGravities, grandChildren);
    }
};

primitives.famdiagram.Controller.prototype._validate = function (logicalFamily, strongValidate) {
    /* test consistency of references in family tree */
    if (!logicalFamily.validate()) {
        throw "Family structure failed to pass validation!";
    }

    logicalFamily.loop(this, function (famItemId, famItem) {

        logicalFamily.loopChildren(this, famItemId, function (childid, child, level) {
            if (level > 0) {
                return logicalFamily.BREAK;
            }
            if (child.level === null || famItem.level === null || (strongValidate ? child.level != famItem.level + 1 : child.level <= famItem.level)) {
                throw "Family tree is broken. Children/Parents or levels mismatch!";
            }
        });
    });
};

primitives.famdiagram.Controller.prototype._addFakeChildrenForSpouses = function (logicalFamily, itemsHavingSpouses) {
    var couple, fakeChild,
        index, len,
        itemHavingSpouses,
        self = this,
        spouseIndex, spouseLen,
        spouses;
    for (index = 0, len = itemsHavingSpouses.length; index < len; index += 1) {
        itemHavingSpouses = itemsHavingSpouses[index];
        spouses = itemHavingSpouses.itemConfig.spouses.slice(0);
        for (spouseIndex = 0, spouseLen = spouses.length; spouseIndex < spouseLen; spouseIndex += 1) {
            couple = [itemHavingSpouses.id, spouses[spouseIndex]];
            if (!this._logicalFamily.hasCommonChild(couple)) {

                /* create fake child item to keep spouses together */
                this.maximumFamItemId += 1;

                fakeChild = new primitives.famdiagram.FamilyItem({
                    id: this.maximumFamItemId,
                    isVisible: self._debug,
                    isActive: true,
                    isLevelNeutral: true,
                    hideParentConnection: true,
                    hideChildrenConnection: true,
                    itemConfig: { title: "fake child #" + self.maximumFamItemId, description: "This is fake child keeps spouses together." }
                });

                this._logicalFamily.add(couple, fakeChild.id, fakeChild);
            }
        }
    }
};


primitives.famdiagram.Controller.prototype._removeLoops = function (logicalFamily) {
    var tempFamily, fakeChild, fakeParent,
        index, len,
        index2, len2,
        nodesToRemove,
        parents,
        self = this,
        userItem;
    tempFamily = logicalFamily.clone();
    logicalFamily.loopTopo(this, function (itemid, item, levelIndex) {
        tempFamily.removeNode(itemid);
    });

    if (tempFamily.hasNodes()) {
        /* remove parents of the first remaining item in user order*/
        for (index = 0, len = this.options.items.length; index < len; index += 1) {
            userItem = this.options.items[index];

            if (tempFamily.node(userItem.id) != null) {

                parents = [];
                tempFamily.loopParents(this, userItem.id, function (parentid, parent, level) {
                    parents.push(parentid);
                    return tempFamily.SKIP;
                }); //ignore jslint

                for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
                    /* remove relation in temp structure */
                    tempFamily.removeRelation(parents[index2], userItem.id);

                    /* reverse relation in actual structure*/
                    logicalFamily.removeRelation(parents[index2], userItem.id);
                }

                /* create fake parent and child items to loop item to its parent */
                this.maximumFamItemId += 1;

                /* add fake parent */
                fakeParent = new primitives.famdiagram.FamilyItem({
                    id: this.maximumFamItemId,
                    isVisible: self._debug,
                    isActive: true,
                    isLevelNeutral: true,
                    hideParentConnection: true,
                    hideChildrenConnection: true,
                    itemConfig: { title: "fake parent #" + self.maximumFamItemId, description: "This is fake parent item was created by loops reversal." }
                });

                logicalFamily.add([], fakeParent.id, fakeParent);
                logicalFamily.adopt([fakeParent.id], userItem.id);

                for (index2 = 0, len2 = parents.length; index2 < len2; index2 += 1) {
                    this.maximumFamItemId += 1;

                    /* add fake child */
                    fakeChild = new primitives.famdiagram.FamilyItem({
                        id: this.maximumFamItemId,
                        isVisible: self._debug,
                        isActive: true,
                        isLevelNeutral: true,
                        hideParentConnection: true,
                        hideChildrenConnection: true,
                        itemConfig: { title: "fake child #" + self.maximumFamItemId, description: "This is fake child item was created by loops reversal." }
                    });

                    logicalFamily.add([fakeParent.id, parents[index2]], fakeChild.id, fakeChild);
                }


                /* loop is broken, so continue items removable in topological order */
                nodesToRemove = [];
                tempFamily.loopTopo(this, function (itemid, item, levelIndex) {
                    nodesToRemove.push(itemid);
                }); //ignore jslint
                for (index2 = 0, len2 = nodesToRemove.length; index2 < len2; index2 += 1) {
                    tempFamily.removeNode(nodesToRemove[index2]);
                }
            }
        }
    }
};
    
primitives.famdiagram.Controller.prototype._addLabelAnnotations = function (logicalFamily, annotations) {
    var edges = primitives.common.graph(), /* edge item is new primitives.famdiagram.EdgeItem(fromItem, toItem); */
        configsHash = {},
        configs, config,
        fromItem,
        index, len,
        self = this;

    if (annotations.length > 0) {
        /* group annotations by from item */
        for (index = 0, len = annotations.length; index < len; index += 1) {
            config = annotations[index];
            if (config.annotationType == 3/*primitives.common.AnnotationType.Label*/) {
                if (!configsHash.hasOwnProperty(config.fromItem)) {
                    configsHash[config.fromItem] = [config];

                    /* create edges hash for item */
                    logicalFamily.loopChildren(this, config.fromItem, function (childid, child, level) {
                        edges.addEdge(config.fromItem, childid, new primitives.famdiagram.EdgeItem(config.fromItem, config.fromItem, childid, childid));
                        return logicalFamily.SKIP;
                    });//ignore jslint
                    logicalFamily.loopParents(this, config.fromItem, function (parentid, parent, level) {
                        edges.addEdge(parentid, config.fromItem, new primitives.famdiagram.EdgeItem(parentid, parentid, config.fromItem, config.fromItem));
                        return logicalFamily.SKIP;
                    });//ignore jslint

                } else {
                    configsHash[config.fromItem].push(config);
                }
            }
        }

        for (fromItem in configsHash) {
            if (configsHash.hasOwnProperty(fromItem)) {
                configs = configsHash[fromItem];

                /* process annotations having greater number of references first */
                configs.sort(function (a, b) {
                    return b.toItems.length - a.toItems.length;
                }); //ignore jslint


                for (index = 0; index < configs.length; index += 1) {
                    config = configs[index];

                    this._addLabelAnnotation(logicalFamily, edges, config.fromItem, config.toItems, function () {
                        /* add label annotation as new diagram family item */
                        self.maximumFamItemId += 1;

                        return new primitives.famdiagram.FamilyItem({
                            id: self.maximumFamItemId,
                            isVisible: true,
                            isLevelNeutral: true,
                            isActive: false,
                            itemConfig: config                            
                        });
                    }); //ignore jslint
                }
            }
        }
    }
};

primitives.famdiagram.Controller.prototype._addLabelAnnotation = function (logicalFamily, edges, fromItem, toItems, onCreate) {
    var edge,
        isValid = true,
        commonParentId = null,
        toItem,
        index, len,
        bundleItem,
        bundleItems = [];

    for (index = 0, len = toItems.length; index < len; index += 1) {
        toItem = toItems[index];

        edge = edges.edge(fromItem, toItem);
        if (edge != null) {
            if (commonParentId == null) {
                commonParentId = edge.getFar(toItem);
            } else {
                if (commonParentId != edge.getFar(toItem)) {
                    isValid = false;
                    break;
                }
            }
            bundleItems.push(edge.getNear(toItem));
        } else {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        bundleItem = onCreate();
        if(logicalFamily.bundleParents(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
            bundleItem.levelGravity = 2/*primitives.common.GroupByType.Children*/;
            isValid = true;
        } else if (logicalFamily.bundleChildren(commonParentId, bundleItems, bundleItem.id, bundleItem)) {
            bundleItem.levelGravity = 1/*primitives.common.GroupByType.Parents*/;
            isValid = true;
        } else if ( logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
            bundleItem.levelGravity = 2/*primitives.common.GroupByType.Children*/;
            isValid = true;
        } else if (logicalFamily.bundleParents(commonParentId, toItems, bundleItem.id, bundleItem)) {
            bundleItem.levelGravity = 1/*primitives.common.GroupByType.Parents*/;
            isValid = true;
        } 

        if (isValid) {
            for (index = 0, len = toItems.length; index < len; index += 1) {
                toItem = toItems[index];

                edge = edges.edge(fromItem, toItem);
                edge.setFar(toItem, bundleItem.id);
            }
        }
    }
};

primitives.famdiagram.Controller.prototype._getGrandChildren = function () {
    var result = {};  /* Key = primitives.orgdiagram.OrgItem.id, Value= Hash {} having Key = level and Value = number of grand children*/

    this._orgTree.loopPostOrder(this, function (itemId, orgItem, parentId, parent) {
        var level;

        this.minimumLevel = this.minimumLevel != null ? Math.min(this.minimumLevel, orgItem.level) : orgItem.level;
        this.maximumLevel = this.maximumLevel != null ? Math.max(this.maximumLevel, orgItem.level) : orgItem.level;

        if (parentId != null) {
            if (!result[parentId]) {
                result[parentId] = {};
            }

            level = orgItem.level - 1; /* project children qty to parent level, it is needed to match cross hierarchy connectors levels*/
            if (!result[parentId][level]) {
                result[parentId][level] = 1;
            } else {
                result[parentId][level] += 1;
            }

            if (result[itemId] != null) {
                for (level in result[itemId]) {
                    if (result[itemId].hasOwnProperty(level)) {
                        if (!result[parentId][level]) {
                            result[parentId][level] = result[itemId][level];
                        } else {
                            result[parentId][level] += result[itemId][level];
                        }
                    }
                }
            }
        }
    });

    return result;
};

primitives.famdiagram.Controller.prototype._balanceOrgTree = function (orgTree, extraGravities, grandChildren) {
    var index2, len2,
        index3, len3,
        extraGravity,
        childExtraGravities,
        sortedChildren,
        subChildren, subOrgItem,
        leftId = '__left__',
        rightId = '__right__',
        levelExtraGravities,
        sequence;

    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
        var graph = primitives.common.graph(),
            graphGravities = {},
            firstOrgItem = null,
            toItemId;
        /* build gravities graph for children */
        sortedChildren = [];
        orgTree.loopChildren(this, parentOrgItem.id, function (childOrgItemId, childOrgItem, index) {
            var levelKey;
            if (firstOrgItem == null) {
                firstOrgItem = childOrgItem;
            }

            graphGravities[childOrgItem.id] = {};
            if (extraGravities.hasOwnProperty(childOrgItem.id)) {
                childExtraGravities = extraGravities[childOrgItem.id];

                for (levelKey in childExtraGravities) {
                    if (childExtraGravities.hasOwnProperty(levelKey)) {
                        levelExtraGravities = childExtraGravities[levelKey];

                        graphGravities[childOrgItem.id][levelKey] = {};
                        for (index2 = 0, len2 = levelExtraGravities.length; index2 < len2; index2 += 1) {
                            extraGravity = levelExtraGravities[index2];

                            if (extraGravity.commonParent == parentOrgItem.id) {
                                /* this is link between two children */
                                toItemId = extraGravity.toParent;
                            } else {
                                /* this is external link on left or on right side, we create virtual graph item ids for external links */
                                if (orgTree.node(extraGravity.fromParent).childIndex < orgTree.node(extraGravity.toParent).childIndex) {
                                    toItemId = rightId;
                                } else {
                                    toItemId = leftId;
                                }
                            }

                            /* add connection to graph */
                            if (childOrgItem.id != toItemId) {
                                graph.addEdge(childOrgItem.id, toItemId, { weight: 0 });
                                graph.edge(childOrgItem.id, toItemId).weight += 1.0;

                                if (graphGravities[childOrgItem.id][levelKey][toItemId] == null) {
                                    graphGravities[childOrgItem.id][levelKey][toItemId] = 0;
                                }
                                graphGravities[childOrgItem.id][levelKey][toItemId] += 1;
                            }
                        }
                    }
                }
            }
            /* add extra zero connection to graph when child org item has no connections
               it is connected to the first item in the graph with zero link
            */
            if (index > 0) {
                graph.addEdge(childOrgItem.id, firstOrgItem.id, { weight: 0 });
            }
        });

        if (firstOrgItem != null) {
            /* sort items in graph from the most connected to the least */
            sequence = graph.getGrowthSequence(function (a) {
                return a.weight;
            }); //ignore jslint

            if (sequence.length == 0) {
                sequence = [firstOrgItem.id];
            }

            /* sort children from top to down */
            subChildren = this._balanceItems(sequence, leftId, rightId, graphGravities, grandChildren);

            /* save items indexes for further use */
            for (index3 = 0, len3 = subChildren.length; index3 < len3; index3 += 1) {
                subOrgItem = orgTree.node(subChildren[index3]);

                subOrgItem.childIndex = index3;

                sortedChildren.push(subOrgItem.id);
            }
        }
        orgTree.arrangeChildren(parentOrgItem.id, sortedChildren);
    });
};

primitives.famdiagram.Controller.prototype._balanceItems = function (sequence, leftId, rightId, graphGravities, grandChildren) {
    var result = [],
    index,
    slots, position,
    itemid,
    bestSlot, bestSlotValue, bestSlotDistance, bestSlotBalance, bestSlotCrossings,
    slotValue, slotDistance, slotBalance, slotCrossings,
    itemGrandChildren,
    cloneSlot, itemSlot,
    level, levelGravities, toItemId, toItemSlot;

    slots = new primitives.famdiagram.Slots();
    slots.add(new primitives.famdiagram.Slot(leftId));
    slots.add(new primitives.famdiagram.Slot(null)); /* first empty slot */
    slots.add(new primitives.famdiagram.Slot(rightId));

    /* set initital positions */
    position = 0;
    slots.loop(function (slot) {
        position += 1;
        slot.position = position;
    });

    for (index = 0; index < sequence.length; index += 1) {
        itemid = sequence[index];

        /* ignore left and right margin */
        if (itemid != leftId && itemid != rightId) {

            bestSlot = null;
            bestSlotValue = null;
            bestSlotDistance = null;
            bestSlotBalance = null;
            bestSlotCrossings = null;
            slots.loop(function (slot) {
                var level, toItemId,
                    levelGravities,
                    toItemSlot;

                if (slot.itemId == null) {
                    itemGrandChildren = grandChildren[itemid];
                    slotValue = 0;
                    slotDistance = 0;
                    slotBalance = 0;
                    slotCrossings = 0;

                    for (level in slot.crossings) {
                        if (slot.crossings.hasOwnProperty(level)) {
                            if (itemGrandChildren && itemGrandChildren[level] != null) {
                                slotValue += slot.crossings[level] * itemGrandChildren[level];
                            }
                            slotCrossings += slot.crossings[level];
                        }
                    }
                    for (level in graphGravities[itemid]) {
                        if (graphGravities[itemid].hasOwnProperty(level)) {
                            levelGravities = graphGravities[itemid][level];
                            for (toItemId in levelGravities) {
                                if (levelGravities.hasOwnProperty(toItemId)) {
                                    toItemSlot = slots.getSlot(toItemId);
                                    if (toItemSlot != null) {
                                        if (toItemSlot.position < slot.position) {
                                            /* on the left side */
                                            slotValue += ((slot.left[level] || 0.0) - (toItemSlot.left[level] || 0.0));
                                            slotBalance += Math.abs(toItemSlot.balance + 1);
                                        } else {
                                            /* on the right side */
                                            slotValue += ((slot.right[level] || 0.0) - (toItemSlot.right[level] || 0.0));
                                            slotBalance += Math.abs(toItemSlot.balance - 1);
                                        }
                                        slotDistance += Math.abs(toItemSlot.position - slot.position);
                                    }
                                }
                            }
                        }
                    }

                    if (bestSlotValue == null
                        || bestSlotValue > slotValue
                        || (bestSlotValue == slotValue
                            && (bestSlotDistance > slotDistance
                                || (bestSlotDistance == slotDistance
                                        && (bestSlotBalance > slotBalance 
                                            || (bestSlotBalance == slotBalance && bestSlotCrossings > slotCrossings)
                                        )
                                    )
                                )
                            )
                        )
                    {
                        bestSlotValue = slotValue;
                        bestSlot = slot;
                        bestSlotDistance = slotDistance;
                        bestSlotBalance = slotBalance;
                        bestSlotCrossings = slotCrossings;
                    }
                }
            }); //ignore jslint

            /* insert item into found slot*/
            cloneSlot = bestSlot.clone();
            itemSlot = bestSlot.clone();

            itemSlot.itemId = itemid;

            slots.insertBefore(bestSlot, cloneSlot);
            slots.insertBefore(bestSlot, itemSlot);

            /* add new item grand children qty to all slots to their grand totals for right & left sides */
            itemSlot.position = 0;
            position = 0;
            slots.loop(function (slot) {
                var level, itemGrandChildren;
                if (slot.id != itemSlot.id) {
                    itemGrandChildren = grandChildren[itemid];
                    for (level in itemGrandChildren) {
                        if (itemGrandChildren.hasOwnProperty(level)) {
                            if (!slot.left[level]) {
                                slot.left[level] = itemGrandChildren[level];
                            } else {
                                slot.left[level] += itemGrandChildren[level];
                            }
                        }
                    }
                    position += 1;
                    slot.position = position;
                }
            }, itemSlot); //ignore jslint

            position = 0;
            slots.backwardLoop(function (slot) {
                var level, itemGrandChildren;
                if (slot.id != itemSlot.id) {
                    itemGrandChildren = grandChildren[itemid];
                    for (level in grandChildren[itemid]) {
                        if (grandChildren[itemid].hasOwnProperty(level)) {
                            if (!slot.right[level]) {
                                slot.right[level] = itemGrandChildren[level];
                            } else {
                                slot.right[level] += itemGrandChildren[level];
                            }
                        }
                    }
                    position -= 1;
                    slot.position = position;
                }
            }, itemSlot); //ignore jslint

            /* add crossings */
            for (level in graphGravities[itemid]) {
                if (graphGravities[itemid].hasOwnProperty(level)) {
                    levelGravities = graphGravities[itemid][level];
                    for (toItemId in levelGravities) {
                        if (levelGravities.hasOwnProperty(toItemId)) {
                            toItemSlot = slots.getSlot(toItemId);
                            if (toItemSlot != null) {
                                if (toItemSlot.position < 0) {
                                    /* on the left side */
                                    toItemSlot.balance += 1;
                                    itemSlot.balance -= 1;
                                    slots.backwardLoop(function (slot) {
                                        if (slot.id != itemSlot.id) {
                                            if (slot.id != toItemSlot.id) {
                                                if (!slot.crossings[level]) {
                                                    slot.crossings[level] = levelGravities[toItemId];
                                                } else {
                                                    slot.crossings[level] += levelGravities[toItemId];
                                                }
                                            } else {
                                                return true;
                                            }
                                        }
                                    }, itemSlot); //ignore jslint
                                } else {
                                    /* on the right side */
                                    toItemSlot.balance -= 1;
                                    itemSlot.balance += 1;
                                    slots.loop(function (slot) {
                                        if (slot.id != itemSlot.id) {
                                            if (slot.id != toItemSlot.id) {
                                                if (!slot.crossings[level]) {
                                                    slot.crossings[level] = levelGravities[toItemId];
                                                } else {
                                                    slot.crossings[level] += levelGravities[toItemId];
                                                }
                                            } else {
                                                return true;
                                            }
                                        }
                                    }, itemSlot); //ignore jslint
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    slots.loop(function (slot) {
        var itemId = slot.itemId;
        if (itemId != null && itemId != leftId && itemId != rightId) {
            result.push(itemId);
        }
    });

    return result;
};


primitives.famdiagram.Controller.prototype._getExtraGravity = function () {
    var orgItemId, orgItem,
        result = {}, /* Key = primitives.orgdiagram.OrgItem.id, Value= Hash {} having Key = level and Value = [] array of primitives.famdiagram.ExtraGravity objects*/
        index, len,
        extraPartners, extraPartner;

    /* collect gravities for extra partners */
    for (orgItemId in this._orgPartners) {
        if (this._orgPartners.hasOwnProperty(orgItemId)) {
            orgItem = this._orgTree.node(orgItemId);
            extraPartners = this._orgPartners[orgItemId];

            for (index = 0, len = extraPartners.length; index < len; index += 1) {
                extraPartner = this._orgTree.node(extraPartners[index]);

                this._addExtraGravitiesForConnection(result, extraPartner, orgItem);
            }
        }
    }

    return result;
};

primitives.famdiagram.Controller.prototype._addExtraGravitiesForConnection = function (extraGravities, fromItem, toItem) {
    var extraGravityFrom = new primitives.famdiagram.ExtraGravity(fromItem.level),
        extraGravityTo = new primitives.famdiagram.ExtraGravity(toItem.level);

    /* find common parent for evry child and orgItem and create connector for evey parent in selection path */
    this._orgTree.zipUp(this, fromItem.id, toItem.id, function (fromItemId, parentFromItemId, toItemId, parentToItemId) {
        /* all parent items in chain up to the common root share the same gravity object for one connector */
        this._addExtraGravityForItem(extraGravities, fromItemId, extraGravityFrom);
        this._addExtraGravityForItem(extraGravities, toItemId, extraGravityTo);

        /* initialize gravity objects */
        if (parentFromItemId == parentToItemId) {
            extraGravityFrom.commonParent = parentFromItemId;
            extraGravityFrom.fromParent = fromItemId;
            extraGravityFrom.toParent = toItemId;

            extraGravityTo.commonParent = parentFromItemId;
            extraGravityTo.fromParent = toItemId;
            extraGravityTo.toParent = fromItemId;

            return true;
        }
    });
};

primitives.famdiagram.Controller.prototype._addExtraGravityForItem = function (extraGravities, id, extraGravity) {
    if (!extraGravities.hasOwnProperty(id)) {
        extraGravities[id] = {};
    }
    if(extraGravities[id][extraGravity.level] == null) {
        extraGravities[id][extraGravity.level] = [];
    }
    extraGravities[id][extraGravity.level].push(extraGravity);
};

primitives.famdiagram.Controller.prototype._attachFamilyToOrgChart = function (parent, family) {
    var levelIndex,
        familyRoot = family.items[0],
        newOrgItem = null,
        rootItem = parent;

    // fill in levels between parent and family root with invisible items
    for (levelIndex = parent.level + 1; levelIndex < familyRoot.level; levelIndex+=1) {
        this.maximumFamItemId+=1;
        newOrgItem = this._createOrgItem(this.maximumFamItemId, rootItem.id, null, levelIndex, null /* userItem */);
        newOrgItem.title = "shift";
        newOrgItem.isVisible = false;
        newOrgItem.isActive = false;
        newOrgItem.hideParentConnection = true;
        newOrgItem.hideChildrenConnection = true;
        family.items.push(newOrgItem);

        rootItem = newOrgItem;
    }

    // attach family root 
    familyRoot.hideParentConnection = true;
    this._orgTree.adopt(rootItem.id, familyRoot.id, familyRoot);
};

primitives.famdiagram.Controller.prototype._extractOrgChart = function (grandParentId, logicalFamily, famItemsExtracted, family) {
    var index, len,
        children = [], tempChildren,
        childItem,
        rootItem = null,
        newOrgItem,
        grandParent = this._logicalFamily.node(grandParentId);

    /* extract root item */
    newOrgItem = this._createOrgItem(grandParent.id, rootItem, family.id, grandParent.level, grandParent.itemConfig);
    newOrgItem.hideParentConnection = true;
    newOrgItem.isVisible = grandParent.isVisible;
    newOrgItem.isActive = grandParent.isActive;
    newOrgItem.hideParentConnection = grandParent.hideParentConnection;
    newOrgItem.hideChildrenConnection = grandParent.hideChildrenConnection;
    family.items.push(newOrgItem);

    famItemsExtracted[grandParent.id] = true;
    grandParent.familyId = family.id;

    /* extract its children */
    children = this._extractChildren(grandParent, logicalFamily, famItemsExtracted, family);

    while (children.length > 0) {
        tempChildren = [];
        for (index = 0, len = children.length; index < len; index+=1) {
            childItem = children[index];
            tempChildren = tempChildren.concat(this._extractChildren(childItem, logicalFamily, famItemsExtracted, family));
        }

        children = tempChildren;
    }
};

primitives.famdiagram.Controller.prototype._extractChildren = function (parentItem, logicalFamily, famItemsExtracted, family) {
    var result = [],
        itemByChildrenKey = {},
        firstChild = null,
        partnerItem = null,
        newOrgItem;

    if (logicalFamily.countChildren(parentItem.id) == 1) {
        firstChild = logicalFamily.firstChild(parentItem.id);
    }
    
    if (this.itemByChildrenKey[firstChild] != null) {
        /* all children already extracted */
        partnerItem = this.itemByChildrenKey[firstChild];

        if (this._orgPartners[partnerItem.id] == null) {
            this._orgPartners[partnerItem.id] = [];
        }
        this._orgPartners[partnerItem.id].push(parentItem.id);

        family.links.push(new primitives.famdiagram.FamLink(parentItem.id, firstChild));
    } else {
        if (firstChild != null) {
            this.itemByChildrenKey[firstChild] = parentItem;
        }

        logicalFamily.loopChildren(this, parentItem.id, function (childid, childItem, levelIndex) {
            var firstChild = null;

            if (!famItemsExtracted[childItem.id]) {

                if (logicalFamily.countChildren(childid) == 1) {
                    firstChild = logicalFamily.firstChild(childid);
                }

                if (itemByChildrenKey[firstChild] != null) {
                    /* child item has the same children as other child in parentItem children collection
                        in organizational chart they are displayed as partners sharing children*/
                    newOrgItem = this._createOrgItem(childItem.id, itemByChildrenKey[firstChild].id, family.id, childItem.level, childItem.itemConfig);
                    newOrgItem.itemType = 6/*primitives.orgdiagram.ItemType.GeneralPartner*/;
                } else {
                    if (firstChild != null) {
                        itemByChildrenKey[firstChild] = childItem;
                    }
                    result.push(childItem);

                    newOrgItem = this._createOrgItem(childItem.id, parentItem.id, family.id, childItem.level, childItem.itemConfig);
                }

                newOrgItem.hideParentConnection = childItem.hideParentConnection;
                newOrgItem.hideChildrenConnection = childItem.hideChildrenConnection;
                newOrgItem.isVisible = childItem.isVisible;
                newOrgItem.isActive = childItem.isActive;
                family.items.push(newOrgItem);

                famItemsExtracted[childItem.id] = true;

                childItem.familyId = family.id;
            }
            return logicalFamily.SKIP;
        });
    }
    return result;
};

primitives.famdiagram.Controller.prototype._createOrgItem = function (id, parentId, familyId, level, userItem) {
    var orgItem = new primitives.orgdiagram.OrgItem(),
        index, len,
        property;

    // OrgItem id coinsides with ItemConfig id since we don't add any new org items to user's org chart definition
    orgItem.id = id;
    orgItem.context = userItem; /* Keep reference to user's ItemConfig in context */

    orgItem.familyId = familyId;
    orgItem.level = level;

    for (index = 0, len = this.properties.length; index < len; index+=1) {
        property = this.properties[index];

        orgItem[property] = (userItem != null && userItem[property] !== undefined) ? userItem[property] : this.defaultItemConfig[property];
    }

    if (userItem != null && userItem.annotationType == 3/*primitives.common.AnnotationType.Label*/) {
        orgItem.templateName = !primitives.common.isNullOrEmpty(userItem.templateName) ? userItem.templateName : this._defaultLabelAnnotationTemplateName;
        orgItem.hasSelectorCheckbox = 2/*primitives.common.Enabled.False*/;
    }

    this._orgTree.add(parentId, orgItem.id, orgItem);

    return orgItem;
};

primitives.famdiagram.Controller.prototype._resortItemsBylevels = function (logicalFamily) {
    var itemsAtLevels = [],
        minimumLevel = null,
        maximumLevel = null,
        currentLevel, index, itemsAtLevel;

    logicalFamily.loop(this, function (famItemId, famItem) {
        famItem.originalLevel = famItem.level;
        famItem.level = null;
        if (famItem.originalLevel != null) {
            if (!itemsAtLevels[famItem.originalLevel]) {
                itemsAtLevels[famItem.originalLevel] = {};
            }
            itemsAtLevels[famItem.originalLevel][famItemId] = famItem;

            minimumLevel = minimumLevel != null ? Math.min(famItem.originalLevel, minimumLevel) : famItem.originalLevel;
            maximumLevel = maximumLevel != null ? Math.max(famItem.originalLevel, maximumLevel) : famItem.originalLevel;
        }
    });

    /* assign levels*/
    currentLevel = 0;
    for (index = minimumLevel; index <= maximumLevel; index += 1) {
        itemsAtLevel = itemsAtLevels[index];

        currentLevel = this._setLevelsForItems(itemsAtLevel, logicalFamily, currentLevel, index + 1);
    }

    logicalFamily.loopTopoReversed(this, function (famItemId, famItem, position) {
        var level;
        if (famItem.levelGravity == 2/*primitives.common.GroupByType.Children*/) {
            level = null;

            logicalFamily.loopChildren(this, famItemId, function (childItemId, childFamItem, levelIndex) {
                if (levelIndex > 0) {
                    return logicalFamily.BREAK;
                }
                level = level == null ? childFamItem.level - 1 : Math.min(childFamItem.level - 1, level);
            }); //ignore jslint
            famItem.level = !level ? famItem.level : level;
        }
    });
};

primitives.famdiagram.Controller.prototype._setLevelsForItems = function (items, logicalFamily, level, nextOriginalLevel) {
    var result = level,
        nextItems, key, famItem;
    while (!primitives.common.isEmptyObject(items)) {
        nextItems = {};

        for (key in items) {
            if (items.hasOwnProperty(key)) {
                famItem = items[key];

                if (famItem.level == null) {
                    famItem.level = level;
                }

                logicalFamily.loopChildren(this, key, function (childItem, childFamItem, levelIndex) {
                    if (levelIndex > 0) {
                        return logicalFamily.BREAK;
                    }
                    if (childFamItem.originalLevel == null || childFamItem.isLevelNeutral ) {
                        childFamItem.level = childFamItem.level == null ? famItem.level + 1 : Math.max(childFamItem.level, famItem.level + 1);

                        nextItems[childItem] = childFamItem;
                    } else {
                        if (childFamItem.originalLevel == nextOriginalLevel) {
                            result = Math.max(result, famItem.level + 1);
                        }
                    }
                }); //ignore jslint
            }
        }
        items = nextItems;
    }
    return result;
};

primitives.famdiagram.Controller.prototype._fillInItems = function (logicalFamily, createFamItem) {
    var bundleItem;

    logicalFamily.loop(this, function (famItemId, famItem) {
        var extNeeded = true,
            itemsToBundle;
        while (extNeeded) {
            extNeeded = false;

            /* extend children down */
            itemsToBundle = [];

            logicalFamily.loopParents(this, famItemId, function (parentItemId, parentItem, level) {
                if (famItem.level - 1 > parentItem.level) {
                    itemsToBundle.push(parentItemId);
                }
                return logicalFamily.SKIP;
            }); //ignore jslint

            if (itemsToBundle.length > 1) {
                bundleItem = createFamItem(famItem);
                bundleItem.level = famItem.level - 1;

                logicalFamily.bundleParents(famItemId, itemsToBundle, bundleItem.id, bundleItem);

                extNeeded = true;

                famItemId = bundleItem.id;
                famItem = bundleItem;
            }
        }
    });

    logicalFamily.loop(this, function (famItemId, famItem) {
        var extNeeded = true,
            itemsToBundle,
            isSingleExtension = true;
        while (extNeeded) {
            extNeeded = false;

            /* extend children down */
            itemsToBundle = [];

            logicalFamily.loopChildren(this, famItemId, function (childItemId, childItem, level) {
                if (famItem.level + 1 < childItem.level) {
                    itemsToBundle.push(childItemId);
                } else {
                    isSingleExtension = false;
                }
                return logicalFamily.SKIP;
            }); //ignore jslint

            if (itemsToBundle.length > 0) {
                bundleItem = createFamItem(famItem);
                bundleItem.level = famItem.level + 1;

                if (isSingleExtension) {
                    bundleItem.hideParentConnection = famItem.hideChildrenConnection;
                    bundleItem.hideChildrenConnection = famItem.hideChildrenConnection;
                }

                logicalFamily.bundleChildren(famItemId, itemsToBundle, bundleItem.id, bundleItem);

                extNeeded = true;

                famItemId = bundleItem.id;
                famItem = bundleItem;
            }
        }
    });
};

primitives.famdiagram.Controller.prototype._virtualShowCursorNeighbours = function () {
    var treeItem,
        itemConfig;
    if (this._cursorTreeItem !== null) {
        /* Select the item itself */
        if (this._cursorTreeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
            this._cursorTreeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
        }

        /* select all neighbours */
        itemConfig = this._cursorTreeItem.itemConfig;
        if (itemConfig != null) {
            this._logicalFamily.loopNeighbours(this, itemConfig.id, function (itemid, item) {
                var orgItem = this._orgTree.node(itemid);
                treeItem = this._treeItemsByUserId[itemid];
                if (treeItem != null && treeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
                    treeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
                }
                if (orgItem.isActive) {
                    return true;
                }
            });
        }
    }
};

primitives.famdiagram.EdgeItem = function (key0, val0, key1, val1) {
    this.values = [val0, val1];
    this[key0] = 0;
    this[key1] = 1;
};

primitives.famdiagram.EdgeItem.prototype.getNear = function (key) {
    return this.values[this[key]];
};

primitives.famdiagram.EdgeItem.prototype.getFar = function (key) {
    return this.values[Math.abs(this[key] - 1)];
};

primitives.famdiagram.EdgeItem.prototype.setNear = function (key, value) {
    this.values[this[key]] = value;
};

primitives.famdiagram.EdgeItem.prototype.setFar = function (key, value) {
    this.values[Math.abs(this[key] - 1)] = value;
};

primitives.famdiagram.EdgeItem.prototype.toString = function () {
    return this.parent + ',' + this.child;
};
primitives.famdiagram.ExtraGravity = function (level) {
    this.commonParent = null; // primitives.orgdiagram.OrgItem.id
    this.fromParent = null; // primitives.orgdiagram.OrgItem.id
    this.toParent = null; // primitives.orgdiagram.OrgItem.id
    this.level = level;
};
primitives.famdiagram.Family = function (id) {
    this.id = null;
    this.familyPriority = 1;
    this.childFamilies = [];
	this.items = [];

	this.links = []; /* array of FamLink's */
	this.backLinks = []; /* array of FamLink's */

	if (arguments.length == 1) {
	    this.id = id;
	}
};
primitives.famdiagram.FamilyItem = function (arg0) {
    var property;

    this.id = null;
    this.familyId = null;
    this.itemConfig = null;

    this.isVisible = true;
    this.isActive = true; // item is clickable
    this.isLevelNeutral = false; // This option allows to place fake item in between of original item levels

    this.level = null;
    this.levelGravity = 0/*primitives.common.GroupByType.None*/; // If item can be moved between its parent and children levels in diagram, this option defines preference
    this.hideParentConnection = false;
    this.hideChildrenConnection = false;

    switch (arguments.length) {
        case 1:
            for (property in arg0) {
                if (arg0.hasOwnProperty(property)) {
                    this[property] = arg0[property];
                }
            }
            break;
    }
};
primitives.famdiagram.FamLink = function (fromItem, toItem) {
    this.fromItem = fromItem; /* FamilyItem.id */
    this.toItem = toItem; /* FamilyItem.id */
};
primitives.famdiagram.Slot = function (itemid) {
    this.id = null;
    this.prev = null; /* prev slot id */
    this.next = null; /* next slot id */

    this.position = null;
    this.balance = 0;

    this.itemId = itemid; /* if itemId is null then this slot is empty */
    
    this.left = {}; /* total number of children at the level on the left side of this slot */
    this.right = {}; /* total number of children at the level on the right side of this slot */

    this.crossings = {}; /* number of connections crossing this slot from side to side at the level */
};

primitives.famdiagram.Slot.prototype.clone = function () {
    var result = new primitives.famdiagram.Slot(),
        level;

    result.itemId = this.itemId;

    for (level in this.left) {
        if (this.left.hasOwnProperty(level)) {
            result.left[level] = this.left[level];
        }
    }
    for (level in this.right) {
        if (this.right.hasOwnProperty(level)) {
            result.right[level] = this.right[level];
        }
    }
    for (level in this.crossings) {
        if (this.crossings.hasOwnProperty(level)) {
            result.crossings[level] = this.crossings[level];
        }
    }

    return result;
};
primitives.famdiagram.Slots = function () {
    this.first = null;
    this.last = null;

    this.slots = {};

    this.items = {};

    this.counter = 0;
};

primitives.famdiagram.Slots.prototype.add = function (slot) {
    slot.id = this.counter;
    this.counter += 1;

    this.slots[slot.id] = slot;
    if (slot.itemId != null) {
        this.items[slot.itemId] = slot;
    }

    if (this.last == null) {
        this.last = slot.id;
        this.first = slot.id;
    } else {
        this.slots[this.last].next = slot.id;
        slot.prev = this.last;

        this.last = slot.id;
    }
};

primitives.famdiagram.Slots.prototype.insertBefore = function (beforeSlot, slot) {
    slot.id = this.counter;
    this.counter+=1;
    this.slots[slot.id] = slot;
    if (slot.itemId != null) {
        this.items[slot.itemId] = slot;
    }

    if (beforeSlot.prev == null) {
        slot.next = beforeSlot.id;
        this.first = slot.id;
    } else {
        var prevSlot = this.slots[beforeSlot.prev];
        prevSlot.next = slot.id;
        slot.next = beforeSlot.id;
        beforeSlot.prev = slot.id;
        slot.prev = prevSlot.id;
    }
};

primitives.famdiagram.Slots.prototype.loop = function (callback, startSlot) {
    var slotid = startSlot != null ? startSlot.id : this.first,
        slot;

    while (slotid != null) {
        slot = this.slots[slotid];

        if (callback(slot)) {
            break;
        }

        slotid = slot.next;
    }
};

primitives.famdiagram.Slots.prototype.backwardLoop = function (callback, startSlot) {
    var slotid = startSlot != null ? startSlot.id : this.last,
        slot;

    while (slotid != null) {
        slot = this.slots[slotid];

        if (callback(slot)) {
            break;
        }

        slotid = slot.prev;
    }
};

primitives.famdiagram.Slots.prototype.getSlot = function (itemId) {
    return this.items[itemId];
};
/*
 * jQuery UI Diagram
 *
 * Basic Primitives family diagram.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.famDiagram", jQuery.ui.mouse2, new primitives.famdiagram.Controller());
}(jQuery));
/*
    Class: primitives.orgdiagram.EventArgs
	    Event details class.
*/
primitives.orgdiagram.EventArgs = function () {
	/*
	Property: oldContext
	    Reference to associated previous item in hierarchy.
    */
	this.oldContext = null;

	/*
	Property: context
	    Reference to associated new item in hierarchy.
    */
	this.context = null;

	/*
    Property: parentItem
        Reference parent item of item in context.
    */
	this.parentItem = null;

	/*
	Property: position
	    Absolute item position on diagram.

	See also:
	    <primitives.common.Rect>
    */
	this.position = null;

	/*
    Property: name
        Relative object name.

    */
	this.name = null;

	/*
	Property: cancel
	    Allows cancelation of coupled event processing. This option allows to cancel layout update 
        and subsequent <primitives.orgdiagram.Config.onCursorChanged> event 
        in handler of <primitives.orgdiagram.Config.onCursorChanging> event.
    */
	this.cancel = false;
};
/*
    Class: primitives.orgdiagram.TemplateConfig
        User defines item template class. It may optionaly define template for item, 
		custom cursor and highlight. If template is null then default template is used.

    See Also:
		<primitives.orgdiagram.Config.templates>
*/
primitives.orgdiagram.TemplateConfig = function () {
	/*
	Property: name
		Every template should have unique name. It is used as reference when 
		custom template is defined in <primitives.orgdiagram.ItemConfig.templateName>.
    */
	this.name = null;

    /*
    Property: isActive
        If it is true then item having this template is selectable in hierarchy and it has mouse over highlight.

    True - Item is clickable.
    False - Item is inactive and user cannot set cursor item or highlight.

    Default:
        true
    */
	this.isActive = true;

	/*
	Property: itemSize
	This is item size of type <primitives.common.Size>, templates should have 
	fixed size, so orgDiagram uses this value in order to layout items properly.
    */
	this.itemSize = new primitives.common.Size(120, 100);

	/*
    Property: itemBorderWidth
        Item template border width.
    */
	this.itemBorderWidth = 1;

	/*
	Property: itemTemplate
	Item template, if it is null then default item template is used. It supposed 
	to be div html element containing named elements inside for setting them 
	in <primitives.orgdiagram.Config.onItemRender> event.
    */
	this.itemTemplate = null;

    /*
        Property: minimizedItemShapeType
            Defines minimized item shape. The border line width is set with <primitives.orgdiagram.TemplateConfig.minimizedItemBorderWidth>
            By default minimized item is rounded rectangle filled with item title color.


        See also:
            <primitives.orgdiagram.TemplateConfig.minimizedItemCornerRadius>
            <primitives.orgdiagram.ItemConfig.itemTitleColor>
            <primitives.orgdiagram.ItemConfig.minimizedItemShapeType>

        Default:
            null
    */
	this.minimizedItemShapeType = null;

	/*
	Property: minimizedItemSize
	This is size dot used to display item in minimized form, type of <primitives.common.Size>.
    */
	this.minimizedItemSize = new primitives.common.Size(4, 4);

    /*
	Property: minimizedItemCornerRadius
    Set corner radias for dots in order to display them as squares having rounded corners.
	By default it is null and dots displayed as cycles. If corner radius set to 0 then they are displayed as regular squares.
    */
	this.minimizedItemCornerRadius = null;

    /*
    Property: minimizedItemLineWidth
        Minimized item shape border width.
    */
	this.minimizedItemLineWidth = 1;

    /*
    Property: minimizedItemBorderColor
        Minimized item line color. By default it is the same as <primitives.orgdiagram.ItemConfig.itemTitleColor>
    */
	this.minimizedItemBorderColor = null;

    /*
    Property: minimizedItemLineType
        Minimized item shape border line type.
    */
	this.minimizedItemLineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: minimizedItemFillColor
        Minimized item fill color. By default it is the same as <primitives.orgdiagram.ItemConfig.itemTitleColor>
    */
	this.minimizedItemFillColor = null;

    /*
    Property: minimizedItemOpacity
        Minimized item fill color opacity.
    */
	this.minimizedItemOpacity = 1;

	/*
	Property: highlightPadding
	This padding around item defines relative size of highlight object, 
	its type is <primitives.common.Thickness>.
    */
	this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

	/*
    Property: highlightBorderWidth
        Highlight border width.
    */
	this.highlightBorderWidth = 1;

	/*
	Property: highlightTemplate
	Highlight template, if it is null then default highlight template is used. 
	It supposed to be div html element containing named elements inside for 
	setting them in <primitives.orgdiagram.Config.onHighlightRender> event.
    */
	this.highlightTemplate = null;

	/*
    Property: cursorPadding
    This padding around item defines relative size of cursor object, 
	its type is <primitives.common.Thickness>.
    */
	this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);

	/*
    Property: cursorBorderWidth
        Cursor border width.
    */
	this.cursorBorderWidth = 2;

	/*
	Property: cursorTemplate
	Cursor template, if it is null then default cursor template is used. 
	It supposed to be div html element containing named elements inside 
	for setting them in <primitives.orgdiagram.Config.onCursorRender> event.
    */
	this.cursorTemplate = null;

    /*
    Property: buttons
        Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every template. 
    
    See also:
        <primitives.orgdiagram.ButtonConfig>
    */
	this.buttons = null;
};
/*
    Class: primitives.orgdiagram.BackgroundAnnotationConfig
	    Options class. Populate annotation collection with instances of this object to draw background area around items.
        Shape is drawn as eclosed area with perimiter line around. If items cannot share one annotation then it draws as many areas as needed to show backgorund for every item.
        It does not overlap neighboring items. If line width is set then it draws perimiter line as well.
    See Also:
	    <primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.BackgroundAnnotationConfig = function (arg0) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Background>

    See Also:
	    <primitives.orgdiagram.Config.annotations>
        <primitives.orgdiagram.ConnectorAnnotationConfig>
        <primitives.orgdiagram.ShapeAnnotationConfig>
        <primitives.orgdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 4/*primitives.common.AnnotationType.Background*/;

    /*
	Property: items 
	    Array of items ids in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.items = [];

    /*
    Property: includeChildren
        Include all descendants of every item in items collection. If you add root item then all chart items are going to be added to annotation.

    Default:
        false
    */
    this.includeChildren = false;

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Auto>
    */
    this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;


    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: opacity
        Background color opacity. For applicable shapes only.
    */
    this.opacity = 1;

    /*
    Property: borderColor
        Shape border line color.
    
    Default:
        null
    */
    this.borderColor = null;

    /*
    Property: fillColor
        Fill Color. 

    Default:
        null
    */
    this.fillColor = null;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.orgdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
/*
    Class: primitives.orgdiagram.ButtonConfig
	    Options class. Custom user button options class. 
        Buttons displayed on the right side of item. 
        See jQuery UI Button options description for details.
	    In order to receive button click event make binding 
        to <primitives.orgdiagram.Config.onButtonClick>.
    
    See Also:
	    <primitives.orgdiagram.Config.buttons>
*/
primitives.orgdiagram.ButtonConfig = function (name, icon, tooltip) {
    /*
	Property: name 
	    It should be unique string name of the button. 
        It is needed to distinguish click events from different butons.
    */
    this.name = name;

    /*
	Property: icon
	Name of icon used in jQuery UI.
    */
    this.icon = icon;
    /*
	Property: text
	Whether to show any text -when set to false (display no text), 
    icon must be enabled, otherwise it'll be ignored.
    */
    this.text = false;
    /*
	Property: label
	Text to show on the button.
    */
    this.label = null;
	/*
	Property: tooltip
	Button tooltip content.
	*/
    this.tooltip = tooltip;
    /*
	Property: size
	Size of the button of type <primitives.common.Size>.
    */
    this.size = new primitives.common.Size(16, 16);
};
/*
    Class: primitives.orgdiagram.Config
	    jQuery orgDiagram Widget options class. Organizational chart configuration object.
	
*/
primitives.orgdiagram.Config = function (name) {
	this.name = (name !== undefined) ? name : "OrgDiagram";
	this.classPrefix = "orgdiagram";

	/*
	    Property: graphicsType
			Preferable graphics type. If preferred graphics type 
            is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 0/*primitives.common.GraphicsType.SVG*/;

	/*
	    Property: actualGraphicsType
			Actual graphics type.
    */
	this.actualGraphicsType = null;

	/*
	    Property: pageFitMode
            Defines the way diagram is fit into page. By default chart minimize items when it has not enough space to fit all of them into screen. 
            Chart has its maximum size when all items shown in full size and  its minimal size when all items shown as dots. 
            It is equivalent of full zoom out of the chart items, dot size items are not readable, but such presentation of them 
            gives possibility to overview chart layout. So chart tryes to combine both presenation modes and keep chart as small 
            as possible in order to give user possibility to see big picture. Collapsed items provide ideal way for analitical reiew of 
            organizational diagram. If chart shown in its maximum size when all items are unfolded, it becomes impossible 
            to navigate betwen parents close to the root item. In such mode chart is usable only at bottom levels when children are close to their parents.
            If we try to navigate up to the root of hierarchy, gaps between parents sometimes as big as screen size. So in order to solve these 
            issues chart partially collapses hierarchy into dots and lines depending on this option.

        See also:
            <primitives.orgdiagram.Config.minimalVisibility>
            <primitives.famdiagram.Config.printPreviewPageSize>

		Default:
			<primitives.common.PageFitMode.FitToPage>
    */
	this.pageFitMode = 3/*primitives.common.PageFitMode.FitToPage*/;

    /*
        Property: minimalVisibility
            Defines minimal allowed item form size for page fit mode. See description for pageFitMode.
    
        See also:
            <primitives.orgdiagram.Config.pageFitMode>

        Default:
            <primitives.common.Visibility.Dot>
    */
	this.minimalVisibility = 2/*primitives.common.Visibility.Dot*/;

	/*
		Property: orientationType
			Chart orientation. Chart can be rotated left, right and bottom.
            Rotation to the right side is equivalent to left side placement 
            in countries writing from right to left, so it is important for localization.

		Default:
			<primitives.common.OrientationType.Top>
    */
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

	/*
		Property: horizontalAlignment
            Defines items horizontal alignment relative to their parent. 
            This is usefull for control localization for right-to-left countries.
        
        Default:
            <primitives.common.HorizontalAlignmentType.Center>
    */
	this.horizontalAlignment = 0/*primitives.common.HorizontalAlignmentType.Center*/;

    /*
    Property: verticalAlignment
        Defines items vertical alignment relative to each other within one level of hierarchy. 
        It does not affect levels having same size items.
    
    Default:
        <primitives.common.VerticalAlignmentType.Middle>
*/
	this.verticalAlignment = 1/*primitives.common.VerticalAlignmentType.Middle*/;

    /*
        Property: arrowsDirection
            Sets direction of connector lines arrows.

        Default:
            <primitives.common.GroupByType.None>
    */
	this.arrowsDirection = 0/*primitives.common.GroupByType.None*/;

	/*
        Property: connectorType
           Defines connector lines style for dot and line elements. If elements are in their normal full size 
           form they are connected with squired connection lines. So this option controls connector lines style for dots only.
           
        Default:
            <primitives.common.ConnectorType.Squared>
    */
	this.connectorType = 0/*primitives.common.ConnectorType.Squared*/;

    /*
        Property: elbowType
           Style squared connectors with custom elbows.
           
        Default:
            <primitives.common.ElbowType.None>
    */
	this.elbowType = 0/*primitives.common.ElbowType.None*/;

    /*
        Property: elbowDotSize
            Size of elbow dot.
            
        Default:
            4
    */
	this.elbowDotSize = 4;

	/*
	Property: emptyDiagramMessage
	    Empty message in order to avoid blank screen. This option is supposed to say user that chart is empty when no data inside.
    */
	this.emptyDiagramMessage = "Diagram is empty.";

    /*
    Property: items
        This is chart items collection. It is regular array of items of type ItemConfig. Items reference each other via parent property. 
        So every item may have only one parent in chart. If parent set to null then item displayed at root of chart. 
        Chart can have multiple root items simultaniously. If item references missing item, then it is ignored. 
        If items loop each other they are ignored as well. It is applications responsiblity to avoid such issues.

	See Also:
        <primitives.orgdiagram.ItemConfig>
	    <primitives.orgdiagram.ItemConfig.id>
        <primitives.orgdiagram.ItemConfig.parent>
    */
	this.items = [];

    /*
    Property: annotations
        Array of annotaion objects. Chart supports several types of annotations. By default they are drawn on top of chart items and they block mouse events of UI elements placed in item templates.
        The design assumes only few of them being displayed simultanuosly in other words chart does not resolve mutual overlaps of annotations, so don't over use them. 
        This is especially true for connectors and background annotations.

    See also:
        <primitives.orgdiagram.ConnectorAnnotationConfig>
        <primitives.orgdiagram.ShapeAnnotationConfig>
        <primitives.orgdiagram.BackgroundAnnotationConfig>
        <primitives.orgdiagram.HighlightPathAnnotationConfig>
    */
	this.annotations = [];

    /*
    Property: cursorItem
        Cursor item id - it is single item selection mode, user selects new cursor item on mouse click. 
        Cursor defines current local zoom placement or in other words current navigation item in the chart,
        all items relative to cursor always shoun in full size. So user can see all possible items around cursor in full size 
        and can continue navigation around chart. So when user navigates from one item to another clicking on thems and changing cursor item
        in chart, chart minimizes items going out of cursor scope and shows in full size items relative to new cursor position.
        If it is null then no cursor shown on diagram.

	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
        <primitives.orgdiagram.Config.onCursorChanging>
        <primitives.orgdiagram.Config.onCursorChanged>
    */
	this.cursorItem = null;

	/*
	Property: highlightItem
	    Highlighted item id. Highlight is mouse over affect, but using this option applicatin can set highlight at any item 
        in the chart programmatically. It can be used for chart syncronization with other controls on UI having mouse over effect. 
        See primitives.orgdiagram.Config.update method arguments description for fast chart update.
        If it is null then no highlight shown on diagram.

	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
        <primitives.orgdiagram.Config.onHighlightChanging>
        <primitives.orgdiagram.Config.onHighlightChanged>
    */
	this.highligtItem = null;


	/*
	Property: selectedItems
	    Defines array of selected item ids. Chart allows to select items via checking checkboxes under items. Checkboxes are 
        shown only for full size items. So when item is selected it is always shown in full size, so check box always visible for selcted items.
        User can navigate around large diagram and check intrested items in order to keep them opened. So that way chart provides 
        means to show several items on large diagram and fit everything into minimal space ideally into available screen space.
        Application can select items programmatically using this array or receive notifications from chart about user selections with following events.

	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
        <primitives.orgdiagram.Config.onSelectionChanging>
        <primitives.orgdiagram.Config.onSelectionChanged>
    */
	this.selectedItems = [];

	/*
    Property: hasSelectorCheckbox
        This option controls selection check boxes visibility. 

    Auto - Checkbox shown only for current cursor item only.
    True - Every full size item has selection check box.
    False - No check boxes. Application can still programmatically select some items in the chart. 
    Application may provide custom item template having checkbox inside of item. If application defined check box inside of item template has name="checkbox"
    it is auto used as default selection check box.

    Default:
        <primitives.common.Enabled.Auto>

	See Also:
        <primitives.orgdiagram.ItemConfig.hasSelectorCheckbox>
        <primitives.orgdiagram.Config.onSelectionChanging>
        <primitives.orgdiagram.Config.onSelectionChanged>
    */
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

    /*
        Property: selectCheckBoxLabel
            Selection check box label. 
    */
	this.selectCheckBoxLabel = "Selected";

	/*
	Property: selectionPathMode
	    Defines the way items between root item and selectedItems displayed in diagram. Chart always shows all items between cursor item and its root in full size.
        But if cursor positioned on root item, then chart shows in full size only selected items in the chart. So this option controls items size between 
        selected items and root item of the chart. By default all items betwen root and selected items shown in full size.
	    
	Default:
	    <primitives.common.SelectionPathMode.FullStack>
    */
	this.selectionPathMode = 1/*primitives.common.SelectionPathMode.FullStack*/;

	/*
	Property: templates
	    Custom user templates collection. TemplateConfig is complex object providing options to customize item's content template, 
        cursor tempate and highlight template. Every template config should have unique name property, which is used by chart and its item configs 
        to reference them. Chart's defaultTemplateName allows to make template default for all items in the chart. On other hand user may define templates
        to individual items in the chart by templateName property of item config.

	See also:
	    <primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.defaultTemplateName>
		<primitives.orgdiagram.ItemConfig.templateName>
    */
	this.templates = [];

	/*
	    Property: defaultTemplateName
		    This is template name used to render items having no <primitives.orgdiagram.ItemConfig.templateName> defined.


		See Also:
			<primitives.orgdiagram.TemplateConfig>
			<primitives.orgdiagram.TemplateConfig.name>
			<primitives.orgdiagram.Config.templates>
	*/
	this.defaultTemplateName = null;

	/*
    Property: hasButtons
        This option controls user buttons visibility. 

    Auto - Buttons visible only for cursor item.
    True - Every normal item has buttons visible.
    False - No buttons.

    Default:
		<primitives.common.Enabled.Auto>
    */
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: buttons
	    Custom user buttons displayed on right side of item. This collection provides simple way to define context buttons for every item. 
        The only limitation, they are all the same. So if you need to have unique buttons for every item, then you have to 
        customize cursor templates and manually create custom buttons inside of them.
	    
	See also:
	    <primitives.orgdiagram.ButtonConfig>
    */
	this.buttons = [];

	/*
    Event: onHighlightChanging
        Notifies about changing highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.
        This coupled event with <primitives.orgdiagram.Config.onHighlightChanged>, it is fired before highlight update.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onHighlightChanging = null;

	/*
	Event: onHighlightChanged
	    Notifies about changed highlight item <primitives.orgdiagram.Config.highlightItem> in diagram.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onHighlightChanged = null;

	/*
    Event: onCursorChanging
        Notifies about changing cursor item <primitives.orgdiagram.Config.cursorItem> in diagram.
        This coupled event with <primitives.orgdiagram.Config.onCursorChanged>, it is fired before layout update.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onCursorChanging = null;

	/*
	Event: onCursorChanged
	    Notifies about changed cursor item <primitives.orgdiagram.Config.cursorItem> in diagram .

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onCursorChanged = null;

	/*
	Event: onSelectionChanging
	    Notifies about changing selected items collection of <primitives.orgdiagram.Config.selectedItems>.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onSelectionChanging = null;

	/*
	Event: onSelectionChanged
	    Notifies about changes in collection of <primitives.orgdiagram.Config.selectedItems>.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onSelectionChanged = null;

	/*
	Event: onButtonClick
	    Notifies about click of custom user button defined in colelction of <primitives.orgdiagram.Config.buttons>.

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onButtonClick = null;

	/*
	Event: onMouseClick
	    On mouse click event. 

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onMouseClick = null;

    /*
    Event: onMouseDblClick
        On mouse double click event. 

    See also:
        <primitives.orgdiagram.EventArgs>
    */
	this.onMouseDblClick = null;

	/*
	Event: onItemRender
	    Item templates don't provide means to bind data of items into templates. So this event handler gives application such possibility.
        If application uses custom templates then this method is called to populate template with items properties.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.orgdiagram.TemplateConfig>
        <primitives.orgdiagram.Config.templates>
    */
	this.onItemRender = null;

	/*
	Event: onHighlightRender
	    If user defined custom highlight template for item template 
		then this method is called to populate it with context data.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.orgdiagram.TemplateConfig>
        <primitives.orgdiagram.Config.templates>
    */
	this.onHighlightRender = null;
	/*
	Event: onCursorRender
	    If user defined custom cursor template for item template 
		then this method is called to populate it with context data.

    See also:
        <primitives.common.RenderEventArgs>
        <primitives.orgdiagram.TemplateConfig>
        <primitives.orgdiagram.Config.templates>
    */
	this.onCursorRender = null;
	/*
	Property: normalLevelShift
	    Defines interval after level of items in  diagram having items in normal state.
    */
	this.normalLevelShift = 20;
	/*
	Property: dotLevelShift
	    Defines interval after level of items in  diagram having all items in dot state.
    */
	this.dotLevelShift = 20;
	/*
	Property: lineLevelShift
	    Defines interval after level of items in  diagram having items in line state.
    */
	this.lineLevelShift = 10;

	/*
	Property: normalItemsInterval
	    Defines interval between items at the same level in  diagram having items in normal state.
    */
	this.normalItemsInterval = 10;
	/*
	Property: dotItemsInterval
	    Defines interval between items at the same level in  diagram having items in dot state.
    */
	this.dotItemsInterval = 1;
	/*
	Property: lineItemsInterval
	    Defines interval between items at the same level in  diagram having items in line state.
    */
	this.lineItemsInterval = 2;

	/*
	Property: cousinsIntervalMultiplier
        Use this interval multiplier between cousins in hiearchy. The idea of this option to make extra space between cousins. 
        So children belonging to different parents have extra gap between them.
		
	*/
	this.cousinsIntervalMultiplier = 5;

	/*
	method: update
	    Makes full redraw of diagram contents reevaluating all options. This method has to be called explisitly after all options are set in order to update widget contents.
	
	Parameters:
	    updateMode: This parameter defines severaty of update <primitives.common.UpdateMode>. 
	    For example <primitives.common.UpdateMode.Refresh> updates only 
		items and selection reusing existing elements where ever it is possible.

    See also:
        <primitives.common.UpdateMode>

    Default:
        <primitives.common.UpdateMode.Recreate>
    */

	/*
    Property: itemTitleFirstFontColor
    This property customizes default template title font color. 
	Item background color sometimes play a role of logical value and 
	can vary over a wide range, so as a result title having 
	default font color may become unreadable. Widgets selects the best font color 
	between this option and <primitives.orgdiagram.Config.itemTitleSecondFontColor>.

    See Also:
		<primitives.orgdiagram.ItemConfig.itemTitleColor>
		<primitives.orgdiagram.Config.itemTitleSecondFontColor>
		<primitives.common.highestContrast>

    */
	this.itemTitleFirstFontColor = "#ffffff"/*primitives.common.Colors.White*/;

	/*
	Property: itemTitleSecondFontColor
	Default template title second font color.
    */
	this.itemTitleSecondFontColor = "#000080"/*primitives.common.Colors.Navy*/;

    /*
        Property: minimizedItemShapeType
            Defines minimized item shape. The border line width is set with <primitives.orgdiagram.TemplateConfig.minimizedItemBorderWidth>
            By default minimized item is rounded rectangle filled with item title color.


        See also:
            <primitives.orgdiagram.TemplateConfig.minimizedItemCornerRadius>
            <primitives.orgdiagram.ItemConfig.itemTitleColor>
            <primitives.orgdiagram.ItemConfig.minimizedItemShapeType>

        Default:
            <primitives.common.ShapeType.None>
    */
	this.minimizedItemShapeType = 6/*primitives.common.ShapeType.None*/;

	/*
    Property: linesColor
        Connectors lines color. Connectors are basic connections betwen chart items 
        defining their logical relationships, don't mix with connector annotations. 
    */
	this.linesColor = "#c0c0c0"/*primitives.common.Colors.Silver*/;

	/*
    Property: linesWidth
        Connectors lines width.
    */
	this.linesWidth = 1;

    /*
    Property: linesType
        Connectors line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.linesType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: highlightLinesColor
        Connectors highlight line color. Connectors are basic connections betwen chart items 
        defining their logical relationships, don't mix with connector annotations. 
    */
	this.highlightLinesColor = "#ff0000"/*primitives.common.Colors.Red*/;

    /*
    Property: highlightLinesWidth
        Connectors highlight line width.
    */
	this.highlightLinesWidth = 1;

    /*
    Property: highlightLinesType
        Connectors highlight line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.highlightLinesType = 0/*primitives.common.LineType.Solid*/;

	/*
	Property: showCallout
		This option controls callout visibility for dotted items. 

	Default:
	    true
	*/
	this.showCallout = true;

	/*
	Property: defaultCalloutTemplateName
		This is template name used to render callouts for dotted items. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>


	See Also:
		<primitives.orgdiagram.Config.templates> collection property.

	Default:
	    null
	*/
	this.defaultCalloutTemplateName = null;

	/*
    Property: calloutfillColor
        Annotation callout fill color.
    */
	this.calloutfillColor = "#000000";

	/*
    Property: calloutBorderColor
        Annotation callout border color.
    */
	this.calloutBorderColor = null;

	/*
    Property: calloutOffset
        Annotation callout offset.
    */
	this.calloutOffset = 4;

	/*
    Property: calloutCornerRadius
        Annotation callout corner radius.
    */
	this.calloutCornerRadius = 4;

	/*
    Property: calloutPointerWidth
        Annotation callout pointer base width.
    */
	this.calloutPointerWidth = "10%";

	/*
    Property: calloutLineWidth
        Annotation callout border line width.
    */
	this.calloutLineWidth = 1;

	/*
    Property: calloutOpacity
        Annotation callout opacity.
    */
	this.calloutOpacity = 0.2;

	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;

	/*
    Property: leavesPlacementType
        Defines leaves placement form. Leaves are children having no sub children.
    */
	this.leavesPlacementType = 2/*primitives.common.ChildrenPlacementType.Horizontal*/;

	/*
    Property: maximumColumnsInMatrix
        Maximum number of columns for matrix leaves layout. Leaves are children having no sub children.
	*/
	this.maximumColumnsInMatrix = 6;

	/*
    Property: buttonsPanelSize
        User buttons panel size.
    */
	this.buttonsPanelSize = 28;

	/*
    Property: groupTitlePanelSize
        Group title panel size.
    */
	this.groupTitlePanelSize = 24;

	/*
    Property: checkBoxPanelSize
        Selection check box panel size.
    */
	this.checkBoxPanelSize = 24;

	this.distance = 3;

	/*
	Property: minimumScale
		Minimum CSS3 scale transform. Available on mobile safary only.
	*/
	this.minimumScale = 0.5;

	/*
	Property: maximumScale
		Maximum CSS3 scale transform. Available on mobile safary only.
	*/
	this.maximumScale = 1;

	/*
	Property: showLabels
		This option controls labels visibility for minimized items. If you need to show labels outside of borders of regular items then use item template for customization.
        Labels placed inside HTML DIV element and long strings are wrapped inside. 
		User can control labels position relative to its item. Chart does not meassure labels and does reserve space for them, 
		so if label overlap each other then horizontal or vertical intervals between rows and items shoud be manually increased.
    
	Auto - depends on available space.
    True - always shown.
    False - hidden.

    See Also:
		<primitives.orgdiagram.ItemConfig.label>
		<primitives.orgdiagram.Config.labelSize>
		<primitives.orgdiagram.Config.normalItemsInterval>
		<primitives.orgdiagram.Config.dotItemsInterval>
		<primitives.orgdiagram.Config.lineItemsInterval>
		<primitives.orgdiagram.Config.normalLevelShift>
		<primitives.orgdiagram.Config.dotLevelShift>
		<primitives.orgdiagram.Config.lineLevelShift>

	Default:
	    <primitives.common.Enabled.Auto>
	*/
	this.showLabels = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width.

	Default:
		new <primitives.common.Size>(80, 24);
	*/
	this.labelSize = new primitives.common.Size(80, 24);

	/*
	Property: labelOffset
		Defines label offset from dot in pixels.

	Default:
		1;
	*/
	this.labelOffset = 1;

	/*
	Property: labelOrientation
		Defines label orientation. 

    See Also:
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Horizontal>
	*/
	this.labelOrientation = 0/*primitives.text.TextOrientationType.Horizontal*/;

	/*
	Property: labelPlacement
		Defines label placement relative to its dot. 
		Label is aligned to opposite side of its box.

	See Also:
	<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Top>
	*/
	this.labelPlacement = 1/*primitives.common.PlacementType.Top*/;

	/*
	Property: labelFontSize
		Label font size. 

	Default:
		10px
*/
	this.labelFontSize = "10px";

	/*
	    Property: labelFontFamily
			Label font family. 

		Default:
			"Arial"
    */
	this.labelFontFamily = "Arial";

	/*
	    Property: labelColor
			Label color. 

		Default:
			primitives.common.Colors.Black
    */
	this.labelColor = "#000000"/*primitives.common.Colors.Black*/;

	/*
	    Property: labelFontWeight
			Font weight: normal | bold

		Default:
			"normal"
    */
	this.labelFontWeight = "normal";

	/*
    Property: labelFontStyle
        Font style: normal | italic
        
    Default:
        "normal"
    */
	this.labelFontStyle = "normal";

	/*
	Property: enablePanning
		Enable chart panning with mouse drag & drop for desktop browsers.
        Disable it if you need to support items Drag & Drop.

	Default:
		true
	*/
	this.enablePanning = true;

    /*
    Property: printPreviewPageSize
        Defines print preview page size in pixels. 

    Default:
        new <primitives.common.Size>(612, 792);
    */
	this.printPreviewPageSize = new primitives.common.Size(612, 792);

    /*
    Property: autoSizeMinimum
        Defines minimum diagram size in autosize mode. If diagram has no elements, it is going to be of this size on the page.  
    Default:
        new <primitives.common.Size>(800, 600);
    */
	this.autoSizeMinimum = new primitives.common.Size(800, 600);

    /*
    Property: autoSizeMaximum
        Defines maximum diagram size in autosize mode.
    Default:
        new <primitives.common.Size>(1024, 768);
    */
	this.autoSizeMaximum = new primitives.common.Size(1024, 768);
};
/*
    Class: primitives.orgdiagram.ConnectorAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw connector between two items.
    
    See Also:
	    <primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.ConnectorAnnotationConfig = function (arg0, arg1) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Connector>

    See Also:
	    <primitives.orgdiagram.Config.annotations>
        <primitives.orgdiagram.ShapeAnnotationConfig>
        <primitives.orgdiagram.BackgroundAnnotationConfig>
        <primitives.orgdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 0/*primitives.common.AnnotationType.Connector*/;

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Foreground>
    */
    this.zOrderType = 2/*primitives.common.ZOrderType.Foreground*/;

    /*
	Property: fromItem 
	    Reference to from item in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.fromItem = null;

    /*
    Property: toItem 
        Reference to from item in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.toItem = null;

    /*
    Property: connectorShapeType
        Connector shape type. 

    Default:
        <primitives.common.ConnectorShapeType.OneWay>
    */
    this.connectorShapeType = 0/*primitives.common.ConnectorShapeType.OneWay*/;

    /*
    Property: labelPlacementType
        Label placement type along connection line(s). 

    Default:
        <primitives.common.ConnectorLabelPlacementType.Between>
    */
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;

    /*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);

    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: color
        Connector's color.
    
    Default:
        <primitives.common.Colors.Black>
    */
    this.color = "#000000"/*primitives.common.Colors.Black*/;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.orgdiagram.Config.selectedItems>
    */
    this.selectItems = true;

    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
    this.label = null;

    /*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
    this.labelSize = new primitives.common.Size(60, 30);

    switch (arguments.length) {
        case 1:
            for (property in arg0) {
                if (arg0.hasOwnProperty(property)) {
                    this[property] = arg0[property];
                }
            }
            break;
        case 2:
            this.fromItem = arg0;
            this.toItem = arg1;
            break;
    }
};
/*
    Class: primitives.orgdiagram.HighlightPathAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw path between items.
        Path is drawn along base connection lines displaying relationships between item of the chart.
    See Also:
	    <primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.HighlightPathAnnotationConfig = function (arg0) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.HighlightPath>

    See Also:
	    <primitives.orgdiagram.Config.annotations>
        <primitives.orgdiagram.ConnectorAnnotationConfig>
        <primitives.orgdiagram.ShapeAnnotationConfig>
        <primitives.orgdiagram.BackgroundAnnotationConfig>
    */
    this.annotationType = 2/*primitives.common.AnnotationType.HighlightPath*/;

    /*
	Property: items 
	    Array of item ids in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.items = [];


    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.orgdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
/*
    Class: primitives.orgdiagram.ItemConfig
		Defines item in diagram hierarchy. 
		User is supposed to create hierarchy of this items and assign it to <primitives.orgdiagram.Config.items> collection property.
		Widget contains some generic properties used in default item template, 
		but user can add as many custom properties to this class as needed. 
		Just be careful and avoid widget malfunction.

    See Also:
		<primitives.orgdiagram.Config.items>
*/
primitives.orgdiagram.ItemConfig = function (arg0, arg1, arg2, arg3, arg4) {
    var property;
    /*
	Property: id
	Unique item id.
    */
    this.id = null;

    /*
    Property: parent
    Parent id. If parent is null then item placed as a root item.
    */
    this.parent = null;

	/*
	Property: title
	Default template title property.
    */
	this.title = null;

	/*
	Property: description
	Default template description element.
    */
	this.description = null;

	/*
	Property: image
	Url to image. This property is used in default template.
    */
	this.image = null;

    /*
    Property: context
    User context object.
    */
	this.context = null;

	/*
	Property: itemTitleColor
	Default template title background color.
    */
	this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

    /*
    Property: minimizedItemShapeType
        Defines minimized/dotted item shape type. By default it is set by ItemTemplate.minimizedItemShapeType property.
        Use this property to set marker type individually per item.

    See Also:
        <primitives.common.ShapeType>
    */
	this.minimizedItemShapeType = null;

	/*
    Property: groupTitle
    Auxiliary group title property. Displayed vertically on the side of item.
    */
	this.groupTitle = null;

	/*
    Property: groupTitleColor
    Group title background color.
    */
	this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/;

	/*
    Property: isVisible
        If it is true then item is shown and selectable in hierarchy. 
		If item is hidden and it has visible children then only connector line is drawn instead of it.

    True - Item is shown.
    False - Item is hidden.

    Default:
		true
    */
	this.isVisible = true;

    /*
    Property: isActive
        If it is true then item is selectable in hierarchy and it has mouse over highlight. 

    True - Item is clickable.
    False - Item is inactive and user cannot set cursor item or highlight.

    Default:
        true
    */
	this.isActive = true;

	/*
    Property: hasSelectorCheckbox
        If it is true then selection check box is shown for the item. 
		Selected items are always shown in normal form, so if item is 
		selected then its selection check box is visible and checked.

    Auto - Depends on <primitives.orgdiagram.Config.hasSelectorCheckbox> setting.
    True - Selection check box is visible.
    False - No selection check box.

    Default:
    <primitives.common.Enabled.Auto>
    */
	this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/;

	/*
    Property: hasButtons
        This option controls buttons panel visibility. 

    Auto - Depends on <primitives.orgdiagram.Config.hasButtons> setting.
    True - Has buttons panel.
    False - No buttons panel.

    Default:
    <primitives.common.Enabled.Auto>
    */
	this.hasButtons = 0/*primitives.common.Enabled.Auto*/;

	/*
		Property: itemType
			This property defines how item should be shown. 
			So far it is only possible to make it invisible.
	
		See Also:
			<primitives.orgdiagram.ItemType>
		
		Deafult:
			<primitives.orgdiagram.ItemType.Regular>
    */
	this.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/;

	/*
		Property: adviserPlacementType
			In case of item types <primitives.orgdiagram.ItemType.Assistant> 
			and <primitives.orgdiagram.ItemType.Adviser> this option defines item 
			placement side relative to parent. By default items placed on 
			the right side of parent item.

		Deafult:
			<primitives.common.AdviserPlacementType.Auto>
    */
	this.adviserPlacementType = 0/*primitives.common.AdviserPlacementType.Auto*/;

	/*
	Property: childrenPlacementType
		Defines children placement form.
	*/
	this.childrenPlacementType = 0/*primitives.common.ChildrenPlacementType.Auto*/;

	/*
	Property: templateName
		This is template name used to render this item.

		See Also:
		<primitives.orgdiagram.TemplateConfig>
		<primitives.orgdiagram.Config.templates> collection property.
    */
	this.templateName = null;

	/*
	Property: showCallout
		This option controls items callout visibility.

	Auto - depends on <primitives.orgdiagram.Config.showCallout> option
	True - shown
	False - hidden

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showCallout = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: calloutTemplateName
		This is template name used to render callout for dotted item. 
		Actual callout template name is defined by following sequence:
		<primitives.orgdiagram.ItemConfig.calloutTemplateName> 
		<primitives.orgdiagram.ItemConfig.templateName>
		<primitives.orgdiagram.Config.defaultCalloutTemplateName>
		<primitives.orgdiagram.Config.defaultTemplateName>

	See Also:
		<primitives.orgdiagram.Config.templates> collection property.
	Default:
		null
	*/
	this.calloutTemplateName = null;

	/*
	Property: label
	Items label text.
	*/
	this.label = null;

	/*
	Property: showLabel
		This option controls items label visibility. Label is displayed in form of div having text inside, long string is wrapped inside of it. 
		User can control labels position relative to its item. Chart does not preserve space for label.

	Auto - depends on <primitives.orgdiagram.Config.labelOrientation> setting.
	True - always shown.
	False - hidden.

	See Also:
	<primitives.orgdiagram.ItemConfig.label>
	<primitives.orgdiagram.Config.labelSize>

	Default:
		<primitives.common.Enabled.Auto>
	*/
	this.showLabel = 0/*primitives.common.Enabled.Auto*/;

	/*
	Property: labelSize
		Defines label size. It is needed to avoid labels overlapping. If one label overlaps another label or item it will be hidden. 
		Label string is wrapped when its length exceeds available width. 
		By default it is equal to charts <primitives.orgdiagram.Config.labelSize>.

	See Also:
		<primitives.common.Size>
	Default:
		null;
	*/
	this.labelSize = null;

	/*
	Property: labelOrientation
		Defines label orientation. 
		In default <primitives.text.TextOrientationType.Auto> mode it depends on chart <primitives.orgdiagram.Config.labelOrientation> setting.

    See Also:
	<primitives.orgdiagram.Config.labelOrientation>
    <primitives.text.TextOrientationType>

	Default:
		<primitives.text.TextOrientationType.Auto>
	*/
	this.labelOrientation = 3/*primitives.text.TextOrientationType.Auto*/;

	/*
	Property: labelPlacement
		Defines label placement relative to the item. 
		In default <primitives.common.PlacementType.Auto> mode it depends on chart <primitives.orgdiagram.Config.labelPlacement> setting.

	See Also:
		<primitives.orgdiagram.Config.labelPlacement>
		<primitives.common.PlacementType>

	Default:
		<primitives.common.PlacementType.Auto>
	*/
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

	switch (arguments.length) {
	    case 1:
	        for (property in arg0) {
	            if (arg0.hasOwnProperty(property)) {
	                this[property] = arg0[property];
	            }
	        }
	        break;
	    case 5:
	        this.id = arg0;
	        this.parent = arg1;
			this.title = arg2;
			this.description = arg3;
			this.image = arg4;
			break;
	}
};
/*
    Class: primitives.orgdiagram.ShapeAnnotationConfig
	    Options class. Populate annotation collection with instances of this objects to draw shape benith or on top of several items.
        Shape is drawn as rectangular area.
    See Also:
	    <primitives.orgdiagram.Config.annotations>
*/
primitives.orgdiagram.ShapeAnnotationConfig = function (arg0) {
    var property;

    /*
    Property: annotationType
        Annotation type. All various annotations are defined in annotations collection property of <primitives.orgdiagram.Config>. 
        So this property is needed to define annotation type when we use JavaScript non-prototype objects.
        See other annotations as well.

    Default:
        <primitives.common.AnnotationType.Shape>

    See Also:
	    <primitives.orgdiagram.Config.annotations>
        <primitives.orgdiagram.ConnectorAnnotationConfig>
        <primitives.orgdiagram.BackgroundAnnotationConfig>
        <primitives.orgdiagram.HighlightPathAnnotationConfig>
    */
    this.annotationType = 1/*primitives.common.AnnotationType.Shape*/;

    /*
    Property: zOrderType
        Defines annotation Z order placement relative to chart items. Chart items are drawn in layers on top of each other. We can draw annotations under the items or over them. 
        If you place annotations over items then you block mouse events of UI elements in them. Browsers don't support mouse events transparentcy consistently. 
        So in order to avoid mouse events blocking of UI elements in item templates you have to place annotation items under them.
        Take into account that chart default buttons are drawn on top of everyhting, so they are never blocked by annotations drawn over items.

    Default:
        <primitives.common.ZOrderType.Auto>
    */
    this.zOrderType = 0/*primitives.common.ZOrderType.Auto*/;

    /*
	Property: items 
	    Array of items ids in hierarchy.
	See Also:
	    <primitives.orgdiagram.ItemConfig.id>
    */
    this.items = [];

    /*
    Property: shapeType
        Shape type. 

    Default:
        <primitives.common.ShapeType.Rectangle>
    */
    this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;

    /*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);

    /*
    Property: lineWidth
        Border line width. 
    */
    this.lineWidth = 2;

    /*
    Property: cornerRadius
        Body corner radius in percents or pixels. For applicable shapes only.
    */
    this.cornerRadius = "10%";

    /*
    Property: opacity
        Background color opacity. For applicable shapes only.
    */
    this.opacity = 1;

    /*
    Property: borderColor
        Shape border line color.
    
    Default:
        null
    */
    this.borderColor = null;

    /*
    Property: fillColor
        Fill Color. 

    Default:
        null
    */
    this.fillColor = null;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
    this.lineType = 0/*primitives.common.LineType.Solid*/;

    /*
    Property: selectItems
        Always show annotated items in normal state. Setting this option is equivalent to adding annotated items to collection of selected items.

    Default:
	    true

    See Also:
	    <primitives.orgdiagram.Config.selectedItems>
    */
    this.selectItems = false;

    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
    this.label = null;

    /*
	Property: labelSize
		Annotation label size.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
    this.labelSize = new primitives.common.Size(60, 30);

    /*
    Property: labelPlacement
        Defines label placement relative to the shape. 

    See Also:
        <primitives.orgdiagram.Config.labelPlacement>
        <primitives.common.PlacementType>

    Default:
        <primitives.common.PlacementType.Auto>
    */
    this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

    /*
    Property: labelOffset
        Defines label offset from shape in pixels.

    Default:
        4;
    */
    this.labelOffset = 4;

    switch (arguments.length) {
        case 1:
            if (arg0 !== null) {
                if (arg0 instanceof Array) {
                    this.items = arg0;
                } else if (typeof arg0 == "object") {
                    for (property in arg0) {
                        if (arg0.hasOwnProperty(property)) {
                            this[property] = arg0[property];
                        }
                    }
                }
            }
            break;
    }
};
primitives.orgdiagram.Controller = function () {
	this.widgetEventPrefix = "orgdiagram";

	this.parent = primitives.orgdiagram.BaseController.prototype;
	this.parent.constructor.apply(this, arguments);

	this.options = new primitives.orgdiagram.Config();

	this.options.linesPalette = [];
};

primitives.orgdiagram.Controller.prototype = new primitives.orgdiagram.BaseController();

primitives.orgdiagram.Controller.prototype._virtualGetEventArgs = function (oldTreeItem, newTreeItem, name) {
    var result = new primitives.orgdiagram.EventArgs(),
        offset,
        placeholderOffset;

    if (oldTreeItem != null && oldTreeItem.itemConfig && oldTreeItem.itemConfig.id != null) {
        result.oldContext = this._configs.node(oldTreeItem.itemConfig.id);
    }

    if (newTreeItem != null && newTreeItem.itemConfig && newTreeItem.itemConfig.id != null) {
        result.context = this._configs.node(newTreeItem.itemConfig.id);

        if (newTreeItem.itemConfig.parent !== null) {
            result.parentItem = this._configs.parent(newTreeItem.itemConfig.id);
        }

        placeholderOffset = this.m_placeholder.offset();
        offset = this.element.offset();
        result.position = new primitives.common.Rect(newTreeItem.actualPosition)
                .translate(placeholderOffset.left, placeholderOffset.top)
                .translate(-offset.left, -offset.top);
    }

    if (name != null) {
        result.name = name;
    }

    return result;
};
primitives.orgdiagram.Controller.prototype._virtualCreateOrgTree = function () {
    var orgItem,
        orgItemRoot,
        userItem,
        index, len,
        index2, len2,
        property, properties,
        defaultItemConfig,
        maximumId,
        parsedId;

    // User API items defining organizationor family chart depending on implementation
    this._configs = primitives.common.tree(); /*tree contains primitives.orgdiagram.ItemConfig */

    // Organizational chart definition 
    this._orgTree = primitives.common.tree(); /*tree primitives.orgdiagram.OrgItem */

	if (this.options.items != null && this.options.items.length > 0) {
	    // Folowing properties we copy from user's item config to new OrgItem instance
	    // If user's property is undefined we take default value from ItemConfig
	    properties = [
            'title', 'description', 'image',
            'itemTitleColor', 'groupTitle', 'groupTitleColor',
            'isVisible', 'isActive', 'hasSelectorCheckbox', 'hasButtons',
            'itemType', 'adviserPlacementType', 'childrenPlacementType',
            'templateName', 'showCallout', 'calloutTemplateName',
            'label', 'showLabel', 'labelSize', 'labelOrientation', 'labelPlacement',
            'minimizedItemShapeType'
	    ];
	    defaultItemConfig = new primitives.orgdiagram.ItemConfig();


	    maximumId = 0;
	    /* convert items to hash table */
	    for (index = 0, len = this.options.items.length; index < len; index += 1) {
	        userItem = this.options.items[index];
	        /* user should define unique id for every ItemConfig otherwise we ignore it
               if parent does not exists in the tree then item is considered as root item
            */
	        if (userItem.id != null) {
	            this._configs.add(userItem.parent, userItem.id, userItem);

	            /* Organizational chart ItemConfig is almost the same as OrgItem 
                   except options used to draw connectors in multi parent chart
                */
	            orgItem = new primitives.orgdiagram.OrgItem();

                // OrgItem id coinsides with ItemConfig id since we don't add any new org items to user's org chart definition
	            orgItem.id = userItem.id;

	            parsedId = parseInt(userItem.id, 10);
	            maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);

	            /* Keep reference to user's ItemConfig in context */
	            orgItem.context = userItem;

	            /* copy general org chart items properties */
	            for (index2 = 0, len2 = properties.length; index2 < len2; index2+=1) {
	                property = properties[index2];

	                orgItem[property] = userItem[property] !== undefined ? userItem[property] : defaultItemConfig[property];
	            }

	            // Collect org items
	            this._orgTree.add(userItem.parent, orgItem.id, orgItem);

	            /* We ignore looped items, it is applications responsibility to control data consistency */
	        }
	    }
	    /* create chart root */
	    maximumId += 1;
	    orgItemRoot = new primitives.orgdiagram.OrgItem();
	    orgItemRoot.id = maximumId;
	    orgItemRoot.hideParentConnection = true;
	    orgItemRoot.hideChildrenConnection = true;
	    orgItemRoot.title = "internal root";
	    orgItemRoot.isVisible = false;

	    this._orgTree.add(null, orgItemRoot.id, orgItemRoot);

	    this._orgTree.loopLevels(this, function (nodeid, node, levelid) {
	        if (levelid > 0) {
	            return this._orgTree.BREAK;
	        }
	        if (orgItemRoot.id != nodeid) {
	            this._orgTree.adopt(orgItemRoot.id, nodeid);

	            /* root item must be regular */
	            node.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/;
	        }
	    });

	    this._hideRootConnectors(this._orgTree);
	}
};

primitives.orgdiagram.Controller.prototype._hideRootConnectors = function (orgTree) {
    orgTree.loopLevels(this, function (nodeid, node, levelid) {
        var allRegular = true;
        if (!node.isVisible) {
            orgTree.loopChildren(this, nodeid, function (childid, child, index) {
                if (child.itemType != 0/*primitives.orgdiagram.ItemType.Regular*/) {
                    allRegular = false;
                    return true; // break
                }
            }); //ignore jslint

            if (allRegular) {
                node.hideChildrenConnection = true;

                orgTree.loopChildren(this, nodeid, function (childid, child, index) {
                    child.hideParentConnection = true;
                });
            } else {
                return orgTree.SKIP; // skip children
            }
        } else {
            return orgTree.SKIP;
        }
    });
};

primitives.orgdiagram.Controller.prototype._defineNavigationParent = function (parentItem, treeItem, skipFirstParent) {
    var parents = [];

    /* take logicalParentItem when it is visible or collect all visible immidiate parents of logicalParentItem */
    if (skipFirstParent || !parentItem.actualIsActive || parentItem.visibility == 4/*primitives.common.Visibility.Invisible*/) {
        this._navigationFamily.loopParents(this, parentItem.id, function (parentid, parent, level) {
            if (parent.actualIsActive && parent.visibility != 4/*primitives.common.Visibility.Invisible*/) {
                parents.push(parentid);
                return this._navigationFamily.SKIP;
            }
        });
    } else {
        parents.push(parentItem.id);
    }
    if (this._navigationFamily.node(treeItem.id) != null) {
        this._navigationFamily.adopt(parents, treeItem.id);
    } else {
        this._navigationFamily.add(parents, treeItem.id, treeItem);
    }
};

primitives.orgdiagram.Controller.prototype._virtualShowCursorNeighbours = function () {
    if (this._cursorTreeItem !== null) {
        /* Select the item itself */
        if (this._cursorTreeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
            this._cursorTreeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
        }

        /* show cursor full stack */
        switch (this.options.selectionPathMode) {
            case 0/*primitives.common.SelectionPathMode.None*/:
                break;
            case 1/*primitives.common.SelectionPathMode.FullStack*/:
                /* select all parents up to the root */
                this._navigationFamily.loopParents(this, this._cursorTreeItem.id, function (parentItemId, parentItem) {
                    if (parentItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
                        parentItem.visibility = 1/*primitives.common.Visibility.Normal*/;
                    }
                });
                break;
        }

        /* select all neighbours */
        this._navigationFamily.loopNeighbours(this, this._cursorTreeItem.id, function (treeItemId, treeItem, distance) {
            if (treeItem.visibility === 0/*primitives.common.Visibility.Auto*/) {
                treeItem.visibility = 1/*primitives.common.Visibility.Normal*/;
            }
            return true;
        });
    }
};
primitives.orgdiagram.ConnectorPoint = function () {
    this.parent = primitives.common.Point.prototype;
    this.parent.constructor.apply(this, arguments);

    this.hasElbow = false;
    this.elbowPoint1 = null;
    this.elbowPoint2 = null;

    this.visibility = null;

    this.isSquared = true;
    this.highlightPath = 0;
    
    this.connectorStyleType = 1/*primitives.common.ConnectorStyleType.Regular*/;
};

primitives.orgdiagram.ConnectorPoint.prototype = new primitives.common.Point();
primitives.orgdiagram.LevelVisibility = function (level, currentvisibility) {
	this.level = level;
	this.currentvisibility = currentvisibility;
};
/* This is model class is used to define intermediate organizational chart structure */
primitives.orgdiagram.OrgItem = function () {
    this.id = null; // Unique org item id. 
    this.context = null; // Reference to user item config used to create this org item element


    this.title = null; // Default template title property.
    this.description = null; // Default template description element.
    this.image = null; // Url to image. This property is used in default template.

    this.itemTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/; // Default template title background color.
    this.minimizedItemShapeType = null;
    this.groupTitle = null; // Auxiliary group title property. Displayed vertically on the side of item.
    this.groupTitleColor = "#4169e1"/*primitives.common.Colors.RoyalBlue*/; //  Group title background color.

    this.isVisible = true; // If it is true then item is shown and selectable in hierarchy. 
    this.isActive = true; // If it is true then item is clickable in hierarchy. 
    this.hasVisibleChildren = false; // If it is true then item is Visible or one of its children in hierarchy. 

    this.hasSelectorCheckbox = 0/*primitives.common.Enabled.Auto*/; //  If it is true then selection check box is shown for the item. 
    this.hasButtons = 0/*primitives.common.Enabled.Auto*/; // This option controls buttons panel visibility. 

    this.itemType = 0/*primitives.orgdiagram.ItemType.Regular*/; // This property defines how item should be placed in chart. 
    this.adviserPlacementType = 0/*primitives.common.AdviserPlacementType.Auto*/; // Left or Right placement relative to parent
    this.childrenPlacementType = 0/*primitives.common.ChildrenPlacementType.Auto*/; // Children shape

    this.templateName = null;
    this.showCallout = 0/*primitives.common.Enabled.Auto*/;
    this.calloutTemplateName = null;

    this.label = null;
    this.showLabel = 0/*primitives.common.Enabled.Auto*/;
    this.labelSize = null; // primitives.common.Size
    this.labelOrientation = 3/*primitives.text.TextOrientationType.Auto*/;
    this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

    this.level = null;
    this.hideParentConnection = false;
    this.hideChildrenConnection = false;

    /* org tree balancing properties */
    this.childIndex = null; // Item index in array of parent's children
};
primitives.orgdiagram.Template = function (templateConfig, defaultTemplateConfig) {
    var property;

	this.widgetEventPrefix = "orgdiagram";

	this.templateConfig = templateConfig;

	for (property in defaultTemplateConfig) {
	    if (defaultTemplateConfig.hasOwnProperty(property)) {
	        this[property] = templateConfig.hasOwnProperty(property) ? templateConfig[property] : defaultTemplateConfig[property];
	    }
	}

	this.minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? this.minimizedItemSize.width / 2.0 : templateConfig.minimizedItemCornerRadius;

	this.dotHighlightTemplateHashCode = null;
	this.dotHighlightTemplate = null;

	this.itemTemplateHashCode = null;
	this.itemTemplateRenderName = "onItemRender";

	this.highlightTemplateHashCode = null;
	this.highlightTemplateRenderName = "onHighlightRender";

	this.cursorTemplateHashCode = null;
	this.cursorTemplateRenderName = "onCursorRender";

	this.boxModel = jQuery.support.boxModel;
};


primitives.orgdiagram.Template.prototype.createDefaultTemplates = function () {

	if (primitives.common.isNullOrEmpty(this.itemTemplate)) {
		this.itemTemplate = this._getDefaultItemTemplate();
		this.itemTemplateRenderName = "onDefaultTemplateRender";
	}
	this.itemTemplateHashCode = primitives.common.hashCode(this.itemTemplate);

	if (primitives.common.isNullOrEmpty(this.cursorTemplate)) {
		this.cursorTemplate = this._getDefaultCursorTemplate();
		this.cursorTemplateRenderName = null;
	}
	this.cursorTemplateHashCode = primitives.common.hashCode(this.cursorTemplate);

	if (primitives.common.isNullOrEmpty(this.highlightTemplate)) {
		this.highlightTemplate = this._getDefaultHighlightTemplate();
		this.highlightTemplateRenderName = null;
	}
	this.highlightTemplateHashCode = primitives.common.hashCode(this.highlightTemplate);

	this.dotHighlightTemplate = this._getDotHighlightTemplate();
	this.dotHighlightTemplateHashCode = primitives.common.hashCode(this._getDotHighlightTemplate);
};

primitives.orgdiagram.Template.prototype._getDefaultItemTemplate = function () {
	var contentSize = new primitives.common.Size(this.itemSize),
		itemTemplate,
		titleBackground,
		title,
		photoborder,
		photo,
		description;
	contentSize.width -= (this.boxModel ? this.itemBorderWidth * 2 : 0);
	contentSize.height -= (this.boxModel ? this.itemBorderWidth * 2 : 0);

	itemTemplate = jQuery('<div></div>')
        .css({
			"border-width": this.itemBorderWidth + "px"
        }).addClass("bp-item bp-corner-all bt-item-frame");

	titleBackground = jQuery('<div name="titleBackground"></div>')
		.css({
			top: "2px",
			left: "2px",
			width: (contentSize.width - 4) + "px",
			height: "18px"
        }).addClass("bp-item bp-corner-all bp-title-frame");

	itemTemplate.append(titleBackground);

	title = jQuery('<div name="title"></div>')
		.css({
			top: "1px",
			left: "4px",
			width: (contentSize.width - 4 - 4 * 2) + "px",
			height: "16px"
		}).addClass("bp-item bp-title");

	titleBackground.append(title);

	photoborder = jQuery("<div></div>")
		.css({
			top: "24px",
			left: "2px",
			width: "50px",
			height: "60px"
		}).addClass("bp-item bp-photo-frame");

	itemTemplate.append(photoborder);

	photo = jQuery('<img name="photo" alt=""></img>')
		.css({
			width: "50px",
			height: "60px"
		});
	photoborder.append(photo);

	description = jQuery('<div name="description"></div>')
	.css({
		top: "24px",
		left: "56px",
		width: (contentSize.width - 4 - 56) + "px",
		height: "74px"
	}).addClass("bp-item bp-description");

	itemTemplate.append(description);

	return itemTemplate.wrap('<div>').parent().html();
};

primitives.orgdiagram.Template.prototype._getDefaultCursorTemplate = function () {
	var cursorTemplate = jQuery("<div></div>")
	.css({
		width: (this.itemSize.width + this.cursorPadding.left + this.cursorPadding.right) + "px",
		height: (this.itemSize.height + this.cursorPadding.top + this.cursorPadding.bottom) + "px",
		"border-width": this.cursorBorderWidth + "px"
	}).addClass("bp-item bp-corner-all bp-cursor-frame");

	return cursorTemplate.wrap('<div>').parent().html();
};

primitives.orgdiagram.Template.prototype._getDefaultHighlightTemplate = function () {
	var highlightTemplate = jQuery("<div></div>")
	.css({
		"border-width": this.highlightBorderWidth + "px"
	}).addClass("bp-item bp-corner-all bp-highlight-frame");

	return highlightTemplate.wrap('<div>').parent().html();
};

primitives.orgdiagram.Template.prototype._getDotHighlightTemplate = function () {
    var radius = this.minimizedItemCornerRadius + this.highlightPadding.left,
    highlightTemplate = jQuery("<div></div>")
	.css({
	    "border-width": this.highlightBorderWidth + "px",
	    "-moz-border-radius": radius,
	    "-webkit-border-radius": radius,
	    "-khtml-border-radius": radius,
	    "border-radius": radius
	}).addClass("bp-item bp-highlight-dot-frame");

    return highlightTemplate.wrap('<div>').parent().html();
};
/* This is model class used to define visual structure of chart */
primitives.orgdiagram.TreeItem = function (id) {
    // User item config 
    this.itemConfig = null;
    // Org Chart Item definition
    this.orgItem = null;

    /* auto generated internal item id */
    this.id = id;

    /* Visual child id which is supposed to be straight under it */
	this.visualAggregatorId = null;
	this.visualDepth = 1;

	this.partners = []; /* thess are nodes connected with bottom line together into one family, family is group of items having common set of children */
	this.extraPartners = []; /* this is partners which are not part of organizational chart tree, but must be connected */
	this.partnerAggregatorId = null;

	this.partnerConnectorOffset = 0;

	this.visibility = 1/*primitives.common.Visibility.Normal*/;

	this.template = null;

	this.level = null;
	this.levelPosition = null;
	this.offset = 0;
	this.leftPadding = 0;
	this.rightPadding = 0;

	this.actualVisibility = 1/*primitives.common.Visibility.Normal*/;
	this.actualSize = null;
	this.actualPosition = null;
	this.contentPosition = null;

	this.isCursor = false;
	this.isSelected = false;

	this.actualIsActive = false;

	this.actualHasSelectorCheckbox = false;
	this.actualHasButtons = false;
	this.actualHasGroupTitle = false;

	this.actualItemType = null; // primitives.orgdiagram.ItemType
	this.connectorPlacement = 0; // primitives.common.SideFlag
	this.gravity = 0; // primitives.common.HorizontalAlignmentType.Center
	this.highlightPath = 0;
	this.partnerHighlightPath = 0;

    /* This value is used to increase gap between neighboring left item in hiearchy */
	this.relationDegree = 0;
};

primitives.orgdiagram.TreeItem.prototype.setActualSize = function (treeLevel, options) {
	var common = primitives.common;
	this.actualVisibility = (this.visibility === 0/*primitives.common.Visibility.Auto*/) ? treeLevel.currentvisibility : this.visibility;

	switch (this.actualVisibility) {
		case 1/*primitives.common.Visibility.Normal*/:
			this.actualSize = new common.Size(this.template.itemSize);
			this.contentPosition = new common.Rect(0, 0, this.actualSize.width, this.actualSize.height);
			if (this.isCursor) {
				this.actualSize.height += this.template.cursorPadding.top + this.template.cursorPadding.bottom;
				this.actualSize.width += this.template.cursorPadding.left + this.template.cursorPadding.right;
				this.contentPosition.x = this.template.cursorPadding.left;
				this.contentPosition.y = this.template.cursorPadding.top;
			}
			if (this.actualHasSelectorCheckbox) {
				this.actualSize.height += options.checkBoxPanelSize;
			}
			if (this.actualHasButtons) {
				this.actualSize.width += options.buttonsPanelSize;
			}
			this.actualHasGroupTitle = !common.isNullOrEmpty(this.orgItem.groupTitle);
			if (this.actualHasGroupTitle) {
				this.actualSize.width += options.groupTitlePanelSize;
				this.contentPosition.x += options.groupTitlePanelSize;
			}
			break;
		case 2/*primitives.common.Visibility.Dot*/:
			this.actualSize = new common.Size(this.template.minimizedItemSize);
			break;
		case 3/*primitives.common.Visibility.Line*/:
		case 4/*primitives.common.Visibility.Invisible*/:
			this.actualSize = new common.Size();
			break;
	}

	switch (options.orientationType) {
		case 2/*primitives.common.OrientationType.Left*/:
		case 3/*primitives.common.OrientationType.Right*/:
			this.actualSize.invert();
			break;
	}
};

primitives.orgdiagram.TreeItem.prototype.setActualPosition = function (treeLevel, options) {
    var itemShift = 0;

    switch (this.actualVisibility) {
        case 1/*primitives.common.Visibility.Normal*/:
            switch (options.verticalAlignment) {
                case 0/*primitives.common.VerticalAlignmentType.Top*/:
                    itemShift = 0;
                    break;
                case 1/*primitives.common.VerticalAlignmentType.Middle*/:
                    itemShift = (treeLevel.depth - this.actualSize.height) / 2.0;
                    break;
                case 2/*primitives.common.VerticalAlignmentType.Bottom*/:
                    itemShift = treeLevel.depth - this.actualSize.height;
                    break;
            }
            break;
        case 2/*primitives.common.Visibility.Dot*/:
        case 3/*primitives.common.Visibility.Line*/:
        case 4/*primitives.common.Visibility.Invisible*/:
            itemShift = treeLevel.horizontalConnectorsDepth - this.actualSize.height / 2.0;
            break;
    }

	this.actualPosition = new primitives.common.Rect(this.offset, treeLevel.shift + itemShift, this.actualSize.width, this.actualSize.height);

	switch (options.orientationType) {
		case 2/*primitives.common.OrientationType.Left*/:
		case 3/*primitives.common.OrientationType.Right*/:
			this.actualSize.invert();
			break;
	}
};

primitives.orgdiagram.TreeItem.prototype.toString = function () {
	return this.id;
};
primitives.orgdiagram.TreeLevel = function (level) {
	this.level = level;
	this.currentvisibility = 1/*primitives.common.Visibility.Normal*/;
	this.actualVisibility = 1/*primitives.common.Visibility.Normal*/;
	

	this.shift = 0.0; /* top abolute position of items in level */
	this.depth = 0.0; /* maximum  height of items in level */
	this.nextLevelShift = 0.0; /* next level relative position */
	this.currentOffset = 0.0; /* this is x axis coordinate offset, it used to calculate horizontal items position in level */
	this.horizontalConnectorsDepth = 0; /* relative position of horizontal connectors between items */
	this.topConnectorShift = 0.0; /* relative position of top connector horizontal line */
	this.connectorShift = 0.0; /* relative position of bottom horizontal line */
	this.levelSpace = 0.0; /* user interval between prev level and this one based on options set by user, if number of horizontal connections is bigger that one it is proportionally increased */

	this.partnerConnectorOffset = 0; /* number of overlapping horiontal connection lines between partners in level */

	this.treeItems = [];
	this.activeTreeItems = []; /* clickable items */

	this.labels = [];
	this.labelsRect = null;
	this.showLabels = true;
	this.hasFixedLabels = false;
};

primitives.orgdiagram.TreeLevel.prototype.setShift = function (shift, levelSpace, topConnectorSpace, connectorSpace) {
    this.shift = shift;
    this.levelSpace = levelSpace;

    this.topConnectorShift = -levelSpace / 2.0 - topConnectorSpace;
    this.connectorShift = this.depth + connectorSpace + (this.partnerConnectorOffset + 1) * (levelSpace / 2.0);
    this.nextLevelShift = topConnectorSpace + this.depth + connectorSpace + levelSpace + this.partnerConnectorOffset * levelSpace / 2.0;

    return this.nextLevelShift;
};

primitives.orgdiagram.TreeLevel.prototype.shiftDown = function (shift) {
    this.shift += shift;    
};

primitives.orgdiagram.TreeLevel.prototype.toString = function () {
	return this.level + "." + this.currentvisibility;
};
/*
 * jQuery UI Diagram
 *
 * Basic Primitives organization diagram.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.orgDiagram", jQuery.ui.mouse2, new primitives.orgdiagram.Controller());
}(jQuery));
/*
    Class: primitives.connector.Config
	    Connector options class.
	
*/
primitives.shape.Config = function () {
    this.classPrefix = "bpconnector";

	/*
	    Property: graphicsType
            Preferable graphics type. If preferred graphics type is not supported widget switches to first available. 

		Default:
			<primitives.common.GraphicsType.SVG>
    */
	this.graphicsType = 1/*primitives.common.GraphicsType.Canvas*/;

	/*
    Property: actualGraphicsType
        Actual graphics type.
    */
	this.actualGraphicsType = null;

    /*
		Property: orientationType
			Diagram orientation. 

		Default:
			<primitives.common.OrientationType.Top>
    */
	this.orientationType = 0/*primitives.common.OrientationType.Top*/;

    /*
		Property: shapeType
			Shape type. 

		Default:
			<primitives.common.ShapeType.Rectangle>
    */
	this.shapeType = 0/*primitives.common.ShapeType.Rectangle*/;

	/*
	Property: position
	    Defines shapes rectangle position. 
        
    Type:
        <primitives.common.Rect>.
    */
	this.position = null;

	/*
    Property: offset
        Connector's from and to points offset off the rectangles side. Connectors connection points can be outside of rectangles and inside for negative offset value.
    See also:
        <primitives.common.Thickness>
    */
	this.offset = new primitives.common.Thickness(0, 0, 0, 0);

	/*
    Property: lineWidth
        Border line width. 
    */
	this.lineWidth = 2;

    /*
    Property: cornerRadius
        Body corner radius in percents or pixels. 
    */
	this.cornerRadius = "10%";

    /*
    Property: opacity
        Background color opacity. 
    */
	this.opacity = 1;

	/*
    Property: borderColor
        Shape border line color.
    
    Default:
        <primitives.common.Colors.Black>
    */
	this.borderColor = null;

    /*
    Property: fillColor
        Fill Color. 
    
    Default:
        <primitives.common.Colors.Gray>
    */
	this.fillColor = null;

    /*
    Property: lineType
        Connector's line pattern.

    Default:
        <primitives.common.LineType.Solid>
    */
	this.lineType = 0/*primitives.common.LineType.Solid*/;


    /*
    Property: label
        Annotation label text. Label styled with css class name "bp-connector-label".
    */
	this.label = null;

    /*
	Property: labelSize
		Defines label size. It is needed to preserve space for label without overlapping connected items.

	Default:
		new <primitives.common.Size>(60, 30);
	*/
	this.labelSize = new primitives.common.Size(60, 30);

    /*
    Property: labelPlacement
        Defines label placement relative to the shape. 

    See Also:
        <primitives.orgdiagram.Config.labelPlacement>
        <primitives.common.PlacementType>

    Default:
        <primitives.common.PlacementType.Auto>
    */
	this.labelPlacement = 0/*primitives.common.PlacementType.Auto*/;

    /*
    Property: labelOffset
        Defines label offset from shape in pixels.

    Default:
        4;
    */
	this.labelOffset = 4;

	/*
	method: update
	    Makes full redraw of connector widget contents reevaluating all options.
    */
};
primitives.shape.Controller = function () {
	this.widgetEventPrefix = "bpshape";

	this.options = new primitives.shape.Config();

	this.m_placeholder = null;
	this.m_panelSize = null;

	this.m_graphics = null;

	this.m_shape = null;

	this._labelTemplate = null;
	this._labelTemplateHashCode = null;
};

primitives.shape.Controller.prototype._create = function () {
    var self = this;

	this.element
			.addClass("ui-widget");

	this._createLabelTemplate();
	this._createLayout();

	this.options.onAnnotationLabelTemplateRender = function (event, data) { self._onAnnotationLabelTemplateRender(event, data); };

	this._redraw();
};

primitives.shape.Controller.prototype.destroy = function () {
    this._cleanLayout();

    this.options.onLabelTemplateRender = null;
};

primitives.shape.Controller.prototype._createLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());

	this.m_placeholder = jQuery('<div></div>');
	this.m_placeholder.css({
		"position": "relative",
		"overflow": "hidden",
		"top": "0px",
		"left": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	this.m_placeholder.css(this.m_panelSize.getCSS());
	this.m_placeholder.addClass("placeholder");
	this.m_placeholder.addClass(this.widgetEventPrefix);

	this.element.append(this.m_placeholder);

	this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);

	this.options.actualGraphicsType = this.m_graphics.graphicsType;
};

primitives.shape.Controller.prototype._cleanLayout = function () {
	if (this.m_graphics !== null) {
		this.m_graphics.clean();
	}
	this.m_graphics = null;

	this.element.find("." + this.widgetEventPrefix).remove();
};

primitives.shape.Controller.prototype._updateLayout = function () {
	this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
	this.m_placeholder.css(this.m_panelSize.getCSS());
};

primitives.shape.Controller.prototype.update = function (recreate) {
	if (recreate) {
		this._cleanLayout();
		this._createLayout();
		this._redraw();
	}
	else {
		this._updateLayout();
		this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height);
		this.m_graphics.begin();
		this._redraw();
		this.m_graphics.end();
	}
};

primitives.shape.Controller.prototype._createLabelTemplate = function () {
    var template = jQuery('<div></div>');
    template.addClass("bp-item bp-corner-all bp-connector-label");

    this._labelTemplate = template.wrap('<div>').parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate);
};

primitives.shape.Controller.prototype._onAnnotationLabelTemplateRender = function (event, data) {//ignore jslint
    var label = data.element.html(this.options.label);
};

primitives.shape.Controller.prototype._redraw = function () {
    var names = ["orientationType", "shapeType", "offset", "lineWidth", "borderColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "cornerRadius", "opacity", "fillColor"],
		index,
		name;
    this.m_graphics.activate("placeholder");

    this.m_shape = new primitives.common.Shape(this.m_graphics);
	for (index = 0; index < names.length; index += 1) {
	    name = names[index];
        this.m_shape[name] = this.options[name];
	}
	this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
	this.m_shape.labelTemplate = this._labelTemplate;
	this.m_shape.labelTemplateHashCode = this._labelTemplateHashCode;
	this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
	this.m_shape.draw(this.options.position);
};

primitives.shape.Controller.prototype._setOption = function (key, value) {
	jQuery.Widget.prototype._setOption.apply(this, arguments);

	switch (key) {
		case "disabled":
			var handles = jQuery([]);
			if (value) {
				handles.filter(".ui-state-focus").blur();
				handles.removeClass("ui-state-hover");
				handles.propAttr("disabled", true);
				this.element.addClass("ui-disabled");
			} else {
				handles.propAttr("disabled", false);
				this.element.removeClass("ui-disabled");
			}
			break;
		default:
			break;
	}
};
/*
 * jQuery UI Shape
 *
 * Basic Primitives Shape.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
    $.widget("ui.bpShape", new primitives.shape.Controller());
}(jQuery));

