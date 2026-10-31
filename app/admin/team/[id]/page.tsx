import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export const dynamic = 'force-dynamic';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const memberId = parseInt(params.id, 10);
  if (isNaN(memberId)) {
    notFound();
  }

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <TeamMemberForm
        isEditing={true}
        initialData={{
          id: member.id,
          name: member.name,
          role: member.role,
          photoUrl: member.photoUrl || '',
          bio: member.bio || '',
          linkedinUrl: member.linkedinUrl || '',
          portfolioUrl: member.portfolioUrl || '',
          sortOrder: member.sortOrder,
          isActive: member.isActive,
        }}
      />
    </div>
  );
}
