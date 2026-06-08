import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export const dynamic = "force-dynamic"

// GET /api/leaderboard — returns the top entries (all time)
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT name, wins, losses, total, team, gen_label, region_label, daily, ts
       FROM leaderboard
       ORDER BY wins DESC, losses ASC
       LIMIT 500`,
    )
    const entries = rows.map((r) => ({
      name: r.name,
      wins: r.wins,
      losses: r.losses,
      total: r.total,
      team: r.team,
      genLabel: r.gen_label,
      regionLabel: r.region_label,
      daily: r.daily,
      ts: Number(r.ts),
    }))
    return NextResponse.json({ entries })
  } catch (err) {
    console.log("[v0] leaderboard GET error:", (err as Error).message)
    return NextResponse.json({ entries: [] }, { status: 200 })
  }
}

// POST /api/leaderboard — submits a new run
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name ?? "").trim().slice(0, 20)
    if (!name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 })
    }

    const wins = Number.isFinite(body.wins) ? Math.max(0, Math.floor(body.wins)) : 0
    const losses = Number.isFinite(body.losses) ? Math.max(0, Math.floor(body.losses)) : 0
    const total = Number.isFinite(body.total) ? Math.max(0, Math.floor(body.total)) : 0
    const team = String(body.team ?? "").slice(0, 300)
    const genLabel = String(body.genLabel ?? "").slice(0, 40)
    const regionLabel = String(body.regionLabel ?? "").slice(0, 60)
    const daily = Boolean(body.daily)
    const ts = Number.isFinite(body.ts) ? Math.floor(body.ts) : Date.now()

    await pool.query(
      `INSERT INTO leaderboard (name, wins, losses, total, team, gen_label, region_label, daily, ts)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, wins, losses, total, team, genLabel, regionLabel, daily, ts],
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] leaderboard POST error:", (err as Error).message)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
