class TypedText {
    constructor(
        staticText: string, 
        listOfDynamicText: Array<string>, 
        textFontSize: number,
        cursorWidth: number,
        animationSpeed: number,
        secondAnimationDelay: number,
        container: HTMLDivElement
    ) {
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

    start = () => {
        this.blinkCursor();
        this.goThroughDynamicTextList();
    }

    setFontSize = (fontSize: number) => {
        this.textFontSize = fontSize;
        this.typedTextConatiner.style.fontSize = `${this.textFontSize * 0.75}pt`;
        this.cursorDivRef.style.height = `${this.textFontSize}px`;
    }

    setCursorWidth = (cursorWidth: number) => {
        this.cursorWidth = cursorWidth;
        this.cursorDivRef.style.width = `${this.cursorWidth}px`;
    }

    blinkCursor = () => {
        if (!this.cursorHidden) {
            this.cursorDivRef.className = "cursor cursor-hidden";
            this.cursorHidden = true;
        } else {
            this.cursorDivRef.className = "cursor";
            this.cursorHidden = false;
        }
        setTimeout(this.blinkCursor, 500);
    };

    goThroughDynamicTextList = () => {
        if (this.currentTypedText === this.listOfDynamicText.length) {
            this.currentTypedText = 0;
        }
        this.firstAnimationInterval = setInterval(this.displaySubStringLeftToRight, this.animationSpeed, this.listOfDynamicText[this.currentTypedText++]);    
    }

    subStringOfTypedText = (str: string) => {
        return str.substring(this.leftSubStringIndex, this.rightSubStringIndex);
    }

    displaySubStringLeftToRight = (str: string) => {
    
        if (this.rightSubStringIndex++ <= str.length) {
            this.dynamicTextSpanRef.innerHTML = this.subStringOfTypedText(str);
        } else {
            // Clear the interval before setting the backspace animation delay
            clearInterval(this.firstAnimationInterval);
    
            // After the text is typed from left to right delay the next animation i.e backspacing the typed text
            setTimeout(() => {
                // Execute it before the interval
                this.displaySubStringRightToLeft(str);
                // Set the interval for displaySubStringRightToLeft after displaySubStringLeftToRight is finished with the whole word
                this.secondAnimationInterval = setInterval(this.displaySubStringRightToLeft, this.animationSpeed, str);
            
            }, this.secondAnimationDelay);
    
        }
    }

    displaySubStringRightToLeft = (str: string) => {
        if (this.rightSubStringIndex-- > 0) {
            this.dynamicTextSpanRef.innerHTML = this.subStringOfTypedText(str);
        } else {
            clearInterval(this.secondAnimationInterval);
            // Go through the next string in the Array
            this.goThroughDynamicTextList();
        }
    }

    private staticText: string;
    private listOfDynamicText: Array<string>;
    private textFontSize: number;
    private cursorWidth: number;
    private animationSpeed: number;
    private secondAnimationDelay: number;
    private container: HTMLDivElement;

    private firstAnimationInterval: number;
    private secondAnimationInterval: number;
    private currentTypedText: number;
    private leftSubStringIndex: number;
    private rightSubStringIndex: number;
    private cursorHidden: boolean;

    // For containing the cursor div, static text span and dynamic text span refs.
    private staticTextSpanRef: HTMLSpanElement;
    private dynamicTextSpanRef: HTMLSpanElement;
    private cursorDivRef: HTMLDivElement;
    private typedTextConatiner: HTMLDivElement;
}

export default TypedText;