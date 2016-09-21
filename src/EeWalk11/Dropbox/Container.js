


;(function() {



	/**
	 * Construct a new Container.
	 * @constructor
	 * @param {jQuery|String|Element}  elem  The element that will act as the Container.
	 * @param {Object}                 opts  (Optional) Options for this container. Omit to use
	 *                                       defaults. See README.md for information about
	 *                                       constructor options.
	 * @throws {Error}  If jQuery is not defined or the element is invalid.
	 */
	EeWalk11.Dropbox.Container = function(elem, opts) {
		//Get a numeric ID for this Container
		var thisID = containerID++;
		this.getContainerId = function() {
			return thisID;
		};

		//Get the DOM element
		if(!EeWalk11.jQuery.isJQueryDefined()) {
			throw new Error("jQuery is required to construct a Container");
		}
		var $elem = EeWalk11.jQuery.toJQuery(elem);
		if(!$elem) {
			throw new Error("Invalid dropbox container: " + elem);
		}

		//Create a private data object for this instance
		containerData.push(new EeWalk11.Dropbox.ContainerData($elem, opts));

		//Add classes the element
		addElementClasses.call(this);

		//Add this to the Containers array
		containers.push(this);

		//Apply event listeners
		applyEvents.call(this);
	};




	/**
	 * Constructor alias.
	 * @type {Function}
	 */
	var Container = EeWalk11.Dropbox.Container;

	/**
	 * An incrementing ID that will be used as an index to access data for a Container instance.
	 * @type {Number}
	 */
	var containerID = 0;

	/**
	 * Stores objects with private data for each Container instance.
	 * @type {Object}
	 */
	var containerData = [];

	/**
	 * An array of all Container instances.
	 * @type {Array}
	 */
	var containers = [];



	/**
	 * Add a Draggable element to this Container and the DOM. If this container is sortable, the
	 * element will be appended to the Container. Otherwise, the element will be inserted into its
	 * sorted position. If the element already exists in a Container, or this Container is full,
	 * nothing will be added.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The Draggable element to add to this
	 *                                                 Container.
	 * @return {Boolean}  True if the element was added.
	 */
	EeWalk11.Dropbox.Container.prototype.add = function(draggable) {
		if(draggable instanceof EeWalk11.Dropbox.Draggable
				&& !Container.getContainer(draggable) && !this.isFull()) {
			return this.isSortable() ? appendDraggable.call(this, draggable)
					: this.insert(draggable, getSortPosition.call(this, draggable));
		}
		return false;
	};



	/**
	 * Determine if this Container has a particular Draggable element in it.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The element to check for.
	 * @return {Boolean}  True if the element is in this Container.
	 */
	EeWalk11.Dropbox.Container.prototype.contains = function(draggable) {
		if(draggable instanceof EeWalk11.Dropbox.Draggable) {
			var data = containerData[this.getContainerId()];
			for(var i = 0; i < data.draggables.length; i++) {
				if(draggable.equals(data.draggables[i])) {
					return true;
				}
			}
		}
		return false;
	};



	/**
	 * Determine if a variable is an equivalent Container. By default, the unique Container IDs will
	 * be compared.
	 * @param {EeWalk11.Dropbox.Container}  cmp  The variable to compare.
	 * @return {Boolean}  True if the argument is a Container instance with the same ID as this one.
	 */
	EeWalk11.Dropbox.Container.prototype.equals = function(cmp) {
		return cmp instanceof Container && this.getContainerId() === cmp.getContainerId();
	};



	/**
	 * Get the draggable element at the indicated index.
	 * @param {Number|String}  index  The index of the Draggable element to retrieve. "first" and
	 *                                "last" are also valid values.
	 * @return {EeWalk11.Dropbox.Draggable|Boolean}  The Draggable element, false on failure.
	 */
	EeWalk11.Dropbox.Container.prototype.get = function(index) {
		switch(index) {
			case "first": index = 0;                    break;
			case "last":  index = this.getLength() - 1; break;
			default:      index = parseInt(index);
		}
		return !Number.isNaN(index) && index < this.getLength() ?
				containerData[this.getContainerId()].draggables[index] : false;
	};



	/**
	 * Get the maximum number of Draggable elements that can be added to this Container.
	 * @return {Number}  The capacity.
	 */
	EeWalk11.Dropbox.Container.prototype.getCapacity = function() {
		return containerData[this.getContainerId()].capacity;
	};



	/**
	 * Get the DOM element for this Container.
	 * @return {jQuery}  The DOM element.
	 */
	EeWalk11.Dropbox.Container.prototype.getElement = function() {
		return containerData[this.getContainerId()].$elem;
	};



	/**
	 * Get the DOM element's ID for this Container.
	 * @return {String}  The element ID.
	 */
	EeWalk11.Dropbox.Container.prototype.getElementId = function() {
		return this.getElement().attr("id");
	};



	/**
	 * Get the number of draggable elements currently in this Container.
	 * @return {Number}  The length;
	 */
	EeWalk11.Dropbox.Container.prototype.getLength = function() {
		return containerData[this.getContainerId()].draggables.length;
	};



	/**
	 * Get the position of a Draggable element in this Container. If the element exists in this
	 * Container, its current position will be returned. If the element does not exist in this
	 * Container and this container is sortable, true will be returned. If the element does not
	 * exist in this Container and this Container is not sortable, the position of the element after
	 * adding and sorting it will be returned. If the element does not exist in this Container and
	 * the container is full, false will be returned.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The draggable element.
	 * @return {Number|Boolean}  The Draggable element's [expected] position, true if can be added
	 *                           to a custom position, false if it cannot be added.
	 */
	EeWalk11.Dropbox.Container.prototype.getPosition = function(draggable) {
		if(this.contains(draggable)) {
			//Get the current position
			var data = containerData[this.getContainerId()];
			for(var i = 0; i < data.draggables.length; i++) {
				if(draggable.equals(data.draggables[i])) {
					return i;
				}
			}
			return false;
		}

		if(this.isFull()) {
			//Cannot be added
			return false;
		}

		//Get the expected position
		return this.isSortable() ? true : getSortPosition.call(this, draggable);
	};



	/**
	 * Add a Draggable element to this Container and the DOM at a given position. If the element
	 * already exists in a Container, the index is invalid, or this Container is full, nothing will
	 * be inserted.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The Draggable element to insert into this
	 *                                                 Container.
	 * @param {Number}                      index      The index at which to insert the Draggable
	 *                                                 element.
	 * @return {Boolean}  True if the element was inserted, false otherwise.
	 */
	EeWalk11.Dropbox.Container.prototype.insert = function(draggable, index) {
		if(draggable instanceof EeWalk11.Dropbox.Draggable
				&& !Container.getContainer(draggable) && !this.isFull() && index >= 0
				&& index < this.getCapacity()) {
			//If the index is high, set it to the end of this Container's Draggables array
			var data = containerData[this.getContainerId()];
			if(index > data.draggables.length) {
				index = data.draggables.length;
			}

			//Add the Draggable element to this Container's Draggables array and the DOM
			return index === 0 ? prependDraggable.call(this, draggable)
					: insertDraggable.call(this, draggable, index);
		}
		return false;
	};



	/**
	 * Determine if this Container can add another element.
	 * @return {Boolean}  True if the Container is at capacity, false otherwise.
	 */
	EeWalk11.Dropbox.Container.prototype.isFull = function() {
		return !(this.getLength() < this.getCapacity());
	};



	/**
	 * Set/Determine if this Container is sortable by the user or not.
	 * @return {Boolean}  True if elements within this Container can be sorted by the user. False if
	 *                    elements within this Container will be automatically sorted as defined by
	 *                    the Draggable prototype's compare function.
	 */
	EeWalk11.Dropbox.Container.prototype.isSortable = function() {
		return containerData[this.getContainerId()].sortable;
	};



   /**
	 * Remove a Draggable element from this Container and the DOM.
	 * @param {EeWalk11.Dropbox.Draggable|Number}  draggable  The Draggable element to remove from
	 *                                                        this Container, or its position
	 *                                                        (index).
	 * @return {Boolean}  True if the element was removed, false otherwise.
	 */
	EeWalk11.Dropbox.Container.prototype.remove = function(draggable) {
		//Get the draggable element
		var data = containerData[this.getContainerId()];
		draggable = toDraggable.call(this,draggable);

		if(this.contains(draggable)) {
			//Remove the Draggable element from this Container's draggables array
			for(var i = 0; i < data.draggables.length; i++) {
				if(draggable.equals(data.draggables[i])) {
					data.draggables.splice(i, 1);
					break;
				}
			}

			//Remove the element from the DOM
			draggable.getElement().detach();
			return true;
		}
		return false;
	};



	/**
	 * Set a fixed height for this Container. This function's automated behavior (height is
	 * undefined) will set the height to the minimum that the Container needs to be fit all
	 * Draggable elements when at capacity. This will only work if there is a capacity set for this
	 * Container and there is at least 1 Draggable element added to the DOM.
	 * @param {Number}  height  The height of the Container (in pixels). Leave undefined for
	 *                          automated height setting.
	 * @return {Number|Boolean}  The height in pixels if the size was successfully set, false
	 *                           otherwise.
	 */
	EeWalk11.Dropbox.Container.prototype.setHeight = function(height) {
		if(typeof height === "undefined") {
			var capacity = this.getCapacity();
			var $draggables = jQuery(".jsdb-draggable");
			if(capacity < EeWalk11.MAX_SAFE_INTEGER && $draggables.length) {
				height = $draggables.eq(0).outerHeight() * capacity;
			}
		}
		else {
			height = parseInt(height);
		}

		if(height !== "undefined" && !Number.isNaN(height) && height > 0) {
			containerData[this.getContainerId()].$elem.height(height);
			return height;
		}
		return false;
	};



	/**
	 * Get a Container given an argument.
	 * @param {Number|String|HTMLElement|jQuery|EeWalk11.Dropbox.Container}
	 *        arg0  A Container's numeric ID, the Container's DOM element/element ID, or a Draggable
	 *        element that is in the Container. The Container itself can also be passed, in which
	 *        case it will simply be returned.
	 * @return {EeWalk11.Dropbox.Container|Boolean}  The Container, false on failure.
	 */
	EeWalk11.Dropbox.Container.getContainer = function(arg0) {
		if(arg0 instanceof Container) {
			return arg0;
		}
		if(typeof arg0 === "number") {
			return getContainerFromId(arg0);
		}
		if(arg0 instanceof EeWalk11.Dropbox.Draggable) {
			return getContainerFromDraggable(arg0);
		}
		return getContainerFromElement(arg0);
	};



	/**
	 * Set a fixed height for each Container instance. <b>Only use this function if all Containers
	 * should be the same height.</b>
	 * @param {Number}  height  The height (in pixels). Leave undefined for automated height
	 *                          setting.
	 * @return {Boolean}  True if heights were successfully set, false otherwise.
	 */
	EeWalk11.Dropbox.Container.setHeights = function(height) {
		var isHeightSet = typeof height === "undefined" ? false : true;
		for(var i = 0; i < containers.length; i++) {
			var setting = containers[i].setHeight(height);
			if(setting === false) {
				return false;
			}
			if(!isHeightSet) {
				height      = setting;
				isHeightSet = true;
			}
		}
	};



	/**
	 * Append a Draggable element to this Container.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The draggable element.
	 * @return {Boolean}  True.
	 */
	function appendDraggable(draggable) {
		var data = containerData[this.getContainerId()];
		data.draggables.push(draggable);
		draggable.getElement().appendTo(data.$elem);
		return true;
	}



	/**
	 * Apply event listeners to this Container.
	 */
	function applyEvents() {
		var Events = EeWalk11.Dropbox.Events;
		if(containers.length === 1) {
			//Add document events when the first Container is created
			document.addEventListener("dragover", Events.onDragover);
			document.addEventListener("drop", Events.onDrop);
			document.addEventListener("dragenter", Events.onDragenter);
		}
	}



	/**
	 * Add classes to the DOM element for this container.
	 * @this EeWalk11.Dropbox.Container
	 */
	function addElementClasses() {
		var classes = "jsdb-container";
		if(!this.isSortable()) {
			classes += " jsdb-unsortable";
		}
		this.getElement().addClass(classes);
	}



	/**
	 * Get a Container from a Draggable element. The returned Container is the one that contains the
	 * given Draggable element.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The Draggable element.
	 * @return {EeWalk11.Dropbox.Container|Boolean}  The Container, false on failure.
	 */
	function getContainerFromDraggable(draggable) {
		for(var i = 0; i < containers.length; i++) {
			var container = containers[i];
			if(container.contains(draggable)) {
				return container;
			}
		}
		return false;
	}



	/**
	 * Get a Container from an element ID.
	 * @param {String}  element  The element to get the container for.
	 * @return {EeWalk11.Dropbox.Container|Boolean}  The Container, false on failure.
	 */
	function getContainerFromElement(element) {
		var elementID = EeWalk11.toElementId(element);
		if(elementID) {
			for(var i = 0; i < containers.length; i++) {
				var container = containers[i];
				if(container.getElementId() === elementID) {
					return container;
				}
			}
		}
		return false;
	}



	/**
	 * Get a Container from a Container ID.
	 * @param {Number}  id  The Container ID.
	 * @return {EeWalk11.Dropbox.Container|Boolean}  The Container, false on failure.
	 */
	function getContainerFromId(id) {
		for(var i = 0; i < containers.length; i++) {
			var container = containers[i];
			if(container.getContainerId() === id) {
				return container;
			}
		}
		return false;
	}



	/**
	 * Get the index in which a Draggable element will be inserted into this Container.
	 * @this EeWalk11.Dropbox.Container
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The Draggable element.
	 * @return {Number}  The add index.
	 */
	function getSortPosition(draggable) {
		var data = containerData[this.getContainerId()];
		var sortStr = draggable.getSortString();
		for(var i = 0; i < data.draggables.length; i++) {
			if(sortStr.localeCompare(data.draggables[i].getSortString()) <= 0) {
				return i;
			}
		}
		return data.draggables.length;
	}



	/**
	 * Insert a Draggable element into an index in this Container.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The draggable element.
	 * @param {Number}                      index      The insert position (1 or greater - use
	 *                                                 appendDraggable for index 0).
	 * @return {Boolean}  True.
	 */
	function insertDraggable(draggable, index) {
		var data = containerData[this.getContainerId()];
		data.draggables.splice(index, 0, draggable);
		data.$elem.find(" > :nth-child(" + index + ")").after(draggable.getElement());
		return true;
	}



	/**
	 * Prepend a Draggable element to this Container.
	 * @param {EeWalk11.Dropbox.Draggable}  draggable  The draggable element.
	 * @return {Boolean}  True.
	 */
	function prependDraggable(draggable) {
		var data = containerData[this.getContainerId()];
		data.draggables.unshift(draggable);
		draggable.getElement().prependTo(data.$elem);
		return true;
	}



	/**
	 * Get one of this Container's Draggable elements from a variable.
	 * @param {EeWalk11.Dropbox.Draggable|Number}  arg0  The Draggable element or its index.
	 * @return {EeWalk11.Dropbox.Draggable|Boolean}  The Draggable element, false on failure.
	 */
	function toDraggable(arg0) {
		if(arg0 instanceof EeWalk11.Dropbox.Draggable) {
			return this.contains(arg0) ? arg0 : false;
		}

		var index = parseInt(arg0);
		return !Number.isNaN(index) && index < this.getLength() ? this.get(index) : false;
	}



})();


