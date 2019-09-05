<?php
/*
 * -----------------------------------------------------------
 * Theme Custom Functions
 * -----------------------------------------------------------
 */

/*----------- Excerpt lenght -----------*/
if ( ! function_exists( 'josora_excerpt_length' ) ) {
  function josora_excerpt_length( $length ) {
    return 11;
  }
  add_filter( 'excerpt_length', 'josora_excerpt_length', 999 );
}
/*----------- Removing [...] from the excerpt -----------*/
if ( ! function_exists( 'josora_excerpt_change' ) ) {
  function josora_excerpt_change($more) {
    global $post;
    return '...';
  }
  add_filter( 'excerpt_more', 'josora_excerpt_change' );
}
/*----------- Hide default editor on certain pages -----------*/
if( !function_exists('josora_hide_editor') ) {
  function josora_hide_editor() {
    $template_file = basename( get_page_template() );
    if( $template_file === 'page-contacts.php' ) {
      //change mycustom-page.php to your thing
      remove_post_type_support( 'page', 'editor' );
    }
    if( $template_file === 'page-home.php' ) {
      remove_post_type_support( 'page', 'editor' );
    }
  }
  add_action( 'admin_head', 'josora_hide_editor' );
}
/*----------- Remove p tags from around images -----------*/
if( !function_exists('josora_filter_ptags_on_images') ) {
  function josora_filter_ptags_on_images($content){
    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
  }
}
/*----------- Adding the search icon to the menu -----------*/
if(!function_exists('josora_primary_menu_extras')) {
  function josora_primary_menu_extras( $menu, $args ) {
    if( 'main-navigation' == $args->theme_location )
      $menu .= '<li class="menu-item search"><a href="" class="searchform-toggle"><i class="fa fa-search" aria-hidden="true"></i></a></li>';
    return $menu;
  }
  add_filter('wp_nav_menu_items', 'josora_primary_menu_extras', 10, 2);
}
/*----------- Limite the excerpt -----------*/
function excerpt($limit) {
  $excerpt = explode(' ', get_the_excerpt(), $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  }
  $excerpt = preg_replace('`[[^]]*]`','',$excerpt);
  return $excerpt;
}
function get_excerpt(){
  $excerpt = get_the_content();
  $excerpt = preg_replace(" ([.*?])",'',$excerpt);
  $excerpt = strip_shortcodes($excerpt);
  $excerpt = strip_tags($excerpt);
  $excerpt = substr($excerpt, 0, 82);
  $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
  $excerpt = trim(preg_replace( '/\s+/', ' ', $excerpt));
  $excerpt = $excerpt.'...';
  return $excerpt;
}
