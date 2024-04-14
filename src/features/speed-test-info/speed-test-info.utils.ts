import {TimeFormat} from './speed-test-info.types.js'

export const formatDuration = (duration: number, format: TimeFormat): string => {
  switch (format) {
    case 's': {
      return `${(duration / 1000).toFixed(2)} с`
    }

    case 'ms': {
      return `${duration} мс`
    }

    default: {
      return `${(duration / 1000).toFixed(2)} с`
    }
  }
}
