import type { PropsWithChildren, JSX } from 'react'
import clsx from 'clsx'
import { BarsRotateFade } from 'react-svg-spinners'

export default function Button(props: PropsWithChildren<{ loading?: boolean }> & JSX.IntrinsicElements['button']) {
  const { children, className, loading = false, type = 'button', ...restProps } = props

  return (
    <button
      type={type}
      className={clsx(
        { 'cursor-progress': loading, loading },
        'group py-2 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
        className
      )}
      {...restProps}
    >
      <div className='relative flex'>
        <span className='group-[.loading]:invisible'>{children}</span>
        <div className='hidden group-[.loading]:flex absolute top-0 left-0 w-full justify-center'>
          <BarsRotateFade color='white' />
        </div>
      </div>
    </button>
  )
}
