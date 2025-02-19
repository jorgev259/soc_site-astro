import { useEffect, type KeyboardEvent, type PropsWithChildren } from 'react'
import type { SetState } from 'types'

export default function Modal(props: PropsWithChildren<{ setOpen?: SetState<boolean> }>) {
  const { children, setOpen } = props

  useEffect(() => {
    const handleEsc = (ev: any) => {
      if ((ev as KeyboardEvent).code === 'Escape' && setOpen) setOpen(false)
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div
      className='fixed size-full flex bg-black/50 left-0 top-0 z-50 p-4 justify-center items-center'
      onClick={() => {
        if (setOpen) setOpen(false)
      }}
    >
      <div
        className='bg-white max-w-lg p-4 rounded-lg overflow-hidden shadow-xl transform transition-all m-8'
        role='dialog'
        aria-modal='true'
        onClick={(ev) => ev.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
