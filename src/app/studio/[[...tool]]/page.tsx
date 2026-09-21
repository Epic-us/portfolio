"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-setup">
        <div>
          <p className="eyebrow">Настройка CMS</p>
          <h1>Подключите проект Sanity</h1>
          <p>
            Добавьте <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> и остальные значения из
            <code>.env.example</code> в файл <code>.env.local</code>, затем перезапустите сайт.
          </p>
          <a href="https://www.sanity.io/manage" rel="noreferrer" target="_blank">
            Открыть Sanity
          </a>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
