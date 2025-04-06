import { useImmer } from 'use-immer'
import type { Prisma } from '@prisma/client'

import Button from 'components/Button'
import { Input, InputSelect } from 'components/form/Input'

import { StoreProviders } from 'utils/consts'

type Store = Prisma.storesGetPayload<{ select: { url: true; provider: true } }>

interface Props {
  defaultValue?: Store[]
}

const defaultStore: Store = { provider: StoreProviders.AMAZON, url: '' }

export default function StoresSection(props: Props) {
  const { defaultValue = [defaultStore] } = props
  const [stores, setStores] = useImmer<typeof defaultValue>(defaultValue)

  return (
    <>
      <div className='flex gap-x-2'>
        <Button
          onClick={() => {
            setStores((current) => {
              current.push(defaultStore)
            })
          }}
        >
          Add store link
        </Button>
      </div>
      <div className='flex flex-col gap-y-2.5'>
        {stores.map((d, index) => (
          <div key={index} className='flex gap-x-2 '>
            <InputSelect dark name={`stores.${index}.provider`} label='Provider' defaultValue={d.provider ?? ''}>
              {Object.values(StoreProviders).map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </InputSelect>

            <Input
              dark
              label='Url'
              name={`stores.${index}.url`}
              value={d.url ?? ''}
              onChange={(ev) => {
                setStores((current) => {
                  current[index].url = ev.target.value
                })
              }}
            />
            <div className='flex py-3'>
              <Button
                className='mt-auto bg-red-500 hover:bg-red-600'
                onClick={() => {
                  setStores((current) => {
                    current.splice(index, 1)
                  })
                }}
              >
                X
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
