// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

(function() {
  var filters = angular.module('emoticonizeFilter', []);
  filters.filter('emoticonize', ['$sce',function($sce) {
    var emoticon, escapeCharacters, exclude, excludeArray, preMatch, specialEmoticons, specialRegex;
    escapeCharacters = [")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "."];
    specialEmoticons = {
      ":tho1:": {
      cssClass: "tho1"
      },
      ":tho2:": {
      cssClass: "tho2"
      },
      ":tho3:": {
      cssClass: "tho3"
      },
      ":tho4:": {
      cssClass: "tho4"
      },
      ":tho5:": {
      cssClass: "tho5"
      },
      ":tho6:": {
      cssClass: "tho6"
      },
      ":tho7:": {
      cssClass: "tho7"
      },
      ":tho8:": {
      cssClass: "tho8"
      },
      ":tho9:": {
      cssClass: "tho9"
      },
      ":tho10:": {
      cssClass: "tho10"
      },
      ":tho11:": {
      cssClass: "tho11"
      },
      ":tho12:": {
      cssClass: "tho12"
      },
      ":tho13:": {
      cssClass: "tho13"
      },
      ":tho14:": {
      cssClass: "tho14"
      },
      ":tho15:": {
      cssClass: "tho15"
      },
      ":tho16:": {
      cssClass: "tho16"
      },
      ":tho17:": {
      cssClass: "tho17"
      },
      ":tho18:": {
      cssClass: "tho18"
      },
      ":tho19:": {
      cssClass: "tho19"
      },
      ":tho20:": {
      cssClass: "tho20"
      },
      ":tho21:": {
      cssClass: "tho21"
      },
      ":tho22:": {
      cssClass: "tho22"
      },
      ":tho23:": {
      cssClass: "tho23"
      },
      ":tho24:": {
      cssClass: "tho24"
      },
      ":tho25:": {
      cssClass: "tho25"
      },
      ":tho26:": {
      cssClass: "tho26"
      },
      ":tho27:": {
      cssClass: "tho27"
      },
      ":tho28:": {
      cssClass: "tho28"
      },
      ":tho29:": {
      cssClass: "tho29"
      },
      ":tho30:": {
      cssClass: "tho30"
      },
      ":-)": {
        cssClass: "smile"
      },
      ":)": {
        cssClass: "smile"
      },
      ":smile:": {
        cssClass: "smile"
      },
      ":D": {
        cssClass: "biggrin"
      },
      ":-D": {
        cssClass: "biggrin"
      },
      ":grin:": {
        cssClass: "biggrin"
      },
      ":(": {
        cssClass: "sad"
      },
      ":-(": {
        cssClass: "sad"
      },
      ":sad:": {
        cssClass: "sad"
      },
      "8O": {
        cssClass: "shock"
      },
      "8-O": {
        cssClass: "shock"
      },
      ":shock:": {
        cssClass: "shock"
      },
      ":?": {
        cssClass: "confused"
      },
      ":-?": {
        cssClass: "confused"
      },
      ":???:": {
        cssClass: "confused"
      },
      ":confused:": {
        cssClass: "confused"
      },
      "8)": {
        cssClass: "cool"
      },
      "8-)": {
        cssClass: "cool"
      },
      ":cool:": {
        cssClass: "cool"
      },
      ":x": {
        cssClass: "mad"
      },
      ":-x": {
        cssClass: "mad"
      },
      ":mad:": {
        cssClass: "mad"
      },
      ":P": {
        cssClass: "razz"
      },
      ":-P": {
        cssClass: "razz"
      },
      ":razz:": {
        cssClass: "razz"
      },
      ":|": {
        cssClass: "neutral"
      },
      ":-|": {
        cssClass: "neutral"
      },
      ":neutral:": {
        cssClass: "neutral"
      },
      ";)": {
        cssClass: "wink"
      },
      ";-)": {
        cssClass: "wink"
      },
      ":wink:": {
        cssClass: "wink"
      },
      ">:(": {
        cssClass: "evil"
      },
      ">;(": {
        cssClass: "evil"
      },
      ">:-(": {
        cssClass: "evil"
      },
       ":evil:": {
        cssClass: "evil"
      },
      ">:-D": {
        cssClass: "twisted"
      },
       ":twisted:": {
        cssClass: "twisted"
      },
      ":lol:": {
        cssClass: "lol"
      },
      ":oops:": {
        cssClass: "oops"
      },
      ":cry:": {
        cssClass: "cry"
      },
      ":roll:": {
        cssClass: "roll"
      },
      ":eek:": {
        cssClass: "eek"
      },
      ":o": {
        cssClass: "eek"
      },
      ":-o": {
        cssClass: "eek"
      },
      ":!:": {
        cssClass: "exclaim"
      },
       ":?:": {
        cssClass: "question"
      },
      ":idea:": {
        cssClass: "idea"
      },
      ":arrow:": {
        cssClass: "arrow"
      },
      ":mrgreen:": {
        cssClass: "mrgreen"
      }
    };
    specialRegex = new RegExp('(\\' + escapeCharacters.join('|\\') + ')', 'g');
    preMatch = '(^|[\\s\\0])';
    var specialEmoticonsObject =  {};
   for(emoticon in specialEmoticons)
   {
      emoticon_new = emoticon.replace(specialRegex, '\\$1');
      specialEmoticonsObject[emoticon] = new RegExp(preMatch + '(' + emoticon_new + ')', 'g');
    }

    exclude = 'span.css-emoticon';
    exclude += ",pre,code,.no-emoticons";
    excludeArray = exclude.split(',');
    return function(text) {
      var cssClass, specialCssClass, _l, _len3, _len4, _len5, _m, _n;

      text=text.valueOf();
      cssClass = 'css-emoticon';

      for (emoticon in specialEmoticonsObject) {
        specialCssClass = cssClass + " " + specialEmoticons[emoticon].cssClass;
        text = text.replace(specialEmoticonsObject[emoticon], "$1<span class='" + specialCssClass + "'>$2</span>");
      }

      return $sce.trustAsHtml(text);
    };

  }]);

}).call(this);
