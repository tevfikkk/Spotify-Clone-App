import formatDuration from 'format-duration'

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000)
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-Us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
