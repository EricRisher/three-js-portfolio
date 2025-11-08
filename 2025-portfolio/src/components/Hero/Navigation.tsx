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
        <ul className="flex justify-between items-center text-white font-semibold text-[3rem]">
          <li className="text-[3rem]/12 pl-[18px]">
            ERIC <br /> RISHER
          </li>

          <div className="flex gap-12 pr-[18px]">
            <li>[ About ]</li>
            <li>[ Works ]</li>
            <li>[ SERVICES ]</li>
            <li>[ CONNECT ]</li>
          </div>
        </ul>
      </motion.div>
    </div>
  );
}

export default Navigation;
