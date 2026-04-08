import type { ChatMessage } from "@/types/TileContent";

export function isOwnerMessage(message: ChatMessage, ownerId: string): boolean {
  if (!ownerId || !message.authorId) return false;
  return message.authorId === ownerId;
}
