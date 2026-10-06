'use client';

import React from 'react';
import { Phone, Mail, MessageCircle, Users } from 'lucide-react';
import { useTeam, type PublicTeamMember } from '@/lib/content';
import type { TeamMember } from '@/data/team';

function TeamCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Loading team member">
      <div className="skeleton-shimmer aspect-[4/3] w-full" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <div className="skeleton-shimmer h-6 w-2/3 rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer mt-2 h-4 w-1/2 rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer mt-3 h-4 w-full rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer mt-1 h-4 w-5/6 rounded-md" aria-hidden="true" />
      </div>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function MemberCard({ member }: { member: TeamMember }) {
  const phoneHref = member.phone ? `tel:${member.phone.replace(/\s+/g, '')}` : '';
  const whatsappHref = member.whatsapp
    ? `https://wa.me/${member.whatsapp.replace(/\D/g, '')}`
    : '';

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg">
      {/* Photo / initials avatar */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-sky-100 via-slate-100 to-slate-200">
        {member.image ? (
          <img
            src={member.image}
            alt={`${member.name}, ${member.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-600 text-3xl font-bold text-white shadow-md">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
        <p className="mt-0.5 text-sm font-semibold uppercase tracking-wide text-sky-700">
          {member.title}
        </p>
        {member.bio && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{member.bio}</p>
        )}

        {/* Contact details */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
          {member.phone && (
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700"
            >
              <Phone className="h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
              <span>{member.phone}</span>
            </a>
          )}
          {member.whatsapp && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
              <span>WhatsApp: {member.whatsapp}</span>
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700"
            >
              <Mail className="h-4 w-4 shrink-0 text-sky-600" aria-hidden="true" />
              <span className="break-all">{member.email}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export const TeamSection: React.FC = () => {
  // Live team from Firestore (`team` collection) — static data only fills in
  // when the database can't be reached.
  const { members, loading } = useTeam();

  return (
    <section aria-labelledby="team-heading" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-white">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Our Team
            </span>
          </div>
          <h2
            id="team-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            The people behind your expedition
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Local guides, porters and office staff from Skardu — the team that
            plans your route, carries your loads and brings you home safely.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={`${member.name}-${member.title}`} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
