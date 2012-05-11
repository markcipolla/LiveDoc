// LiveDoc - Check specific page level tags to generate in-page, live documentation.
// by Mark Cipolla, http://www.markcipolla.com

// Version 0.0.2
// Full source at https://github.com/markcipolla/LiveDoc
// Copyright (c) 2012 Mark Cipolla

// MIT License, https://github.com/markcipolla/LiveDoc/blob/master/LICENSE.md
var LiveDoc = (function () {

    var init = function(tags, cucumber_json_url) {
        var tags = tags;
        
        $('body').append("<div id='livedoc' style='display: none'></div>");
        $("#livedoc").append("<h1>LiveDoc</h1><div id='livedoc_results'></div>");
        $("#livedoc").height(document.documentElement.scrollHeight);

        $("#livedoc").click(function() {
          $('body').toggleClass("livedoc_opened");
          $(this).toggleClass("opened");
        });

        $.get(cucumber_json_url, function(data){

            var features = data["features"];
            // Loop through the features
            for (i = 0; i < features.length; i++) {

                var feature = features[i];
                var feature_tags = $.map( feature["tags"], function(val, i) {
                    return val.name;
                });

                if( $.inArray(tags, feature_tags) != -1 ) {

                    $("#livedoc_results").append("<div class='livedoc_result'></div>");
                    var result = $("#livedoc_results .livedoc_result").last();
                    result.html("<h4>" + feature["keyword"] + " - " + feature["name"]) + "</h4>";

                    // Add a 'pending' class if the feature is @wip
                    if( $.inArray("@wip", feature_tags) != -1 ) {
                        $("#livedoc_results .livedoc_result").last().addClass("pending");
                    }

                    if ( feature["elements"]) {

                        for (j = 0; j < feature["elements"].length; j++) {
                            // Get the Scenario
                            var scenario = feature["elements"][j];
                            console.log(scenario);

                            var scenario_tags = $.map( scenario["tags"], function(val, i) {
                                return val.name;
                            });

                            if( $.inArray(tags, scenario_tags) != -1 ) {
                                // Append the Scenario details
                                result.append("<dl><dt><span>" + scenario.type + "</span>" + scenario.name + "</dt><dd></dd></dl>")
                                result.find("dd").last().append("<ul></ul>");

                                var steps_list = $(result).find("ul").last();
                                if ( scenario["steps"]) {
                                    for (k = 0; k < scenario["steps"].length; k++) {
                                        // Append the Step details
                                        steps_list.append("<li class='" + scenario["steps"][k]["result"]["status"] + "'>" + scenario["steps"][k]["keyword"] + " " + scenario["steps"][k]["name"] + "</li>");
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Finally, unhide the whole she-bang
            $("#livedoc").fadeIn("slow");
        }, "json");
    };
    
    // Public API
    return {
        init: init
    };

})();