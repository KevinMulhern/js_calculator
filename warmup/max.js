function my_max(arr){
    var max = [i]
 	for (var i = 0; i < arr.length; i++){
        if  (max < arr[i+1]){
         	max = arr[i+1];   
        }   
    }
    return max
}

console.log(my_max([1,56,2,3,-1,0]));