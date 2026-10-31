import React from 'react';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export const dynamic = 'force-dynamic';

export default function NewTeamMemberPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <TeamMemberForm isEditing={false} />
    </div>
  );
}
