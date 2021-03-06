/*! 
  glTextarea v(0.0.11) 
  (c) 2013-2015
  https://gluenetworks.kilnhg.com/Code/Web-Development
  Release Date: 2015-03-13 
*/
angular.module("glTextarea", [ "glSuperScroll" ]), angular.module("glTextarea").directive("glTextarea", [ "$compile", function($compile) {
    "use strict";
    return {
        restrict: "E",
        scope: {
            settings: "=",
            api: "="
        },
        link: function(scope, element) {
            var elementAll, elementTextarea, elementError, elementLabel, elementValue, childScope = scope.$new(), classEmpty = "gl-empty", classInvalid = "gl-invalid", classFocus = "gl-focus", classDisabled = "gl-disabled", templateAll = '<div class="gl-textarea-container"></div>', templateTextarea = '<textarea class="gl-textarea-input" data-gl-super-scroll data-ng-attr-placeholder="{{api._data.placeholder}}" data-ng-model="api._data.value"></textarea>', templateError = '<p class="gl-textarea-error">{{api._data.error}}</p>', templateLabel = '<label class="gl-textarea-view-label">{{api._data.label}}</label>', templateValue = '<p class="gl-textarea-view-value">{{api._data.value}}</p>';
            elementAll = angular.element(templateAll), scope.api = angular.isUndefined(scope.api) ? {} : scope.api, 
            scope.settings = angular.isUndefined(scope.settings) ? {} : scope.settings, scope.api._data = {}, 
            // MAP SETTINGS
            scope.api._data.value = angular.isUndefined(scope.settings.value) ? void 0 : scope.settings.value, 
            scope.api._data.cols = angular.isUndefined(scope.settings.cols) ? void 0 : scope.settings.cols, 
            scope.api._data.rows = angular.isUndefined(scope.settings.rows) ? void 0 : scope.settings.rows, 
            scope.api._data.valid = angular.isUndefined(scope.settings.valid) ? !0 : scope.settings.valid, 
            scope.api._data.name = angular.isUndefined(scope.settings.name) ? void 0 : scope.settings.name, 
            scope.api._data.label = angular.isUndefined(scope.settings.label) ? void 0 : scope.settings.label, 
            scope.api._data.disabled = angular.isUndefined(scope.settings.disabled) ? !1 : scope.settings.disabled, 
            scope.api._data.placeholder = angular.isUndefined(scope.settings.placeholder) ? void 0 : scope.settings.placeholder, 
            scope.api._data.error = angular.isUndefined(scope.settings.error) ? void 0 : scope.settings.error, 
            scope.api._data.editable = angular.isUndefined(scope.settings.editable) ? !0 : scope.settings.editable, 
            scope.api._data.onKeyDown = angular.isFunction(scope.settings.onKeyDown) ? scope.settings.onKeyDown : void 0, 
            scope.api._data.onKeyPress = angular.isFunction(scope.settings.onKeyPress) ? scope.settings.onKeyPress : void 0, 
            scope.api._data.onKeyUp = angular.isFunction(scope.settings.onKeyUp) ? scope.settings.onKeyUp : void 0, 
            scope.api._data.onInput = angular.isFunction(scope.settings.onInput) ? scope.settings.onInput : void 0, 
            scope.api._data.onFocus = angular.isFunction(scope.settings.onFocus) ? scope.settings.onFocus : void 0, 
            scope.api._data.onBlur = angular.isFunction(scope.settings.onBlur) ? scope.settings.onBlur : void 0, 
            scope.api._data.onMouseOver = angular.isFunction(scope.settings.onMouseOver) ? scope.settings.onMouseOver : void 0, 
            scope.api._data.onMouseOut = angular.isFunction(scope.settings.onMouseOut) ? scope.settings.onMouseOut : void 0, 
            scope.api._data.onMouseMove = angular.isFunction(scope.settings.onMouseMove) ? scope.settings.onMouseMove : void 0, 
            scope.api._data.onMouseDown = angular.isFunction(scope.settings.onMouseDown) ? scope.settings.onMouseDown : void 0, 
            scope.api._data.onMouseUp = angular.isFunction(scope.settings.onMouseUp) ? scope.settings.onMouseUp : void 0, 
            scope.api.view = function() {
                setViewMode();
            }, scope.api.edit = function() {
                setEditMode();
            }, scope.api.setInvalid = function(msg) {
                scope.api._data.valid = !1, scope.api._data.error = angular.isString(msg) ? msg : void 0, 
                errorMsgCheck();
            }, scope.api.setValid = function() {
                scope.api._data.valid = !0, errorMsgCheck();
            }, scope.api.setValue = function(val) {
                scope.api._data.value = val;
            }, scope.api.getValue = function() {
                return elementTextarea.val();
            }, scope.api.setLabel = function(label) {
                scope.api._data.label = label;
            }, scope.api.getLabel = function() {
                return scope.api._data.label;
            }, scope.api.setPlaceholder = function(placeholder) {
                scope.api._data.placeholder = placeholder;
            }, scope.api.getPlaceholder = function() {
                return scope.api._data.placeholder;
            }, scope.api.disable = function() {
                scope.api._data.disabled = !0, elementTextarea.attr("disabled", !0), elementAll.addClass(classDisabled);
            }, scope.api.enable = function() {
                scope.api._data.disabled = !1, elementTextarea.removeAttr("disabled"), elementAll.removeClass(classDisabled);
            };
            var getInputEl = function() {
                //elementTextarea[0].rows = scope.api._data.rows;
                // event bindings
                return elementTextarea = angular.element(templateTextarea), elementTextarea.attr("type", scope.api._data.type), 
                elementTextarea.val(scope.api._data.value), scope.api._data.disabled && (elementTextarea.attr("disabled", !0), 
                elementAll.addClass(classDisabled)), angular.isUndefined(scope.api._data.rows) || elementTextarea.attr("rows", scope.api._data.rows), 
                angular.isUndefined(scope.api._data.cols) || elementTextarea.attr("cols", scope.api._data.cols), 
                angular.isString(scope.api._data.value) && "" != scope.api._data.value ? elementTextarea.removeClass(classEmpty) : elementTextarea.addClass(classEmpty), 
                angular.isUndefined(scope.api._data.onKeyDown) || elementTextarea.bind("keydown", function(evt) {
                    scope.api._data.onKeyDown(evt);
                }), angular.isUndefined(scope.api._data.onKeyUp) || elementTextarea.bind("keyup", function(evt) {
                    scope.api._data.onKeyUp(evt);
                }), angular.isUndefined(scope.api._data.onKeyPress) || elementTextarea.bind("keypress", function(evt) {
                    scope.api._data.onKeyPress(evt);
                }), angular.isUndefined(scope.api._data.onInput) || elementTextarea.bind("input", function(evt) {
                    scope.api._data.onInput(evt);
                }), angular.isUndefined(scope.api._data.onMouseOver) || elementTextarea.bind("mouseover", function(evt) {
                    scope.api._data.onMouseOver(evt);
                }), angular.isUndefined(scope.api._data.onMouseOut) || elementTextarea.bind("mouseout", function(evt) {
                    scope.api._data.onMouseOut(evt);
                }), angular.isUndefined(scope.api._data.onMouseMove) || elementTextarea.bind("mousemove", function(evt) {
                    scope.api._data.onMouseMove(evt);
                }), angular.isUndefined(scope.api._data.onMouseDown) || elementTextarea.bind("mousedown", function(evt) {
                    scope.api._data.onMouseDown(evt);
                }), angular.isUndefined(scope.api._data.onMouseUp) || elementTextarea.bind("mouseup", function(evt) {
                    scope.api._data.onMouseUp(evt);
                }), elementTextarea.bind("focus", function() {
                    elementAll.addClass(classFocus);
                }), elementTextarea.bind("blur", function() {
                    elementAll.removeClass(classFocus);
                }), elementTextarea;
            };
            scope.$watch("api._data.value", function() {
                emptyCheck();
            });
            var setViewMode = function() {
                scope.api._data.editable = !1, element.children().remove(), angular.isString(scope.api._data.label) && (elementLabel = $compile(angular.element(templateLabel))(scope), 
                element.append(elementLabel)), elementValue = $compile(angular.element(templateValue))(scope), 
                element.append(elementValue);
            }, setEditMode = function() {
                childScope.$destroy(), element.children().remove(), childScope = scope.$new(), elementAll = angular.element(templateAll), 
                scope.api._data.editable = !0, elementAll.append(getInputEl()), element.append($compile(elementAll)(childScope)), 
                errorMsgCheck(), emptyCheck();
            }, emptyCheck = function() {
                angular.isUndefined(elementTextarea) || (!angular.isUndefined(scope.api._data.value) && scope.api._data.value.length > 0 ? (elementTextarea.removeClass(classEmpty), 
                elementAll.removeClass(classEmpty)) : (elementTextarea.addClass(classEmpty), elementAll.addClass(classEmpty)));
            }, errorMsgCheck = function() {
                angular.isUndefined(elementError) || elementError.remove(), scope.api._data.editable && (scope.api._data.valid ? (elementTextarea.removeClass(classInvalid), 
                elementAll.removeClass(classInvalid)) : (elementTextarea.addClass(classInvalid), 
                elementAll.addClass(classInvalid), angular.isString(scope.api._data.error) && (elementError = angular.element(templateError), 
                element.append($compile(elementError)(scope)))));
            };
            scope.$on("$destroy", function() {
                angular.isUndefined(scope.api._data.onKeyDown) || elementTextarea.unbind("keydown"), 
                angular.isUndefined(scope.api._data.onKeyUp) || elementTextarea.unbind("keyup"), 
                angular.isUndefined(scope.api._data.onKeyPress) || elementTextarea.unbind("keypress"), 
                angular.isUndefined(scope.api._data.onInput) || elementTextarea.unbind("input"), 
                angular.isUndefined(scope.api._data.onMouseOver) || elementTextarea.unbind("mouseover"), 
                angular.isUndefined(scope.api._data.onMouseOut) || elementTextarea.unbind("mouseout"), 
                angular.isUndefined(scope.api._data.onMouseMove) || elementTextarea.unbind("mousemove"), 
                angular.isUndefined(scope.api._data.onMouseDown) || elementTextarea.unbind("mousedown"), 
                angular.isUndefined(scope.api._data.onMouseUp) || elementTextarea.unbind("mouseup");
            }), // INIT
            angular.isUndefined(scope.settings.view) || 1 != scope.settings.view ? setEditMode() : setViewMode();
        }
    };
} ]);