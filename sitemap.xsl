<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>BabyApp sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; color: #1f2937; }
          h1 { margin-bottom: 0.5rem; }
          p { margin-top: 0; color: #4b5563; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #d1d5db; padding: 0.5rem; text-align: left; }
          th { background: #f3f4f6; }
          a { color: #2563eb; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>BabyApp sitemap</h1>
        <p>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></p>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last modified</th>
              <th>Change frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a></td>
                <td><xsl:value-of select="sitemap:lastmod" /></td>
                <td><xsl:value-of select="sitemap:changefreq" /></td>
                <td><xsl:value-of select="sitemap:priority" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
