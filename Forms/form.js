/****
* NAME        : form.js
* DATE        : 07-02-2012
* DESCRIPTION : Form creation class
*/
var formObj = (function() {

	var elementObj = {
		'id'		 : '',
		'cls'		 : '',
		'name' 		 : '',
		'type'		 : '',
		'value'		 : '',
		'content'	 : '',
		'contentType': 'html',
		'child'		 : {}
	};

	var parentForm = 'form';

	function addElem( elem ){
		var tmpParentElement = '';
		var tmpElements = [];
		var count = 0;

        try {

			if (Util.isEmpty(elem)) {
				return '-1';
            }

			tmpParentElement = $('<div></div>')
                .hide()
                .addClass( elem.cls );

			$(parentForm).append(tmpParentElement);

			if (!Util.isEmpty(elem.elements)) {
				for (var child in elem.elements) {
					var tmpElm = createElement(elem.elements[child]);

					if (!Util.isEmpty(elem.elements[child].child)) {
						for (var it in elem.elements[child].child) {
							tmpElm.append(
                                createElement(elem.elements[child].child[it]));
                        }
                    }

                    tmpParentElement.append(tmpElm);

					if (!Util.isEmpty(elem.elements[child].validation)) {
						$(tmpElm).rules("add", elem.elements[child].validation);
					}
				}
            }

			tmpParentElement.show();

		} catch(err) {
			console.log( 'Unrecoverable error occurred: ' + err.lineNumber + ' (' + err.message + ')' );
		}
	}

	function createElement(elem) {
		var tmpElement = '';

		switch(elem.type) {
			case 'text':
			case 'password':
			case 'checkbox':
			case 'radio':
			case 'hidden':
			case 'submit':
			case 'reset':
			case 'button':
				tmpElement = $('<input type="' + elem.type + '" />')
								.addClass(elem.cls);
				break;

			case 'textarea':
			case 'select':
			case 'label':
			case 'option':
				tmpElement = $('<' + elem.type + '>')
								.addClass(elem.cls);
				break;
		}

		for (var it in elem) {
			if (elem.hasOwnProperty(it) && elem.it != '' && !it.match(/child|cls|type|content|contentType|validation/ig)) {
				tmpElement.attr(it, elem[it]);
            }
        }

		if (elem.content != undefined) {
			if (elem.contentType == 'text') {
				tmpElement.text( elem.content );
            } else {
				tmpElement.html( elem.content );
            }
		}

		return tmpElement;
	}

	function removeElem(elemID) {
		$(parentForm + ' #' + elemID).remove();
	}

	var Util = (function() {
		return {
			isEmpty	: function(obj) {
				return jQuery.isEmptyObject(obj);
			}
		}
	})();

	return {
		addElement: function(elemObj) {
			//add elements to form
			addElem(elemObj);
		},

		removeElement: function(elementID) {
			//remove element from form based on ID
			removeElem(elementID);
		},

		resetForm: function(formID) {
			//reset the form
			$('#' + formID).empty();
		},

		setParentForm: function(formID) {
			//set the parent form target
			parentForm = formID;
		}

	}
})();
