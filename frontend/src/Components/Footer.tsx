import { IconCode } from "@tabler/icons-react";
import QuickThemeSwitcher from "./QuickThemeSwitcher";

const Footer = () => {
  return (
    <footer className="sm:py-6 py-2 bottom-0 w-full text-sm">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left container */}
          <div className="text-inactive sm:flex-1 flex justify-center md:justify-start">
            <div className="flex items-center space-x-4">
              <div className="hover:text-text ">
                <a href="https://github.com/speravi/monkeytap" target="_blank">
                  <IconCode className="inline-flex items-center gap-1" /> github
                </a>
              </div>
            </div>
          </div>

          {/* Right container */}
          <div className="text-inactive sm:flex-1 flex justify-center md:justify-end sm:mt-0">
            <div className="flex items-center space-x-4">
              <QuickThemeSwitcher />
              <div className="inline-flex gap-2">
                <div>inspired by</div>
                <a
                  className="text-text hover:font-bold"
                  href="https://monkeytype.com"
                  target="_blank"
                >
                  monkeytype
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
