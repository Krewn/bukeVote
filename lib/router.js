/*
This file defines the routes for the project
*/

Router.route('/', function () {                        // The end user will only see one page on common.
  this.render('landing');
});
Router.route('/aliens', {name: "admin"});              // This page is where new root content is added to the feed.
Router.route('/aleins', {name: "extraTerrestrials"});  // This is where we though about scraping some things.
