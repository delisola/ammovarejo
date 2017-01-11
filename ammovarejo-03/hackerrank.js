var n;
var m;
var larger = 0;
var matrix = [];
var arString = [];

function processData(input) {
    var arInput = input.split('\n');   
    
    n = parseInt(arInput[0]);
    m = parseInt(arInput[1]);
    arInput = arInput.slice(2);
    matrix = arInput.map(function(val){
        return val.replace(/(\r\n\s|\s|\n|\r)/g, '').split('');
    });
    
    checkRegions();
    process.stdout.write(larger);
}

function checkRegions(){
    var size = 0;
    for(l=0; l<n; l++){
        for(c=0; c<m; c++){
            if(matrix[l][c] == 1) size = countAreas(l, c); 
            if(size > larger) larger = size;  
        }
    }
}

function countAreas(c, l){
    return checkAreas(c-1, l-1) + checkAreas(c-1, l) + checkAreas(c-1, l+1) + checkAreas(c, l-1) + 1 + checkAreas(c, l+1) + checkAreas(c+1, l-1) + checkAreas(c+1, l) + checkAreas(c+1, l+1);
}

function checkAreas(c, l){
    if( ((c<0 || l<0) || (c>=n || c>=m)) || typeof matrix[c][l] === 'undefined' ){
        return 0;
    }
    return parseInt(matrix[c][l]);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});