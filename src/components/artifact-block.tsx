import { ExternalLink } from "lucide-react";
import type { ProjectArtifact } from "@/lib/types";
import { MermaidDiagram } from "@/components/mermaid-diagram";

const diagramTypes = new Set(["architecture", "process", "data"]);
const artifactLabels: Record<ProjectArtifact["type"], string> = {
  architecture: "Архитектура", process: "Процесс", data: "Данные",
  api: "API", prototype: "Прототип", testing: "Тестирование",
};

export function ArtifactBlock({ artifact, index }: { artifact: ProjectArtifact; index: number }) {
  const isDiagram = diagramTypes.has(artifact.type);

  return (
    <article className="artifact" id={artifact._key}>
      <div className="artifact-copy">
        <span className="artifact-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="eyebrow">{artifactLabels[artifact.type]}</p>
        <h2>{artifact.title}</h2>
        <p>{artifact.description}</p>
        {artifact.url && (
          <a className="text-link" href={artifact.url} rel="noreferrer" target="_blank">
            Открыть материал <ExternalLink size={15} />
          </a>
        )}
      </div>
      <div className="artifact-media">
        {artifact.code && isDiagram && (
          <MermaidDiagram code={artifact.code} title={artifact.title} />
        )}
        {artifact.code && !isDiagram && <pre className="code-block">{artifact.code}</pre>}
        {!artifact.code && !artifact.url && (
          <div className="artifact-placeholder">
            <span>Материал готовится</span>
            <p>Подробные материалы будут опубликованы здесь.</p>
          </div>
        )}
      </div>
    </article>
  );
}
