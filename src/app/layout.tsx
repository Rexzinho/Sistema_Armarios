import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="content">
        <Header/>
          {children}
        </div>
      </body>
    </html>
  );
}
