import { useImmer } from 'use-immer'
import { Prisma } from '@/prisma/browser'

import Button from 'components/Button'
import { Input, InputSelect } from 'components/form/Input'

import { DownloadProvider } from 'utils/consts'

type Download = Prisma.downloadsGetPayload<{
  select: { title: true; links: { select: { provider: true; url: true; url2: true; directUrl: true } } }
}>

const defaultLink = { provider: DownloadProvider.MEDIAFIRE, url: null, url2: null, directUrl: null }
const defaultSection: Download = { title: '', links: [defaultLink] }

interface Props {
  defaultValue?: Download[]
}

export default function DownloadSection(props: Props) {
  const { defaultValue = [defaultSection] } = props
  const [downloads, setDownloads] = useImmer<Download[]>(defaultValue)

  return (
    <>
      <div className='flex gap-x-2'>
        <Button
          onClick={() => {
            setDownloads((current) => {
              current.push(defaultSection)
            })
          }}
        >
          Add download section
        </Button>
      </div>
      <div className='flex flex-col gap-y-1.5'>
        {downloads.map((d, index) => (
          <div key={index} className='border-2 border-white/60  rounded-md p-2'>
            <div>
              <Input
                dark
                label='Title'
                name={`downloads.${index}.title`}
                value={d.title ?? ''}
                onChange={(ev) => {
                  setDownloads((current) => {
                    current[index].title = ev.target.value
                  })
                }}
              />
            </div>
            {d.links.map((link, linkIndex) => (
              <div key={linkIndex} className='flex'>
                <div className='grid grid-cols-4 gap-4'>
                  <InputSelect
                    dark
                    name={`downloads.${index}.links.${linkIndex}.provider`}
                    label='Provider'
                    defaultValue={link.provider ?? ''}
                  >
                    {Object.values(DownloadProvider).map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </InputSelect>
                  <Input
                    dark
                    label='Ouo.io (Url)'
                    name={`downloads.${index}.links.${linkIndex}.url`}
                    defaultValue={link.url ?? ''}
                  />
                  <Input
                    dark
                    label='Fly.inc (Url 2)'
                    name={`downloads.${index}.links.${linkIndex}.url2`}
                    defaultValue={link.url2 ?? ''}
                  />
                  <Input
                    dark
                    label='Direct'
                    name={`downloads.${index}.links.${linkIndex}.directUrl`}
                    defaultValue={link.directUrl ?? ''}
                  />
                </div>
                <div className='flex p-3'>
                  <Button
                    className='mt-auto bg-red-500 hover:bg-red-600'
                    onClick={() => {
                      setDownloads((current) => {
                        current[index].links.splice(linkIndex, 1)
                      })
                    }}
                  >
                    X
                  </Button>
                </div>
              </div>
            ))}
            <div className='flex gap-x-2'>
              <Button
                onClick={() => {
                  setDownloads((current) => {
                    current[index].links.push(defaultLink)
                  })
                }}
              >
                Add link
              </Button>
              <Button
                onClick={() => {
                  setDownloads((current) => {
                    current.splice(index, 1)
                  })
                }}
              >
                Remove section
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
