function vowel_count(str) {
	var letterArr = str.split("");
    var count = 0;
  
    for(var i = 0; i < letterArr.length; i++){
     	switch (letterArr[i].toLowerCase()) {
            case "a": count = count + 1;
            break;
            case "e": count = count + 1;
            break;
            case "i": count = count + 1;
            break;
            case "o": count = count + 1;
            break;
            case "u": count = count + 1;
            break;
            case "y": count = count + 1;
            break;
        }
    }
   return count
}

alert(vowel_count("eiouy"));