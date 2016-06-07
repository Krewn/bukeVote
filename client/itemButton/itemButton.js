Template.itemButton.helpers({
	'contentDocument': function(){
		return(this.type=="document");
	},
	'contentAnnotation': function(){
		return(this.type=="annotation");
	},
	'itemUrl': function(){
		return(window.location.origin+"/"+this._id);
	}
});
