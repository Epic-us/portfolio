"use client";

import { useEffect, useId, useState } from "react";
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
        const id = `diagram-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
        const result = await mermaid.render(id, code);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [code, reactId]);

  return (
    <>
      <div className="diagram-shell">
        <button
          className="diagram-expand"
          type="button"
          onClick={() => setExpanded(true)}
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
          <div className="diagram-loading">Загрузка диаграммы…</div>
        )}
      </div>
      {expanded && (
        <div className="diagram-modal" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" onClick={() => setExpanded(false)}>
            Закрыть
          </button>
          <div className="mermaid-output" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      )}
    </>
  );
}
