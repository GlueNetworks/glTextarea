
angular.module('glTextarea').directive('glTextarea', ["$compile", function ($compile) {
	'use strict';

	return {
  	restrict: 'E',
    scope: {
    	settings: '=',
    	api: '='
    },
    link: function (scope, element, attrs, controller) {

      var childScope = scope.$new();

      var elementAll;
      var elementTextarea;
      var elementError;
      var elementLabel;
      var elementValue;

      var classEmpty = 'gl-empty';
      var classInvalid = 'gl-invalid';
      var classFocus = 'gl-focus';
      var classDisabled = 'gl-disabled';

      var templateAll = '<div class="gl-textarea-container"></div>';  // necessary to house textarea and superscroll elements.
      var templateTextarea = '<textarea class="gl-textarea-input" data-gl-super-scroll data-ng-attr-placeholder="{{api._data.placeholder}}" data-ng-model="api._data.value"></textarea>';
      var templateError = '<p class="gl-textarea-error">{{api._data.error}}</p>';
      var templateLabel = '<label class="gl-textarea-view-label">{{api._data.label}}</label>';
      var templateValue = '<p class="gl-textarea-view-value">{{api._data.value}}</p>';

      elementAll = angular.element(templateAll);

      scope.api = angular.isUndefined(scope.api) ? {} : scope.api;
      scope.settings = angular.isUndefined(scope.settings) ? {} : scope.settings;

      scope.api._data = {};

      // MAP SETTINGS
      scope.api._data.value = angular.isUndefined(scope.settings.value) ? undefined : scope.settings.value;
      scope.api._data.cols = angular.isUndefined(scope.settings.cols) ? undefined : scope.settings.cols;
      scope.api._data.rows = angular.isUndefined(scope.settings.rows) ? undefined : scope.settings.rows;
      scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? true : scope.settings.valid;
      scope.api._data.name = angular.isUndefined(scope.settings.name) ? undefined : scope.settings.name;
      scope.api._data.label = angular.isUndefined(scope.settings.label) ? undefined : scope.settings.label;
      scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? false : scope.settings.disabled;
      scope.api._data.placeholder = angular.isUndefined(scope.settings.placeholder) ? undefined : scope.settings.placeholder;
      scope.api._data.error = angular.isUndefined(scope.settings.error) ? undefined : scope.settings.error;
      scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? true : scope.settings.editable;

      scope.api._data.onKeyDown = angular.isFunction(scope.settings.onKeyDown) ? scope.settings.onKeyDown : undefined;
      scope.api._data.onKeyPress = angular.isFunction(scope.settings.onKeyPress) ? scope.settings.onKeyPress : undefined;
      scope.api._data.onKeyUp = angular.isFunction(scope.settings.onKeyUp) ? scope.settings.onKeyUp : undefined;
      scope.api._data.onInput = angular.isFunction(scope.settings.onInput) ? scope.settings.onInput : undefined;
      scope.api._data.onFocus = angular.isFunction(scope.settings.onFocus) ? scope.settings.onFocus : undefined;
      scope.api._data.onBlur = angular.isFunction(scope.settings.onBlur) ? scope.settings.onBlur : undefined;
      scope.api._data.onMouseOver = angular.isFunction(scope.settings.onMouseOver) ? scope.settings.onMouseOver : undefined;
      scope.api._data.onMouseOut = angular.isFunction(scope.settings.onMouseOut) ? scope.settings.onMouseOut : undefined;
      scope.api._data.onMouseMove = angular.isFunction(scope.settings.onMouseMove) ? scope.settings.onMouseMove : undefined;
      scope.api._data.onMouseDown = angular.isFunction(scope.settings.onMouseDown) ? scope.settings.onMouseDown : undefined;
      scope.api._data.onMouseUp = angular.isFunction(scope.settings.onMouseUp) ? scope.settings.onMouseUp : undefined;

      scope.api.view = function(){ setViewMode(); }
      scope.api.edit = function(){ setEditMode(); }

      scope.api.setInvalid = function(msg){
        scope.api._data.valid = false;
        if(angular.isString(msg)){
          scope.api._data.error = msg;
        }else{
          scope.api._data.error = undefined;
        }
        errorMsgCheck();
      }

      scope.api.setValid = function(){
        scope.api._data.valid = true;
        errorMsgCheck();
      }


      scope.api.setValue = function(val){ scope.api._data.value = val; }

      scope.api.getValue = function(){
        return elementTextarea.val();
      }

      scope.api.setLabel = function(label){ scope.api._data.label = label; }

      scope.api.getLabel = function(){ return scope.api._data.label; }

      scope.api.setPlaceholder = function(placeholder){ scope.api._data.placeholder = placeholder; }

      scope.api.getPlaceholder = function(){ return scope.api._data.placeholder; }

      scope.api.disable = function(){
        scope.api._data.disabled = true;
        elementTextarea.attr('disabled',true);
        elementAll.addClass(classDisabled);
      }

      scope.api.enable = function(){
        scope.api._data.disabled = false;
        elementTextarea.removeAttr('disabled');
        elementAll.removeClass(classDisabled);
      }



      var getInputEl = function(){

        elementTextarea = angular.element(templateTextarea);
        elementTextarea.attr('type',scope.api._data.type);
        elementTextarea.val(scope.api._data.value);

        if(scope.api._data.disabled){
          elementTextarea.attr('disabled',true);
          elementAll.addClass(classDisabled);
        }

        if(!angular.isUndefined(scope.api._data.rows)){
          //elementTextarea[0].rows = scope.api._data.rows;
          elementTextarea.attr('rows',scope.api._data.rows);
        }

        if(!angular.isUndefined(scope.api._data.cols)){
          elementTextarea.attr('cols',scope.api._data.cols);
        }


        if(angular.isString(scope.api._data.value) && scope.api._data.value != ""){
          elementTextarea.removeClass(classEmpty);
        }else{
          elementTextarea.addClass(classEmpty);
        }

        // event bindings
        if(!angular.isUndefined(scope.api._data.onKeyDown)){  elementTextarea.bind('keydown',function(evt){ scope.api._data.onKeyDown(evt); }) }
        if(!angular.isUndefined(scope.api._data.onKeyUp)){    elementTextarea.bind('keyup',function(evt){ scope.api._data.onKeyUp(evt); }) }
        if(!angular.isUndefined(scope.api._data.onKeyPress)){ elementTextarea.bind('keypress',function(evt){ scope.api._data.onKeyPress(evt); }) }
        if(!angular.isUndefined(scope.api._data.onInput)){    elementTextarea.bind('input',function(evt){ scope.api._data.onInput(evt); }) }
        if(!angular.isUndefined(scope.api._data.onMouseOver)){elementTextarea.bind('mouseover',function(evt){ scope.api._data.onMouseOver(evt); }) }
        if(!angular.isUndefined(scope.api._data.onMouseOut)){ elementTextarea.bind('mouseout',function(evt){ scope.api._data.onMouseOut(evt); }) }
        if(!angular.isUndefined(scope.api._data.onMouseMove)){elementTextarea.bind('mousemove',function(evt){ scope.api._data.onMouseMove(evt); }) }
        if(!angular.isUndefined(scope.api._data.onMouseDown)){elementTextarea.bind('mousedown',function(evt){ scope.api._data.onMouseDown(evt); }) }
        if(!angular.isUndefined(scope.api._data.onMouseUp)){  elementTextarea.bind('mouseup',function(evt){ scope.api._data.onMouseUp(evt); }) }


        elementTextarea.bind('focus',function(){
          elementAll.addClass(classFocus);
        });
        elementTextarea.bind('blur',function(){
          elementAll.removeClass(classFocus);
        });

        return elementTextarea;
        //return $compile(elementTextarea)(scope);
      }

      scope.$watch('api._data.value',function(){
        emptyCheck();
      });

      var setViewMode = function(){
        scope.api._data.editable = false;
        element.children().remove();

        if(angular.isString(scope.api._data.label)){
          elementLabel = $compile(angular.element(templateLabel))(scope);
          element.append(elementLabel);
        }

        elementValue = $compile(angular.element(templateValue))(scope);
        element.append(elementValue);
      }

      var setEditMode = function(){

        childScope.$destroy();
        element.children().remove();
        childScope = scope.$new();

        elementAll = angular.element(templateAll);
        scope.api._data.editable = true;
        elementAll.append(getInputEl());
        element.append($compile(elementAll)(childScope));
        errorMsgCheck();
        emptyCheck();
      }

      var emptyCheck = function(){
        if(!angular.isUndefined(elementTextarea)){
          if(!angular.isUndefined(scope.api._data.value) && scope.api._data.value.length > 0){
            elementTextarea.removeClass(classEmpty);
            elementAll.removeClass(classEmpty);
          }else{
            elementTextarea.addClass(classEmpty);
            elementAll.addClass(classEmpty);
          }
        }
      }

      var errorMsgCheck = function(){
        if(!angular.isUndefined(elementError)){ elementError.remove(); }
        if(scope.api._data.editable){
          if(scope.api._data.valid){
            elementTextarea.removeClass(classInvalid);
            elementAll.removeClass(classInvalid);
          }else{
            elementTextarea.addClass(classInvalid);
            elementAll.addClass(classInvalid);
            if(angular.isString(scope.api._data.error)){
              elementError = angular.element(templateError);
              element.append($compile(elementError)(scope));
            }
          }
        }
      }

      scope.$on('$destroy',function(){
        if(!angular.isUndefined(scope.api._data.onKeyDown)){  elementTextarea.unbind('keydown') }
        if(!angular.isUndefined(scope.api._data.onKeyUp)){    elementTextarea.unbind('keyup') }
        if(!angular.isUndefined(scope.api._data.onKeyPress)){ elementTextarea.unbind('keypress') }
        if(!angular.isUndefined(scope.api._data.onInput)){    elementTextarea.unbind('input') }
        if(!angular.isUndefined(scope.api._data.onMouseOver)){elementTextarea.unbind('mouseover') }
        if(!angular.isUndefined(scope.api._data.onMouseOut)){ elementTextarea.unbind('mouseout') }
        if(!angular.isUndefined(scope.api._data.onMouseMove)){elementTextarea.unbind('mousemove') }
        if(!angular.isUndefined(scope.api._data.onMouseDown)){elementTextarea.unbind('mousedown') }
        if(!angular.isUndefined(scope.api._data.onMouseUp)){  elementTextarea.unbind('mouseup') }
      });

      // INIT

      if(!angular.isUndefined(scope.settings.view) && scope.settings.view == true){
        setViewMode();
      }else{
        setEditMode();
      }

		}
	};
}]);
