// LiveDoc - Check specific page level tags to generate in-page, live documentation.
// by Mark Cipolla, http://www.markcipolla.com

// Version 0.0.1
// Full source at https://github.com/markcipolla/LiveDoc
// Copyright (c) 2012 Mark Cipolla

// MIT License, https://github.com/markcipolla/LiveDoc/blob/master/LICENSE.md
var LiveDoc = (function () {

    var init = function(tags, cucumber_json_url) {
        var tags = "@search_results";
        
        $('body').append("<div id='livedoc'></div>");
        $("#livedoc").append("<h1>LiveDoc</h1><div id='livedoc_results'></div>");

        $("#livedoc").click(function() {
          $('body').toggleClass("livedoc_opened");
          $(this).toggleClass("opened");
        });

        $.get(cucumber_json_url, function(data){

            var features = data["features"];
            // Loop through the features
            for (i = 0; i < features.length; i++) {

                var feature = features[i];
                console.log(feature);

                var feature_tags = $.map( feature["tags"], function(val, i) {
                    return val.name;
                });

                if( $.inArray(tags, feature_tags) != -1 ) {

                    $("#livedoc_results").append("<div class='livedoc_result'></div>");
                    $("#livedoc_results .livedoc_result").last().html("<h4>" + feature["keyword"] + " - " + feature["name"]) + "</h4>";

                    if ( feature["elements"]) {
                      for (j = 0; j < feature["elements"].length; j++) {
                        var scenario = feature["elements"][j];
                        console.log(scenario);
                      }
                    }
                }
            }
        }, "json");
    };
    
    // Public API
    return {
        init: init
    };

})();