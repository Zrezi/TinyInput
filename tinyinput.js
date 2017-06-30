var TINYINPUT = (function() {
	
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
		
		TINYINPUT.KEYSTRINGS = {
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
		
		TINYINPUT.KEY_BACKSPACE            =   8;
		TINYINPUT.KEY_TAB                  =   9;
		TINYINPUT.KEY_ENTER                =  13;
		TINYINPUT.KEY_SHIFT                =  16;
		TINYINPUT.KEY_CTRL                 =  17;
		TINYINPUT.KEY_ALT                  =  18;
		TINYINPUT.KEY_PAUSE_BREAK          =  19;
		TINYINPUT.KEY_CAPS_LOCK            =  20;
		TINYINPUT.KEY_ESC                  =  27;
		TINYINPUT.KEY_SPACE                =  32;
		TINYINPUT.KEY_PAGE_UP              =  33;
		TINYINPUT.KEY_PAGE_DOWN            =  34;
		TINYINPUT.KEY_END                  =  35;
		TINYINPUT.KEY_HOME                 =  36;
		TINYINPUT.KEY_LEFT                 =  37;
		TINYINPUT.KEY_UP                   =  38;
		TINYINPUT.KEY_RIGHT                =  39;
		TINYINPUT.KEY_DOWN                 =  40;
		TINYINPUT.KEY_INSERT               =  45;
		TINYINPUT.KEY_DELETE               =  46;
		TINYINPUT.KEY_0                    =  48;
		TINYINPUT.KEY_1                    =  49;
		TINYINPUT.KEY_2                    =  50;
		TINYINPUT.KEY_3                    =  51;
		TINYINPUT.KEY_4                    =  52;
		TINYINPUT.KEY_5                    =  53;
		TINYINPUT.KEY_6                    =  54;
		TINYINPUT.KEY_7                    =  55;
		TINYINPUT.KEY_8                    =  56;
		TINYINPUT.KEY_9                    =  57;
		TINYINPUT.KEY_A                    =  65;
		TINYINPUT.KEY_B                    =  66;
		TINYINPUT.KEY_C                    =  67;
		TINYINPUT.KEY_D                    =  68;
		TINYINPUT.KEY_E                    =  69;
		TINYINPUT.KEY_F                    =  70;
		TINYINPUT.KEY_G                    =  71;
		TINYINPUT.KEY_H                    =  72;
		TINYINPUT.KEY_I                    =  73;
		TINYINPUT.KEY_J                    =  74;
		TINYINPUT.KEY_K                    =  75;
		TINYINPUT.KEY_L                    =  76;
		TINYINPUT.KEY_M                    =  77;
		TINYINPUT.KEY_N                    =  78;
		TINYINPUT.KEY_O                    =  79;
		TINYINPUT.KEY_P                    =  80;
		TINYINPUT.KEY_Q                    =  81;
		TINYINPUT.KEY_R                    =  82;
		TINYINPUT.KEY_S                    =  83;
		TINYINPUT.KEY_T                    =  84;
		TINYINPUT.KEY_U                    =  85;
		TINYINPUT.KEY_V                    =  86;
		TINYINPUT.KEY_W                    =  87;
		TINYINPUT.KEY_X                    =  88;
		TINYINPUT.KEY_Y                    =  89;
		TINYINPUT.KEY_Z                    =  90;
		TINYINPUT.KEY_WINDOWS              =  91;
		TINYINPUT.KEY_RIGHT_CLICK          =  93;
		TINYINPUT.KEY_NUMPAD_0             =  96;
		TINYINPUT.KEY_NUMPAD_1             =  97;
		TINYINPUT.KEY_NUMPAD_2             =  98;
		TINYINPUT.KEY_NUMPAD_3             =  99;
		TINYINPUT.KEY_NUMPAD_4             = 100;
		TINYINPUT.KEY_NUMPAD_5             = 101;
		TINYINPUT.KEY_NUMPAD_6             = 102;
		TINYINPUT.KEY_NUMPAD_7             = 103;
		TINYINPUT.KEY_NUMPAD_8             = 104;
		TINYINPUT.KEY_NUMPAD_9             = 105;
		TINYINPUT.KEY_NUMPAD_STAR          = 106;
		TINYINPUT.KEY_NUMPAD_PLUS          = 107;
		TINYINPUT.KEY_NUMPAD_MINUS         = 109;
		TINYINPUT.KEY_NUMPAD_PERIOD        = 110;
		TINYINPUT.KEY_NUMPAD_FORWARD_SLASH = 111;
		TINYINPUT.KEY_F1                   = 112;
		TINYINPUT.KEY_F2                   = 113;
		TINYINPUT.KEY_F3                   = 114;
		TINYINPUT.KEY_F4                   = 115;
		TINYINPUT.KEY_F5                   = 116;
		TINYINPUT.KEY_F6                   = 117;
		TINYINPUT.KEY_F7                   = 118;
		TINYINPUT.KEY_F8                   = 119;
		TINYINPUT.KEY_F9                   = 120;
		TINYINPUT.KEY_F10                  = 121;
		TINYINPUT.KEY_F11                  = 122;
		TINYINPUT.KEY_F12                  = 123;
		TINYINPUT.KEY_NUM_LOCK             = 144;
		TINYINPUT.KEY_SCROLL_LOCK          = 145;
		TINYINPUT.KEY_COMPUTER             = 182;
		TINYINPUT.KEY_CALCULATOR           = 183;
		TINYINPUT.KEY_SEMICOLON            = 186;
		TINYINPUT.KEY_EQUALS               = 187;
		TINYINPUT.KEY_COMMA                = 188;
		TINYINPUT.KEY_DASH                 = 189;
		TINYINPUT.KEY_PERIOD               = 190;
		TINYINPUT.KEY_FORWARD_SLASH        = 191;
		TINYINPUT.KEY_TICK                 = 192;
		TINYINPUT.KEY_SQUARE_LEFT          = 219;
		TINYINPUT.KEY_BACKSLASH            = 220;
		TINYINPUT.KEY_SQUARE_RIGHT         = 221;
		TINYINPUT.KEY_APOSTROPHE           = 222;
		
		TINYINPUT.BUTTONSTRINGS = {
			"left":   0,
			"middle": 1,
			"right":  2
		}
		
		TINYINPUT.BUTTON_LEFT   = 0;
		TINYINPUT.BUTTON_MIDDLE = 1;
		TINYINPUT.BUTTON_RIGHT  = 2;
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
			keyvalue = TINYINPUT.KEYSTRINGS[key];
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
			button = TINYINPUT.BUTTONSTRINGS[button];
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
					total += (TINYINPUT.keyHeld(arguments[i])) ? 1 : 0;
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
					total += (TINYINPUT.keyPressed(arguments[i])) ? 1 : 0;
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
					total += (TINYINPUT.mouseButtonHeld(arguments[i])) ? 1 : 0;
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
					total += (TINYINPUT.mouseButtonPressed(arguments[i])) ? 1 : 0;
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
		
	}
	
})();