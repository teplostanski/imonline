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
// src/components/wrapper.tsx
import {Box} from 'ink'
import React, {FC} from 'react'

import withExit from './with-exit.js'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper: FC<WrapperProps> = ({children}) => (
  <Box margin={1}>
    <Box flexDirection="column" padding={1}>
      {children}
    </Box>
  </Box>
)

const WrapperWithQuit = withExit(Wrapper)

export {WrapperWithQuit as Wrapper}
