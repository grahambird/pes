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

## GDPR?

It collects no personal data.

## How it works



## How to use

1. Include pes.js in your page via a <script> tag.
2. Add a data-pes-value data attribute to any element you want to measure.

<a href="#" data-pes-value="10">Something to click</a>

## Finding the data in Google Analytics

## Limitations

* It only tracks DOM elements via the onclick event.
* There is no support for tracking clicks on embedded content like videos.
