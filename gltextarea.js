/*! 
  glTextarea v(0.0.4) 
  (c) 2013-2015
  https://gluenetworks.kilnhg.com/Code/Web-Development
  Release Date: 2015-03-03 
*/
angular.module("glTextarea", []), angular.module("glTextarea").directive("glTextarea", [ "$compile", function($compile) {
    "use strict";
    return {
        restrict: "E",
        replace: !0,
        scope: {
            settings: "=",
            api: "="
        },
        link: function(scope, element) {
            var elementTextarea, elementError, elementLabel, elementValue, classEmpty = "gl-empty", classInvalid = "gl-invalid", templateTextarea = '<textarea class="gl-textarea-input" placeholder="{{api._data.placeholder}}" data-ng-model="api._data.value"></textarea>', templateError = '<p class="gl-textarea-error">{{api._data.error}}</p>', templateLabel = '<label class="gl-textarea-view-label">{{api._data.label}}</label>', templateValue = '<p class="gl-textarea-view-value">{{api._data.value}}</p>';
            scope.api = angular.isUndefined(scope.api) ? {} : scope.api, console.log("scope.api"), 
            console.log(scope.api), scope.api._data = {}, // MAP SETTINGS
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
            scope.api._data.emitEvents = angular.isUndefined(scope.settings.emitEvents) ? [ "focus", "blur", "change", "keypress", "input" ] : scope.settings.emitEvents, 
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
                scope.api._data.disabled = !0, elementTextarea.attr("disabled", !0);
            }, scope.api.enable = function() {
                scope.api._data.disabled = !1, elementTextarea.removeAttr("disabled");
            };
            var getInputEl = function() {
                //elementTextarea[0].rows = scope.api._data.rows;
                // emit events
                return elementTextarea = angular.element(templateTextarea), elementTextarea.attr("type", scope.api._data.type), 
                elementTextarea.val(scope.api._data.value), scope.api._data.disabled && elementTextarea.attr("disabled", !0), 
                angular.isUndefined(scope.api._data.rows) || elementTextarea.attr("rows", scope.api._data.rows), 
                angular.isUndefined(scope.api._data.cols) || elementTextarea.attr("cols", scope.api._data.cols), 
                angular.isString(scope.api._data.value) && "" != scope.api._data.value ? elementTextarea.removeClass(classEmpty) : elementTextarea.addClass(classEmpty), 
                angular.forEach(scope.api._data.emitEvents, function(value) {
                    elementTextarea.bind(value, function(evt) {
                        scope.$emit(scope.settings.name + "-" + value, evt);
                    });
                }), $compile(elementTextarea)(scope);
            };
            scope.$watch("api._data.value", function() {
                emptyCheck();
            });
            var setViewMode = function() {
                scope.api._data.editable = !1, element.children().remove(), angular.isString(scope.api._data.label) && (elementLabel = $compile(angular.element(templateLabel))(scope), 
                element.append(elementLabel)), elementValue = $compile(angular.element(templateValue))(scope), 
                element.append(elementValue);
            }, setEditMode = function() {
                scope.api._data.editable = !0, element.children().remove(), element.append(getInputEl()), 
                errorMsgCheck(), emptyCheck();
            }, emptyCheck = function() {
                angular.isUndefined(elementTextarea) || (!angular.isUndefined(scope.api._data.value) && scope.api._data.value.length > 0 ? elementTextarea.removeClass(classEmpty) : elementTextarea.addClass(classEmpty));
            }, errorMsgCheck = function() {
                angular.isUndefined(elementError) || elementError.remove(), scope.api._data.editable && (scope.api._data.valid ? elementTextarea.removeClass(classInvalid) : (elementTextarea.addClass(classInvalid), 
                angular.isString(scope.api._data.error) && (elementError = $compile(angular.element(templateError))(scope), 
                element.append(elementError))));
            };
            // INIT
            angular.isUndefined(scope.settings.view) || 1 != scope.settings.view ? setEditMode() : setViewMode();
        }
    };
} ]);