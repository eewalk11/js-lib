


;(function() {



	/**
	 * Construct a new Draggable element.
	 * @constructor
	 * @param {String}  text The text to be displayed in this draggable element.
	 * @param {Object}  options Options for this container. Leave undefined to use defaults. See
	 * README.md for information about constructor options.
	 * @throws {Error} If jQuery is not defined.
	 */
	EeWalk11.Dropbox.Draggable = function(text, opts)
	{
		//Check for jQuery
		if(!EeWalk11.jQuery.isJQueryDefined()) {
			throw new Error("jQuery is required to construct a Draggable element");
		}

		//Get a numeric ID for this Draggable
		var thisID = draggableID++;
		this.getDraggableId = function() {
			return thisID;
		};

		//Create a DOM element
		var $elem = jQuery("<div id='jsdb-draggable-" + thisID
				+ "' class='jsdb-draggable' draggable='true'>" + text + "</div>");

		//Create a private data object for this instance
		draggableData.push(new EeWalk11.Dropbox.DraggableData($elem, text, opts));

		//Add this to the Draggables array
		draggables.push(this);

		//Apply event listeners
		applyEvents.call(this);
		applyHoverEvents.call(this);
	};



	/**
	 * Constructor alias.
	 * @type {Function}
	 */
	var Draggable = EeWalk11.Dropbox.Draggable;

	/**
	 * An incrementing ID that will be used as an index to access data for a Draggable instance.
	 * @type {Number}
	 */
	var draggableID = 0;

	/**
	 * Stores objects with private data for each Draggable instance.
	 * @type {Object}
	 */
	var draggableData = [];

	/**
	 * An array of all Draggable instances.
	 * @type {Array}
	 */
	var draggables = [];



	/**
	 * Run each drop function provided in the constructor options.
	 * @param {Boolean}  validDrop  True if this draggable was dropped in a valid drop location.
	 */
	EeWalk11.Dropbox.Draggable.prototype.dropped = function(validDrop) {
		var dropped = draggableData[this.getDraggableId()].dropped;
		if(Array.isArray(dropped)) {
			for(var i = 0; i < dropped.length; i++) {
				var func = dropped[i];
				if(typeof func === "function") {
					func.call(this, validDrop);
				}
			}
		}
	};



	/**
	 * Determine if a variable is an equivalent Draggable element. By default, the unique Draggable
	 * IDs will be compared.
	 * @param {EeWalk11.Dropbox.Draggable}  cmp  The variable to compare.
	 * @return {Boolean}  True if the argument is a Draggable instance with the same ID as this one.
	 */
	EeWalk11.Dropbox.Draggable.prototype.equals = function(cmp) {
		return cmp instanceof Draggable && this.getDraggableId() === cmp.getDraggableId();
	};



	/**
	 * Get the Container that this element is added to.
	 * @return {EeWalk11.Dropbox.Container|Boolean}  The Container, false if this Draggable element
	 *                                               has not been added to a container.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getContainer = function() {
		return EeWalk11.Dropbox.Container.getContainer(this);
	};



	/**
	 * Get the data to transfer with the drag and drop event. By default the Draggable element's
	 * text will be transferred.
	 * @returns {String}  The data to transfer.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getData = function() {
		return this.getText();
	};



	/**
	 * Get the DOM element for this Draggable element.
	 * @return {jQuery}  The DOM element.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getElement = function() {
		return draggableData[this.getDraggableId()].$elem;
	};



	/**
	 * Get the DOM element's ID for this Draggable element.
	 * @return {String}  The element ID.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getElementId = function() {
		return this.getElement().attr("id");
	};



	/**
	 * Get the position (index) of this Draggable element in its Container.
	 * @return {Number|Boolean}  The position, false if this Draggable element is not added to a
	 *                           Container.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getPosition = function() {
		var container = this.getContainer();
		return container ? container.getPosition(this) : false;
	};



	/**
	 * Get a string used for sorting this Draggable element in a Container. By default, the text
	 * will be returned. If different behavior is needed, this method can be overridden by a child
	 * prototype.
	 * @return {String}  A sort string.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getSortString = function() {
		return draggableData[this.getDraggableId()].text;
	};



	/**
	 * Get the text to display for this Draggable element.
	 * @returns {String}  The text.
	 */
	EeWalk11.Dropbox.Draggable.prototype.getText = function() {
		return draggableData[this.getDraggableId()].text;
	};



	/**
	 * Get a Draggable element given an argument.
	 * @param {Number|HTMLElement|jQuery|EeWalk11.Dropbox.Draggable}
	 *        arg0  A Draggable element's numeric ID or the element's DOM element/element ID. The
	 *              Draggable element itself can also be passed, in which case it will simply be
	 *              returned.
	 * @return {EeWalk11.Dropbox.Draggable|Boolean}  The Draggable element, false on failure.
	 */
	EeWalk11.Dropbox.Draggable.getDraggable = function(arg0) {
		if(arg0 instanceof Draggable) {
			return arg0;
		}
		if(typeof arg0 === "number") {
			return getDraggableFromId(arg0);
		}
		return getDraggableFromElement(arg0);
	};



	/**
	 * Apply event listeners to this Draggable element.
	 */
	function applyEvents() {
		var Events = EeWalk11.Dropbox.Events;
		var element = this.getElement().get(0);
		element.addEventListener("dragstart", Events.onDragstart);
		element.addEventListener("dragend", Events.onDragend);
	}



	/**
	 * Apply hover animations to this Draggable element. If hover animation options were not
	 * provided in the constructor, this method will do nothing.
	 */
	function applyHoverEvents() {
		var data = draggableData[this.getDraggableId()];
		if(data.hoverOptions) {
			EeWalk11.Animate.hoverAnimation(data.$elem, data.hoverOptions);
		}
	}



	/**
	 * Get a Draggable element from a DOM element ID.
	 * @param {String}  element  The DOM element to get the Draggable element for.
	 * @return {EeWalk11.Dropbox.Draggable|Boolean}  The Draggable element, false on failure.
	 */
	function getDraggableFromElement(element) {
		var elementID = EeWalk11.toElementId(element);
		if(elementID) {
			for(var i = 0; i < draggables.length; i++) {
				var draggable = draggables[i];
				if(draggable.getElementId() === elementID) {
					return draggable;
				}
			}
		}
		return false;
	}



	/**
	 * Get a Draggable element from a Draggable ID.
	 * @param {Number}  id  The Draggable ID.
	 * @return {EeWalk11.Dropbox.Draggable|Boolean}  The Draggable element, false on failure.
	 */
	function getDraggableFromId(id) {
		for(var i = 0; i < draggables.length; i++) {
			var draggable = draggables[i];
			if(draggable.getDraggableId() === id) {
				return draggable;
			}
		}
		return false;
	}



})();


