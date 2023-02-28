const dateFormatter = (time) => {

  let hours = time.getHours()
  let minutes = time.getMinutes()
  let meridiam = 'AM'

  if (hours >= 12 && hours < 24) {
    meridiam = 'PM'
  }

  if (hours > 12) {
    hours -= 12
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  const month = time.getMonth() + 1
  const date = time.getDate()
  const year = time.getFullYear()

  return `${hours}:${minutes} ${meridiam} ${month}/${date}/${year}`
}

export default dateFormatter