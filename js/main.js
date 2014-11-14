var allItemCount = 50,
    itemWidth = 150;

function addMargin(){
    var allWidth =  $("#container").outerWidth(),
        itemCount = Math.floor(allWidth/itemWidth),
        margingWidthPersent = (allWidth%(itemCount*itemWidth)*100/allWidth)/(itemCount*2+2),
        margingWidthPixel = allWidth*margingWidthPersent/100,
        rowCount = Math.floor(allItemCount/itemCount),
        itemWORowsCount = allItemCount - rowCount*itemCount;

    $(".item").css("margin",margingWidthPersent + "%");
    $('#container').css("padding", margingWidthPersent + "%")

    if(itemWORowsCount != 0){
        var idForChangeMargin = allItemCount - itemWORowsCount + 1;
        var changeMargin = ((itemCount - itemWORowsCount)/2)*itemWidth + margingWidthPixel*(1 + itemCount - itemWORowsCount);
        $('#'+idForChangeMargin).css('margin-left', changeMargin + "px")
    }
}


$(window).load(function () {

    var items = new Array(allItemCount);
    for(var i=0;i<items.length;i++){
        items[i] = {
            id: (i+1).toString()
        }
    }

    $.fn.tmpl = function(tmplId, data) {
        var tmpl = doT.template($('#tmpl_' + tmplId).html());
        if (!$.isArray(data)) data = [data];

        return this.each(function() {
            var html = '';
            for (var itemIdx = 0; itemIdx < data.length; itemIdx++) {
                html += tmpl(data[itemIdx]);
            }
            $(this).html(html);
        });
    };

    $('#container').tmpl('item', items);
    addMargin()
});

$(window).resize(function () {
    addMargin()
});