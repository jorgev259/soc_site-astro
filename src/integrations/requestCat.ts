import {
  REST,
  Routes,
  type APITextChannel,
  type RESTGetAPIGuildRolesResult,
  ChannelType,
  PermissionFlagsBits
} from 'discord.js'

import prismaClient from '../utils/prisma-client'
import type { RequestState } from '@prisma/client'

const discordRest = new REST({ version: '10' }).setToken(import.meta.env.DISCORD_TOKEN)
const guildId = import.meta.env.DISCORD_GUILD_ID
const REQUEST_TALK = 'request-talk'

async function getChannels() {
  const channels = (await discordRest.get(Routes.guildChannels(guildId))) as APITextChannel[]
  return channels
}

async function getRoles() {
  const roles = (await discordRest.get(Routes.guildRoles(guildId))) as RESTGetAPIGuildRolesResult
  return roles
}

export async function checkLockChannel() {
  const countPending = await getPendingCount()
  const channels = await getChannels()
  const roles = await getRoles()

  const channel = channels.find((c) => c.name === 'request-submission' && c.type === ChannelType.GuildText)
  if (!channel) throw Error('Failed to fetch requests-submission channel')

  const membersRole = roles.find((r) => r.name === 'Members')
  const camperRole = roles.find((r) => r.name === 'Request Camper')
  if (!membersRole) throw Error('Failed to fetch relevant roles')

  const allowValue =
    BigInt(channel.permission_overwrites?.find((p) => p.id === membersRole.id)?.allow ?? '0') &
    PermissionFlagsBits.SendMessages
  const denyValue =
    BigInt(channel.permission_overwrites?.find((p) => p.id === membersRole.id)?.deny ?? '0') &
    PermissionFlagsBits.SendMessages

  const putRoute = Routes.channelPermission(channel.id, membersRole.id)
  const messageRoute = Routes.channelMessages(channel.id)

  if (countPending >= 20 && allowValue === PermissionFlagsBits.SendMessages) {
    await discordRest.put(putRoute, { body: { deny: denyValue.toString(), type: 0 } })
    await discordRest.post(messageRoute, { body: { content: 'Requests closed' } })
  } else {
    if (countPending < 20 && denyValue === PermissionFlagsBits.SendMessages) {
      await discordRest.put(putRoute, { body: { allow: allowValue.toString(), type: 0 } })
      await discordRest.post(messageRoute, { body: { content: `Ayo ${camperRole}, requests are open` } })
    }
  }
}

const getPendingCount = () => prismaClient.requests.count({ where: { state: 'PENDING', donator: false } })

const completeRequest = (requestId: number) =>
  prismaClient.requests.update({ where: { id: requestId }, data: { state: 'COMPLETE' } }).then(checkLockChannel)

async function holdRequest(requestId: number, reason: string) {
  const channels = await getChannels()
  const talkChannel = channels.find((c) => c.name === REQUEST_TALK)
  if (!talkChannel) throw Error('Failed to fetch request-talk channel')

  const request = await prismaClient.requests.findUnique({ where: { id: requestId } })
  if (!request) throw Error('Request not found')

  await prismaClient.requests.update({ where: { id: request.id }, data: { state: 'HOLD', reason } })
  await discordRest.post(Routes.channelMessages(talkChannel.id), {
    body: {
      content: `"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been put ON HOLD.\nReason: ${request.reason || 'I made it the fuck up'}`
    }
  })
  await checkLockChannel()
}

async function rejectRequest(requestId: number, reason: string) {
  const channels = await getChannels()
  const talkChannel = channels.find((c) => c.name === REQUEST_TALK)
  if (!talkChannel) throw Error('Failed to fetch request-talk channel')

  const request = await prismaClient.requests.findUnique({ where: { id: requestId } })
  if (!request) throw Error('Request not found')

  await prismaClient.requests.delete({ where: { id: request.id } })
  await discordRest.post(Routes.channelMessages(talkChannel.id), {
    body: {
      content: `"${request.title}${request.link ? ` (${request.link})` : ''}" from <@${request.userID}> has been rejected.\nReason: ${reason || 'I made it the fuck up'}`
    }
  })
  await checkLockChannel()
}

export async function handleState(state: RequestState, requestId: number, reason?: string | null) {
  switch (state) {
    case 'COMPLETE':
      await completeRequest(requestId)
      break
    case 'HOLD':
      await holdRequest(requestId, reason || '')
      break
    case 'PENDING':
      await checkLockChannel()
      break
  }
}
