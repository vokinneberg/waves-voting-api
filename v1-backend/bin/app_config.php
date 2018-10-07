<?php


use Aura\SqlQuery\QueryFactory;


require_once "{$BACKEND_FULL_PATH}/exceptions/AbstractException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/BadArgumentException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/DataFormatException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/DBQueryException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/FileNotFoundException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/InvalidFileException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/NoMethodException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/PrivilegesException.php";
require_once "{$BACKEND_FULL_PATH}/exceptions/AuthorizationException.php";
require_once "{$BACKEND_FULL_PATH}/bin/Class.RequestsParser.php";
require_once "{$BACKEND_FULL_PATH}/bin/Class.Fields.php";


class App
{

	private static $obj;
	public static $ENV;
	public static $DB_SERVER;
	public static $DB_USER;
	public static $DB_PASSWORD;
	public static $DB_NAME;
	public static $DOMAIN;
	public static $NODE_DOMAIN;
	public static $SCHEMA;
	public static $DB_DSN;
	public static $DB_PORT;
	public static $SETTINGS;

	public static $QUERY_FACTORY;


	public static $RESPONSE_FORMAT;
	public static $RESPONSE_DOWNLOAD;
	public static $RESPONSE_NUDE;

	public static $__REQUEST;
	public static $__HEADERS;
	public static $__FIELDS;
	public static $__PAGE;
	public static $__LENGTH;
	public static $__OFFSET;
	public static $__ORDER_BY;
	public static $__LANG = 'ru';

	private static $__USER;
	private static $__DB;
	private static $__IP;


	const DEFAULT_LENGTH = 100;
	const DEFAULT_OFFSET = 0;
	const DEFAULT_NODE_LOCATION = 'http://localhost:8000';

	const DB_DATETIME_FORMAT = 'Y-m-d H:i:s';

	const EXPORT_FORMATS = array('html', 'xlsx');

	/*
	 * init config options for deploy and visioning
	 * */
	static function init()
	{
		$_SERVER['ENV'] = isset($_SERVER['ENV']) ? $_SERVER['ENV'] : 'local';
		App::$ENV = $_SERVER['ENV'];
		$filename = 'v1-config.json';
		$counter = 0;
		if (file_exists($filename) == false) {
			do {
				$filename = '../' . $filename;
				$counter++;
			} while (file_exists($filename) == false && $counter < 5);
		}
		$config_json = file_get_contents($filename);
		self::$obj = json_decode($config_json, false);

		self::$obj = self::$obj->{$_SERVER['ENV']};
		self::$DB_NAME = self::$obj->db->database;
		self::$DB_SERVER = self::$obj->db->host;
		self::$DB_USER = self::$obj->db->user;
		self::$DB_PASSWORD = self::$obj->db->password;
		self::$DB_PORT = self::$obj->db->port;
		self::$DOMAIN = self::$obj->domain;
		self::$NODE_DOMAIN = self::$obj->node_domain;
		self::$SCHEMA = 'https';
		self::$SETTINGS = self::$obj;
		self::$ENV = $_SERVER['ENV'];

		self::$DB_DSN = 'pgsql:host=' . self::$DB_SERVER . ';dbname=' . self::$DB_NAME . ';port=' . self::$DB_PORT;
	}

	static function getVar($name)
	{
		return self::$obj->$name;
	}

	public static function queryFactory(): QueryFactory
	{
		return self::$QUERY_FACTORY;
	}

	static function buildGlobal(ExtendedPDO $db)
	{
		self::$RESPONSE_FORMAT = (isset($_REQUEST['format']) && $_REQUEST['format'] == 'xml') ? 'xml' : 'json';
		self::$RESPONSE_DOWNLOAD = (isset($_REQUEST['download']) && ($_REQUEST['download'] == '1' || $_REQUEST['download'] == 'true')) ? true : false;
		self::$RESPONSE_NUDE = (isset($_REQUEST['nude_data']) && ($_REQUEST['nude_data'] == '1' || $_REQUEST['nude_data'] == 'true')) ? true : false;

		self::$__REQUEST = $_REQUEST;
		$input = file_get_contents('php://input');
		self::$__REQUEST['payload'] = RequestParser::payload($input);
		self::$__REQUEST['__files'] = '';
		if ($_SERVER['REQUEST_METHOD'] == 'PUT' && self::$__REQUEST['payload'] == null) {
			self::$__REQUEST = array_merge($_REQUEST, RequestParser::put($input));
		}

		self::$__HEADERS = getallheaders();

		foreach (self::$__HEADERS as $key => $header) {
			self::$__HEADERS[strtolower($key)] = $header;
		}

		self::$__FIELDS = Fields::parseFields(self::$__REQUEST['fields'] ??  '');
		self::$__ORDER_BY = isset(self::$__REQUEST['order_by']) ? Fields::parseOrderBy(self::$__REQUEST['order_by']) : null;

		self::$__PAGE = (isset($_REQUEST['page'])) ? (int)$_REQUEST['page'] : 0;
		self::$__LENGTH = (isset($_REQUEST['length'])) ? (int)$_REQUEST['length'] : self::DEFAULT_LENGTH;
		self::$__OFFSET = (isset($_REQUEST['offset'])) ? (int)$_REQUEST['offset'] : self::$__PAGE * self::$__LENGTH;

		self::$__DB = $db;
		self::$__IP = $__ip = $_SERVER['REMOTE_ADDR'] ?: ($_SERVER['HTTP_X_FORWARDED_FOR'] ?: $_SERVER['HTTP_CLIENT_IP']);;

		self::$QUERY_FACTORY = new QueryFactory('pgsql');
	}

	static function getCurrentUser()
	{
		if (self::$__USER instanceof User)
			return self::$__USER;

		return new User();
	}

	static public function getFieldsValue($name)
	{
		return isset(self::$__FIELDS[$name]) ? self::$__FIELDS[$name] : null;
	}

	static public function getFieldsParam($name, $param)
	{
		$field = isset(self::$__FIELDS[$name]) ? self::$__FIELDS[$name] : null;
		if (is_array($field) && isset($field[$param])) {
			return $field[$param];
		} else {
			return null;
		}
	}

	static public function DB(): ExtendedPDO
	{
		return self::$__DB;
	}

	static public function saveImage(&$file, $filename, $size)
	{
		$start_memory = memory_get_usage();
		$tmp = unserialize(serialize($file));
		$img_size = memory_get_usage() - $start_memory;

		if ($img_size / 1024 > $size) {
			throw new InvalidArgumentException('Файл слишком большого размера. Максимальный размер - ' . $size . ' кбайт');
		}
		$file = explode(',', $file);
		$file = $file[1];

		if ($file) {
			global $ROOT_PATH;
			$result = file_put_contents($ROOT_PATH . $filename, base64_decode($file));
			if (!$result)
				throw new RuntimeException('FILE_SAVING_ERROR');
			return $result;
		} else {
			throw new InvalidArgumentException('IMAGE_FILE_NOT_FOUND');
		}
	}

	static public function getImageExtension($file_name)
	{
		if (!isset($file_name) || $file_name == '') {
			return '';
		} else {
			$file_name_parts = explode('.', $file_name);
			return end($file_name_parts);
		}
	}

	public static function generateRandomString($length = 10)
	{
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}

	public static function getAuthURLs(string $type)
	{
		$is_mobile = $type == 'mobile' ? 'true' : 'false';
		$scheme = App::$ENV != 'prod' ? 'http://' : 'https://';

		return new Result(true, '', array(
			'vk' => 'https://oauth.vk.com/authorize?client_id=' . self::$SETTINGS->VK->APP_ID . '&scope=groups,friends,email,wall,offline,pages,photos,groups&redirect_uri=' . $scheme . self::$DOMAIN . '/redirectOauth.php?mobile=' . $is_mobile . '%26type=vk&response_type=token',
			'google' => 'https://accounts.google.com/o/oauth2/auth?scope=email%20profile%20https://www.googleapis.com/auth/plus.login&redirect_uri=' . $scheme . self::$DOMAIN . '/redirectOauth.php?mobile=' . $is_mobile . '%26type=google&response_type=token&client_id=' . self::$SETTINGS->google->web->client_id,
			'facebook' => 'https://www.facebook.com/dialog/oauth?client_id=' . self::$SETTINGS->facebook->app_id . '&response_type=token&scope=public_profile,email,user_friends&display=popup&redirect_uri=' . $scheme . self::$DOMAIN . '/redirectOauth.php?mobile=' . $is_mobile . '%26type=facebook'
		));
	}

	public static function prepareSearchStatement($value, $glue = '&')
	{
		$values = preg_split('/\P{L}+/u', $value);
		$prep_values = array();
		foreach ($values as $value) {
			if ($value != '') {
				$prep_values[] = $value;
			}
		}
		if (count($prep_values) == 0) {
			$prep_values = array('evendate');
		}
		return implode($glue, $prep_values) . ':abd';
	}

	public static function prepareStatisticsData()
	{

	}

	public static function setSessionTimezone($tz)
	{
		$tz = trim($tz);
		if (preg_match('/^[\-\+]\d\d:\d\d$/', $tz)) {
			self::$__DB->query("SET SESSION TIME ZONE INTERVAL '+08:00' HOUR TO MINUTE;");
		} else throw new InvalidArgumentException('BAD_TIMEZONE');

	}

	public static function logRequest(ExtendedPDO $__db, array $__request, User $__user = null, $_request_method, $_class_name, $_args, $_method_name,
																		$__headers, $_http_code, DateTime $request_time, $_db_query, Exception $_exception = null)
	{
		$q_ins_log = self::queryFactory()->newInsert();
		$q_ins_log
			->into('log_requests')
			->cols(array(
				'body' => json_encode($__request ?? array()),
				'body_json' => json_encode($__request ?? array()),
				'user_id' => isset($__user) && ($__user instanceof User) ? $__user->getId() : null,
				'method' => $_request_method ?? '',
				'class' => $_class_name ?? '',
				'args' => json_encode($_args ?? array()),
				'method_name' => $_method_name ?? '',
				'response_status' => null,
				'headers' => json_encode($__headers ?? array()),
				'response_http_status' => $_http_code,
				'time' => $request_time->format('Y-m-d H:i:s'),
				'db_query' => json_encode($_db_query ?? NULL),
				'exception_text' => isset($_exception) ? $_exception->getMessage() : null,
				'exception_trace' => isset($_exception) ? $_exception->getTraceAsString() : null,
				'exception_file' => isset($_exception) ? $_exception->getFile() : null,
				'exception_line' => isset($_exception) ? $_exception->getLine() : null
			))
			->returning(array('uuid'));
		$p_ins_log = $__db->prepareExecute($q_ins_log);
		$log_res = $p_ins_log->fetch(PDO::FETCH_ASSOC);

		if ($log_res != FALSE) {
			return $log_res['uuid'];
		} else {
			return null;
		}
	}

	public static function loadColumnNames()
	{
		global $BACKEND_FULL_PATH;
		return json_decode(file_get_contents($BACKEND_FULL_PATH . '/events/column_names.json'), true);
	}

	public static function getSocialUrls()
	{
		return array(
			'VK' => array(
				'GET_ACCESS_TOKEN' => 'https://oauth.vk.com/access_token',
				'GET_FRIENDS_LIST' => 'https://api.vk.com/method/friends.get',
				'GET_USER_INFO' => 'https://api.vk.com/method/users.get',
				'GET_GROUPS_LIST' => 'https://api.vk.com/method/groups.get',
				'GET_GROUPS_PART' => '/method/groups.get',
				'POST_TO_WALL' => 'https://api.vk.com/method/wall.post',
				'POST_TO_WALL_PART' => '/method/wall.post',
				'GET_WALL_PHOTO_UPLOAD_SERVER' => 'https://api.vk.com/method/photos.getWallUploadServer',
				'SAVE_WALL_PHOTO_UPLOAD' => 'https://api.vk.com/method/photos.saveWallPhoto'
			),
			'FACEBOOK' => array(
				'GET_ACCESS_TOKEN' => 'https://graph.facebook.com/v2.3/oauth/access_token',
				'GET_USER_INFO' => 'https://graph.facebook.com/me',
				'GET_FRIENDS_LIST' => 'https://graph.facebook.com/me/friends'
			),
			'GOOGLE' => array(
				'GET_ACCESS_TOKEN' => 'https://www.googleapis.com/oauth2/v1/tokeninfo',
				'GET_USER_INFO' => 'https://www.googleapis.com/plus/v1/people/me',
				'GET_FRIENDS_LIST' => 'https://www.googleapis.com/plus/v1/people/me/people/visible'
			)
		);
	}

	public static function getBodyJSON(\GuzzleHttp\Psr7\Response $response, bool $object = true)
	{
		return json_decode($response->getBody()->getContents(), $object);
	}

	public static function transliterate(string $from, string $text)
	{
		$cyr = [
			'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п',
			'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',
			'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П',
			'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
		];
		$lat = [
			'a', 'b', 'v', 'g', 'd', 'e', 'io', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p',
			'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'i', 'y', 'e', 'yu', 'ya',
			'A', 'B', 'V', 'G', 'D', 'E', 'Io', 'Zh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P',
			'R', 'S', 'T', 'U', 'F', 'H', 'Ts', 'Ch', 'Sh', 'Sht', 'A', 'I', 'Y', 'e', 'Yu', 'Ya'
		];
		if ($from == 'cyr'){
			return str_replace($cyr, $lat, $text);
		}elseif ($from == 'lat'){
			return str_replace($lat, $cyr, $text);
		}
		else throw new InvalidArgumentException('BAD_TRANSLITERATE');
	}

}