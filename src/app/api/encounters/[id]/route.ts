import { NextRequest, NextResponse } from 'next/server';
import { getEncounterById } from '@/mocks/encounters';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const encounter = getEncounterById(id);

  if (!encounter) {
    return NextResponse.json(
      { error: 'Encounter not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(encounter);
}
