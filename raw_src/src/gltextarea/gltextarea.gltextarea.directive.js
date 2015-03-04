
angular.module('glTextarea').directive('glTextarea', ["$compile", function ($compile) {
	'use strict';

	return {
  	restrict: 'E',
    replace: true,
    scope: {
    	settings: '=',
    	api: '='
    },
    link: function (scope, element, attrs, controller) {

      var elRect, dragArea;

      var elementTextarea;
      var elementError;
      var elementLabel;
      var elementValue;

      var classEmpty = 'gl-empty';
      var classInvalid = 'gl-invalid';

      var templateTextarea = '<textarea class="gl-textarea-input" placeholder="{{api._data.placeholder}}" data-ng-model="api._data.value"></textarea>';
      var templateError = '<p class="gl-textarea-error">{{api._data.error}}</p>';
      var templateLabel = '<label class="gl-textarea-view-label">{{api._data.label}}</label>';
      var templateValue = '<p class="gl-textarea-view-value">{{api._data.value}}</p>';


      scope.api = angular.isUndefined(scope.api) ? {} : scope.api;
      console.log('scope.api'); console.log(scope.api);

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
      scope.api._data.emitEvents = angular.isUndefined(scope.settings.emitEvents) ? ['focus','blur','change','keypress','input'] : scope.settings.emitEvents;

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
      }

      scope.api.enable = function(){
        scope.api._data.disabled = false;
        elementTextarea.removeAttr('disabled');
      }



      var getInputEl = function(){

        elementTextarea = angular.element(templateTextarea);
        elementTextarea.attr('type',scope.api._data.type);
        elementTextarea.val(scope.api._data.value);

        if(scope.api._data.disabled){
          elementTextarea.attr('disabled',true);
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

        // emit events
        angular.forEach(scope.api._data.emitEvents,function(value,key){
          elementTextarea.bind(value,function(evt){
            scope.$emit(scope.settings.name + "-" + value,evt);
          });
        });

        return $compile(elementTextarea)(scope);
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
        scope.api._data.editable = true;
        element.children().remove();
        element.append(getInputEl());
        errorMsgCheck();
        emptyCheck();
      }

      var emptyCheck = function(){
        if(!angular.isUndefined(elementTextarea)){
          if(!angular.isUndefined(scope.api._data.value) && scope.api._data.value.length > 0){
            elementTextarea.removeClass(classEmpty);
          }else{
            elementTextarea.addClass(classEmpty);
          }
        }
      }

      var errorMsgCheck = function(){
        if(!angular.isUndefined(elementError)){ elementError.remove(); }
        if(scope.api._data.editable){
          if(scope.api._data.valid){
            elementTextarea.removeClass(classInvalid);
          }else{
            elementTextarea.addClass(classInvalid);
            if(angular.isString(scope.api._data.error)){
              elementError = $compile(angular.element(templateError))(scope)
              element.append(elementError);
            }
          }
        }
      }

      // INIT

      if(!angular.isUndefined(scope.settings.view) && scope.settings.view == true){
        setViewMode();
      }else{
        setEditMode();
      }


		}
	};
}]);