import { Prisma } from '@/prisma/client'
import { WEBHOOK_URL } from 'astro:env/server'

import prismaClient from 'utils/prisma-client'
import { RequestState } from '@/prisma/enums'

const albumArtistNames = {
  include: { artists: { include: { artist: { select: { name: true } } } } }
} satisfies Prisma.albumsDefaultArgs

type AlbumArtistNames = Prisma.albumsGetPayload<typeof albumArtistNames>

async function postWebhook(album: AlbumArtistNames, userText = '') {
  const url = `https://www.sittingonclouds.net/album/${album.id}`
  const content = `${url}${userText}`
  const payload = { content }

  await fetch(WEBHOOK_URL, {
    body: JSON.stringify(payload),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export async function handleComplete(album: AlbumArtistNames, requestId?: number) {
  if (requestId) {
    const request = await prismaClient.requests.findUnique({
      where: { id: requestId },
      select: { state: true, id: true, userID: true, user: true }
    })
    if (!request || request.state === RequestState.COMPLETE) return

    await fetch('http://localhost:7001/complete', { method: 'POST', body: JSON.stringify({ requestId: request.id }) })

    const userText =
      request.userID || request.user
        ? ` ${request.userID ? `<@${request.userID}>` : `@${request.user}`} :arrow_down:`
        : ''

    await postWebhook(album, userText)
  } else {
    await postWebhook(album)
  }
}
