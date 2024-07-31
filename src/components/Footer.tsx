import { Link } from "react-router-dom";
import { FacebookFilled, GithubFilled, InstagramOutlined, LinkedinFilled, TwitterOutlined } from "@ant-design/icons";

import { FooterLinks, FooterIconLinks } from "../constants";
import { Logo } from "./";

const FooterIconElements = [
  <FacebookFilled className="footer-icons" />,
  <InstagramOutlined className="footer-icons" />,
  <TwitterOutlined className="footer-icons" />,
  <LinkedinFilled className="footer-icons" />,
  <GithubFilled className="footer-icons" />
];

const Footer = () => {
  return (
    <footer className="outline outline-1 outline-lite-2 dark:bg-dark-0 dark:outline-gray-500 py-5 sm:px-10 px-5">
      <div className="flex justify-between max-sm:flex-col max-sm:gap-5">
        <Logo />

        <ul className="grid grid-cols-3">
          {FooterLinks.map(col => (
            <li key={col.title}>
              <div className="font-semibold text-dark-2 py-2.5 max-xs:text-sm dark:text-lite-1">{col.title}</div>
              <div className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <Link 
                    to={link.to} 
                    key={link.name}
                    className="text-[15px] text-dark-3 max-sm:text-[11px] dark:text-lite-2 hover:underline"
                  >{link.name}</Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-6 dark:border-gray-500/50" />

      <div className="flex justify-between items-center">
        <span className="text-sm text-dark-3">
          &copy; 2024&nbsp;
          <Link to="/" className="hover:underline">Blog Saga</Link>
        </span>
        <div className="flex items-center gap-5">
          {FooterIconElements.map((icon, i) => (
            <Link key={i} to={FooterIconLinks[i]}>{icon}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
