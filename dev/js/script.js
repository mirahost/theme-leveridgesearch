(function($){

    var $wrapper = $('#content');

    // Navigation
    $(window).on('hashchange', function(e){
        var target = window.location.hash;

        if( !target.length ) {
            target = '#home/';
        }

        $.ajax({
            url : prepareHash( target ),
            method : 'GET',
            dataType : 'html',
            success : function( data ){
                var data = $.parseHTML(data)
                $wrapper.fadeOut('slow', function(){
                    $(this).empty().append( data ).fadeIn(function(){
                        $(window).trigger('pageChanged', [data]);
                    })
                });

            }
        });


    }).trigger('hashchange');

    $(window).on('pageChanged', function(e, $pageContent){
        // First letter
        $('.textBox', $pageContent).each(function(){
            var $this = $(this);
            var $p = $('p:first', $this);
            // Take the first letter
            var fword = $p.html().slice(0,1);
            var extraClass = getLinesNumber($p) === 1 ? ' single-line' : '';


            // Remove first letter and re-write the new text
            var newText = $p.html().substring( 1, $p.html().length - 1 );
            $p.html( newText );

            // Prepend the first letter to the new string with a wrapper
            $('<span />', {
                class : 'first-word' + extraClass,
                text : fword
            }).prependTo( $p );

        });
    });

})(jQuery);