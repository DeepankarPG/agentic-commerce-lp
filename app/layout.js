import './globals.css'

export const metadata = {
  title: 'PayGlocal Agentic Commerce',
  description: 'Make your store AI-ready.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/bg-demo.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
