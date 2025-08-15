import { motion } from "framer-motion";

// Import SVG icons as URLs
import officeIcon from "../assets/Tapbar/office.svg";
import resourceIcon from "../assets/Tapbar/Resource.svg";
import materialsIcon from "../assets/Tapbar/Materials.svg";
import goodsIcon from "../assets/Tapbar/Goods.svg";
import stockIcon from "../assets/Tapbar/Stock.svg";

const BottomNavigation = () => {
  const navItems = [
    { icon: officeIcon, label: "Office", isActive: false },
    { icon: resourceIcon, label: "Resources", isActive: false },
    { icon: materialsIcon, label: "Materials", isActive: true },
    { icon: goodsIcon, label: "Goods", isActive: false },
    { icon: stockIcon, label: "Stock", isActive: false },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md border-t border-gray-600"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
              item.isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
          >
            <img src={item.icon} alt={item.label} className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
