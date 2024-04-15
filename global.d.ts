// global.d.ts

export {}

declare global {
  // eslint-disable-next-line no-var
  var iperfPid: null | number | undefined // Используйте var здесь для глобальной перезаписи
}
