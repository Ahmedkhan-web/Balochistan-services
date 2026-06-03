import { Helmet } from "react-helmet-async";
import { SITE } from "@/lib/constants";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

export function Seo({
  title,
  description = SITE.description,
  path = "",
  image = "/og-image.svg",
  type = "website",
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${SITE.shortName}` : SITE.name;
  const url = `${SITE.url}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
