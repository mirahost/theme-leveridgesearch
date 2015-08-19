function prepareHash( hash ) {
    return hash.replace('#', '/');
}

function getLinesNumber( $wrapper ) {
    var lineHeight = parseInt( $wrapper.css('line-height') );
    var height = $wrapper.height();

    return Math.round( height/lineHeight );
}

function smallestCol( $wrapper ) {
    var sizes = [];
    var minPos = null;
    var $children = $wrapper.children();

    $children.each(function( i ){
        var w = $(this).width();
        sizes.push( w );
    });

    minPos = sizes.indexOf( sizes.min() );
    console.log(minPos);
    $children.eq(minPos).addClass('smallest-col');

}

function currentPage( $nav, hash ) {
    var activeClass = 'active';

    $('li', $nav).each(function(){
        var $this = $(this);
        var target = $('a', $this).attr('href');
        if( target === hash ){
            $this.addClass(activeClass).siblings().removeClass(activeClass);
        }
    })
}

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
