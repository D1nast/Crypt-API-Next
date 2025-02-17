// app/layout.tsx
import Header from './component/header';
import Footer from './component/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>

  );
}

