// app/layout.tsx
import Header from './header';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <main>{children}</main> ページごとのコンテンツ */}
      <Footer />
    </div>
  );
}
