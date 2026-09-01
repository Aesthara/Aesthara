import {
  FileText,
  Lightbulb,
  PenTool,
  Presentation,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  FileText: <FileText className="w-7 h-7 text-white" />,
  Presentation: <Presentation className="w-7 h-7 text-white" />,
  Users: <Users className="w-7 h-7 text-white" />,
  Star: <Star className="w-7 h-7 text-white" />,
  PenTool: <PenTool className="w-7 h-7 text-white" />,
  Target: <Target className="w-7 h-7 text-white" />,
  Lightbulb: <Lightbulb className="w-7 h-7 text-white" />,
  Rocket: <Rocket className="w-7 h-7 text-white" />,
  TrendingUp: <TrendingUp className="w-7 h-7 text-white" />,
};

export function processIcon(iconKey: string, fallback = "Target") {
  return ICON_MAP[iconKey] ?? ICON_MAP[fallback] ?? ICON_MAP.Target;
}

export function statIcon(iconKey: string) {
  const sizeClass = "w-10 h-10";
  const map: Record<string, ReactNode> = {
    FileText: <FileText className={sizeClass} />,
    Presentation: <Presentation className={sizeClass} />,
    Users: <Users className={sizeClass} />,
    Star: <Star className={sizeClass} />,
    PenTool: <PenTool className={sizeClass} />,
  };
  return map[iconKey] ?? map.FileText;
}
