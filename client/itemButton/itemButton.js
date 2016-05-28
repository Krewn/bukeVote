Template.itemButton.helpers({
	'contentDocument': function(){
		return(this.type=="document");
	}
	'contentAnnotation': function(){
		return(this.type=="annotation");
	}
});