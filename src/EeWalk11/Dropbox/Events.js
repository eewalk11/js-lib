


/* global EeWalk11 */



;(function()
{



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * @var {Object} Contains drag and drop event functions.
	 */
	EeWalk11.Dropbox.Events = {};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * @type {EeWalk11.Dropbox.Draggable} The source container of the dragged element in a drag &
	 * drop event.
	 */
	var srcContainer;

	/**
	 * @type {EeWalk11.Dropbox.Draggable} The Draggable element being dragged. Updated with a
	 * dragstart event.
	 */
	var srcDraggable;

	/**
	 * @type {Number} The index of the dragged element int the source Container.
	 */
	var srcIndex;



	/**
	 * @type {EeWalk11.Dropbox.Draggable} The Draggable element currently marked as the drop
	 * location.
	 */
	var location;

	/**
	 * @type {Boolean} If a drop location is set, this will be set to indicate where the drop is
	 * relative to the drop location. True means the dragged element will be dropped before the
	 * drop location. False means after.
	 */
	var locationBefore;



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * The dragenter event.
	 * <p>Applied to the document when the first container is instantiated.</p>
	 * @param {Event} event The event object.
	 */
	EeWalk11.Dropbox.Events.onDragenter = function(event)
	{
		//Attempt to set a drop location
		if(!setDropLocation(event))
		{
			//Clear the drop location
			updateDropLocation();
		}
	};



	/**
	 * The dragover event.
	 * <p>Applied to the document when the first container is instantiated.</p>
	 * @param {Event} event The event object.
	 */
	EeWalk11.Dropbox.Events.onDragover = function(event)
	{
		//Enable drop target
		event.preventDefault();
	};



	/**
	 * The dragend event.
	 * @param {Event} event The event object.
	 */
	EeWalk11.Dropbox.Events.onDragend = function(event)
	{
		//If the dragged element was not dropped in a valid location, reinsert it in its original
		//  location
		if(srcDraggable)
		{
			srcContainer.insert(srcDraggable, srcIndex);
			clearSource();
		}

		//Clear the drop location
		//Sometimes it doesn't clear correctly, this is to remedy that
		updateDropLocation();
	};



	/**
	 * The dragstart event.
	 * <p>Applied to Draggable elements.</p>
	 * @param {Event} event The event object.
	 */
	EeWalk11.Dropbox.Events.onDragstart = function(event)
	{
		//Transfer the element data
		event.dataTransfer.setData(
			"text/plain", EeWalk11.Dropbox.Draggable.getDraggable(event.target).getData()
		);

		//Set the dragged element
		srcDraggable = EeWalk11.Dropbox.Draggable.getDraggable(event.target.id);
		srcContainer = srcDraggable.getContainer();
		srcIndex = srcContainer.getPosition(srcDraggable);

		//Remove it from the Container
		//This is in a timeout function because the DOM cannot be manipulated from a dragstart event
		//  in Chrome
		setTimeout(function()
		{
			srcContainer.remove(srcDraggable);
		}, 50);
	};



	/**
	 * The drop event.
	 * <p>Applied to the document when the first container is instantiated.</p>
	 * @param {Event} event The event object.
	 */
	EeWalk11.Dropbox.Events.onDrop = function(event)
	{
		//Clear the drop location
		updateDropLocation();

		//Insert the dragged element
		if(srcDraggable)
		{
			insertDraggedElement(event);
		}
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Unset the dragged element.
	 */
	function clearSource()
	{
		srcContainer = srcDraggable = srcIndex = null;
	}



	/**
	 * Insert the dragged element for a drop event.
	 * @param {Event} event The event object.
	 */
	function insertDraggedElement(event)
	{
		var inserted = false;

		if(event.target.className.indexOf("jsdb-draggable") >= 0)
		{
			//If the container is sortable, insert the dragged element before the target
			//Otherwise, use the dragged element's sort position
			var dstDraggable = EeWalk11.Dropbox.Draggable.getDraggable(event.target);
			var dstContainer = dstDraggable.getContainer();
			inserted = dstContainer.isSortable() ?
				dstContainer.insert(srcDraggable, dstContainer.getPosition(dstDraggable))
				: dstContainer.insert(srcDraggable,	dstContainer.getPosition(srcDraggable));
		}
		else if(event.target.className.indexOf("jsdb-container") >= 0)
		{
			//If the container is sortable, insert the dragged element after the last element
			//Otherwise, use the dragged element's sort position
			var dstContainer = EeWalk11.Dropbox.Container.getContainer(event.target);
			inserted = dstContainer.isSortable() ?
				dstContainer.add(srcDraggable)
				: dstContainer.insert(srcDraggable, dstContainer.getPosition(srcDraggable));
		}

		//The dragend event will replace the dragged element unless the source was cleared
		if(inserted)
		{
			clearSource();
		}
	}



	/**
	 * Given a drop location, see if the existing location has been changed.
	 * @param {EeWalk11.Dropbox.Draggable} dstDraggable The new drop location.
	 * @param {Boolean} before True if the drop location is before the draggable, false for after.
	 * @returns {Boolean} True if the drop location has been changed, false if it is the same.
	 */
	function isDropLocationUpdated(dstDraggable, before)
	{
		return (location || dstDraggable)
			&& (
				(location && !location.equals(dstDraggable))
				|| (dstDraggable && !dstDraggable.equals(location))
				|| before !== locationBefore
			);
	}



	/**
	 * Set a drop location for a dragenter event.
	 * @param {Event} event The event object.
	 * @returns {Boolean} True if a drop location was successfully set, false otherwise.
	 */
	function setDropLocation(event)
	{
		if(event.target.className.indexOf("jsdb-draggable") >= 0)
		{
			//If the Container is sortable, the drop location is before the target
			//Otherwise, the drop location is the dragged element's sort position
			var dstDraggable = EeWalk11.Dropbox.Draggable.getDraggable(event.target);
			var dstContainer = dstDraggable.getContainer();
			dstContainer.isSortable() ?
				updateDropLocation(dstDraggable)
				: updateUnsortableDropLocation(dstContainer);
			return true;
		}
		else if(event.target.className.indexOf("jsdb-container") >= 0)
		{
			//If the Container is sortable, the drop location is after the last element
			//Otherwise, the drop loation is the dragged element's sort position
			var dstContainer = EeWalk11.Dropbox.Container.getContainer(event.target);
			dstContainer.isSortable() ?
				updateDropLocation(dstContainer.get("last"), false)
				: updateUnsortableDropLocation(dstContainer);
			return true;
		}
		return false;
	}



	/**
	 * Update the drop location.
	 * <p>The drop location is marked as a class on a draggable element.</p>
	 * @param {EeWalk11.Dropbox.Draggable} dstDraggable The new drop location. Leave undefined to clear
	 * the current drop location.
	 * @param {Boolean} before True if the drop location is before the draggable, false for after.
	 */
	function updateDropLocation(dstDraggable, before)
	{
		if(dstDraggable && dstDraggable.equals(srcDraggable))
		{
			//Do not mark the dragged element as a drop location
			dstDraggable = null;
		}
		if(typeof before === "undefined")
		{
			before = true;
		}

		if(isDropLocationUpdated(dstDraggable, before))
		{
			if(location)
			{
				//Clear the current drop location
				location.getElement().removeClass("jsdb-drop-before jsdb-drop-after");
			}

			if(dstDraggable && !dstDraggable.getContainer().isFull())
			{
				//Set a new drop location
				dstDraggable.getElement().addClass(before ? "jsdb-drop-before" : "jsdb-drop-after");
				location = dstDraggable;
				locationBefore = before;
			}
			else
			{
				//Leave the drop location unset
				location = locationBefore = null;
			}
		}
	}



	/**
	 * Update the drop location on an unsortable Container.
	 * @param {EeWalk11.Dropbox.Container} dstContainer The unsortable destination Container.
	 */
	function updateUnsortableDropLocation(dstContainer)
	{
		var position = dstContainer.getPosition(srcDraggable);
		position === dstContainer.getLength() ?
			updateDropLocation(dstContainer.get(position - 1), false)
			: updateDropLocation(dstContainer.get(position));
	}



})();


