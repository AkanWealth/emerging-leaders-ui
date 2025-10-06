import Pagination from "./Pagination";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

const FooterBar = ({ className }: { className?: string }) => {
  return (
    <footer className={clsx("flex justify-between", className)}>
      <div className="flex items-center gap-1">
        <span>show </span>

        <span className="flex bg-white gap-1 rounded-lg px-2 py-1">
          <span>
            {} of {8}
          </span>
          <ChevronDown />
        </span>
      </div>

      <div className="flex items-center gap-6">
        <p>1-page</p>

        <div>
          <Pagination />
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
