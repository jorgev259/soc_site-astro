import { DateTime, type DurationObjectUnits, Duration } from 'luxon'
import { getLocale } from 'paraglide/runtime'

export const toAbsHumanDuration = (
  start: DateTime,
  end: DateTime,
  units: (keyof DurationObjectUnits)[] = ['years', 'months', 'weeks']
): string => {
  // Better Duration.toHuman support https://github.com/moment/luxon/issues/1134
  const duration = end
    .setLocale(getLocale())
    .diff(start)
    .shiftTo(...units)
    .toObject()

  if ('seconds' in duration) {
    duration.seconds = Math.round(duration.seconds!)
  }

  const cleanedDuration = Object.fromEntries(
    Object.entries(duration)
      .filter(([_key, value]) => value !== 0)
      .map(([key, value]) => [key, Math.floor(Math.abs(value))])
  ) as DurationObjectUnits

  if (Object.keys(cleanedDuration).length === 0) {
    cleanedDuration.seconds = 0
  }

  const human = Duration.fromObject(cleanedDuration).toHuman()
  return human
}
