import { useEffect } from "react";
import { useCmsSite } from "../hooks/useCmsPage";

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
  const { data: site, isPending } = useCmsSite();

  useEffect(() => {
    // Wait until site fetch settles — never inject from a loading placeholder.
    if (isPending || !site?.snippets?.length) return;
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
  }, [site, isPending]);

  return null;
}
