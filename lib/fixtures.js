keys = new Mongo.Collection("Keys");
/*
{
	"type":collectionName,
	"remote_id":id
}
*/
votes = new Mongo.Collection("Votes");
/*
{
	"user": this._userId
	"status": enum(yea,nea)
	"doc": id in collection documents
}
*/
documents = new Mongo.Collection("Documents");
/*
{
	"title":""
	"content": "",
	"annotations": [id in collection annotations],
	"votes":[{userId:enum(yea,nea)}]
}
*/
annotations = new Mongo.Collection("Annotations");
/*
{
	"doc": id in collection documents
	"content": [{start: textIndex , end: textIndex , score: int , comments:[]}]
	"score": 0
	"comments":[]
}
*/
comments = new Mongo.Collection("Comments");
/*
{
	"poster": this._userId
	"content": ""
	"score": 0
	"comments":[]
}
*/
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