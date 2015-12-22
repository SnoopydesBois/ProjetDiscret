Translation.prototype.constructor = Translation;

function Translation () {
	this.currentLang = LanguageEnum.MINUSCULE;
	
	this.messages = [];
	
	this.messages[LanguageEnum.EN] = [];
	this.messages[LanguageEnum.EN]["r"] = "RED";
	this.messages[LanguageEnum.EN]["v"] = "GREEN";
	this.messages[LanguageEnum.EN]["b"] = "BLUE";

	this.messages[LanguageEnum.FR] = [];
	this.messages[LanguageEnum.FR]["r"] = "rouge";
	this.messages[LanguageEnum.FR]["v"] = "vert";
	this.messages[LanguageEnum.FR]["b"] = "bleu";

	this.messages[LanguageEnum.LEET] = [];
	this.messages[LanguageEnum.LEET]["r"] = "r0ug3";
	this.messages[LanguageEnum.LEET]["v"] = "v3r7";
	this.messages[LanguageEnum.LEET]["b"] = "b13u";
}


Translation.prototype.translate = function (lang) {
	var node, nodes = document.querySelectorAll (".tr");
	for (var i = 0; i < nodes.length; ++i) {
		node = nodes[i];
		node.innerHTML = this.getMessage (lang, node.id);
	}
};


Translation.prototype.getMessage = function (lang, id) {
	return this.messages[lang][id];
};


Translation.prototype.addMessage = function (id, translation) {
	for (var lang in translation) {
		this.messages[lang][id] = translation[lang];
	}
};
