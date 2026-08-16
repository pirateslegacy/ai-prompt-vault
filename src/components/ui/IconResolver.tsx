import React from 'react';
import {
  Briefcase,
  Code,
  User,
  TrendingUp,
  Folder,
  Terminal,
  Zap,
  Sparkles,
  BookOpen,
  Video,
  Microscope,
  PenTool
} from 'lucide-react';

interface IconResolverProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name, className = 'w-4 h-4', style }) => {
  switch (name.toLowerCase()) {
    case 'briefcase':
    case 'work':
      return <Briefcase className={className} style={style} />;
    case 'code':
    case 'coding':
      return <Code className={className} style={style} />;
    case 'user':
    case 'personal':
      return <User className={className} style={style} />;
    case 'trendingup':
    case 'marketing':
      return <TrendingUp className={className} style={style} />;
    case 'youtube':
    case 'video':
      return <Video className={className} style={style} />;
    case 'microscope':
    case 'research':
      return <Microscope className={className} style={style} />;
    case 'pentool':
    case 'writing':
      return <PenTool className={className} style={style} />;
    case 'terminal':
      return <Terminal className={className} style={style} />;
    case 'sparkles':
      return <Sparkles className={className} style={style} />;
    case 'zap':
      return <Zap className={className} style={style} />;
    case 'bookopen':
      return <BookOpen className={className} style={style} />;
    default:
      return <Folder className={className} style={style} />;
  }
};
