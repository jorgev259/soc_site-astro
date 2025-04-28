const locale =
  navigator && navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language

const releaseDate = (date: Date) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date)

export default releaseDate
