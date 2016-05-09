import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('Feed',
	function (pipeLine,searchQuerry) {
		let op = new Mongo.Collection("results");
		op.dropCollection();
		keys.aggregate(pipeLine);
		return(results.find({"content": {$regex:searchQuerry}}));
	}
);


Meteor.methods({
	'insertDocument' : function (elm){
		temp = keys.insert({"type":"document"});
		elm._idref = temp[0]._id;
		documents.insert(elm);
		console.log("insert was called on documents:\n"+temp);
	},
	'insertVote' : function (elm){
		temp = keys.insert({"type":"vote"});
		elm._idref = temp[0]._id;
		votes.insert(elm);
		console.log("insert was called on votes:\n"+temp);
	},
	'insertAnnotation' : function (elm){
		temp = keys.insert({"type":"annotation"});
		elm._idref = temp[0]._id;
		annotations.insert(elm);
		console.log("insert was called on annotations:\n"+temp);
	},
	'insertComment' : function (elm){
		temp = keys.insert({"type":"comment"});
		elm._idref = temp[0]._id;
		comments.insert(elm);
		console.log("insert was called on comments:\n"+temp);
	}
});