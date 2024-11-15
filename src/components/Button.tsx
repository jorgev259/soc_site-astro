import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { BarsRotateFade } from 'react-svg-spinners'

export default function Button(props: PropsWithChildren<{ className?: string; loading?: boolean }>) {
  const { children, className, loading = false, ...restProps } = props
  return (
    <button
      className={clsx(
        loading ? 'bg-blue-400 cursor-progress' : 'bg-blue-600 hover:bg-blue-700',
        'py-2 px-3.5 rounded-lg',
        className
      )}
      {...restProps}
    >
      <div className='relative flex'>
        <span className={clsx({ invisible: loading })}>{children}</span>
        {loading ? (
          <div className='absolute top-0 left-0 w-full flex justify-center'>
            <BarsRotateFade color='white' />
          </div>
        ) : null}
      </div>
    </button>
  )
}
