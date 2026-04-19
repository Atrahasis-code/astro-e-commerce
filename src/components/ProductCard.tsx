import type { FunctionalComponent } from 'preact';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    slug: string;
}

interface Props {
    product: Product;
}

export const ProductCard: FunctionalComponent<Props> = ({ product }) => {
    return (
        <div class="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-white/[0.07]">
            <div class="aspect-square overflow-hidden bg-black/40 relative">
                <img 
                    src={product.image} 
                    alt={product.title} 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span class="text-white text-sm font-medium">Quick Preview</span>
                </div>
            </div>
            <div class="p-8">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-2xl font-bold font-['Outfit']">{product.title}</h3>
                    <span class="text-xl font-bold text-purple-400 font-['Outfit']">${product.price}</span>
                </div>
                <p class="text-white/60 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
                <div class="flex gap-3">
                    <button 
                        onClick={() => console.log('Add to cart:', product.id)}
                        class="flex-1 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all active:scale-95"
                    >
                        Add to Cart
                    </button>
                    <a 
                        href={`/products/${product.slug}`}
                        class="p-4 glass rounded-2xl hover:bg-white/10 transition-all"
                        aria-label="View Details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};
