import type { ComponentProps, PropsWithChildren } from 'react'
import clsx from 'clsx'

export function InputLabel(props: PropsWithChildren<{ dark: boolean; name: string }>) {
  const { dark, name, children } = props
  return (
    <label htmlFor={name} className={clsx('font-medium', dark ? 'text-white' : 'text-black')}>
      {children}:
    </label>
  )
}

interface CustomInputProps {
  name: string
  label: string
  dark?: boolean
  defaultValue?: string | number | null
}

export function Input(props: CustomInputProps & Omit<ComponentProps<'input'>, 'defaultValue'>) {
  const { name, className, dark = false, defaultValue, label, ...attrs } = props

  return (
    <div className={clsx('flex flex-col', className)}>
      <InputLabel dark={dark} name={name}>
        {label}
      </InputLabel>
      <input
        {...attrs}
        defaultValue={defaultValue ?? undefined}
        name={name}
        className='bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black'
      />
    </div>
  )
}

export function InputArea(props: CustomInputProps & Omit<ComponentProps<'textarea'>, 'defaultValue'>) {
  const { name, className, dark = false, defaultValue, label, ...attrs } = props

  return (
    <div className={clsx('flex flex-col', className)}>
      <InputLabel dark={dark} name={name}>
        {label}
      </InputLabel>
      <textarea
        {...attrs}
        defaultValue={defaultValue ?? undefined}
        name={name}
        className='bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black'
      />
    </div>
  )
}

export function InputSelect(props: CustomInputProps & ComponentProps<'select'>) {
  const { name, className, dark = false, label, ...attrs } = props

  return (
    <div className='flex flex-col'>
      <InputLabel dark={dark} name={name}>
        {label}
      </InputLabel>
      <select name={name} className='bg-zinc-200 rounded-md p-2 mt-2 h-full mb-3 text-black' {...attrs} />
    </div>
  )
}
