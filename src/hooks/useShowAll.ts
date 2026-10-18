import { useQuery } from "@tanstack/react-query"
import { getShowAll } from "../api/showall"


export function useShowAll() {
    return useQuery({
        queryKey: ['showall'],
        queryFn:getShowAll,
        staleTime:300000,//5 นาที

    })


}
