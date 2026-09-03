import { useEffect } from "react";
import { getRouteApi } from "@tanstack/react-router";

const rootRouteApi = getRouteApi("__root__");

function injectHtml(parent: HTMLElement, html: string, position: "prepend" | "append") {
  if (!html.trim()) return;
  const tpl = document.createElement("template");
  tpl.innerHTML = html;
  const nodes = Array.from(tpl.content.childNodes);
  if (position === "prepend") {
    for (let i = nodes.length - 1; i >= 0; i--) {
      parent.insertBefore(nodes[i]!, parent.firstChild);
    }
  } else {
    for (const node of nodes) {
      parent.appendChild(node);
    }
  }
}

export default function CmsSnippets() {
  // Settled root loader site payload — never inject during loading.
  const { site } = rootRouteApi.useLoaderData();

  useEffect(() => {
    if (!site?.snippets?.length) return;
    for (const snippet of site.snippets) {
      if (snippet.headCode) {
        injectHtml(document.head, snippet.headCode, "append");
      }
      if (snippet.bodyCode) {
        injectHtml(document.body, snippet.bodyCode, "prepend");
      }
      if (snippet.footerCode) {
        injectHtml(document.body, snippet.footerCode, "append");
      }
    }
  }, [site]);

  return null;
}
