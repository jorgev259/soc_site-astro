import type { ComponentProps, PropsWithChildren } from 'react'
import clsx from 'clsx'

export default function Input(props: PropsWithChildren<ComponentProps<'input'>>) {
  const { name, className, children, ...attrs } = props

  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='font-medium text-black'>
        {children}:
      </label>
      <input {...attrs} name={name} className={clsx('bg-zinc-200 rounded-md p-2 mt-2 mb-3 text-black', className)} />
    </div>
  )
}
