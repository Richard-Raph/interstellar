import { type Country } from "../types/country";
import { motion, type Transition } from "framer-motion";

interface CardProps {
  country: Country;
}

const fastTransition: Transition = {
  duration: 0.1,
  ease: [0.17, 0.67, 0.83, 0.67],
};

export default function Card({ country }: CardProps) {
  const renderDetail = (label: string, value: string | number) => (
    <div key={label}>
      <p className="font-medium text-xs tracking-wider uppercase text-indigo-500 dark:text-indigo-400">
        {label}
      </p>
      <p className="font-semibold text-gray-800 dark:text-gray-200 leading-tight">
        {value}
      </p>
    </div>
  );

  return (
    <motion.div
      transition={fastTransition}
      whileHover={{ scale: 1.03, rotate: -0.5 }}
      className="relative w-full p-0.5 rounded-2xl overflow-hidden 
      cursor-pointer bg-gray-100 dark:bg-gray-800 shadow-lg transition-shadow"
    >
      <div
        className="absolute inset-0 z-0 bg-repeat [background-size:20px_20px]
        bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-200)_1px,_transparent_1px)]
        dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-700)_1px,_transparent_1px)]"
      />

      <motion.div
        transition={fastTransition}
        whileHover={{ y: 2, boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)" }}
        className="relative flex rounded-xl justify-between bg-white/90 dark:bg-gray-900/90 
        h-64 z-10 p-6 flex-col backdrop-blur-sm border border-transparent dark:border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <motion.img
            src={country.flags.png}
            transition={fastTransition}
            alt={`${country.name.common} flag`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="w-16 h-12 object-cover rounded-md shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {country.name.common}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {renderDetail("Region", country.region)}
          {renderDetail("Capital", country.capital?.[0] || "N/A")}
          {renderDetail("Population", country.population.toLocaleString())}
          {renderDetail("Code", country.cca3)}
        </div>
        <div className="w-1/3 h-1 bg-indigo-400 dark:bg-indigo-500 rounded-full mx-auto" />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
