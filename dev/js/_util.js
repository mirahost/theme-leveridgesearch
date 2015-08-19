function prepareHash( hash ) {
    return hash.replace('#', '/');
}

function getLinesNumber( $wrapper ) {
    var lineHeight = parseInt( $wrapper.css('line-height') );
    var height = $wrapper.height();
    console.log(height, lineHeight);
    return Math.round( height/lineHeight );
}