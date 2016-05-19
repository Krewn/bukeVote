Router.route('/', function () {
  this.render('landing');
});
Router.route('/settings', {name: "settings"});
Router.route('/aliens', {name: "admin"});
Router.route('/aleins', {name: "extraTerrestrials"});
