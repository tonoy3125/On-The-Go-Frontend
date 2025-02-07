"use client";
import { useEffect, useRef, useState } from "react";
import { useGetCategoryByNameQuery } from "@/redux/features/category/categoryApi";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/debounce";
import { TCategories } from "@/types/category.type";
import { useAppSelector } from "@/redux/hook";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

interface IPorps {
  onChange: (categories: TCategories[]) => void;
}

const CategorySelector: React.FC<IPorps> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");
  const debouncevalue = useDebounce(value, 500);
  const [selectedCategories, setSelectedCategories] = useState<TCategories[]>(
    []
  );

  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const suggestionRef = useRef<HTMLDivElement | null>(null);
  const token = useAppSelector(useCurrentToken);

  const { data } = useGetCategoryByNameQuery(
    { name: debouncevalue, token },
    {
      skip: !debouncevalue,
    }
  );

  console.log(data);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as Node) &&
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target as Node)
    ) {
      setIsFocused(false); // Click outside of input and suggestion list
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterCategories = data?.data?.filter((category: TCategories) => {
    return !selectedCategories.some((selectedCategory) => {
      return selectedCategory._id === category._id;
    });
  });

  const handleRemoveCategory = (id: string) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category._id !== id
    );
    setSelectedCategories(updatedCategories);

    onChange(updatedCategories);
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="category">Category</Label>
      <div className="w-full py-[8px] pl-[8px] flex items-center justify-start gap-[10px] border-[1px] border-input">
        {selectedCategories?.map((category) => (
          <button
            key={category._id}
            onClick={() => handleRemoveCategory(category._id)}
            className="w-fit hover:bg-secondary cursor-pointer py-[3px] px-[10px] rounded-md borde-input border-[1px] bg-secondary text-[13px] center gap-[5px] shrink-0"
          >
            {category.name} X
          </button>
        ))}
        <div className="relative w-full">
          <input
            type="text"
            value={value}
            ref={ref}
            className="outline-none border-none bg-transparent w-full"
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {isFocused ? (
            <div
              className="shadow-2xl bg-white w-full absolute z-10 top-[40px] p-[10px] rounded-md"
              ref={suggestionRef}
            >
              {filterCategories?.map((category: TCategories) => (
                <div
                  key={category._id}
                  className="w-full hover:bg-secondary cursor-pointer py-[5px] px-[10px]"
                  onClick={() => {
                    setValue("");
                    onChange([...selectedCategories, category]);
                    setSelectedCategories([...selectedCategories, category]);
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
