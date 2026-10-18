import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const FILE = path.join(process.cwd(), 'src', 'data', 'site-settings.json')

export async function GET() {
  try {
    const raw = await readFile(FILE, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({}, { status: 404 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const clean: Record<string, string> = {}
    for (const key of Object.keys(body)) {
      if (typeof body[key] === 'string') clean[key] = body[key].trim()
    }
    await writeFile(FILE, JSON.stringify(clean, null, 2) + '\n', 'utf-8')
    return NextResponse.json({ ok: true, settings: clean })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'write failed' }, { status: 500 })
  }
}
