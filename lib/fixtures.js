votes = new Mongo.Collection("Votes");
documents = new Mongo.Collection("Documents");
annotations = new Mongo.Collection("Annotations");
comments = new Mongo.Collection("Comments");
spaceMonsters =  new Mongo.Collection("SpaceMonsters"); // Admins table
// users already exists.
if (Meteor.isServer) {
	Meteor.startup( function() {
		
	});
}