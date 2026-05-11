'use client';

import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Jaime Cruz',
    role: 'Founder & Lead Photographer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { instagram: '#', behance: '#', linkedin: '#' },
  },
  {
    id: '2',
    name: 'Sofia Reyes',
    role: 'Wedding Photographer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612e5db?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Marco Santos',
    role: 'Videographer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Lia Bautista',
    role: 'Photo Editor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { behance: '#', instagram: '#' },
  },
  {
    id: '5',
    name: 'Ana Dela Cruz',
    role: 'Makeup Artist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { instagram: '#' },
  },
  {
    id: '6',
    name: 'Paolo Mendez',
    role: 'Second Shooter',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=450&fit=crop&crop=faces&q=80',
    social: { instagram: '#', linkedin: '#' },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = TEAM }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-14 lg:gap-20 select-none w-full max-w-5xl mx-auto py-4 px-4 md:px-0">
      {/* ── Left: staggered photo grid ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto scrollbar-hide pb-1 md:pb-0 mx-auto md:mx-0">
        {/* Column 1 — flush top */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[170px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[158px] md:w-[172px] md:h-[188px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — mid offset */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[148px] md:w-[162px] md:h-[178px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-5 md:gap-6 pt-0 md:pt-4 flex-1 w-full md:w-auto">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Photo card ── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden flex-shrink-0 cursor-pointer transition-opacity duration-500',
        'ring-1 ring-transparent',
        isActive && 'ring-gold/30',
        className,
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(1.05)'
            : 'grayscale(1) brightness(0.65)',
        }}
      />
    </div>
  );
}

/* ── Member row ── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social */}
      <div className="flex items-center gap-2.5">
        {/* Gold pill indicator */}
        <span
          className={cn(
            'h-[3px] rounded-full flex-shrink-0 transition-all duration-300',
            isActive ? 'w-5 bg-gold' : 'w-3 bg-gold/30',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-warm-white' : 'text-warm-white/70',
          )}
          style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
        >
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-warm-faint hover:text-gold transition-colors duration-150"
                title="Instagram"
              >
                <FaInstagram size={10} />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-warm-faint hover:text-gold transition-colors duration-150"
                title="X / Twitter"
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-warm-faint hover:text-gold transition-colors duration-150"
                title="LinkedIn"
              >
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-warm-faint hover:text-gold transition-colors duration-150"
                title="Behance"
              >
                <FaBehance size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p
        className="mt-1.5 pl-[22px] text-[9px] md:text-[10px] font-medium uppercase tracking-[0.25em] text-warm-faint"
      >
        {member.role}
      </p>
    </div>
  );
}
