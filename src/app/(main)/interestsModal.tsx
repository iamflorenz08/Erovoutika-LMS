"use client";

import useCheckInterests from "@/hooks/useCheckInterests";
import useDebounce from "@/hooks/useDebounceSearch";
import { ITags } from "@/types/tags";
import { useEffect, useState } from "react";
import { updateInterests } from "./action";

export default function InterestsModal() {
  const { isShow, setIsShow } = useCheckInterests();
  const [tags, setTags] = useState<Array<ITags>>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const { isLoading, search } = useDebounce(searchText, 800);

  useEffect(() => {
    const searchTags = async () => {
      const fetchTags = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/v1/tags?search=${search}&limit=30`
      );
      const data = await fetchTags.json();
      return setTags(data);
    };

    searchTags();
  }, [search]);

  if (!isShow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-[99] flex justify-center items-center">
      <div className="bg-white border border-gray border-opacity-20 rounded-lg py-4 px-6 flex flex-col items-center w-full max-w-[672px]">
        <h1 className="font-medium text-xl">Interests</h1>
        <h2 className="mt-2">Choose at least 3 tags that interest you.</h2>
        <div className="relative flex w-full mt-4">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="border border-gray border-opacity-20 w-full p-4 placeholder:text-[#8F9BBA] rounded-full pl-9"
          />
        </div>
        <div className="mt-4 flex w-full max-h-[190px] gap-2 flex-wrap overflow-auto">
          {tags.map(
            (tag) =>
              tag.name && (
                <button
                  key={tag._id}
                  onClick={() => {
                    if (selectedTags.includes(tag.name)) {
                      const currentTags = selectedTags.filter(
                        (selectedTag) => selectedTag !== tag.name
                      );
                      setSelectedTags(currentTags);
                    } else {
                      setSelectedTags((currentTags) => [
                        ...currentTags,
                        tag.name,
                      ]);
                    }
                  }}
                  className={`h-fit px-4 py-2 bg-slate-100 rounded-full ${
                    selectedTags.includes(tag.name) &&
                    "!bg-primary-light !text-white"
                  }`}
                >
                  {tag.name}
                </button>
              )
          )}
        </div>
        <form
          action={async () => {
            if (selectedTags.length <= 0) return;
            const interests = await updateInterests(selectedTags);
            if (interests.success) setIsShow(false);
          }}
          className="flex justify-between w-full mt-4"
        >
          <button onClick={() => setIsShow(false)} className="font-semibold">
            Skip for now
          </button>
          <button className="px-4 p-2 bg-primary text-white rounded-lg">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
