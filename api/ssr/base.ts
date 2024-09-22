export default function (html: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/o/coomico.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirect to a secret link &#128373</title>
  <script type="module" src="/o/client.js"></script>
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
      }
    }
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
          borderRadius: {
            xl: "calc(1rem + 4px)",
            lg: "1rem",
            md: "calc(1rem - 2px)",
            sm: "calc(1rem - 4px)",
          }
        }
      }
    }
  </script>
  <style type="text/tailwindcss">    
    @layer utilities {
      @font-face {
        font-family: "geist-sans";
        src: url("./GeistVF.woff2");
      }

      html {
        font-family: "geist-sans", system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
    }
  </style>
  <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
</head>
<body>
  <div id="app">${html}</div>
</body>
</html>`
};