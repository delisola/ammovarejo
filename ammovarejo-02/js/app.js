$(document).ready(function(){
    var tileSize = 100;
    var count    = 0;
    var col      = 10;
    var lin      = 10;
    var matrix     = [];
    var matrixSize = [];
    var boxModel   = $('.box').clone();
    var tileInterva;
    var dragging =  false;
    var mapPosition = {'x': 0, 'y': 0};
    var mousePos = {};
    var mapPos   = {};

    $(".box").remove();

    function createWorld(){

        var container = $('#container');
        container.width(tileSize * col).height(tileSize*lin);

        for(c=0; c<col; c++){
            matrix[c] = [];
            for(l=0; l<lin; l++){
                var rand = Math.round(Math.random() * 1);
                matrix[c][l] = rand;
                $("#chest").append(createTile(c, l, rand));
            }
        }

        $.each(matrix, function(col, val){
            $.each(val, function(lin){
                stylingTile(col, lin);
            });
        });
        markAreas();
    }

    function checkTile(c, l){
        if( ( c<0 || l<0 ) || ( c>=col || l>=lin ) ){
            return 0;
        }else{
            return matrix[c][l];
        }
    }

    function createTile(c, l, land){
        var box       = boxModel.clone();
        var boxWidth  = tileSize;
        var boxHeight = tileSize;

        box.width(boxWidth)
           .height(boxHeight)
           .attr('data-col', c)
           .attr('data-lin', l)
           .attr('data-land', land);

        return box;
    }

    function stylingTile(c, l){
        var tile = getTile(c, l);
        if(tile.attr('data-land') == 1)
            tile.addClass("tile-land");
        else
            tile.addClass("tile-sea");
    }


    function coastTile(c, l){
        return checkTile(c-1,l) +'-'+ checkTile(c,l+1) +'-'+ checkTile(c+1,l) +'-'+ checkTile(c,l-1);
    }

    function getTile(c, l) {
        return $('[data-col="'+ c +'"][data-lin="'+l+'"]');
    }

    function showTile(c, l){
        getTile(c, l).find("div").removeClass('hide');
    }

    function animateIntro(){

        if(count >= col){
            c = Math.floor( count / col );
            l = Math.abs((c * col) - count);
        }else{
            c = 0;
            l = count;
        }
        showTile(c, l);
        count++;

        if(count >= col * lin)
            clearInterval(tileInterval);
    }

    function markAreas(){
        var larger     = 0;
        var size       = 0;
        var totalSites = 0;

        $.each(matrix, function(col, val){
            $.each(val, function(lin){
                if(matrix[col][lin] === 1){
                    size = countAreas(col, lin);
                    matrixSize.push({'c': col, 'l': lin, 'size': size });
                    if(size > larger)
                        larger = size;
                }
            });
        });

        $.each(matrixSize, function(ind, val){
            if(val.size == larger){
                getTile(val.c, val.l).find("div").addClass('conquered');
                totalSites++;
            }else{
                getTile(val.c, val.l).find('div').css('filter', 'saturate(0.6)');
            }
        });

        buildInfo(larger, totalSites);
    }

    function buildInfo(larger, totalSites){
        $('#map-size').html(col +'x' + lin);
        $('#total-areas').html(totalSites);
        $('#num-sites').html(larger);
    }

    function countAreas(c, l){
        return checkAreas(c-1, l-1) + checkAreas(c-1, l) + checkAreas(c-1, l+1) + checkAreas(c, l-1) + 1 + checkAreas(c, l+1) + checkAreas(c+1, l-1) + checkAreas(c+1, l) + checkAreas(c+1, l+1);
    }

    function checkAreas(c, l){
        if( ((c<0 || l<0) || (c>=lin || c>=col)) || typeof matrix[c][l] === 'undefined' ){
            return 0;
        }
        return matrix[c][l];
    }

    function destroyWorld(){
        count = 0;
        matrix = [];
        matrixSize = [];
        $('#chest').html('');
        setMapPosition(0,0);
    }

    function setMapPosition(x,y){
        mapPosition.x = x;
        mapPosition.y = y;

        $el = $('#chest');
        $el.css('left', x)
           .css('top', y);
    }

    $('#num-col-lin').on('focus', function(e){
        $(this).val('');
    });

    $('#build-world').on('click', function(e){
        var input = $("#num-col-lin");

        if(input.val() < 2){
           input.addClass('warnning');
           input.val('Insira um numero maior que 1');
           return;
       }
        col = lin = input.val();
        destroyWorld();
        createWorld();
        tileInterval = setInterval(animateIntro, 10);
        input.removeClass('warnning');
        
    });

    $("#chest").mousedown(function(){
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
        mapPos.x = mapPosition.x;
        mapPos.y = mapPosition.y;
        dragging = true;
    }).mousemove(function(event) {
        if(dragging){
            setMapPosition(mapPos.x + (event.pageX - mousePos.x), mapPos.y + (event.pageY - mousePos.y));
        }
    }).mouseup(function(event) {
        dragging = false;
    });

    tileInterval = setInterval(animateIntro, 10);
    createWorld();
});