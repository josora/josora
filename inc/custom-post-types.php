<?php
/*
 * -----------------------------------------------------------
 * Custom Post Types
 * -----------------------------------------------------------
 */
// Register Custom Post Type
function josora_cpt() {
  $labels = array(
    'name'                  => _x( 'Produtos', 'Post Type General Name', 'jtd' ),
    'singular_name'         => _x( 'Produtos', 'Post Type Singular Name', 'jtd' ),
    'menu_name'             => __( 'Produtos', 'jtd' ),
    'name_admin_bar'        => __( 'Produtos', 'jtd' ),
    'archives'              => __( 'Arquivo de Produtos', 'jtd' ),
    'attributes'            => __( 'Item Attributes', 'jtd' ),
    'parent_item_colon'     => __( 'Parent Item:', 'jtd' ),
    'all_items'             => __( 'Todos Produtos', 'jtd' ),
    'add_new_item'          => __( 'Adicionar Novo Produto', 'jtd' ),
    'add_new'               => __( 'Adicionar Novo', 'jtd' ),
    'new_item'              => __( 'Novo Produto', 'jtd' ),
    'edit_item'             => __( 'Editar Produto', 'jtd' ),
    'update_item'           => __( 'Actualizar Produto', 'jtd' ),
    'view_item'             => __( 'Ver Produto', 'jtd' ),
    'view_items'            => __( 'Ver Produtos', 'jtd' ),
    'search_items'          => __( 'Procurar Produto', 'jtd' ),
    'not_found'             => __( 'Nada encontrado', 'jtd' ),
    'not_found_in_trash'    => __( 'Nada encontrado no Lixo', 'jtd' ),
    'featured_image'        => __( 'Imagem em Destaque', 'jtd' ),
    'set_featured_image'    => __( 'Definir Imagem em Destaque', 'jtd' ),
    'remove_featured_image' => __( 'Remover Imagem em Destaque', 'jtd' ),
    'use_featured_image'    => __( 'Usar como Imagem em Destaque', 'jtd' ),
    'insert_into_item'      => __( 'Inserir no Produto', 'jtd' ),
    'uploaded_to_this_item' => __( 'Uploaded to this item', 'jtd' ),
    'items_list'            => __( 'Lista de Produtos', 'jtd' ),
    'items_list_navigation' => __( 'Items list navigation', 'jtd' ),
    'filter_items_list'     => __( 'Filter items list', 'jtd' ),
  );
  $rewrite = array(
    'slug'                  => 'portfolio',
    'with_front'            => true,
    'pages'                 => true,
    'feeds'                 => false,
  );
  $args = array(
    'label'                 => __( 'Produtos', 'jtd' ),
    'description'           => __( 'Catalogo de Produtos', 'jtd' ),
    'labels'                => $labels,
    'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_position'         => 5,
    'menu_icon'             => 'dashicons-cart',
    'show_in_admin_bar'     => true,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => true,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'rewrite'               => $rewrite,
    'capability_type'       => 'post',
    'taxonomies' => array('post_tag')
  );
  register_post_type( 'portfolio', $args );
}
add_action( 'init', 'josora_cpt', 0 );
function josora_flush_rules_on_save_posts( $post_id ) {
    // Check the correct post type.
    // Example to check, if the post type isn't 'post' then don't flush, just return.
    if ( ! empty( $_POST['post_type'] && $_POST['post_type'] != 'post' ) ) {
        return;
    }
    flush_rewrite_rules();
}
add_action( 'save_post', 'josora_flush_rules_on_save_posts', 20, 2);
