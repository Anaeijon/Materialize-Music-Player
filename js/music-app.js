var MusicAppProto = Object.create(HTMLElement.prototype);

alert("alive");

var MusicAppProto = Object.create(HTMLElement.prototype);

MusicAppProto.createdCallback = function () {
	// get reference to main document
	var ownerDoc = document.currentScript.ownerDocument;

	var appDom;
	if (document.head.createShadowRoot || document.head.attachShadow) {
		appDom = this.createShadowRoot();
	} else {
		appDom = this;
	}
	var template = ownerDoc.querySelector('#musicAppTemplate');
	var instanceClone = document.importNode(template.content, true);
	appDom.appendChild(instanceClone);
};


MusicAppProto.attachedCallback = function() {
	// an instance was inserted into the document
};

MusicAppProto.detachedCallback = function() {
	// an instance was removed from the document
};

MusicAppProto.attributeChangedCallback = function(attrName, oldVal, newVal) {
	// an attribute was added, removed, or updated
};

MusicAppProto.setSong = function(file) {

};

var MusicApp = document.registerElement('music-app', {
	prototype: MusicAppProto
});
