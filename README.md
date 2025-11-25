1) Trigger point 
Graph alert is triggered at line 122 in app.js
```js
$("#testDataAlertBtn").click(function () {
```

2) Function called (Graph renderer)
This function is responsible for generating each graph's html and is at line 87 in app.js
This function basically loops through Python, Spark, and LLM values and creates the horizontal bars.
```js
function renderGraph(title, graphData)
```

3) Popup control functions 
We display and hide our popup using these 2 functions at line 121 and 126 in app.js
```js
function openDataAlert(htmlContent)
```
```js
function closeDataAlert()
```

4) Last is our bars animation
The animation that expands our bar from 0% to its final width is at line 149 in app.js
```js
setTimeout(() => {
        $(".barFill").each(function () {
            $(this).css("width", $(this).data("width"));
        });
    }, 200);
```


