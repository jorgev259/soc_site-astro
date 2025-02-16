import clsx from 'clsx'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface Props {
  comments: {
    text: string | null
    albums: {
      id: number
      title: string | null
    } | null
  }[]
}

function ArrowButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...rest } = props

  return <button className={clsx('flex-0 px-2 py-2 border rounded-md hover:bg-white group', className)} {...rest} />
}

export default function Looper(props: Props) {
  //@ts-ignore
  const { comments, arrowRight, arrowLeft } = props
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const nextIndex = index === comments.length - 1 ? 0 : index + 1
  const pastIndex = index === 0 ? comments.length - 1 : index - 1
  const isMultiple = comments.length >= 2
  const comment = comments[index]

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIndex(nextIndex), 10 * 1000)
  }, [index])

  return (
    <div className='text-md/6 font-extralight'>
      <div>{comment.text}</div>
      <div className='mt-1'>
        -{' '}
        <a href={`/album/${comment.albums?.id}`} className='hover:text-hover-link hover:underline'>
          {comment.albums?.title}
        </a>
      </div>
      {isMultiple ? (
        <div className='flex mt-2.5'>
          <ArrowButton onClick={() => setIndex(pastIndex)}>{arrowLeft}</ArrowButton>
          <div className='flex-1 text-center content-center'>
            {index + 1} / {comments.length}
          </div>
          <ArrowButton onClick={() => setIndex(nextIndex)}>{arrowRight}</ArrowButton>
        </div>
      ) : (
        false
      )}
    </div>
  )
}
