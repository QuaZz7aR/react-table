import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type FilterProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

function Filters({ search, setSearch }: FilterProps) {

    const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
    const [localSearch, setLocalSearch] = useState(search);

    function onNameFilterChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalSearch(e.target.value);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        const value = e.target.value;

        debounceRef.current = setTimeout(() => {

            setSearch(value);
        }, 500);

    }

    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Search by name..."
                value={localSearch}
                onChange={onNameFilterChange}
                className="rounded-lg border py-1 px-2 ml-1"
            />
        </div>
    )

}

export default Filters;