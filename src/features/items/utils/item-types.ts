import {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link as LinkIcon,
  File,
  FileText,
  Image,
} from "lucide-react";
import { itemTypes } from "@/features/items/types/item";

export const iconMap: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link: LinkIcon,
  File,
  FileText,
  Image,
};

export function getItemTypeIcon(typeId: string): React.ElementType {
  const type = itemTypes.find(t => t.id === typeId);
  if (!type) return Code;
  return iconMap[type.icon] || Code;
}

export function getItemTypeColor(typeId: string): string {
  const type = itemTypes.find(t => t.id === typeId);
  return type?.color || "#6b7280";
}
