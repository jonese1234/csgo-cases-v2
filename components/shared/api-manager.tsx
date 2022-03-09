import useSWR from 'swr'

const fetcher = (resource: RequestInfo, init: RequestInit | undefined) => fetch(resource, init).then(res => res.json())

export function GetAllData(){
    const { data, error } = useSWR('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json', fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function GetAllCasesData(){
    const { data, isLoading, isError } = GetAllData();

    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: data['cases'] ?? data,
        isLoading: isLoading,
        isError: isError
    }
}

export function GetCaseData(name: string){
    const { data, isLoading, isError } = GetAllCasesData();
    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    if (data[name]){
        return {
            data: data[name],
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: null,
        isLoading: isLoading,
        isError: true
    }
}

export function GetUpdateTimestamp(){
    const { data, isLoading, isError } = GetAllData();

    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: data['timestamp'] ?? data,
        isLoading: isLoading,
        isError: isError
    }
}