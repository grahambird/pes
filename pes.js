// Page Engagement Score
// Record user engagement with the page
// Define element values via data attributes
// On load, all defined values will be collected to form a potential score
// As the user clicks on different elements, their score will be totalled
// When the user leaves the page, the score is added as a custom metric to Google Analytics

var pes = {} || null;

pes = {
  
  debug: false,
  
  ga: {
    eventCategoryName: 'Page Engagement Score',
    eventActionName: 'Record'
  },
  
  dataAttributeName: 'pes-value',
  
  score: {
    achieved: 0,
    potential: 0,
    metric: 0
  },
  
  elementId: 0,
  elements: [],
  
  generateId: function() {
    var id = pes.elementId++;
    return 'pes-id-' + id;
  },
  
  // scan page and store items we want to score
  capture: function() {
    // pick up elements using the data attribute
    $('[data-' + pes.dataAttributeName + ']').each(function(){
      var $element = $(this);
      
      var elementId = $(this).attr('id');
          
      if ( typeof elementId === "undefined" ) {
        elementId = pes.generateId();
        $(this).attr('id', elementId);
      }
      
      var elementScore = $(this).data(pes.dataAttributeName);
      
      pes.elements.push({'id':elementId, 'score': elementScore, 'clicked':false});
      // add to total possible score
      pes.score.potential += elementScore;
      
    });
    
    //console.log(pes.elements);
    
  },
  
  // record the score to analytics as an event
  record: function() {

    var pageUrl = window.location.pathname;
    if (window.location.search) {
      pageUrl = pageUrl + window.location.search;
    }
    
    if (pes.debug) {
      console.log('Recording score of ' + pes.score.metric);
    }

    // category, action, label, value
    ga('send', 'event', pes.ga.eventCategoryName, pes.ga.eventActionName, pageUrl, pes.score.metric);

  },
  
  // calculate the score
  calculate: function() {
    var metric = (pes.score.achieved / pes.score.potential) * 100;
    pes.score.metric = Math.round(metric);
    
    // if debug on then display current metric
    if (pes.debug == true) {
      $('#pes-debug-score').text(pes.score.metric);  
    }
    
  },
  
  // go
  init: function() {
    
    // when user leaves the page, record score
    window.onbeforeunload = function(event) {
      pes.record();
    };
    
    // if debug on, show current score
    if (pes.debug == true) {
      $('body').append('<div style="position:fixed;top:10px;left:10px;height:30px;border-radius:5px;line-height:30px;padding:0 20px;color:white;background-color:red;"><span id="pes-debug-score">0</span><a style="display:inline-block;margin-left:20px;color:white;" href="#" onclick="pes.record();return false;">Send to Google Analytics</a></div>');
    }
    
    // capture items to score
    pes.capture();
    
    // add click events to all elements we want to score
    $.each(pes.elements, function(index, value) {
      
      $('#' + value.id).on( "click", function(event) {
        
        var elementId = $(this).attr('id');
        var elementScore = $(this).data(pes.dataAttributeName);
        
        var element = $.grep(pes.elements, function(e){ return e.id == elementId; });
        element = element[0];
        
        if (element.clicked == false) {
          pes.score.achieved += element.score;
          element.clicked = true;
        }
        
        pes.calculate();
        
      });
      
    });
    
  }
  
};
  
// init
pes.init();
