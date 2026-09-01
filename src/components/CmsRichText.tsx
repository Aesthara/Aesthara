import type { ElementType } from "react";

type CmsRichTextProps = {
  html: string;
  className?: string;
  as?: ElementType;
};

export default function CmsRichText({
  html,
  className,
  as: Tag = "div",
}: CmsRichTextProps) {
  return (
    <Tag
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: CMS richtext
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
