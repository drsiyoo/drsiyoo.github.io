$( function() {
    var pictures = [],
        $pointer = $( '#pointer' ),
        $thumbnails = $( '#thumbnails' ),
        $title = $( '#title' ),
        $pause = $( '#pause' ),
        $flash = $( '#flash' ),
        $volume = $( '#volume' );

    // Buzz audio library

    buzz.defaults.formats = [ 'ogg', 'mp3' ];

    var trafficSound = new buzz.sound( 'sounds/youraisemeup' ),
        clickSound = new buzz.sound( 'sounds/click' ),
        focusSound = new buzz.sound( 'sounds/focus' ),
        rewindSound = new buzz.sound( 'sounds/rewind' ),
        cameraSounds = new buzz.group( clickSound, focusSound, rewindSound );

    if ( !buzz.isSupported() ) {
        $volume.hide();    
    }
    
    trafficSound.loop().play().fadeIn( 5000 );


    // Volume button

    $volume.click( function() {
        if ( $( this ).hasClass( 'all' ) ) {
            cameraSounds.unmute();
            trafficSound.mute();
        
            $( this ).removeClass( 'all' ).addClass( 'some' );
        } else if ( $( this ).hasClass( 'some' ) ) {
            cameraSounds.mute();
            trafficSound.mute();
        
            $( this ).removeClass( 'some' ).addClass( 'none' );
        } else {
            cameraSounds.unmute();
            trafficSound.unmute();
        
            $( this ).removeClass( 'none' ).addClass( 'all' );
        }
        return false;
    });

    // Photograph

    $thumbnails.find( 'a' ).click( function() {
        $pause.show();
        $pointer.hide();
    
        $volume.animate( { top: '20px' });
        $thumbnails.animate( { top: '-90px' });
        $title.animate( { bottom: '-90px' });    

        var idx = $( this ).parent( 'li' ).index();
        $.vegas( 'slideshow', { step: idx } )( 'pause' );

        rewindSound.play();
    
        return false;
    });

    $pause.click( function() {
        $pause.hide();
        $pointer.show();
    
        $volume.animate( { top:'100px' });
        $title.animate( { bottom:'0px' });
        $thumbnails.animate( { top:'0px' });

        $.vegas( 'slideshow' );

        clickSound.play();

        return false;
    });
});