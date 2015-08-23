function reverse(string) {
    var original_string = string.split("");
    var reverse_string = [] 
    
    var iterations = original_string.length;
    
    for(var i = 0; i < iterations; i++ ){
     	var letter = original_string.pop();
        reverse_string.push(letter);
    }
    return reverse_string.join("");
}

alert(reverse("katrina"));