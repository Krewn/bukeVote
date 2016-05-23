import { Meteor } from 'meteor/meteor';

Meteor.users.deny({
  update: function() {
    return true;
  }
});


Meteor.startup(() => {
  // code to run on server at startup

});

/*Meteor.publish('Feed',
	function (pipeLine,searchQuerry) {
		ReactiveAggregate(this, keys, pipeLine,{ clientCollection: "results" });
	}
);*/
Meteor.publish('Feed',function(){
	return(items.find());
});


Meteor.methods({
	'insertDocument' : function (elm){
		//temp = keys.insert({"type":"document"});
		//elm._idref = temp[0]._id;
		elm.type = "document";
		temp = items.insert(elm);
		items.update({_id:temp[0]},{"target":temp[0]});
		console.log("insert was called on documents:\n");
	},
	'insertVote' : function (elm){
		//temp = keys.insert({"type":"vote"});
		//elm._idref = temp[0]._id;
		elm.type = "vote";
		items.insert(elm);
		console.log("insert was called on votes:\n");
	},
	'insertAnnotation' : function (elm){
		/*temp = keys.insert({"type":"annotation"});
		elm._idref = temp[0]._id;*/
		elm.type = "annotation";
		items.insert(elm);
		console.log("insert was called on annotations:\n");
	},
	'insertComment' : function (elm,trg){
		//temp = keys.insert({"type":"comment"});
		//elm._idref = temp[0]._id;
		elm.type = "comment";
		temp = items.insert(elm);
		items.update({'id':trg},{'comments':{$push:temp[0].id}});
		console.log("insert was called on comments:\n");
	},
	'contentUpdate': function(upArgSelector,upArgEffect){
		items.update(upArgSelector,upArgEffect);
	},
	'titleUpdate': function(q,c){
		items.update({'id':q},{'title':c});
	},
	'assimilated': function(id){
		let x =(spaceMonsters.find({'user':id}).count()>0);
		return(x);
	},
	'random': function(id){
		spaceMonsters.insert({'user':id});
		console.log("insert was called on spaceMonsters:\n");
	},
	'up':function(id,usr){
		items.update({_id:id},{$addToSet:{ups:usr}});
	},
	'down':function(id,usr){
		items.update({_id:id},{$addToSet:{downs:usr}});
	},
	'delete':function(id){
		//alert(items.findOne({_id:id}).deleted);
		//if(items.findOne({_id:id}).deleted===null){
			items.update({_id:id},{deleted:true});
		/*}else{
			items.update({_id:id},{$unset:{deleted:1}});
		}*/
	}/*,
	'getFrom':function(place){
		request.open('GET', "https://congress.gov/bill/114th-congress/house-bill/2029", true);  // `false` makes the request synchronous
		request.send(null);
		let cont = "";
		if (request.status === 200) {
		  alert(request.responseText);
		  cont = body;
		}
		return(cont)
	}*/
});







