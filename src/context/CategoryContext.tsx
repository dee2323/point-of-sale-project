import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { category } from "../types";
interface valueInterface {
    categories: category[],
    loading: boolean,
    handleAddingCategory: (category: string) => void,
    handleDeletingCategory?: (id: string) => void;
    handleUpdateCategory: (id: string, category: string | undefined) => void;
    searchCategories: (searchTerm: string) => void;
    setSearching: React.Dispatch<React.SetStateAction<boolean>>,
    clearSearch: () => void;
}
export const categoriesContext = createContext<valueInterface | null>(null);
interface props {
    children?: React.ReactNode;
}
const CategoryContextProvider: React.FC<props> = ({ children }: props) => {
    const [categories, setCategories] = useState<Array<category>>([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const getCategories = async () => {
        !searching && setLoading(true)
        try
        {
            const response = await axios.get("https://pos-project-deema-default-rtdb.firebaseio.com/categories.json/");
            if (response.data !== null)
            {
                const result = Object.keys(response.data).map((key) => {
                    const category = response.data[key];
                    if (category !== null)
                    {
                        category.id = key;
                        return category;
                    }
                });

                setCategories(result.filter((category) => category !== undefined));
            } else
            {
                setCategories([]);
            }
            setTimeout(() => { setLoading(false) }, 300)
        } catch (error)
        {
        }


    }
    useEffect(() => {
        getCategories();
    }, [])
    const handleAddingCategory = async (category: string) => {
        await axios.post("https://pos-project-deema-default-rtdb.firebaseio.com/categories.json/",
            { category: category, id: categories.length });
        getCategories();

    }
    const handleDeletingCategory = async (id: string) => {
        await axios.delete("https://pos-project-deema-default-rtdb.firebaseio.com/categories/" + id + ".json");
        getCategories();

    }
    const handleUpdateCategory = async (id: string, category: string | undefined) => {
        await axios.patch(
            "https://pos-project-deema-default-rtdb.firebaseio.com/categories/" + id + ".json",
            {
                id,
                category
            }
        );
        getCategories();
    }

    //
    const searchCategories = (searchTerm: string) => {
        if (searchTerm !== '')
        {
            setSearchTerm(searchTerm);
            setSearching(true);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSearching(false);
        getCategories();
    };

    const filteredCategories = searching
        ? categories.filter((category) => {
            const productName = category?.category?.toLowerCase() || '';
            return productName.includes(searchTerm.toLowerCase());
        })
        : categories;
    const sampleAppContext: valueInterface = {
        handleAddingCategory,
        categories: filteredCategories,
        loading,
        handleDeletingCategory,
        handleUpdateCategory,
        searchCategories,
        setSearching,
        clearSearch,

    };
    return <categoriesContext.Provider value={sampleAppContext}>{children}</categoriesContext.Provider>
}
export default CategoryContextProvider