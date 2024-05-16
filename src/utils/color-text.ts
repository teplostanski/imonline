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
type TextStyleFunction = (text: string) => string

export function colorText(styleFn: TextStyleFunction, text: string, noColor?: boolean | undefined): string {
  const isNoColor = Boolean(process.env.NO_COLOR === '1' || process.env.NCHE_NO_COLOR === '1' || noColor === true)

  if (isNoColor) {
    return text
  }

  return styleFn(text)
}
