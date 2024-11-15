import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import { BarsRotateFade } from 'react-svg-spinners'

export default function Button(props: PropsWithChildren<{ className?: string; loading?: boolean }>) {
  const { children, className, loading = false, ...restProps } = props
  return (
    <button
      className={clsx(
        { 'cursor-progress': loading },
        'py-2 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
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
