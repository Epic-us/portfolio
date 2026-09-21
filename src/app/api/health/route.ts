export function GET() {
  return Response.json(
    { status: "ok", service: "systems-analyst-portfolio" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
