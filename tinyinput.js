var TI = (function() {
	
	/**
	 * Boolean value to preventDefault() the input actions.
	 * @private
	 * @type {Boolean}
	 * @since 0.1
	*/
	var preventDefaultActions = false;
	
	/**
	 * An object that keeps track of key presses based on their .keyCode values as object keys.
	 * @private
	 * @type {Object.<Number, Boolean>}
	 * @since 0.1
	 */
	var currentlyPressedKeys = {};

	/**
	 * Used to fire an event only once when a key is pressed, not the entire time the key is held.
	 * @private
	 * @type {Object.<Number, Boolean>}
	 * @since 0.1
	 */
	var flaggedKeys = {};
	
	/**
	 * Handles the onkeydown document event.
	 * @private
	 * @param {Object} event The document's onkeydown event.
	 * @since 0.1
	 */
	function handleKeyDown(event) {
		currentlyPressedKeys[event.keyCode] = true;
		if (preventDefaultActions) event.preventDefault();
	}

	/**
	 * Handles the onkeyup document event.
	 * @private
	 * @param {Object} event The document's onkeyup event.
	 * @since 0.1
	 */
	function handleKeyUp(event) {
		currentlyPressedKeys[event.keyCode] = false;
		flaggedKeys[event.keyCode] = false;
		if (preventDefaultActions) event.preventDefault();
	}
	
	/**
	 * An object that keeps track of button presses based on their .button values as object keys.
	 * @private
	 * @type {Object.<Number, Boolean>}
	 * @since 0.1
	 */
	var currentlyPressedButtons = {};
	
	/**
	 * Used to fire an event only once when a button is pressed, not the entire time the button is held.
	 * @private
	 * @type {Object.<Number, Boolean>}
	 * @since 0.1
	 */
	var flaggedButtons = {};
	
	/**
	 * An object representing the mouse position.
	 * @private
	 * @type {Object.<String, Number>}
	 * @since 0.1
	*/
	var mousePosition = {
		x: 0,
		y: 0
	}
	
	/**
	 * Handles the onmousedown mouse event.
	 * @private
	 * @param {Object} event The document's onmousedown event.
	 * @since 0.1
	*/
	function handleMouseDown(event) {
		currentlyPressedButtons[event.button] = true;
	}
	
	/**
	 * Handles the onmouseup mouse event.
	 * @private
	 * @param {Object} event The document's onmouseup event.
	 * @since 0.1
	*/
	function handleMouseUp(event) {
		currentlyPressedButtons[event.button] = false;
		flaggedButtons[event.button] = false;
	}
	
	/**
	 * Handles the onmousemove mouse event.
	 * @private
	 * @param {Object} event The document's onmousemove event.
	 * @since 0.1
	*/
	function handleMouseMovement(event) {
		mousePosition.x = event.clientX;
		mousePosition.y = event.clientY;
	}
	
	/**
	 * Initializes the properties of the keyboard key values.
	 * @private
	 * @since 0.1
	*/
	function initialize() {
		for (var i = 0; i < 256; i++) {
			flaggedKeys[i] = false;
		}
		for (var i = 0; i < 3; i++) {
			flaggedButtons[i] = false;
		}
		
		TI.KEYSTRINGS = {
			"backspace":       8,
			"tab":             9,
			"enter":          13,
			"shift":          16,
			"control":        17,
			"alt":            18,
			"pausebreak":     19,
			"caps lock":      20,
			"escape":         27,
			"space":          32,
			"page up":        33,
			"page down":      34,
			"end":            35,
			"home":           36,
			"left":           37,
			"up":             38,
			"right":          39,
			"down":           40,
			"insert":         45,
			"delete":         46,
			"0":              48,
			"1":              49,
			"2":              50,
			"3":              51,
			"4":              52,
			"5":              53,
			"6":              54,
			"7":              55,
			"8":              56,
			"9":              57,
			"a":              65,
			"b":              66,
			"c":              67,
			"d":              68,
			"e":              69,
			"f":              70,
			"g":              71,
			"h":              72,
			"i":              73,
			"j":              74,
			"k":              75,
			"l":              76,
			"m":              77,
			"n":              78,
			"o":              79,
			"p":              80,
			"q":              81,
			"r":              82,
			"s":              83,
			"t":              84,
			"u":              85,
			"v":              86,
			"w":              87,
			"x":              88,
			"y":              89,
			"z":              90,
			"windows":        91,
			"menu":           93,
			"numpad 0":       96,
			"numpad 1":       97,
			"numpad 2":       98,
			"numpad 3":       99,
			"numpad 4":      100,
			"numpad 5":      101,
			"numpad 6":      102,
			"numpad 7":      103,
			"numpad 8":      104,
			"numpad 9":      105,
			"numpad star":   106,
			"numpad plus":   107,
			"numpad minus":  109,
			"numpad period": 110,
			"numpad slash":  111,
			"f1":            112,
			"f2":            113,
			"f3":            114,
			"f4":            115,
			"f5":            116,
			"f6":            117,
			"f7":            118,
			"f8":            119,
			"f9":            120,
			"f10":           121,
			"f11":           122,
			"f12":           123,
			"number lock":   144,
			"scroll lock":   145,
			"computer":      182,
			"calculator":    183,
			"semicolon":     186,
			"equals":        187,
			"comma":         188,
			"dash":          189,
			"period":        190,
			"forward slash": 191,
			"tick":          192,
			"grave":         192,
			"bracket left":  219,
			"back slash":    220,
			"bracket right": 221,
			"apostrophe":    222
		};
		
		TI.KEY_BACKSPACE            =   8;
		TI.KEY_TAB                  =   9;
		TI.KEY_ENTER                =  13;
		TI.KEY_SHIFT                =  16;
		TI.KEY_CTRL                 =  17;
		TI.KEY_ALT                  =  18;
		TI.KEY_PAUSE_BREAK          =  19;
		TI.KEY_CAPS_LOCK            =  20;
		TI.KEY_ESC                  =  27;
		TI.KEY_SPACE                =  32;
		TI.KEY_PAGE_UP              =  33;
		TI.KEY_PAGE_DOWN            =  34;
		TI.KEY_END                  =  35;
		TI.KEY_HOME                 =  36;
		TI.KEY_LEFT                 =  37;
		TI.KEY_UP                   =  38;
		TI.KEY_RIGHT                =  39;
		TI.KEY_DOWN                 =  40;
		TI.KEY_INSERT               =  45;
		TI.KEY_DELETE               =  46;
		TI.KEY_0                    =  48;
		TI.KEY_1                    =  49;
		TI.KEY_2                    =  50;
		TI.KEY_3                    =  51;
		TI.KEY_4                    =  52;
		TI.KEY_5                    =  53;
		TI.KEY_6                    =  54;
		TI.KEY_7                    =  55;
		TI.KEY_8                    =  56;
		TI.KEY_9                    =  57;
		TI.KEY_A                    =  65;
		TI.KEY_B                    =  66;
		TI.KEY_C                    =  67;
		TI.KEY_D                    =  68;
		TI.KEY_E                    =  69;
		TI.KEY_F                    =  70;
		TI.KEY_G                    =  71;
		TI.KEY_H                    =  72;
		TI.KEY_I                    =  73;
		TI.KEY_J                    =  74;
		TI.KEY_K                    =  75;
		TI.KEY_L                    =  76;
		TI.KEY_M                    =  77;
		TI.KEY_N                    =  78;
		TI.KEY_O                    =  79;
		TI.KEY_P                    =  80;
		TI.KEY_Q                    =  81;
		TI.KEY_R                    =  82;
		TI.KEY_S                    =  83;
		TI.KEY_T                    =  84;
		TI.KEY_U                    =  85;
		TI.KEY_V                    =  86;
		TI.KEY_W                    =  87;
		TI.KEY_X                    =  88;
		TI.KEY_Y                    =  89;
		TI.KEY_Z                    =  90;
		TI.KEY_WINDOWS              =  91;
		TI.KEY_RIGHT_CLICK          =  93;
		TI.KEY_NUMPAD_0             =  96;
		TI.KEY_NUMPAD_1             =  97;
		TI.KEY_NUMPAD_2             =  98;
		TI.KEY_NUMPAD_3             =  99;
		TI.KEY_NUMPAD_4             = 100;
		TI.KEY_NUMPAD_5             = 101;
		TI.KEY_NUMPAD_6             = 102;
		TI.KEY_NUMPAD_7             = 103;
		TI.KEY_NUMPAD_8             = 104;
		TI.KEY_NUMPAD_9             = 105;
		TI.KEY_NUMPAD_STAR          = 106;
		TI.KEY_NUMPAD_PLUS          = 107;
		TI.KEY_NUMPAD_MINUS         = 109;
		TI.KEY_NUMPAD_PERIOD        = 110;
		TI.KEY_NUMPAD_FORWARD_SLASH = 111;
		TI.KEY_F1                   = 112;
		TI.KEY_F2                   = 113;
		TI.KEY_F3                   = 114;
		TI.KEY_F4                   = 115;
		TI.KEY_F5                   = 116;
		TI.KEY_F6                   = 117;
		TI.KEY_F7                   = 118;
		TI.KEY_F8                   = 119;
		TI.KEY_F9                   = 120;
		TI.KEY_F10                  = 121;
		TI.KEY_F11                  = 122;
		TI.KEY_F12                  = 123;
		TI.KEY_NUM_LOCK             = 144;
		TI.KEY_SCROLL_LOCK          = 145;
		TI.KEY_COMPUTER             = 182;
		TI.KEY_CALCULATOR           = 183;
		TI.KEY_SEMICOLON            = 186;
		TI.KEY_EQUALS               = 187;
		TI.KEY_COMMA                = 188;
		TI.KEY_DASH                 = 189;
		TI.KEY_PERIOD               = 190;
		TI.KEY_FORWARD_SLASH        = 191;
		TI.KEY_TICK                 = 192;
		TI.KEY_SQUARE_LEFT          = 219;
		TI.KEY_BACKSLASH            = 220;
		TI.KEY_SQUARE_RIGHT         = 221;
		TI.KEY_APOSTROPHE           = 222;
		
		TI.BUTTONSTRINGS = {
			"left":   0,
			"middle": 1,
			"right":  2
		}
		
		TI.BUTTON_LEFT   = 0;
		TI.BUTTON_MIDDLE = 1;
		TI.BUTTON_RIGHT  = 2;
	}
	
	/**
	 * Error checks an key parameter to make sure it's a valid key.
	 * Will also convert a string input to it's numerical value.
	 * @param {Number | String} key The key value / name.
	 * @return {Number} keyvalue The converted value of the key.
	 * @throw {NoSuchElementException} The requested key isn't a valid key.
	 * @since 0.1
	*/
	function getValidKey(key) {
		var keyvalue = -1;
		if (typeof key === "string") {
			keyvalue = TI.KEYSTRINGS[key];
			if (!keyvalue) {
				throw new Error("Key \"" + key + "\" is not valid");
				return -1;
			}
		} else {
			if ((0 < key && key < 256) == false) {
				throw new Error("Unknown key: " + key);
				return -1;
			}
			keyvalue = key;
		}
		return keyvalue;
	}
	
	/**
	 * Error checks an button parameter to make sure it's a valid button.
	 * Will also convert a string input to it's numerical value.
	 * @param {Number | String} button The button value / name.
	 * @return {Number} button The converted value of the button.
	 * @throw {NoSuchElementException} The requested button isn't a valid button.
	 * @since 0.1
	*/
	function getValidButton(button) {
		if (typeof button === "string") {
			button = TI.BUTTONSTRINGS[button];
		}
		if ((-1 < button && button < 3) == false) {
			throw new Error("Unknown button: " + button);
			return -1;
		}
		return button;
	}
	
	return {
		
		/**
		 * A public wrapper function for the private init function.
		 * @since 0.1
		*/
		init: function() {
			initialize();
		},
		
		/**
		 * Sets the onkeydown and onkeyup event handlers for the document.
		 * @since 0.1
		*/
		enableKeyboard: function() {
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
		},
		
		/**
		 * Nullifies the onkeydown and onkeyup event handlers for the document.
		 * @since 0.1
		*/
		disableKeyboard: function() {
			document.onkeydown = null;
			document.onkeyup   = null;
		},
		
		/**
		 * Sets the onmousemove, onmousedown and onmouseup event handlers for the document.
		 * @since 0.1
		*/
		enableMouse: function() {
			document.onmousemove = handleMouseMovement;
			document.onmousedown = handleMouseDown;
			document.onmouseup = handleMouseUp;
		},
		
		/**
		 * Nullifies the onmousemove, onmousedown and onmouseup event handlers for the document.
		 * @since 0.1
		*/
		disableMouse: function() {
			document.onmousemove = null;
			document.onmousedown = null;
			document.onmouseup = null;
		},
		
		/**
		 * Turn event.preventDefault() off.
		 * @since 0.1
		*/
		enableDefaults: function() {
			preventDefaultActions = false;
		},
		
		/**
		 * Turn event.preventDefault() on.
		 * @since 0.1
		*/
		disableDefaults: function() {
			preventDefaultActions = true;
		},
		
		/**
		 * Enables the document's right click context menu.
		 * @since 0.1
		*/
		enableContextMenu: function() {
			document.oncontextmenu = function() { return true; }
		},
		
		/**
		 * Disables the document's right click context menu.
		 * @since 0.1
		*/
		disableContextMenu: function() {
			document.oncontextmenu = function() { return false; }
		},
		
		/**
		 * Determines whether or not the key is currently pressed.
		 * @param {Number | String} key The keyCode of the key.
		 * @return {Boolean} whether or not the key is pressed.
		 * @since 0.1
		 */
		keyHeld: function(key) {
			
			if (arguments.length > 1) {
				var total = 0;
				for (var i = 0; i < arguments.length; i++) {
					total += (TI.keyHeld(arguments[i])) ? 1 : 0;
				}
				return (total == arguments.length) ? true : false;
			}
			
			var keyvalue = getValidKey(key);
			return (currentlyPressedKeys[keyvalue]) ? true : false;
		},

		/**
		 * Determines whether or not the key was currently pressed.
		 * When true, it sets a flag and won't fire again until the key is released.
		 * @param {Number | String} key The keyCode of the key.
		 * @return {Boolean} whether or not the key was pressed.
		 * @since 0.1
		 */
		keyPressed: function(key) {
			
			if (arguments.length > 1) {
				var total = 0;
				for (var i = 0; i < arguments.length; i++) {
					total += (TI.keyPressed(arguments[i])) ? 1 : 0;
				}
				return (total == arguments.length) ? true : false;
			}
			
			var keyvalue = getValidKey(key);
			var value = false;
			if (currentlyPressedKeys[keyvalue] && flaggedKeys[keyvalue] == false) {
				value = true;
				flaggedKeys[keyvalue] = true;
			}
			return value;
		},
		
		/**
		 * Determines whether or not the mouse button is currently pressed.
		 * @param {Number | String} button The button value of the button.
		 * @return {Boolean} whether or not the button is pressed.
		 * @since 0.1
		 */
		mouseButtonHeld: function(button) {
			
			if (arguments.length > 1) {
				var total = 0;
				for (var i = 0; i < arguments.length; i++) {
					total += (TI.mouseButtonHeld(arguments[i])) ? 1 : 0;
				}
				return (total == arguments.length) ? true : false;
			}
			
			var buttonvalue = getValidButton(button);
			return (currentlyPressedButtons[buttonvalue]) ? true : false;
		},
		
		/**
		 * Determines whether or not the button was currently pressed.
		 * When true, it sets a flag and won't fire again until the button is released.
		 * @param {Number | String} button The button value of the button.
		 * @return {Boolean} whether or not the button was pressed.
		 * @since 0.1
		 */
		mouseButtonPressed: function(button) {
			
			if (arguments.length > 1) {
				var total = 0;
				for (var i = 0; i < arguments.length; i++) {
					total += (TI.mouseButtonPressed(arguments[i])) ? 1 : 0;
				}
				return (total == arguments.length) ? true : false;
			}
			
			var buttonvalue = getValidButton(button);
			var value = false;
			if (currentlyPressedButtons[buttonvalue] && flaggedButtons[buttonvalue] == false) {
				value = true;
				flaggedButtons[buttonvalue] = true;
			}
			return value;
		},
		
		/**
		 * Get the current mouse position.
		 * @return {Number} mousePosition The mousePosition object.
		 * @since 0.1
		*/
		getMousePosition: function() {
			return mousePosition;
		},
		
		/**
		 * Set the mouse position manually. Usually used to set a default mouse position.
		 * @param {Number} x X position of the mouse.
		 * @param {Number} y Y position of the mouse.
		 * @since 0.2
		*/
		setMousePosition: function(x, y) {
			mousePosition.x = x;
			mousePosition.y = y;
		}
		
	}
	
})();