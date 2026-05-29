import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shaheen Assignment Company - Premium Assignment Services',
  description: 'Professional assignment writing and academic services trusted by hundreds of students across Pakistan.',
  keywords: 'assignment, writing, services, Pakistan',
  openGraph: {
    title: 'Shaheen Assignment Company',
    description: 'Premium Assignment Services',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black">
        <div className="bg-noise">
          {children}
        </div>
      </body>
    </html>
  )
}
