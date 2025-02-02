import { getDocs, getDoc, collection, DocumentData } from "firebase/firestore";
import { Product } from "@/types/Product";
import { db } from "@/config/firebase";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const productsCollectionRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollectionRef);

      const productList: Product[] = await Promise.all(
        productsSnapshot.docs.map(async (productDoc) => {
          const productData = productDoc.data();

          let categoryTitle = "";
          let categoryId = "";

          if (productData.category) {
            const categoryDoc = await getDoc(productData.category);

            if (categoryDoc.exists()) {
              const categoryData = categoryDoc.data() as DocumentData;
              categoryTitle = categoryData.title;
              categoryId = categoryDoc.id;
            }
          }

          return {
            id: productDoc.id,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            image: productData.image,
            category: categoryTitle,
            category_id: categoryId,
          };
        })
      );

      set({ products: productList });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },
}));
