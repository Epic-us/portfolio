## Runtime network policy — owner decision, 2026-10-02

- Prague Rentals exception approved explicitly by the owner on 2026-10-03: restore its own dedicated Mihomo VPN sidecar and the tunnel network namespace (network_mode: service:proxy). This exception is only for rental and supersedes its earlier no-VPN instruction. Keep VPN credentials only in its protected server configuration. Refreshing from the active Windows VPN profile requires owner authorization for this rental restoration; never import credentials from another server project or expose them in chat, Git or logs.

- Portfolio, SetupB2B and Armchair Experts must run without VPN or VPN/proxy sidecars. This decision supersedes older VPN deployment instructions in AGENTS.md, CLAUDE.md, DEVOPS.md and runbooks.
- For the projects that must run without VPN, keep their own Compose network. Do not share a VPN container's network namespace, depend on its health/startup, inherit HTTP_PROXY/HTTPS_PROXY/ALL_PROXY, or attach these projects to another project's VPN network. Ordinary application reverse proxies (for example Nginx) are allowed.
- Use restart: unless-stopped for persistent services; startup dependencies may include only the project's own required application/database services. Preserve databases, uploads, secrets, tunnel identities and existing LAN ports.
- Cloudflare Tunnel, where already configured, connects directly. Never restore VPN routing automatically after a direct connection fails. Report application/LAN health separately from public-domain reachability; a running container does not prove public availability.
- Do not modify VPN-dependent TGShop or Train Hard as part of this rule. A new VPN exception requires a new explicit owner instruction.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project handoff status (2026-09-23)

## Goal

Build and publish a self-hosted portfolio for a systems analyst. The public site must present projects, GitHub information, diagrams, specifications, relationships, files, and interactive examples. Content must be editable through a fully self-hosted admin panel.

## Repository and stack

- Repository: `https://github.com/Epic-us/portfolio.git`
- Branch: `main`; local branch is synchronized with `origin/main` at commit `56d6a3d`.
- Stack: Next.js 16.3.5, strictly typed TypeScript, Payload CMS 3.90.1, PostgreSQL 17, Docker Compose.
- Sanity was rejected. Payload CMS is the selected self-hosted CMS and provides `/admin`, REST, GraphQL, drafts, versions, uploads, project/skill relationships, RU/EN localization, Mermaid and OpenAPI content.
- Important files: `compose.yaml`, `.env.example`, `README.md`.
- Before modifying Next.js code, read the relevant guide in `node_modules/next/dist/docs/` as required above.

## Server deployment

- Debian server SSH target: `gerard@192.168.1.16`.
- Deployment directory: `/home/gerard/portfolio`.
- The application and PostgreSQL were deployed and healthy. The app listens on server loopback `127.0.0.1:3000`; health endpoint: `http://127.0.0.1:3000/api/health`.
- Containers: `systems-analyst-portfolio`, `systems-analyst-postgres`, plus optional `cloudflared` under the Compose profile `tunnel`.
- Server `.env` already contains generated database/Payload secrets and the Cloudflare Tunnel token. Never display, copy into chat, or commit `.env`, passwords, private SSH keys, API tokens, or the tunnel token.
- SSH private key on this Windows machine: `C:\Users\pcmai\.ssh\id_ed25519_portfolio`; never display or commit it.
- Current blocker: the authorized key on the server is restricted to the old client IP `192.168.1.11`, while the Windows computer later received `192.168.1.7`. The user must log in with the server password and run:

```bash
sed -i 's/from="192\.168\.1\.11"/from="192.168.1.0\/24"/' ~/.ssh/authorized_keys
```

- After that, verify key access and update the deployment:

```powershell
ssh -i "C:\Users\pcmai\.ssh\id_ed25519_portfolio" -o IdentitiesOnly=yes -o BatchMode=yes gerard@192.168.1.16 "whoami"
```

```bash
cd /home/gerard/portfolio
git pull --ff-only
docker compose --profile tunnel up -d
docker compose --profile tunnel ps
docker compose --profile tunnel logs --since=30s cloudflared
```

## Domain and Cloudflare

- Domain: `it-portfolio.xyz`; registrar: Navicosoft.
- Authoritative nameservers are successfully published and were verified through both `1.1.1.1` and `8.8.8.8`:
  - `audrey.ns.cloudflare.com`
  - `toby.ns.cloudflare.com`
- Navicosoft still shows `An issue was encountered while retrieving the domain nameservers. Please contact support.` This is a registrar-panel synchronization/API problem; public delegation already works.
- Cloudflare zone was created on the Free plan.
- Cloudflare Tunnel name: `it-portfolio`.
- Tunnel was created and connected earlier. The latest repository commit pins `cloudflared` and runs it with `--protocol http2`; the server still needs to pull that commit after SSH access is repaired.
- Do not reuse or copy proxy credentials from unrelated projects. The tunnel must connect directly over HTTP/2.

## Next actions

1. Repair the SSH authorized-key source restriction using the command above.
2. Pull `main` on the server and restart the Compose `tunnel` profile; verify all containers and tunnel logs.
3. In Cloudflare Zero Trust, add the public hostname `it-portfolio.xyz` to tunnel `it-portfolio`, using service type `HTTP` and origin URL `portfolio:3000`.
4. Verify `https://it-portfolio.xyz/api/health`, the public homepage, and `https://it-portfolio.xyz/admin`.
5. Let the user create the first Payload owner through `/admin`. This is the final account-creation step and must not be automated without immediate confirmation.
6. After infrastructure is verified, continue portfolio visual design and real content entry.
