# pes.js
## Page Engagement Score

Measure engagement with your website and send page scores to Google Analytics as events.

## Requires

JQuery

## What it does

* On load, it scans the page for elements with the data-pes-value attribute 
* It then generates a maximum potential score from those elements
* As the user interacts with the page, the amount of engagement is tracked
* If the user clicks the same element twice, the score does not increase
* When the user leaves the page, it sends a calculated score out of 100 to Google Analytics

## How to use

1. Include pes.js in your page via a <script> tag.
2. Add a data-pes-value data attribute to any element you want to measure.

The score is always out of 100, no matter how many elements you add. You can give different elements different weights by increasing or decreasing the score in the data attribute.
  
## Example HTML

<a href="#" data-pes-value="10">Something trivial</a>

<a href="#" data-pes-value="200">Something really important</a>

## GDPR?

It collects no personal data.

## Finding the data in Google Analytics

Go to the Events reports. 

## Limitations

* It only tracks DOM elements via the onclick event.
* There is no support for tracking clicks on embedded content like videos.
