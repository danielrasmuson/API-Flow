var facebook = function(imgFunc){
    return imgFunc();
}

var testFunc = function(){
    return 'this images';
}



console.log(facebook(testFunc));