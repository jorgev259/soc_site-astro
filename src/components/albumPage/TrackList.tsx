import { useState } from 'react'
import * as m from 'paraglide/messages'
import clsx from 'clsx'

interface Props {
  discs: {
    number: number | null
    body: string | null
  }[]
}

export default function TrackList(props: Props) {
  const { discs = [] } = props
  const [current, setCurrent] = useState(0)

  return (
    <div className='mt-2'>
      <div className='flex'>
        {discs.length > 1
          ? discs.map(({ number }, i) => (
              <div key={number} className='flex-1 text-center'>
                <button
                  type='button'
                  className='w-full py-1 border border-white disabled:text-black disabled:bg-white hover:text-black hover:bg-white'
                  disabled={current === number}
                  onClick={() => setCurrent(number ?? 0)}
                >
                  {m.disc()} {(number ?? 0) + 1}
                </button>
              </div>
            ))
          : null}
      </div>
      <div className=''>
        <div className='col'>
          <div className={clsx('border p-3 border-t-0', { 'border-t-2': discs.length === 1 })}>
            <table className='gap-y-4' cellPadding='6'>
              <tbody>
                {discs.length > 0 &&
                  discs[current].body?.split('\n').map((track, i) => (
                    <tr key={i}>
                      <td>{i + 1} </td>
                      <td>{track}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
