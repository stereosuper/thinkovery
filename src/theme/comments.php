<?php if('comments.php' == basename($_SERVER['SCRIPT_FILENAME'])){
	die('Ne pas télécharger cette page directement, merci !');
} ?>

<?php if(!empty($post->post_password)){ // if there's a password
	if($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password){ ?>
		<p>Les commentaires sont protégés par mot de passe.</p>
	<?php return; }
} ?>

<?php if($comments) : ?>
	<h2 id='comments'><?php _e('Comments', 'thinkovery'); ?></h2>

	<ul>
		<?php foreach($comments as $comment) : ?>

			<li id='comment-<?php comment_ID(); ?>'>
				<p>
					<?php $author = $comment->comment_author_url ? "<a href='". $comment->comment_author_url ."' target='_blank' class='comment-author'>". $comment->comment_author ."</a>" : "<span class='comment-author'>" . $comment->comment_author . "</span>"; ?>
					<?php echo $author; ?>
					le <time datetime='<?php comment_date('Y-m-d') ?>'><?php comment_date('j F Y') ?></time>
					<i><?php edit_comment_link('Edit Comment', '', ''); ?></i>
				 	<?php if($comment->comment_approved == '0') : ?>
						<i>Votre commentaire est en cours de modération</i>
				 	<?php endif; ?>
				</p>
				<?php comment_text() ?>
			</li>

		<?php endforeach; ?>
	</ul>

<?php endif; ?>


<?php if('open' == $post->comment_status) : ?>

	<h2 id='leave-comment'><?php _e('Leave a comment', 'thinkovery'); ?></h2>

	<?php if( get_option('comment_registration') && !$user_ID ) : ?>
		<p>Vous devez être <a href='<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php the_permalink(); ?>'>connecté</a> pour laisser un commentaire.</p>
	<?php else : ?>
		<?php if( $user_ID ){ ?>
			<p>Connecté en tant que
				<a href='<?php echo get_option('siteurl'); ?>/wp-admin/profile.php'><?php echo $user_identity; ?></a>.
				<a href='<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout'>Déconnection</a>
			</p>
		<?php } ?>

		<?php global $errorComment; if($errorComment){ ?>
			<p class='error'>
				<?php echo $errorComment; ?>
			</p>
		<?php } ?>

		<form action='<?php echo get_option('siteurl'); ?>/wp-comments-post.php' method='post' class='commentform'>

			<?php if( !$user_ID ) : ?>

				<label for='author' <?php if($req) echo "class='required'"; ?>>
					<?php _e('Name', 'thinkovery'); ?>
				</label>
				<input type='text' name='author' id='author' value='<?php echo $comment_author; ?>' <?php if($req) echo 'required'; ?>>

				<label for='email' <?php if($req) echo "class='required'"; ?>>
					<?php _e('Email', 'thinkovery'); ?>
				</label>
				<input type='email' name='email' id='email' value='<?php echo $comment_author_email; ?>' <?php if($req) echo 'required'; ?>>

				<label for='url' <?php if($req) echo "class='required'"; ?>>
					<?php _e('Website', 'thinkovery'); ?>
				</label>
				<input type='url' name='url' id='url' value='<?php echo $comment_author_url; ?>' <?php if($req) echo 'required'; ?>>

			<?php endif; ?>

			<label for='comment' <?php if($req) echo "class='required'"; ?>>
				<?php _e('Comment', 'thinkovery'); ?>
			</label>
			<textarea name='comment' id='comment' <?php if($req) echo 'required'; ?>></textarea>

			<button name='submit' type='submit'><?php _e('Send', 'thinkovery'); ?></button>
			<input type='hidden' name='comment_post_ID' value='<?php echo $id; ?>'/>

			<?php do_action('comment_form', $post->ID); ?>

		</form>

	<?php endif; // If registration required and not logged in ?>

<?php endif; // if you delete this the sky will fall on your head ?>
