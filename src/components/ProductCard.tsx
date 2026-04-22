import type { FunctionalComponent } from 'preact';
import { formatPrice } from '../utils/format';

interface Product {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    slug: string;
    can_ship?: boolean;
}

interface Props {
    product: Product;
}

export const ProductCard: FunctionalComponent<Props> = ({ product }) => {
    return (
        <div class="group flex flex-col bg-white rounded-2xl transition-all duration-300">
            {/* Image Frame with 15-20% padding */}
            <div class="aspect-square w-full bg-surface-gray rounded-2xl overflow-hidden relative flex items-center justify-center p-[15%]">
                <img 
                    src={product.image_url || "/placeholder.png"} 
                    alt={product.title} 
                    class="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                
                {/* Shipping Tag */}
                <div class="absolute top-3 left-3 flex gap-2">
                    {product.can_ship ? (
                        <span class="px-2 py-1 bg-green-500/10 text-green-600 text-[10px] font-bold rounded-md flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            Envío disponible
                        </span>
                    ) : (
                        <span class="px-2 py-1 bg-black/5 text-gray-500 text-[10px] font-bold rounded-md">
                            Envio no disponible
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div class="pt-4 pb-2 px-1">
                <div class="flex justify-between items-start gap-2 mb-1">
                    <h3 class="text-base font-semibold text-brand-gray tracking-tight leading-tight">
                        {product.title}
                    </h3>
                    <span class="text-sm font-bold text-brand-gray">
                        {formatPrice(product.price)}
                    </span>
                </div>
                <p class="text-xs text-[#86868B] mb-4 line-clamp-1">
                    {product.description}
                </p>
                <div class="flex items-center gap-3">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            console.log('Add to cart:', product.id);
                        }}
                        class="flex-1 py-2.5 bg-brand-blue text-white text-xs font-bold rounded-full hover:opacity-90 transition-all active:scale-95"
                    >
                        Comprar
                    </button>
                    <a 
                        href={`/products/${product.slug}`}
                        class="p-2.5 bg-surface-gray rounded-full text-brand-gray hover:bg-gray-200 transition-all"
                        aria-label="Ver detalles"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};
