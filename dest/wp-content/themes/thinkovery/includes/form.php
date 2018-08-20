<form id='agile-form' method='POST' class='form-contact'>
    <div class='field m-right'>
        <input id='first-name' name='firstname' type='text' required>
        <label for='first-name'><?php _e('First Name', 'thinkovery'); ?>*</label>
    </div><div class='field'>
        <input id='last-name' name='lastname' type='text' required>
        <label for='last-name'><?php _e('Last Name', 'thinkovery'); ?>*</label>
    </div>

    <div class='field m-right'>
        <input id='email' name='email' type='email' required>
        <label for='email'><?php _e('Email', 'thinkovery'); ?>*</label>
    </div><div class='field'>
        <input maxlength='250' id='phone' name='phone' type='tel' required>
        <label for='phone'><?php _e('Phone', 'thinkovery'); ?>*</label>
    </div>
    <div class='field-full'>
        <div class='select'>
            <select id='objet-contact' name='objet-contact' required>
                <option value='' selected disabled><?php _e("I'm contacting you for", 'thinkovery'); ?>*</option>
                <option value='Découvrir votre approche du Digital Learning'><?php _e("Discovering your approach to Digital Learning", 'thinkovery'); ?></option>
                <option value='Affiner mon projet de formation'><?php _e("Refine my training project", 'thinkovery'); ?></option>
                <option value='Obtenir une proposition commerciale sur-mesure'><?php _e("Getting a customized business commercial proposal", 'thinkovery'); ?></option>
            </select>
            <svg class='icon'><use xlink:href='#icon-arrow-bottom'/></svg>
        </div>
    </div>
        
        
    <div class='field-full'>
        <textarea id='identification-projet' name='note' required></textarea>
        <label for='identification-projet'><?php _e('Specify your request', 'thinkovery'); ?>*</label>
    </div>

    <div class="field-full">
        <input type="checkbox" name="rgpd" id="rgpd_checkbox" required>
        <label for='rgpd_checkbox' class='label-checkbox no-transform'>
            <?php _e('I accept that the informations entered are used exclusively as part of my request and the personalized business relationship that can flow from it (by e-mail and / or phone)', 'thinkovery'); ?>
        </label>
    </div>

    <?php if($errorForm){ ?>
        <div class='mc4wp-error form-error'><?php _e("An error occurred, please try again later.", 'thinkovery'); ?></div>
    <?php } ?>
    

    <button class='btn btn-medium' type='submit' name='submit' for='form-contact'>
        <?php _e('Submit', 'thinkovery'); ?><svg class='icon'><use xlink:href='#icon-arrow-right'/></svg><i></i>
    </button>
</form>
