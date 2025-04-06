import { useState } from 'react'
import { type SelectProps, type Option, MultiSelect } from 'react-multi-select-component'

interface Props extends Omit<SelectProps, 'value' | 'onChange'> {
  name: string
  defaultSelected?: Option[]
}

export default function MultiSelectWrapper(props: Props) {
  const { defaultSelected = [], name, ...rest } = props
  const [selected, setSelected] = useState<Option[]>(defaultSelected)

  return (
    <>
      <MultiSelect value={selected} onChange={setSelected} {...rest} />
      {selected.map((s, i) => (
        <input key={i} name={`${name}.${i}`} value={s.value} hidden readOnly />
      ))}
    </>
  )
}
