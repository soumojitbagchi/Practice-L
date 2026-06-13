const mockProducts = [
  { id: 1, name: 'Neon Cyber Jacket', price: 129.99, category: 'outerwear', description: 'Glow in the dark cyberpunk inspired jacket.' },
  { id: 2, name: 'Holo Sneakers', price: 89.99, category: 'shoes', description: 'Holographic sneakers with comfortable soles.' },
  { id: 3, name: 'Void T-Shirt', price: 34.99, category: 'tops', description: 'Vantablack t-shirt that absorbs all light.' },
  { id: 4, name: 'Quantum Cargo Pants', price: 79.99, category: 'bottoms', description: 'Cargo pants with unlimited pocket space.' },
  { id: 5, name: 'Neon Visor', price: 45.00, category: 'accessories', description: 'Cyberpunk style glowing visor.' },
  { id: 6, name: 'Stealth Hoodie', price: 95.00, category: 'outerwear', description: 'Matte black hoodie perfect for blending in.' },
];

export const fetchCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return ['outerwear', 'shoes', 'tops', 'bottoms', 'accessories'];
};

export const fetchAllProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProducts;
};

export const fetchProductsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockProducts.filter(p => p.category === category);
};
