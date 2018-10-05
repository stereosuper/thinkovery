(function() {

    tinymce.create('tinymce.plugins.THINKOVERY', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(editor, url) {

            editor.addButton('break', {
                title : 'Break',
                cmd : 'break',
                image : url + '/thumbnail_br.png'
            });

            editor.addCommand('break', function() {
                editor.insertContent('<br />');
            });

            editor.addButton('bckq', {
                title : 'Blockquote',
                cmd : 'bckq',
                image : url + '/thumbnail_bckq.png'
            });

            editor.addCommand('bckq', function() {

                if( editor.selection.getContent() ){
                    alert('You have to unselect text before insert a quote.');
                }else{
                    editor.windowManager.open({
                        title: 'Blockquote',
                        minWidth: 400,
                        body: [
                        {
                            type: 'textbox',
                            label: 'Quote',
                            name: 'quote',
                            value: '',
                            multiline: true
                        },
                        {
                            type: 'textbox',
                            label: 'Source',
                            name: 'source',
                            value: ''
                        },
                        {
                            type: 'textbox',
                            label: 'Author',
                            name: 'cite',
                            value: ''
                        }],
                        onsubmit: function(e) {
                            var quote = '<blockquote cite="'+e.data.source+'" class="blockquote-single-post">';
                            quote += e.data.quote;
                            if( e.data.cite !== '' ){
                                quote += '<cite> &ndash; '+e.data.cite+'</cite>';
                            }
                            quote += '</blockquote>';
                            editor.execCommand('mceInsertContent', 0, quote);
                        }   
                    });
                }

            });

            editor.addButton('modNewsletter', {
                title : 'Module Newsletter',
                cmd : 'modNewsletter',
                image : url + '/thumbnail_nwsl.png'
            });

            editor.addCommand('modNewsletter', function() {
                if( editor.selection.getContent() ){
                    alert('You have to unselect text before insert a quote.');
                }else{
                    editor.windowManager.open({
                        title: 'List ID',
                        minWidth: 400,
                        body: [
                        {
                            type: 'textbox',
                            label: 'ID',
                            name: 'listID',
                            value: ''
                        }],
                        onsubmit: function(e) {
                            var nwsl_shortcode = '[mod_newsletter id="'+ e.data.listID +'"]';
                            editor.execCommand('mceInsertContent', 0, nwsl_shortcode);
                        }   
                    });
                }
                //editor.insertContent( '[mod_newsletter]' );
            });

            editor.addButton('modSummary', {
                title : 'Sommaire',
                cmd : 'modSummary',
                image : url + '/thumbnail_summary.png'
            });

            editor.addCommand('modSummary', function() {
                editor.insertContent( '[mod_summary]' );
            });

            editor.addButton('modPosts', {
                title : 'Module Posts',
                cmd : 'modPosts',
                image : url + '/thumbnail_posts.png'
            });

            editor.addCommand('modPosts', function() {
                editor.insertContent( '[mod_posts post1="" post2=""]' );
            });

            editor.addButton('modContact', {
                title : 'Module Contact',
                cmd : 'modContact',
                image : url + '/thumbnail_cntct.png'
            });

            editor.addCommand('modContact', function() {
                editor.insertContent( '[mod_contact]' );
            });

            editor.addButton('ytb', {
                title : 'Youtube video',
                cmd : 'ytb',
                image : url + '/thumbnail_ytb.png'
            });

            editor.addCommand('ytb', function() {
                if( editor.selection.getContent() ){
                    alert('You have to unselect text before insert a quote.');
                }else{
                    editor.windowManager.open({
                        title: 'Youtube iframe',
                        minWidth: 400,
                        body: [
                        {
                            type: 'textbox',
                            label: 'Iframe',
                            name: 'frame',
                            value: '',
                            multiline: true
                        }],
                        onsubmit: function(e) {
                            var ytbfrm = '<div class="youtube-container">';
                            ytbfrm += e.data.frame;
                            ytbfrm += '</div>';
                            editor.execCommand('mceInsertContent', 0, ytbfrm);
                        }   
                    });
                }
            });

        },
 
        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },
 
        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'Thinkovery Buttons',
                author : 'Stereosuper',
                authorurl : 'http://stereosuper.fr',
                infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
                version : "0.1"
            };
        }
    });
 
    // Register plugin
    tinymce.PluginManager.add( 'think', tinymce.plugins.THINKOVERY );
})();