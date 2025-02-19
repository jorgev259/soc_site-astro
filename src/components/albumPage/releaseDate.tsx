const locale =
  navigator && navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language

interface Props {
  releaseDate: Date
}

export default function ReleaseDate(props: Props) {
  return <td>{new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(props.releaseDate)}</td>
}
