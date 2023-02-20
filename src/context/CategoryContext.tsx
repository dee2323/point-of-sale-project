import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { category } from "../types";
interface valueInterface {
    categories: category[],
    loading: boolean,
}
export const categoriesContext = createContext<valueInterface | null>(null);
interface props {
    children?: React.ReactNode;
}
const CategoryContextProvider: React.FC<props> = ({ children }: props) => {
    const [categories, setCategories] = useState<Array<category>>([]);
    const [loading, setLoading] = useState(false);
    const getCategories = async () => {
        setLoading(true)
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
            console.log(error);
        }


    }
    useEffect(() => {
        getCategories();
    }, [])

    const sampleAppContext: valueInterface = {

        categories,
        loading,


    };
    return <categoriesContext.Provider value={sampleAppContext}>{children}</categoriesContext.Provider>
}
export default CategoryContextProvider