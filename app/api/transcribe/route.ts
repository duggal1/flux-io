import { NextResponse } from 'next/server';
import { transcribeUploadedFile } from '@/app/actions'; // Assuming it's exported from the main actions file

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const userId = formData.get('userId') as string;

  if (!file || !userId) {
    return NextResponse.json({ error: 'File and userId are required' }, { status: 400 });
  }

  try {
    const resp = [{ serverData: { userId, file } }];
    const result = await transcribeUploadedFile(resp);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 });
  }
}
