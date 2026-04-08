import { describe, expect, it } from 'vitest'

import type { ChatMessage } from '@/types/TileContent'
import { isOwnerMessage } from '@/components/tilecontent/chatOwnership'

const makeMessage = (overrides: Partial<ChatMessage> = {}): ChatMessage => ({
  id: 'message-1',
  text: 'Hello',
  createdAt: Date.now(),
  ...overrides,
})

describe('isOwnerMessage', () => {
  it('returns false when there is no owner id', () => {
    expect(isOwnerMessage(makeMessage({ authorId: 'owner-1' }), '')).toBe(false)
  })

  it('returns true only when authorId matches ownerId', () => {
    expect(isOwnerMessage(makeMessage({ authorId: 'owner-1' }), 'owner-1')).toBe(true)
    expect(isOwnerMessage(makeMessage({ authorId: 'visitor-1' }), 'owner-1')).toBe(false)
  })

  it('does not treat missing author ids as owner messages', () => {
    expect(isOwnerMessage(makeMessage({ authorId: undefined }), 'owner-1')).toBe(false)
  })
})
