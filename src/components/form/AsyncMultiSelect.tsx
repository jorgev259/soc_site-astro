import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { MultiSelect, type Option } from 'react-multi-select-component'

import styles from 'styles/components/form/AsyncMultiSelect.module.css'

interface Props {
  url: string
  nameColumn: string
  className?: string
  valueColumn?: string
  defaultSelected?: Option[]
  name: string
}

function toMapValue(data: any[], nameColumn: string, valueColumn: string) {
  return data.map((item: { [nameColumn]: string; [valueColumn]: string }) => ({
    label: item[nameColumn],
    value: item[valueColumn]
  }))
}

export default function AsyncMultiSelect(props: Props) {
  const { url: defaultUrl, nameColumn, valueColumn = 'id', className, defaultSelected = [], name } = props
  const [url, setUrl] = useState(defaultUrl)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Option[]>(defaultSelected)
  const [options, setOptions] = useState<Option[]>(defaultSelected)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(url)
        if (!res.ok) return

        const data = await res.json()
        const dataOptions = toMapValue(data, nameColumn, valueColumn)

        setOptions([...defaultSelected, ...dataOptions])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  function filterOptions(options: Option[], search: string) {
    if (search.length === 0) setUrl(defaultUrl)
    else setUrl(`${defaultUrl}?q=${search}`)

    return options
  }

  return (
    <>
      <MultiSelect
        labelledBy={name}
        isLoading={loading}
        options={options}
        value={selected}
        onChange={setSelected}
        filterOptions={filterOptions}
        className={clsx(styles.amultiselect, className)}
      />
      {selected.map((s, i) => (
        <input key={i} hidden name={`${name}.${i}`} value={s.value} readOnly />
      ))}
    </>
  )
}
