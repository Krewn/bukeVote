import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('GeneralVoteFeed', 
	function () {
		return votes.find();
	}
);
Meteor.publish('GeneralDocumentFeed', 
	function () {
		return documents.find();
	}
);
Meteor.publish('GeneralAnnotationsFeed', 
	function () {
		return annotations.find();
	}
);
Meteor.publish('GeneralCommentsFeed', 
	function () {
		return comments.find();
	}
);


Meteor.methods({
	'insertDocument' : function (elm){
		console.log("insert was called");
		documents.insert(elm);
	}
});