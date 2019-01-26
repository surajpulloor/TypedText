"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypedText = /** @class */ (function () {
    function TypedText(staticText, listOfDynamicText, textFontSize, cursorWidth, animationSpeed, secondAnimationDelay, container) {
        var _this = this;
        this.start = function () {
            _this.blinkCursor();
            _this.goThroughDynamicTextList();
        };
        this.setFontSize = function (fontSize) {
            _this.textFontSize = fontSize;
            _this.typedTextConatiner.style.fontSize = _this.textFontSize * 0.75 + "pt";
            _this.cursorDivRef.style.height = _this.textFontSize + "px";
        };
        this.setCursorWidth = function (cursorWidth) {
            _this.cursorWidth = cursorWidth;
            _this.cursorDivRef.style.width = _this.cursorWidth + "px";
        };
        this.blinkCursor = function () {
            if (!_this.cursorHidden) {
                _this.cursorDivRef.className = "cursor cursor-hidden";
                _this.cursorHidden = true;
            }
            else {
                _this.cursorDivRef.className = "cursor";
                _this.cursorHidden = false;
            }
            setTimeout(_this.blinkCursor, 500);
        };
        this.goThroughDynamicTextList = function () {
            if (_this.currentTypedText === _this.listOfDynamicText.length) {
                _this.currentTypedText = 0;
            }
            _this.firstAnimationInterval = setInterval(_this.displaySubStringLeftToRight, _this.animationSpeed, _this.listOfDynamicText[_this.currentTypedText++]);
        };
        this.subStringOfTypedText = function (str) {
            return str.substring(_this.leftSubStringIndex, _this.rightSubStringIndex);
        };
        this.displaySubStringLeftToRight = function (str) {
            if (_this.rightSubStringIndex++ <= str.length) {
                _this.dynamicTextSpanRef.innerHTML = _this.subStringOfTypedText(str);
            }
            else {
                // Clear the interval before setting the backspace animation delay
                clearInterval(_this.firstAnimationInterval);
                // After the text is typed from left to right delay the next animation i.e backspacing the typed text
                setTimeout(function () {
                    // Execute it before the interval
                    _this.displaySubStringRightToLeft(str);
                    // Set the interval for displaySubStringRightToLeft after displaySubStringLeftToRight is finished with the whole word
                    _this.secondAnimationInterval = setInterval(_this.displaySubStringRightToLeft, _this.animationSpeed, str);
                }, _this.secondAnimationDelay);
            }
        };
        this.displaySubStringRightToLeft = function (str) {
            if (_this.rightSubStringIndex-- > 0) {
                _this.dynamicTextSpanRef.innerHTML = _this.subStringOfTypedText(str);
            }
            else {
                clearInterval(_this.secondAnimationInterval);
                // Go through the next string in the Array
                _this.goThroughDynamicTextList();
            }
        };
        this.staticText = staticText;
        this.listOfDynamicText = listOfDynamicText;
        this.textFontSize = textFontSize;
        this.cursorWidth = cursorWidth;
        this.animationSpeed = animationSpeed;
        this.secondAnimationDelay = secondAnimationDelay;
        this.container = container;
        // Assign a few other values
        this.currentTypedText = 0;
        this.leftSubStringIndex = 0;
        this.rightSubStringIndex = 0;
        this.cursorHidden = true;
        // Create a new elements for cursor, staticText, dynamicText
        this.cursorDivRef = document.createElement("div");
        this.staticTextSpanRef = document.createElement("span");
        this.dynamicTextSpanRef = document.createElement("span");
        // Set css classes for these elements
        this.cursorDivRef.className = "cursor";
        this.staticTextSpanRef.className = "static-text";
        this.dynamicTextSpanRef.className = "dynamic-text";
        // Set the innerHTML of staticTextSpanRef to staticText
        this.staticTextSpanRef.innerHTML = this.staticText;
        // Set the width and height(textFontSize) of the cursor
        this.cursorDivRef.style.height = this.textFontSize + "px";
        this.cursorDivRef.style.width = this.cursorWidth + "px";
        // Create a new div.typed-text element to contain all the above elements
        this.typedTextConatiner = document.createElement("div");
        // Set the class for the above div element
        this.typedTextConatiner.className = "typed-text";
        // Set the font-size of div.typed-text element
        this.typedTextConatiner.style.fontSize = (this.textFontSize * 0.75) + "pt";
        // Append staticText, dynamicText, cursor to typedTextContainer
        this.typedTextConatiner.appendChild(this.staticTextSpanRef);
        this.typedTextConatiner.appendChild(this.dynamicTextSpanRef);
        this.typedTextConatiner.appendChild(this.cursorDivRef);
        // Append this div.typed-text element to the root container that the dev provides
        this.container.appendChild(this.typedTextConatiner);
        // Set these two to zero
        this.firstAnimationInterval = 0;
        this.secondAnimationInterval = 0;
    }
    return TypedText;
}());
exports.default = TypedText;
