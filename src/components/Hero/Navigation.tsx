import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const navItems = ["ABOUT", "WORKS", "SERVICES"];

function Navigation() {
  return (
    <div className="navigation fixed top-0 left-0 w-full py-8 z-20 px-[18px]">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <ul className="flex justify-between items-start text-white font-semibold text-[2vw]">
          <li className="text-[3vw]/12 pl-[18px]">
            ERIC <br /> RISHER
          </li>

          <div className="flex gap-12 pr-[18px] items-center">
            {navItems.map((item) => (
              <motion.li key={item} className="cursor-pointer">
                [
                <motion.span
                  initial={{ paddingLeft: "0.5ch", paddingRight: "0.5ch" }}
                  whileHover={{ paddingLeft: "1ch", paddingRight: "1ch" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {item}
                </motion.span>
                ]
              </motion.li>
            ))}

            <li className="btn bg-[#B287A3] py-2 px-6 rounded-2xl">CONNECT</li>
          </div>
        </ul>
      </motion.div>
    </div>
  );
}

export default Navigation;
