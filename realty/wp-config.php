<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'realty');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'M)Ez,ypve{^`eHt[1R]Y9v?tNv)fHHIB&#p- .5ZkCYp4PNS4Z-z)n1@6Oqy!!X^');
define('SECURE_AUTH_KEY',  'nT%vmteCK-BLMJW[KY=+Q>CRy[2w!#6 a-H#-HEn*ntNWx-aq[$$[4{P<9@SNg6U');
define('LOGGED_IN_KEY',    'zKNWC<L;+!)wg6L(<*Ii1X+&![Di&P(Pm-FPt`TcZ*F&HLrb-RhJ  LEB>(z ~hH');
define('NONCE_KEY',        ',_dnI6cJ}f;e}HNC:_@Ai>Y5+Ug!gK_*r.B~nx@:a^K}f=^07C;MLh3/1CO1pyb=');
define('AUTH_SALT',        '^Y^<0~+&$El#:uV=Y[^_zU@oA37|aV,e|pb=aXH3:4Ue~!vN@,H#xdMo~z::4{YR');
define('SECURE_AUTH_SALT', ':=#!YK12L,,aLMF 5(P+B%>)}K67%~Tr*8]C`JT$.wh}9a3 09~V_@;7FsBo,lPS');
define('LOGGED_IN_SALT',   '5:;O J^X5Sa1j4f4a3b9fB#/[H2L0PUy.]K6d`q bC7dD|K!Fd+ZI bh|K[ %S+E');
define('NONCE_SALT',       '`7(;+McFLh;yE&U(3:m)[Wu=`isOwLO9It30AL5G.{]-XsYmzNR<t_m^anK{4B%W');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
