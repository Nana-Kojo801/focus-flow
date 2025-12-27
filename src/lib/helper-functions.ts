import type { SessionType } from './db'

export const getNextSessionType = (sessionType: SessionType) => {
  return sessionType === 'focus'
    ? 'short-break'
    : sessionType === 'short-break'
      ? 'long-break'
      : sessionType === 'long-break'
        ? 'focus'
        : 'focus'
}
