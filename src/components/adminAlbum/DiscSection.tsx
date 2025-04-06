import { useImmer } from 'use-immer'
import { Prisma } from '@prisma/client'

import Button from 'components/Button'
import { InputArea } from 'components/form/Input'

type Disc = Prisma.discsGetPayload<{ select: { number: true; body: true } }>

interface Props {
  defaultValue?: Disc[]
}

export default function DiscSection(props: Props) {
  const { defaultValue = [{ number: 0, body: '' }] } = props
  const [discs, setDiscs] = useImmer<Disc[]>(defaultValue)

  return (
    <>
      <div className='flex gap-x-2'>
        <Button
          onClick={() => {
            setDiscs((current) => {
              current.push({ number: 0, body: '' })
            })
          }}
        >
          Add empty disc
        </Button>
        <Button
          onClick={() => {
            setDiscs((current) => current.filter((value, index) => (value.body?.length ?? 0) > 0 || index === 0))
          }}
        >
          Remove empty discs
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {discs.map((value, index) => (
          <div key={index}>
            <input hidden name={`discs.${index}.number`} value={index} readOnly type='number' />
            <InputArea
              dark
              label={`Disc ${index + 1}`}
              name={`discs.${index}.body`}
              defaultValue={value.body}
              onChange={(ev) => {
                setDiscs((current) => {
                  current[index].body = ev.target.value
                })
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}
