/* This File Defines the Projects collections */
items = new Mongo.Collection("Items");
spaceMonsters =  new Mongo.Collection("SpaceMonsters"); // Admins table
/*

Here in all the data for the application instance will be distributed to 3 tables
Users, as is required by the accounts packages, items for all the pieces that exist 
on the site and of course spaceMonsters which will identify admins.

*/
if (Meteor.isServer) {
	Meteor.startup( function() {
		
	});
}