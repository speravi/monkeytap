// TODO:
// bad positioning. i mean it works but that's not how to do it.
// should be two divs, left and right.
// should be able to see left and right divs through dev tools
const Footer = () => {
  return (
    <footer className="py-6 bottom-0 w-full">
      <div
        className={`text-inactive flex flex-col sm:flex-row justify-between items-center container mx-auto px-10`}
      >
        <div className="flex items-center space-x-4 ">
          <div className={`hover:text-text hover:font-bold`}>
            {"</> "}
            <a href="https://github.com/speravi" target="_blank">
              github
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div>inspired by</div>
          <a
            className={`text-text hover:font-bold`}
            href="https://monkeytype.com"
            target="_blank"
          >
            Monkeytype
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
