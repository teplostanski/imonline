/*
 * Copyright (C) 2024 Igor Teplostanski <teplostanski@yandex.ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import chalk from 'chalk'

export function getColor(time: string, noColor: boolean | undefined) {
  const pingTime = Number.parseFloat(time)
  if (noColor) {
    return time + ' мс'
  }

  if (pingTime <= 100) return chalk.greenBright(time + ' мс')
  if (pingTime <= 200) return chalk.green(time + ' мс')
  if (pingTime <= 300) return chalk.yellow(time + ' мс')
  if (pingTime <= 600) return chalk.yellowBright(time + ' мс')
  if (pingTime <= 1000) return chalk.red(time + ' мс')
  return chalk.redBright(time + ' мс')
}
