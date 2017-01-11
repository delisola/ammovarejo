var col = 0;
var lin = 0;
var matrix = [];
var regions = [];
var larger = 0;
var stdin  = process.stdin;
var stdout = process.stdout;

function createMatrix (){
    var l, c;
    for(l=0; l<lin; l++){
        matrix[l] = [];
        for(c=0; c<col; c++){
            var rand = Math.round(Math.random() * 1);
            matrix[l][c] = rand;
        }
    }

    checkRegions();
    displayMatrix();
    displayResult();
    process.exit();
}

function displayMatrix(){
     for(l=0; l<lin; l++){
        stdout.write('\n');
        for(c=0; c<col; c++){
           stdout.write( matrix[l][c] + ' ' );
        }
    }
    stdout.write('\n\n');
}

function checkRegions(){
    for(l=0; l<lin; l++){
        for(c=0; c<col; c++){
            if(matrix[l][c] === 1){
                var size = countAreas(l, c);
                regions.push({
                    'col': c,
                    'lin': l,
                    'size': size
                });

            }
            if(size > larger) larger = size;
        }
    }
}

function displayResult(){
    stdout.write(larger.toString());
}

function countAreas(l, c){
    return checkAreas(l-1,c-1) + checkAreas(l, c-1) + checkAreas(l+1, c-1) + checkAreas(l-1, c) + 1 + checkAreas(l+1, c) + checkAreas(l-1, c+1) + checkAreas(l, c+1) + checkAreas(l+1, c+1);
}

function checkAreas(l, c){
    if( ((c<0 || l<0) || (c>=lin || c>=col))  || typeof matrix[c][l] === 'undefined'  ){
        return 0;
    }
    return matrix[l][c];
}

function setCol(column){
    col = column;
}

function setLin(row){
    lin = row;
}

function getCol(column){
    col = column;
}

function getLin(row){
    lin = row;
}

function inputs(input, callback){
    stdin.resume();
    stdin.on('data',(data) =>{
        if(data && data > 0 && data < 10){
            var chunk = data.toString().trim();
            callback(chunk);
        }else{
            stdout.write('!Warning: Please insert a Number higher than 0 and lower than 10!\n');
        }
    });
}

inputs('lin', (lin) => {
    setLin(lin);
    inputs('col', (col) => {
        setCol(col);
        createMatrix();
    });
});