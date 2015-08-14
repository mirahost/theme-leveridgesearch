(function($){

    // First letter
    $('.textBox').each(function(){
        var $this = $(this);
        var $p = $('p:first', $this);

        // Take the first letter
        var fword = $p.text().slice(0,1);

        // Remove first letter and re-write the new text
        var newText = $p.text().substring( 1, $p.text().length - 1 );
        $p.text( newText );

        // Prepend the first letter to the new string with a wrapper
        $('<span />', {
            class : 'first-word',
            text : fword
        }).prependTo( $p );

    });

})(jQuery);
