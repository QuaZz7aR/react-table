import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type FilterProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
    departments: string[]
    setDepartment: Dispatch<SetStateAction<string>>
    roles: string[]
    setRole: Dispatch<SetStateAction<string>>
}

function Filters({ search, setSearch, departments, setDepartment, roles, setRole }: FilterProps) {

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
        <div className="flex gap-6">
            <input
                type="text"
                placeholder="Search by name"
                value={localSearch}
                onChange={onNameFilterChange}
                className="rounded-lg border py-1 px-2 ml-1"
            />
            <select className="rounded-lg border py-1 px-2 appearance-none cursor-pointer" onChange={e => setDepartment(e.target.value)}>
                <option value="" className="bg-cyan-950 text-white" >All departments</option>
                {departments?.map(dep => <option key={dep} value={dep} className="bg-cyan-950 text-white">{dep}</option>)}
            </select>
            <select className="rounded-lg border py-1 px-2 appearance-none cursor-pointer" onChange={e => setRole(e.target.value)}>
                <option value="" className="bg-cyan-950 text-white" >All roles</option>
                {roles?.map(role => <option key={role} value={role} className="bg-cyan-950 text-white">{role}</option>)}
            </select>
        </div>
    )

}

export default Filters;