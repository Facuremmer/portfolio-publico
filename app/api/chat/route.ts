import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  if (!rateLimit(getIp(req), 20, 60_000)) {
    return NextResponse.json({ text: 'Demasiadas solicitudes. Intentá en un minuto.' }, { status: 429 });
  }
  const body = await req.json() as {
    sessionId: string;
    locale?: string;
    message: string;
  };

  const n8nUrl = process.env.N8N_CHAT_URL;
  if (!n8nUrl) {
    return NextResponse.json({ text: 'Chat no disponible.' }, { status: 503 });
  }

  try {
    const res = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: body.sessionId,
        userId: body.sessionId,
        channel: 'web',
        locale: body.locale ?? 'es',
        message: body.message,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ text: 'Error al procesar tu mensaje.' }, { status: 502 });
    }

    const data = await res.json() as { text: string };
    return NextResponse.json({ text: data.text });
  } catch {
    return NextResponse.json({ text: 'No se pudo conectar con el asistente.' }, { status: 502 });
  }
}
