import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";

import './base.scss';

interface Props {
    children: React.ReactNode;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <div className="bg-white">
        <Header />
  <div className="relative isolate px-6 pt-14 lg:px-8">
    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    </div>
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        {children}
      </div>
    </div>
  </div>
</div>
  );
}