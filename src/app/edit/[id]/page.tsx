// src/app/edit/[id]/page.tsx

import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';
import { Contact } from '@/lib/validationSchemas'; // Only needed for typing, optional

export default async function EditContactPage({ params }: { params: { id: string | string[] } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    return notFound();
  }

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}