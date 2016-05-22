<?php /* Facebook, twitter, linkedin */ ?>
<div class="wrap">

<?php
if(isset($_POST['sosurl'])){
	$social_data = $_POST;
	//print_r($social_data);

update_option( 'social_links_widget_options', $social_data );
}else{  }

$optset = 0;
if(get_option( 'social_links_widget_options' )){
	$social_data_option = get_option( 'social_links_widget_options' );
	$optset = 1;
}
?>
<form method="post" action="">
<?php $social = array('fb'=>'Facebook',
        'tw'=>'Twitter',
        'li'=>'Linkedin',
        'gp'=>'Google+',
        'pin'=>'Pinterest',
        'ig'=>'Instagram',
        'rss'=>'RSS',
        'yt'=>'Youtube',
        'vm'=>'Vimeo'); ?>
	<table class="manage-social wp-list-table widefat fixed striped pages">
    <thead>
    	<tr><td class="column-date"> Order </td> <td> Social Media </td> <td> Social Url (Leave blank if don't want to display.) </td></tr>
    </thead>
    <?php $i=1;
		foreach($social as $id=>$val):
			?>
            <tr> 
            	<td class="column-date"> <input class="screen-per-page" type="number" value="<?php if($optset==1){ echo $social_data_option[soscord][$id]; }else{ echo $i; } ?>" name="soscord[<?php echo $id; ?>]" /></td>
                <td><label><?php echo $val; ?></label> </td>
                <td><input type="text" value="<?php if($optset==1){ echo $social_data_option[sosurl][$id]; } ?>" placeholder="<?php echo $val; ?> url" name="sosurl[<?php echo $id; ?>]" /></td> 
            </tr>
            <?php $i++;
		endforeach;
	?>
    <tr> <td colspan="3"><input type="submit" class="button button-primary button-large" value="Save" /></td></tr>
    </table>
</form>

<?php
	
?>
    <div class="social_links_widget_op">
        <ul>
            <?php $ordarr = array();
			if($optset==1):
            foreach($social_data_option[sosurl] as $id=>$url){ if($url!=''):  $ordarr[$id] = $social_data_option[soscord][$id]; endif; } asort($ordarr);
            foreach($ordarr as $id=>$val): ?><li class="social_links_widget"> <a class="<?php echo $id; ?>" href="<?php echo $social_data_option[sosurl][$id]; ?>"><?php echo $id; ?></a> </li><?php endforeach;
			endif;
            ?>
        </ul>
    </div>
</div>