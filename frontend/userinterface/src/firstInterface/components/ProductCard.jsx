import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProductCard({ product }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-colors duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <img
          src={product.image || `https://source.unsplash.com/random/400x400/?${product.category || 'fashion'}&sig=${product.id}`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
          <span className="text-lg font-extrabold text-purple-400">${product.price}</span>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <button className="w-full py-2.5 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
