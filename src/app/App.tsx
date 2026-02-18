import { useState, useMemo } from "react";
import { Flower2, Search, Filter } from "lucide-react";
import { ProductCard, Product } from "./components/ProductCard";
import { ShoppingCartSheet } from "./components/ShoppingCartSheet";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import logo from "figma:asset/9fca4b5a0e8c26279447405f30f314b5ea246f61.png";
import zambileImg from "figma:asset/5f9773600a30f00b6492ee510b301187877840e2.png";
import orhideeImg from "figma:asset/a20ec8ff646b9b0d24f536a4ffd0c862576f13e5.png";
import hortensiiImg from "figma:asset/70855189e281e2f0efbb815abe9346d2c6492e68.png";
import margareteImg from "figma:asset/b457d676d64d30c08e53e70d2d23f1eb55a551fc.png";
import anemoneImg from "figma:asset/af5d15e5cdf937b5ea100bb1dc6578df5d23ba1d.png";
import garoafeGalbeneImg from "figma:asset/6c51855fab4f5229f874153995950ba558520479.png";
import trandafiriRosiiImg from "figma:asset/e8c5f37b72462b2e520c19a316025b8f47b07f16.png";
import criniRozImg from "figma:asset/c569c08693e95024301e10272e0f67f2bb9dea03.png";

const products: Product[] = [
  {
    id: 1,
    name: "Buchet Zambile Violet",
    price: 149.99,
    category: "Zambile",
    description: "Buchet spectaculos cu zambile violet-albastru, înfășurate cu panglică elegantă The Garden",
    image: zambileImg,
    inStock: true,
  },
  {
    id: 2,
    name: "Orhidee Roz Premium",
    price: 229.99,
    category: "Orhidee",
    description: "Aranjament luxos cu orhidee roz și eucalipt, ambalat elegant în tonuri violet și roz",
    image: orhideeImg,
    inStock: true,
  },
  {
    id: 3,
    name: "Hortensii în Cutie Albastră",
    price: 189.99,
    category: "Hortensii",
    description: "Aranjament rafinat cu hortensii albe și albastre într-o cutie rotundă elegantă",
    image: hortensiiImg,
    inStock: true,
  },
  {
    id: 4,
    name: "Margarete Albe Clasice",
    price: 119.99,
    category: "Margarete",
    description: "Buchet proaspăt de margarete albe în vas ceramic, perfect pentru orice ocazie",
    image: margareteImg,
    inStock: true,
  },
  {
    id: 5,
    name: "Anemone Albe Elegante",
    price: 159.99,
    category: "Anemone",
    description: "Buchet sofisticat cu anemone albe și centrul negru, ambalat în hârtie albă premium",
    image: anemoneImg,
    inStock: true,
  },
  {
    id: 6,
    name: "Garoafe Galbene Solare",
    price: 129.99,
    category: "Garoafe",
    description: "Aranjament spectacular cu garoafe galbene în vas elegant, ideal pentru a aduce căldură în casă",
    image: garoafeGalbeneImg,
    inStock: true,
  },
  {
    id: 7,
    name: "Trandafiri Roșii Luxury",
    price: 299.99,
    category: "Trandafiri",
    description: "Buchet premium cu trandafiri roșii în ambalaj negru elegant, simbol al iubirii adevărate",
    image: trandafiriRosiiImg,
    inStock: true,
  },
  {
    id: 8,
    name: "Crini Roz Parfumați",
    price: 179.99,
    category: "Crini",
    description: "Aranjament spectaculos cu crini roz parfumați în vas de sticlă, ambalat în hârtie colorată",
    image: criniRozImg,
    inStock: true,
  },
  {
    id: 9,
    name: "Bujori Roz Delicat",
    price: 169.99,
    category: "Bujori",
    description: "Buchet luxos cu bujori roz, flori sofisticate pentru momente speciale",
    image: "https://images.unsplash.com/photo-1588457776180-4206b4909301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9ueSUyMGZsb3dlcnMlMjBwaW5rfGVufDF8fHx8MTc3MTM3MDY2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: false,
  },
  {
    id: 10,
    name: "Margarete de Primăvară",
    price: 69.99,
    category: "Margarete",
    description: "Buchet proaspăt de margarete, simbolizând inocența și bucuria primăverii",
    image: "https://images.unsplash.com/photo-1754334273190-483c1c623d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlzeSUyMGZsb3dlcnMlMjBzcHJpbmd8ZW58MXx8fHwxNzcxNDQzMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
  },
];

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error("Produsul nu este în stoc");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success("Cantitate actualizată în coș");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Produs adăugat în coș");
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Produs eliminat din coș");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="The Garden Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <ShoppingCartSheet
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl mb-4 text-green-900">
            Buchetele Cele Mai Frumoase
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descoperă colecția noastră de flori proaspete, selectate cu grijă
            pentru momentele tale speciale
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Caută flori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-5 h-5 text-gray-600" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate Categoriile</SelectItem>
                  {categories
                    .filter((cat) => cat !== "all")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nu am găsit produse care să corespundă căutării tale
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={logo} 
              alt="The Garden Logo" 
              className="h-12 w-12 object-contain"
            />
          </div>
          <p className="text-green-200 mb-2">
            Florărie online - Livrăm proaspete și frumusețe
          </p>
          <p className="text-sm text-green-300">
            © 2026 The Garden. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
}