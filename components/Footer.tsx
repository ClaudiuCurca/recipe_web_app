import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/constants";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex-1 flex flex-col gap-3 text-sm min-w-max p-5">
    <h4 className="font-semibold"> {title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link} className="w-fit">
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flex justify-start flex-col paddings w-full gap-20 border bg-slate-50 border-t-orange-300">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <p className="text-start text-sm font-normal mt-5 max-w-xs"></p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>

        <div className="flex justify-between max-sm:flex-col w-full text-sm font-normal p-2">
          <p>@ 2023 Online Recipes. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
