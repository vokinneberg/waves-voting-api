<?php
/**
 *
 * This file is part of Aura for PHP.
 *
 * @license http://opensource.org/licenses/bsd-license.php BSD
 *
 */

namespace Aura\SqlQuery\Pgsql;

use Aura\SqlQuery\Common;

/**
 *
 * An object for PgSQL INSERT queries.
 *
 * @package Aura.SqlQuery
 *
 */
class Insert extends Common\Insert implements Common\ReturningInterface, Common\OnConflictInterface, Common\QueryInterface
{
	protected $on_conflict;

	/**
	 *
	 * Returns the proper name for passing to `PDO::lastInsertId()`.
	 *
	 * @param string $col The last insert ID column.
	 *
	 * @return string The sequence name "{$into_table}_{$col}_seq", or the
	 * value from `$last_insert_id_names`.
	 *
	 */
	public function getLastInsertIdName($col)
	{
		$name = parent::getLastInsertIdName($col);
		if (!$name) {
			$name = "{$this->into}_{$col}_seq";
		}
		return $name;
	}

	/**
	 *
	 * Adds returning columns to the query.
	 *
	 * Multiple calls to returning() will append to the list of columns, not
	 * overwrite the previous columns.
	 *
	 * @param array $cols The column(s) to add to the query.
	 *
	 * @return self
	 *
	 */
	public function returning(array $cols)
	{
		return $this->addReturning($cols);
	}

	/**
	 *
	 * Makes onConflictUpdate for Postgres.
	 *
	 *
	 * @param array $conflict_cols The column(s) to check conflicts.
	 * @param array $col_values The column(s) to update.
	 *
	 * @return self
	 *
	 */

	public function onConflictUpdate(array $conflict_cols, array $col_values)
	{
		$this->on_conflict = array(
			'conflict_cols' => $conflict_cols,
			'col_values' => $col_values
		);
		return $this;
	}

	public function onConflictDoNothing()
	{
		$this->on_conflict_do_nothing = true;
	}


}
