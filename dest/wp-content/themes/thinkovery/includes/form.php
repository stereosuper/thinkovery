<form id='agile-form' action='https://thinkovery.agilecrm.com/formsubmit' method='GET' class='form-contact'>
    <div class='field m-right'>
        <input id='first-name-agilefield' name='first_name' type='text' required>
        <label for='first-name-agilefield'><?php _e('First Name', 'thinkovery'); ?>*</label>
    </div><div class='field'>
        <input id='last-name-agilefield' name='last_name' type='text' required>
        <label for='last-name-agilefield'><?php _e('Last Name', 'thinkovery'); ?>*</label>
    </div>

    <div class='field'>
        <input id='title-agilefield' name='title' type='text' class='big' required>
        <label for='title-agilefield'><?php _e('Position', 'thinkovery'); ?>*</label>
    </div>

    <div class='field m-right'>
        <input maxlength='250' id='phone-agilefield' name='phone' type='tel'>
        <label for='phone-agilefield'><?php _e('Phone', 'thinkovery'); ?> <i>(<?php _e('optionnal', 'thinkovery'); ?>)</i></label>
    </div><div class='field'>
        <input id='email-agilefield' name='email' type='email' required>
        <label for='email-agilefield'><?php _e('Email', 'thinkovery'); ?>*</label>
    </div>

    <fieldset class='field-full'>
        <legend><?php _e('I would like to', 'thinkovery'); ?>*</legend>
        <div class='radio'>
            <input type='radio' name='objet-0' id='objet-0' value='Vous connaître' checked>
            <label for='objet-0'>
                <svg class='icon'><use xlink:href='#icon-chat'/></svg>
                <?php _e('Meet you', 'thinkovery'); ?>
            </label>
        </div><div class='radio'>
            <input type='radio' name='objet-0' id='objet-1' value='Un projet'>
            <label for='objet-1'>
                <svg class='icon'><use xlink:href='#icon-thumb'/></svg>
                <?php _e('Work with you', 'thinkovery'); ?>
            </label>
        </div><div class='radio'>
            <input type='radio' name='objet-0' id='objet-2' value='Travailler chez vous'>
            <label for='objet-2'>
                <svg class='icon'><use xlink:href='#icon-diamond'/></svg>
                <?php _e('Work in your firm', 'thinkovery'); ?>
            </label>
        </div><div class='radio'>
            <input type='radio' name='objet-0' id='objet-3' value='Maman'>
            <label for='objet-3'>
                <svg class='icon'><use xlink:href='#icon-heart'/></svg>
                <?php _e("It’s mum, please call back!", 'thinkovery'); ?>
            </label>
        </div>
    </fieldset>
    
    <div class='field-full'>
        <textarea id='identification-projet-agilefield' name='note' required></textarea>
        <label for='identification-projet-agilefield'><?php _e('Your project', 'thinkovery'); ?>*</label>
    </div>

    <div class='hidden'>
        <input type='hidden' id='_agile_form_name' name='_agile_form_name' value='Formulaire Contact'>
        <input type='hidden' id='_agile_domain' name='_agile_domain' value='thinkovery'>
        <input type='hidden' id='_agile_api' name='_agile_api' value='8c6s7s10it45vop640mrjnjsnk'>
        <input type='hidden' id='_agile_redirect_url' name='_agile_redirect_url' value='<?php the_permalink(); ?>?success=true'>
        <input type='hidden' id='_agile_document_url' name='_agile_document_url' value=''>
        <input type='hidden' id='_agile_form_id_tags' name='tags' value='Contact From Web'>
        <input type='hidden' id='_agile_form_id' name='_agile_form_id' value='5703593692758016'>

        <input  type='text' id='sourceCookie-agilefield' name='sourceCookie-agilefield'>
    </div>

    <button class='btn btn-medium' type='submit' name='submit' for='form-contact'>
        <?php _e('Submit', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
    </button>
    <span id='agile-error-msg'></span>
</form>
