# JavaScript Library



____________________________________________________________________________________________________



## jQuery (jQuery UI) Animations



### Scroll Animation

The *scrollTo* function will scroll the page so that an element is in view. jQuery is required for
this animation to work.

**Options**

* *duration {Number}* The duration of the animation in milliseconds. *Default is 750*
* *finished {Function}* A callback function to run when the animation is finished. *Default is an
empty function*



### Hover Animation

The *hoverAnimation* function can be used to create an animated color effect when hovering the mouse
over an element. jQuery UI is required for this animation to work. The behavior of the animation is
defined by the values in the options object provided to the function. An object with the properties
"mouseenter" and "mouseleave" and the corresponding event functions as values will be returned.
This can be used if the events are needed later (e.g., to remove the event from the element).

**Options**

* *css {Object}* A CSS Object to use for the animation. This should be an Object accepected by the
jQuery *css* function. *Default is {backgroundColor: "#d6d6d6"}*
* *duration {Number}* The duration of the animation in milliseconds. *Default is 500*
* *find {String}* A jQuery selector. If provided, the jQuery.find method will be used with the
given selector for applying the animation. This does not affect the element(s) that triggers the
animation, only the element(s) that is/are animated. *Default is null*
* *interrupt {Boolean}* Set to true to immediately finish an animation when the animation is
interrupted, false to start the next animation from the current animation's state. *Default is
false*
* *leave {String}* Determines what should be done when the mouse is no longer hovering the element.
Options are:
	* **"revert"** The element's style will immediately revert to its original state.
	* **"animate"** *(Default)* The element's style will be reverted to its original state through
	an animation. An optional duration may be provided in brackets (e.g. "animate[300]"), otherwise
	the animation duration will be used.
	* **"hold"** The element's style will not be reverted.
	* **"toggle"** The element's style will be reverted to its original state on the next mouseenter
	event. An optional duration for the animation may be provided brackets. The word "revert" is
	also valid to revert the style without an animation. If the bracket option is not provided, the
	setting for the animation's duration will be used.



____________________________________________________________________________________________________



## JavaScript DropBox

The JavaScript DropBox is a library for building a drag and drop interface utilizing one or more
organizable lists of elements.



### Container

This element is the drag & drop dropbox. This is where Draggable elements are stored. Containers are
the only elements in this library that must exist in the DOM (usually a div) when constructed. All
other elements will be created and added to the DOM upon construction.

**_Note:_** *All Containers' DOM elements must have IDs*

**Constructor Options**

* *capacity {Number}* The maximum number of elements that can be held by this Container. False may
be passed for no limit. *Default is false*
* *sortable {Boolean}* If true, elements within this Container can be sorted by the user. If false,
elements within this Container will be automatically sorted as defined by the Draggable prototype's
compare function. *Default is true*



### Draggable

Draggable elements are added to Containers. They should not exist in the DOM when the document is
loaded. When they are added to a Container JavaScript object, a DOM element will be created and
added to the Container's DOM element.

**Constructor Options**

* *hoverOptions {Object}* If jQuery UI is added to the page, a hover color animation can be
enabled for Draggable elements. Set this to an options object (as defined for the
*EeWalk11.Animate.hoverAnimation* function) to enable. Any other value will disable the animation.
**Note.** An empty object will enable the animation, all default values for the animation options
will be used. *Default is false*
* *dropped {Function|Array|Boolean}* A function or an array of functions to run when the draggable
element is dropped. Each function will be provided 1 argument; a boolean, true if the draggable was
dropped in a valid drop location, false otherwise. **NOTE: Each function will be called with "this"
pointing to the Draggable object that was dropped, not the DOM element.** False will cause no
function to be run. *Default is false*



### CSS Styling

There a few element classes that will need to be styled. A default stylesheet is provided for
testing and as a framework. The following classes will be used in this library:

* **jsdb-container** Applied to any element that is used to construct a Container instance
* **jsdb-unsortable** Applied to Container element if the sortable option is set to false in the
container's constructor
* **jsdb-draggable** Applied to all Draggable elements
* **jsdb-drop-before** Applied to a Draggable element when the element being dragged will be dropped
before it
* **jsdb-drop-after** Applied to a Draggable element when the element being dragged will be dropped
after it



### Sizing Containers

By default, a Container will be vertically sized to fit the Draggable elements it contains exactly.
The *setSize* method can be used to set a fixed height for a Container. If no height is provided it
will be calculated automatically using the set capacity and height for a Draggable element. Note
that for this to work, a capacity must be set for the Container and there must be at least 1
draggable element added to the DOM.

If all Containers should be the same size, there is a public function *Container.setSizes* that will
call *setSize* on every Container instance and will make sure they are the same size.


