const Footer = () => {
  return (
    <footer className="sm:py-6 py-3 bottom-0 w-full">
      <div className="container mx-auto px-10">
        <div className="flex flex-col sm:flex-row w-full">
          {/* Left container */}
          <div className="text-inactive sm:flex-1 flex justify-center sm:justify-start">
            <div className="flex items-center space-x-4">
              <div className="hover:text-text hover:font-bold">
                <a href="https://github.com/speravi/monkeytap" target="_blank">
                  {"</>"} github
                </a>
              </div>
            </div>
          </div>

          {/* Right container */}
          <div className="text-inactive sm:flex-1 flex justify-center sm:justify-end mt-2 sm:mt-0">
            <div className="flex items-center space-x-4">
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
    </footer>
  );
};

export default Footer;
