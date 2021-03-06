<?php if('comments.php' == basename($_SERVER['SCRIPT_FILENAME'])){
	die('Ne pas télécharger cette page directement, merci !');
} ?>

<?php if(!empty($post->post_password)){ // if there's a password
	if($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password){ ?>
		<p>Les commentaires sont protégés par mot de passe.</p>
	<?php return; }
} ?>

<?php if($comments) : ?>
	<h2 id='comments'><?php _e('Comments', 'think'); ?></h2>

	<ul class='comments-list'>
		<?php foreach($comments as $comment) : ?>

			<li id='comment-<?php comment_ID(); ?>'>
				<?php $author = $comment->comment_author_url ? "<a href='". $comment->comment_author_url ."' target='_blank' rel='noreferrer noopener' class='comment-author'>". $comment->comment_author ."</a>" : "<span class='comment-author'>" . $comment->comment_author . "</span>"; ?>
				<?php echo $author; ?>
				<time datetime='<?php comment_date('Y-m-d') ?>' class='comment-date'><?php comment_date('j F Y') ?></time>
				<i><?php edit_comment_link('Edit Comment', '', ''); ?></i>
			 	<?php if($comment->comment_approved == '0') : ?>
					<i><?php _e('Your comment is being verified', 'think'); ?></i>
			 	<?php endif; ?>
				<?php comment_text() ?>
			</li>

		<?php endforeach; ?>
	</ul>

<?php endif; ?>


<?php if('open' == $post->comment_status) : ?>

	<h3 id='leave-comment'><?php _e('Leave a comment', 'think'); ?></h3>

	<?php if( get_option('comment_registration') && !$user_ID ) : ?>
		<p>Vous devez être <a href='<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php the_permalink(); ?>'>connecté</a> pour laisser un commentaire.</p>
	<?php else : ?>
		<?php if( $user_ID ){ ?>
			<p>Connecté en tant que
				<a href='<?php echo get_option('siteurl'); ?>/wp-admin/profile.php'><?php echo $user_identity; ?></a>.
				<a href='<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout'>Déconnection</a>
			</p><br>
		<?php } ?>

		<?php global $errorComment; if($errorComment){ ?>
			<div class='error'>
				<?php echo $errorComment; ?>
			</div>
		<?php } ?>

		<form action='<?php echo get_option('siteurl'); ?>/wp-comments-post.php' method='post' class='commentform'>

			<?php if( !$user_ID ) : ?>

				<div class='field'>
					<input type='text' name='author' id='author' value='<?php echo $comment_author; ?>' required>
					<label for='author' class='required'>
						<?php _e('Name', 'think'); ?>*
					</label>
				</div>
				<div class='field-flex'>
					<div class='field'>
						<input type='email' name='email' id='email' value='<?php echo $comment_author_email; ?>' required>
						<label for='email' class='required'>
							<?php _e('Email', 'think'); ?>*
						</label>
					</div>
					<div class='field'>
						<input type='url' name='url' id='url' value='<?php echo $comment_author_url; ?>'>
						<label for='url'>
							<?php _e('Website', 'think'); ?> <i>(<?php _e('optionnal', 'think'); ?>)</i>
						</label>
					</div>
				</div>

			<?php endif; ?>

			<div class='field'>
				<textarea name='comment' id='comment' required></textarea>
				<label for='comment' class='required'>
					<?php _e('Comment', 'think'); ?>*
				</label>
			</div>

			<button name='submit' type='submit' class='btn'>
				<?php _e('Send', 'think'); ?>
			</button>
			<input type='hidden' name='comment_post_ID' value='<?php echo $id; ?>'/>

			<?php do_action('comment_form', $post->ID); ?>

		</form>

	<?php endif; // If registration required and not logged in ?>

<?php endif; // if you delete this the sky will fall on your head ?>