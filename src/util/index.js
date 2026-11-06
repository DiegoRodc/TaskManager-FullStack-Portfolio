import { apiUrl } from '@/config'

export const cookies = document.cookie.split(/ */).reduce((obj, str) => {
  if (str === '') return obj

  const eq = str.indexOf('=')
  const key = eq > 0 ? str.slice(0, eq) : str
  let val = eq > 0 ? str.slice(eq + 1) : null

  if (val != null) {
    try {
      val = decodeURIComponent(val)
    } catch (error) {
      console.error(error)
    }
  }

  obj[key] = val
  return obj
}, {})

// Gets the current date in YYYY-MM-DD format for the date picker.
export const getCurrentDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`
}

export const formatDate = date => {
  const value = new Date(date)
  return `${value.getFullYear()}-${leadingZero(value.getMonth() + 1)}-${leadingZero(value.getDate())}`
}

const leadingZero = number => {
  if (number < 0) throw new Error('Number must be positive')
  return number < 10 ? `0${number}` : `${number}`
}

export const authenticated = async () => {
  try {
    const response = await fetch(apiUrl('/api/v1/user'), {
      credentials: 'include'
    })
    return response.ok
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}
