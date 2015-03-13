# GLTextarea

## Overview
An interface to both view and edit a single line of text. It provides both an editable input field as well as a static visual view.

## States

* Unfocused
* Focused
* Invalid
* Invalid + Message
* disabled
* View (label + value)
* Empty (image/text placeholder)

## HTML

   <gl-textarea api="myApi" settings="mySettings"></gl-textarea>

## Settings

* name - required by angular forms
* editable
* label
* placeholder
* value
* rows
* columns
* invalid - pass true or error message
* disabled
* onKeyDown - define a callback event for keydown
* onKeyPress - define a callback event for keypress
* onKeyUp - define a callback event for keyup
* onInput - define a callback event for input
* onMouseOver = define a callback event for mouseover
* onMouseOut = define a callback event for mouseout
* onMouseMove = define a callback event for mousemove
* onMouseDown = define a callback event for mousedown
* onMouseUp = define a callback event for mouseup

### Example 

   var mySettings = {
     name: "firstname",
     editable: true,
     label: "name",
     placeholder: "name",
     value: "John",
     invalid: false,
     disabled: false,
   };

## API Methods

* edit (pass false to disable edit mode)
* setLabel
* getLabel
* setPlaceholder
* getPlaceholder
* setValue
* getValue
* setInvalid
* setValid
* enable
* disable

### Example API

   var myApi = {};
   
   // Api Method call examples
   myApi.edit();        // enables edit mode
   myApi.view();        // enables view mode
   myApi.disable();     // Disabled the input field leaving text visible but not editable.
   myApi.enable();      // Enables editing of the input field
   myApi.setLabel("MyLabel");    // Sets the view mode label text
   myApi.getLabel();     // returns "MyLable"
   myApi.setPlaceholder("My Placeholder");  // sets the input field placeholder text
   myApi.getPlaceholder();   // returns "My Placeholder"
   myApi.setValue("abc");  // Sets the value of the input field
   myApi.getValue();       // returns "abc", the value of the input field
   myApi.setInvalid();   // adds the "gl-invalid" input class.
   myApi.setInvalid("Danger");   // adds the "gl-invalid" input class plus displays the invalid message text.
   
## Image placeholder CSS
When the textarea is empty, there will be the existence of the input.gl-empty class in which you can define a background-image, among other things.

### Example

   gl-textfield-input.gl-empty {
       background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz...);
       background-position-x: 0px;
       background-position-y: 0px;
       background-repeat: no-repeat;
       background-size : 30px 30px;
     }
