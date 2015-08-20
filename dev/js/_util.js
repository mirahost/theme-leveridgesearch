function prepareHash( hash, type ) {
    type = type === undefined ? 'replace' : 'empty';
    if( type === 'replace' ) {
        return hash.replaceAll('#', '/');
    } else {
        return hash.replaceAll('#', '').replaceAll('/', '');
    }
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

    $children.eq(minPos).addClass('smallest-col');

}

function currentPage( $nav, hash ) {
    var activeClass = 'active';

    $('li', $nav).each(function(){
        var $this = $(this);
        var target = $('a', $this).attr('href');
        if( prepareHash( target, 'empty' ) === prepareHash( hash, 'empty' ) ){
            $this.addClass(activeClass).siblings().removeClass(activeClass);
        }
    });
}

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

