"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  title: string;
}

export function MermaidDiagram({ code, title }: MermaidDiagramProps) {
  const reactId = useId();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [diagramWidth, setDiagramWidth] = useState(900);
  const diagramId = `diagram-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          themeVariables: {
            background: "#111714",
            primaryColor: "#18231e",
            primaryTextColor: "#edf8f1",
            primaryBorderColor: "#6ee7b7",
            lineColor: "#9db0a4",
            secondaryColor: "#18231e",
            tertiaryColor: "#0d1210",
          },
        });
        const result = await mermaid.render(diagramId, code);
        const document = new DOMParser().parseFromString(result.svg, "image/svg+xml");
        const width = Number(document.documentElement.getAttribute("viewBox")?.trim().split(/\s+/)[2]);
        if (!cancelled) {
          setSvg(result.svg);
          setError(false);
          setDiagramWidth(Number.isFinite(width) && width > 0 ? Math.min(width, 10000) : 900);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [code, diagramId]);

  return (
    <>
      <div className="diagram-shell">
        <button
          className="diagram-expand"
          type="button"
          ref={triggerRef}
          onClick={() => { setExpanded(true); dialogRef.current?.showModal(); }}
          disabled={!svg || error}
          aria-label={`Развернуть диаграмму «${title}»`}
        >
          <Maximize2 size={16} />
          Развернуть
        </button>
        {error ? (
          <pre className="code-block">{code}</pre>
        ) : svg ? (
          <div className="mermaid-output" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="diagram-loading" role="status">Загрузка диаграммы…</div>
        )}
      </div>
      <dialog ref={dialogRef} className="diagram-modal" aria-label={title} onClose={() => { setExpanded(false); triggerRef.current?.focus(); }}>
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Закрыть
          </button>
          <div className="mermaid-output" tabIndex={0} aria-label="Диаграмма с прокруткой">
            {expanded && <div style={{ width: diagramWidth, minWidth: "100%" }} dangerouslySetInnerHTML={{ __html: svg.replaceAll(diagramId, `${diagramId}-expanded`) }} />}
          </div>
      </dialog>
    </>
  );
}
