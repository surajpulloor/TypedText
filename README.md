# TypedText
A Typescript library for creating typing word animation effect on the browser for a given set of words

## What is typing word effect
* A picture is a thousand words, this is what the library does
![TypedText Screenshot](screenshot.gif)
* As we can see the name of the languages in the above example seem to be typed/untyped, this is the crux of the library.
* This part is the dynamic part of the text
* There's also the static part which in this case is "Learn"

## Can it be styled
* Yes, TypedText injects 3 elements span.static-text, span.dynamic-text and div.cursor to the given container element.
* Using the selectors mentioned above we can add/change CSS properties.

## Dependencies
* The library is self contained, doesn't have any dependencies.
* Typescript >= 3.2

## How to use it
* Install Typescript globally with npm
```bash
npm install -g typescript
```
* After that build the library using typescript
```bash
npm run build
```
* After building, the compiler will output typed-text.js file in the dist folder
* After that it's pretty straight forward include the js file to an html document like so
```html
<script src="location to typed-text"></script>
```
* After that in another script tag create a new TypedText object like so
```javascript
// Init TypedText
let typedTextObj = new TypedText(
                    'Learn', // Static Text
                    ['C++', 'C', 'Java', 'Rust'], // A list of dynamic texts
                    20, // Font Size of the container
                    7, // Cursor Width
                    600, // Animation Speed
                    1500, // Delay in Animtion (Wait for backspace animation)
                    document.querySelector('#container')
                  );
// Start the animation
typedTextObj.start();
```
* That's it your up and running

## Available Npm Scripts
* build
* watch

## TODO
* Need to find a math formula to calculate the size of the cursor with respect to the font size of the typed text
