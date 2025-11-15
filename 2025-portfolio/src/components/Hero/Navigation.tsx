import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

function Navigation() {
  return (
    <div className="navigation fixed top-0 left-0 w-full py-8 z-20 px-[18px]">
      <motion.div
        variants={fadeInUp}
        className=""
        initial="hidden"
        animate="visible"
      >
        <ul className="flex justify-between items-start text-white font-semibold text-[2vw]">
          <li className="text-[3vw]/12 pl-[18px]">
            ERIC <br /> RISHER
          </li>

          <div className="flex gap-12 pr-[18px] items-center">
            <li>[ ABOUT ]</li>
            <li>[ WORKS ]</li>
            <li>[ SERVICES ]</li>
            <li className="btn bg-[#B287A3] py-2 px-6 rounded-2xl">CONNECT</li>
          </div>
        </ul>
      </motion.div>
    </div>
  );
}

export default Navigation;
