import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import LeftNav from "../components/Left-Nav/left-nav";

import "./base.scss";

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Props): JSX.Element {
  return (
    <div>
      <Header />
      <div className="flex center justify-start bg-gray-50 px-10 py-5 m-5">
        <div className="side-nav">
          <aside
            id="default-sidebar"
            className="left-0 z-40 w-54 px-2"
            aria-label="Sidebar"
          >
            <div className="py-10 px-4  bg-gray-50 side-nav">
              <LeftNav />
            </div>
          </aside>
        </div>

        <div className="relative isolate px-6 min-h-96">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
