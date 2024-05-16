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

const PeachUnderline = chalk.rgb(123, 45, 67).underline
const Magenta = chalk.magenta
const GreenBright = chalk.greenBright
const Green = chalk.green
const Yellow = chalk.yellow
const YellowBright = chalk.yellowBright
const Gray = chalk.gray
const Error = chalk.red
const Cyan = chalk.cyan

const inkError = 'red'
const inkInfo = 'green'

export const color = {
  Cyan,
  Error,
  Gray,
  Green,
  GreenBright,
  Magenta,
  PeachUnderline,
  Yellow,
  YellowBright,
  inkError,
  inkInfo,
}
