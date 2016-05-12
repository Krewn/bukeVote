//results = new Mongo.Collection("results");
//keys = new Mongo.Collection("Keys");
items = new Mongo.Collection("Items");
/*
{
	"type":collectionName,
	"remote_id":id
}
*/
//votes = new Mongo.Collection("Votes");
/*
{
	"creator": this._userId
	"title": 
	"status": enum(yea,nea)
	"doc": id in collection documents
	"comments":[]
}
*/
//documents = new Mongo.Collection("Documents");
/*
{
	"title":""
	"content": "",
	"annotations": [id in collection annotations],
	"votes":[{userId:enum(yea,nea)}]
}
*/
//annotations = new Mongo.Collection("Annotations");
/*
{
	"doc": id in collection documents
	//"content": [{start: textIndex , end: textIndex , score: int , comments:[]}]
	'title' : the text highlighted
	"score": 0
	'creator' : this._userId
	"comments":[]
}
*/
//comments = new Mongo.Collection("Comments");
/*
{
	'target': _id in items
	"creator": this._userId
	"title": ""
	"score": 0
	"comments":[]
}
*/
//common =  new Mongo.Collection("Common");
/*{
	existis in field
}*/

spaceMonsters =  new Mongo.Collection("SpaceMonsters"); // Admins table
/*
{
	"user":this._userId
}
*/
// users already exists.
if (Meteor.isServer) {
	Meteor.startup( function() {
		
	});
}