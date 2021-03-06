(function($){

    var $wrapper = $('#content');
    var $navigation = $('.pagesNav');
    var $boxUpdate = $('#boxUpdate')
    var firstLoad = true;

    // available hashes to be sure that the page won't be changed random
    var hashes = [ "start", "company", "services", "where", "what" ];

    // Navigation
    $(window).on('hashchange', function(e){
        var target = window.location.hash;

        // Check current hash
        if( ( hashes.indexOf( prepareHash(target, 'empty') ) == -1 && target.length ) ||
            ( window.location.pathname.length <= 1 && !target.length ) ) {
            target = '#start/';
        }

        $.ajax({
            url : prepareHash( target ),
            method : 'GET',
            dataType : 'html',
            success : function( data ){
                var data = $.parseHTML(data);

                $boxUpdate.fadeOut(function(){
                    $(this).empty().append( data ).fadeIn(function(){
                        $(window).trigger('pageChanged', [data, target]);
                    });
                });
            }
        });

    }).trigger('hashchange');

    $(window).on('pageChanged', function(e, $pageContent, target){

        // Updates current page class
        currentPage( $navigation, target );

        if( !firstLoad ) {
            $('html, body').animate({
                'scrollTop' : $boxUpdate.position().top
            });
        }

        firstLoad = false;

        // First letter
        $('.textBox', $pageContent).each(function(){
            var $this = $(this);
            var $p = $('p:first', $this);

            if (!$p.length)
                return;

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

        // Column calculation
        // Adds class to smallest column from each row
        $('#content > .row').each(function(){
            var $this = $(this);
            smallestCol( $this );
        });
    });


    // Form validator
    var $form = $('#request');
    var $success = $('.success', $form);
    var $fail = $('.fail', $form);

    $form.validate({
        submitHandler : function(){
            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: $form.serialize()
            })
            .success(function() {
                $form.children(':not(.requestResults)').fadeOut(function(){
                    $success.fadeIn();
                })
            })
            .fail(function() {
                $form.children(':not(.requestResults)').fadeOut(function(){
                    $fail.fadeIn();
                })
            });

            return false;
        }
    })

})(jQuery);