import { useEffect, type KeyboardEvent, type PropsWithChildren } from 'react'
import type { SetState } from 'types'

export default function Modal(props: PropsWithChildren<{ setOpen: SetState<boolean> }>) {
  const { children, setOpen } = props

  useEffect(() => {
    const handleEsc = (ev: KeyboardEvent) => {
      if (ev.code === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div
      className='fixed size-full flex bg-black bg-opacity-50 left-0 top-0 z-50 justify-center items-center'
      onClick={() => setOpen(false)}
    >
      <div
        className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all m-8'
        role='dialog'
        aria-modal='true'
        onClick={(ev) => ev.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
