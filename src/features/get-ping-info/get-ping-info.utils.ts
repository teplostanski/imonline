import chalk from 'chalk'

export function getColor(time: string) {
  const pingTime = Number.parseFloat(time)
  if (pingTime <= 100) return chalk.greenBright(time + ' мс')
  if (pingTime <= 200) return chalk.green(time + ' мс')
  if (pingTime <= 300) return chalk.yellow(time + ' мс')
  if (pingTime <= 600) return chalk.yellowBright(time + ' мс')
  if (pingTime <= 1000) return chalk.red(time + ' мс')
  return chalk.redBright(time + ' мс')
}
