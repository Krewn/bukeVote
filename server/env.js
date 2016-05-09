import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('GeneralVoteFeed', 
	function () {
		return votes.find();
	}//One subscription like this for each collection
);//is effectivly auto publish
Meteor.publish('GeneralDocumentFeed', 
	function () {
		return documents.find();
	}//One subscription like this for each collection
);//is effectivly auto publish
Meteor.publish('GeneralAnnotationsFeed', 
	function () {
		return annotations.find();
	}//One subscription like this for each collection
);//is effectivly auto publish
Meteor.publish('GeneralCommentsFeed', 
	function () {
		return comments.find();
	}//One subscription like this for each collection
);//is effectivly auto publish


Meteor.methods({
	'insertDocument' : function (elm){
		console.log("insert was called");
		documents.insert(elm);
	}//This is effectivly insecure...
});