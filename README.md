LiveDoc
=======

Checks specific page level tags from a Cucumber report to generate in-page, live documentation.
Still a proof of concept more than anything else. No error handling, lots of console.logs...

### Background
We were dealing with large specification documents that, though intentioned well, and used to 
inform the client, are out of date and relatively useless as soon as they are created. We had 
amendments that were very difficult to keep track of, and decisions and information got lost
in the documentation process.

We like Cucumber tests, though. They're nicely readable, and think we can get the business
units writing (even a semblance, as they aren't the ones converting them to usable) cukes.

We also run CI, in our case Jenkins, so generating cuke reports is easy. LiveDoc parses the
json formatted report data, checking against certain tags to display it on a page.

### Usage
Let's say, hypothetically, you're building a new search feature on your site. This feature
will have a search results page, a list of stacked results, one after the other.

In your cucumber tests, initially write a list of features as your acceptance criteria. It's
cool if they're all pending. In our case, we've tagged them @search_results:

    @search_results
    Feature: Search Results

    @wip @search_results
    Scenario: I can see the search results
      Given I am on the search results page
      Then I should see some results

Now, when you run your cucumber tests, use

    cucumber --format json > public/cuke.json

Change the public/cuke.json to something that suits you. We're building a rails app, and public
is the start of a root public folder, so it's easy to get to the json file from a js call by putting
it in there.

Sometimes Cucumber jams some junk at the start of the json file... Maybe check that and make
sure it's clean.

Then, in your search results page, just before the footer, add:

    <script src="/livedoc.js" type="text/javascript"></script>
    <script>
      $(document).ready(function () {
        LiveDoc.init("@search_results", "/cuke.json");
      });
    </script>
    
It'll asynchronously grab the json file, parse it for features matching the appropriate tags, and 
displays them on the page.